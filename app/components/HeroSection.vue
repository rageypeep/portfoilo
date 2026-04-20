<script setup lang="ts">
import type { Group, Material, Mesh } from 'three'
import { getHeroViewportLayout, heroSceneLayouts } from '../utils/heroSceneLayout'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const heroRef = ref<HTMLElement | null>(null)
const heroSceneReady = ref(false)
const router = useRouter()
let cleanupHeroScene: (() => void) | null = null

const heroTextureSet = {
  shell: '1',
  screen: '1',
  table: '1',
  tableRing: '1',
  nebula: '1'
}

const featuredProjects = [
  {
    title: 'ChromaForge',
    label: 'AI texture pipeline',
    stack: 'Flask / HTMX / Three.js',
    slug: 'chromaforge',
    image: '/images/chromaforge-hero.png',
    accent: '#2dd4bf'
  },
  {
    title: 'JotSpot',
    label: 'Live note publishing',
    stack: 'Flask / HTMX / CLI',
    slug: 'jotspot',
    image: '/images/jotspot-hero.png',
    accent: '#38bdf8'
  },
  {
    title: 'Voxel Engine',
    label: 'C++ planetary terrain',
    stack: 'C++ / DirectX 12 / Streaming',
    slug: 'minecraft-in-space',
    image: '/images/mc-space-hero.jpg',
    accent: '#f59e0b'
  }
]

onBeforeUnmount(() => {
  cleanupHeroScene?.()
  cleanupHeroScene = null
})

onMounted(async () => {
  const canvas = canvasRef.value
  const hero = heroRef.value
  if (!canvas || !hero) return
  heroSceneReady.value = false

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  const connection = navigator as Navigator & { connection?: { saveData?: boolean } }
  const useStaticHero = motionQuery.matches || Boolean(connection.connection?.saveData)

  if (useStaticHero) {
    hero.classList.add('hero--static')
    window.requestAnimationFrame(() => {
      heroSceneReady.value = true
    })
    canvas.dataset.static = 'true'
    cleanupHeroScene = () => {
      hero.classList.remove('hero--static')
      delete canvas.dataset.static
    }
    return
  }

  const {
    ACESFilmicToneMapping,
    AdditiveBlending,
    AmbientLight,
    BoxGeometry,
    BufferAttribute,
    BufferGeometry,
    CanvasTexture,
    CircleGeometry,
    Color,
    CylinderGeometry,
    DirectionalLight,
    EdgesGeometry,
    Group,
    LineBasicMaterial,
    LineSegments,
    LoadingManager,
    Mesh,
    MeshBasicMaterial,
    MeshPhysicalMaterial,
    MeshStandardMaterial,
    PCFShadowMap,
    PerspectiveCamera,
    PlaneGeometry,
    PMREMGenerator,
    PointLight,
    Points,
    PointsMaterial,
    Raycaster,
    RepeatWrapping,
    Scene,
    SphereGeometry,
    SpotLight,
    Sprite,
    SpriteMaterial,
    SRGBColorSpace,
    Texture,
    TextureLoader,
    TorusGeometry,
    Vector2,
    Vector3,
    WebGLRenderer
  } = await import('three')
  const THREE = {
    ACESFilmicToneMapping,
    AdditiveBlending,
    AmbientLight,
    BoxGeometry,
    BufferAttribute,
    BufferGeometry,
    CanvasTexture,
    CircleGeometry,
    Color,
    CylinderGeometry,
    DirectionalLight,
    EdgesGeometry,
    Group,
    LineBasicMaterial,
    LineSegments,
    LoadingManager,
    Mesh,
    MeshBasicMaterial,
    MeshPhysicalMaterial,
    MeshStandardMaterial,
    PCFShadowMap,
    PerspectiveCamera,
    PlaneGeometry,
    PMREMGenerator,
    PointLight,
    Points,
    PointsMaterial,
    Raycaster,
    RepeatWrapping,
    Scene,
    SphereGeometry,
    SpotLight,
    Sprite,
    SpriteMaterial,
    SRGBColorSpace,
    Texture,
    TextureLoader,
    TorusGeometry,
    Vector2,
    Vector3,
    WebGLRenderer
  }
  const lowCoreDevice = Boolean(navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4)

  const scene = new THREE.Scene()
  const backgroundScene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
  const loadingManager = new THREE.LoadingManager()
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: !lowCoreDevice,
    powerPreference: lowCoreDevice ? 'default' : 'high-performance'
  })
  const textureLoader = new THREE.TextureLoader(loadingManager)
  const raycaster = new THREE.Raycaster()
  const pointer = new THREE.Vector2()
  const parallaxPointer = new THREE.Vector2()
  const pointerWorld = new THREE.Vector3()
  const hoverWorld = new THREE.Vector3()
  const hoverLightPosition = new THREE.Vector3()
  const cardGroups: Group[] = []
  const hitTargets: Mesh[] = []
  const disposableMaterials: Material[] = []
  const disposableTextures: Array<InstanceType<typeof THREE.Texture>> = []
  const cardBounds = {
    width: 2.9,
    height: 2.22
  }
  const cardCorners = [
    new THREE.Vector3(-cardBounds.width / 2, -cardBounds.height / 2, 0.12),
    new THREE.Vector3(cardBounds.width / 2, -cardBounds.height / 2, 0.12),
    new THREE.Vector3(cardBounds.width / 2, cardBounds.height / 2, 0.12),
    new THREE.Vector3(-cardBounds.width / 2, cardBounds.height / 2, 0.12)
  ]
  let currentLayoutName = getHeroViewportLayout(window.innerWidth)
  let currentLayout = heroSceneLayouts[currentLayoutName]
  let renderedFrameCount = 0
  let assetsLoaded = false
  let revealTimer: number | null = null

  function revealHeroScene() {
    if (renderedFrameCount < 2 || !assetsLoaded || heroSceneReady.value || revealTimer) return

    revealTimer = window.setTimeout(() => {
      heroSceneReady.value = true
      revealTimer = null
    }, 120)
  }

  loadingManager.onLoad = () => {
    assetsLoaded = true
    revealHeroScene()
  }

  const fallbackRevealTimer = window.setTimeout(() => {
    assetsLoaded = true
    revealHeroScene()
  }, 4200)

  function getRendererPixelRatio() {
    const layoutCap = lowCoreDevice ? Math.min(currentLayout.pixelRatioCap, 1.25) : currentLayout.pixelRatioCap
    return Math.min(window.devicePixelRatio || 1, layoutCap)
  }

  function lerp(current: number, target: number, speed: number) {
    return current + (target - current) * speed
  }

  function smoothstep(edge0: number, edge1: number, value: number) {
    const t = Math.max(0, Math.min(1, (value - edge0) / (edge1 - edge0)))
    return t * t * (3 - 2 * t)
  }

  function trackMaterial<T extends Material>(material: T) {
    disposableMaterials.push(material)
    return material
  }

  function trackTexture<T extends InstanceType<typeof THREE.Texture>>(texture: T) {
    disposableTextures.push(texture)
    return texture
  }

  function prepareTexture(texture: InstanceType<typeof THREE.Texture>, repeat = 1) {
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(repeat, repeat)
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy()
    trackTexture(texture)
    return texture
  }

  function loadDataMap(path: string, repeat = 1) {
    return prepareTexture(textureLoader.load(path), repeat)
  }

  function loadColorMap(path: string, repeat = 1) {
    const texture = prepareTexture(textureLoader.load(path), repeat)
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
  }

  function loadInvertedSmoothnessMap(path: string, repeat = 1) {
    const texture = textureLoader.load(path, loadedTexture => {
      const image = loadedTexture.image as CanvasImageSource
      const canvasMap = document.createElement('canvas')
      canvasMap.width = image.width as number
      canvasMap.height = image.height as number
      const ctx = canvasMap.getContext('2d')
      if (!ctx) return

      ctx.drawImage(image, 0, 0)
      const imageData = ctx.getImageData(0, 0, canvasMap.width, canvasMap.height)

      for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i] = 255 - imageData.data[i]
        imageData.data[i + 1] = 255 - imageData.data[i + 1]
        imageData.data[i + 2] = 255 - imageData.data[i + 2]
      }

      ctx.putImageData(imageData, 0, 0)
      loadedTexture.image = canvasMap
      loadedTexture.needsUpdate = true
    })

    return prepareTexture(texture, repeat)
  }

  function makeTexturePaths(kind: keyof typeof heroTextureSet) {
    const textureFolder = kind === 'table'
      ? 'table'
      : kind === 'tableRing'
        ? 'table-ring'
        : `card-${kind}`
    const base = `/textures/${textureFolder}/${heroTextureSet[kind]}`
    return {
      albedo: `${base}/albedo.png`,
      ao: `${base}/ao.png`,
      height: `${base}/height.png`,
      metallic: kind === 'shell' ? `${base}/metalic.png` : `${base}/metallic.png`,
      normal: `${base}/normal.png`,
      smoothness: `${base}/smoothness.png`
    }
  }

  function loadNebulaTexture(path: string) {
    const texture = textureLoader.load(path, loadedTexture => {
      loadedTexture.colorSpace = THREE.SRGBColorSpace
      loadedTexture.anisotropy = renderer.capabilities.getMaxAnisotropy()
    })
    texture.colorSpace = THREE.SRGBColorSpace
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    trackTexture(texture)
    return texture
  }

  function getProjectedBounds(group: Group) {
    const width = canvas.clientWidth || window.innerWidth
    const height = canvas.clientHeight || window.innerHeight
    const projected = cardCorners.map(corner => {
      const point = corner.clone()
      group.localToWorld(point)
      point.project(camera)

      return {
        x: (point.x * 0.5 + 0.5) * width,
        y: (-point.y * 0.5 + 0.5) * height
      }
    })

    const xs = projected.map(point => point.x)
    const ys = projected.map(point => point.y)
    const minX = Math.min(...xs)
    const maxX = Math.max(...xs)
    const minY = Math.min(...ys)
    const maxY = Math.max(...ys)

    return {
      minX,
      maxX,
      minY,
      maxY,
      centerX: (minX + maxX) / 2,
      centerY: (minY + maxY) / 2
    }
  }

  function resolveCardCollisions() {
    const width = canvas.clientWidth || window.innerWidth
    const edgeInset = currentLayout.collisionEdgeInset
    const pushScale = currentLayout.collisionPushScale
    const gap = currentLayout.collisionGap

    for (let pass = 0; pass < 2; pass++) {
      const bounds = cardGroups.map(group => getProjectedBounds(group))

      cardGroups.forEach((group, index) => {
        const overflowLeft = edgeInset - bounds[index].minX
        const overflowRight = bounds[index].maxX - (width - edgeInset)

        if (overflowLeft > 0) {
          group.position.x += Math.min(0.45, (overflowLeft / width) * pushScale)
        }

        if (overflowRight > 0) {
          group.position.x -= Math.min(0.45, (overflowRight / width) * pushScale)
        }
      })

      for (let i = 0; i < cardGroups.length; i++) {
        for (let j = i + 1; j < cardGroups.length; j++) {
          const a = bounds[i]
          const b = bounds[j]
          const overlapX = Math.min(a.maxX, b.maxX) - Math.max(a.minX, b.minX) + gap
          const overlapY = Math.min(a.maxY, b.maxY) - Math.max(a.minY, b.minY)

          if (overlapX <= 0 || overlapY <= 0) continue

          const direction = Math.sign(b.centerX - a.centerX) || Math.sign(j - i) || 1
          const push = Math.min(currentLayoutName === 'mobile' ? 0.18 : 0.32, (overlapX / width) * pushScale)
          const leftWeight = cardGroups[i].userData.isHovered ? 0.22 : 0.5
          const rightWeight = cardGroups[j].userData.isHovered ? 0.22 : 0.5

          cardGroups[i].position.x -= direction * push * leftWeight
          cardGroups[j].position.x += direction * push * rightWeight
        }
      }
    }
  }

  renderer.setPixelRatio(getRendererPixelRatio())
  renderer.autoClear = false
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.18
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFShadowMap
  camera.position.set(0, 0.2, currentLayout.cameraZ)

  const environmentScene = new THREE.Scene()
  environmentScene.background = new THREE.Color(0x05080b)

  const environmentLights = [
    { color: 0x2dd4bf, intensity: 7.5, position: [-4, 1.5, 2] },
    { color: 0x38bdf8, intensity: 5.5, position: [2, 4, 3] },
    { color: 0xf59e0b, intensity: 4.5, position: [5, -1, 2] }
  ]

  environmentLights.forEach(light => {
    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(1.4, 32, 16),
      trackMaterial(new THREE.MeshBasicMaterial({ color: light.color }))
    )
    glow.position.set(light.position[0], light.position[1], light.position[2])
    glow.scale.set(1.9, 0.45, 1)
    environmentScene.add(glow)
  })

  const pmremGenerator = new THREE.PMREMGenerator(renderer)
  scene.environment = pmremGenerator.fromScene(environmentScene, 0.04).texture

  scene.add(new THREE.AmbientLight(0xd7f7ff, 0.62))

  const keyLight = new THREE.DirectionalLight(0xffffff, 4.4)
  keyLight.position.set(3.4, 5.2, 5.5)
  keyLight.castShadow = true
  keyLight.shadow.mapSize.set(768, 768)
  keyLight.shadow.camera.near = 1
  keyLight.shadow.camera.far = 16
  keyLight.shadow.camera.left = -6
  keyLight.shadow.camera.right = 6
  keyLight.shadow.camera.top = 5
  keyLight.shadow.camera.bottom = -5
  scene.add(keyLight)

  const fillLight = new THREE.PointLight(0x2dd4bf, 6.6, 13)
  fillLight.position.set(-4.6, -0.8, 3.6)
  scene.add(fillLight)

  const warmRimLight = new THREE.PointLight(0xf59e0b, 4.8, 12)
  warmRimLight.position.set(5.2, 1.2, 3.4)
  scene.add(warmRimLight)

  const blueSweepLight = new THREE.SpotLight(0x7dd3fc, 8, 18, Math.PI / 5, 0.4, 1.2)
  blueSweepLight.position.set(-3.2, 4.8, 5)
  blueSweepLight.target.position.set(2.6, -0.5, -0.2)
  blueSweepLight.castShadow = true
  blueSweepLight.shadow.mapSize.set(512, 512)
  scene.add(blueSweepLight)
  scene.add(blueSweepLight.target)

  const mouseLight = new THREE.PointLight(0xe6fffb, 0, 7.5, 1.45)
  mouseLight.position.set(-1.5, 0.4, 2.8)
  scene.add(mouseLight)

  const hoverKeyLight = new THREE.SpotLight(0xffffff, 0, 9, Math.PI / 7, 0.5, 1.25)
  hoverKeyLight.position.set(-1.2, 1.1, 3.4)
  hoverKeyLight.target.position.set(-0.7, -0.4, 0)
  hoverKeyLight.castShadow = true
  hoverKeyLight.shadow.mapSize.set(512, 512)
  scene.add(hoverKeyLight)
  scene.add(hoverKeyLight.target)
  const neutralHoverColor = new THREE.Color(0xffffff)
  const neutralMouseColor = new THREE.Color(0xe6fffb)

  const nebulaPath = `/textures/nebula/${heroTextureSet.nebula}`
  const redNebulaTexture = loadNebulaTexture(`${nebulaPath}/colour-2.jpg`)
  const blueNebulaTexture = loadNebulaTexture(`${nebulaPath}/colour-1.jpg`)
  const redNebulaMaterial = trackMaterial(new THREE.MeshBasicMaterial({
    map: redNebulaTexture,
    color: 0xffc0d7,
    transparent: true,
    opacity: 0.4,
    depthWrite: false,
    depthTest: false,
    toneMapped: false
  }))
  const blueNebulaMaterial = trackMaterial(new THREE.MeshBasicMaterial({
    map: blueNebulaTexture,
    color: 0xbcefff,
    transparent: true,
    opacity: 0.6,
    depthWrite: false,
    depthTest: false,
    toneMapped: false
  }))
  const redNebula = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), redNebulaMaterial)
  redNebula.position.set(0.6, 0.7, -9.5)
  redNebula.rotation.z = -0.035
  redNebula.renderOrder = -30
  backgroundScene.add(redNebula)

  const blueNebula = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), blueNebulaMaterial)
  blueNebula.position.set(1.2, 0.35, -7.2)
  blueNebula.rotation.z = 0.025
  blueNebula.renderOrder = -29
  backgroundScene.add(blueNebula)

  function makeRoundStarTexture() {
    const starCanvas = document.createElement('canvas')
    starCanvas.width = 64
    starCanvas.height = 64
    const ctx = starCanvas.getContext('2d')
    if (!ctx) return null

    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    gradient.addColorStop(0, 'rgba(240,253,255,1)')
    gradient.addColorStop(0.28, 'rgba(125,211,252,0.92)')
    gradient.addColorStop(0.68, 'rgba(45,212,191,0.28)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, starCanvas.width, starCanvas.height)

    const texture = new THREE.CanvasTexture(starCanvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.needsUpdate = true
    return trackTexture(texture)
  }

  const roundStarTexture = makeRoundStarTexture()
  const starCount = 980
  const starFieldMinX = -11.5
  const starFieldWidth = 23
  const starGeometry = new THREE.BufferGeometry()
  const starPositions = new Float32Array(starCount * 3)
  const starBaseX = new Float32Array(starCount)
  const starSpeeds = new Float32Array(starCount)
  for (let index = 0; index < starCount; index++) {
    const i = index * 3
    const x = starFieldMinX + Math.random() * starFieldWidth
    starBaseX[index] = x
    starSpeeds[index] = 0.1 + Math.random() * 0.13
    starPositions[i] = x
    starPositions[i + 1] = (Math.random() - 0.5) * 12
    starPositions[i + 2] = -Math.random() * 12
  }
  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
  const starMaterial = trackMaterial(new THREE.PointsMaterial({
    map: roundStarTexture ?? undefined,
    color: 0xe0fbff,
    size: 0.062,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    depthTest: false,
    toneMapped: false
  }))
  const stars = new THREE.Points(
    starGeometry,
    starMaterial
  )
  stars.renderOrder = -20
  backgroundScene.add(stars)

  function makeGlowTexture() {
    const glowCanvas = document.createElement('canvas')
    glowCanvas.width = 128
    glowCanvas.height = 128
    const ctx = glowCanvas.getContext('2d')
    if (!ctx) return null

    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.18, 'rgba(255,255,255,0.82)')
    gradient.addColorStop(0.48, 'rgba(255,255,255,0.24)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, glowCanvas.width, glowCanvas.height)

    const texture = new THREE.CanvasTexture(glowCanvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.needsUpdate = true
    return trackTexture(texture)
  }

  const moteGlowTexture = makeGlowTexture()
  const moteCoreGeometry = new THREE.SphereGeometry(0.028, 12, 8)
  const lightMoteSpecs = [
    { color: 0x7dd3fc, speed: 0.055, offset: 0.02, y: 0.9, z: 2.05, size: 0.54, intensity: 2.9 },
    { color: 0x2dd4bf, speed: 0.043, offset: 0.28, y: 0.16, z: 2.38, size: 0.44, intensity: 2.45 },
    { color: 0xf8fafc, speed: 0.038, offset: 0.53, y: -0.55, z: 1.9, size: 0.36, intensity: 2.25 },
    { color: 0xf59e0b, speed: 0.048, offset: 0.74, y: 0.5, z: 2.62, size: 0.42, intensity: 2.15 },
    { color: 0xbcefff, speed: 0.032, offset: 0.88, y: -0.05, z: 1.72, size: 0.32, intensity: 1.85 }
  ]
  const lightMotes = lightMoteSpecs.map(spec => {
    const group = new THREE.Group()
    const color = new THREE.Color(spec.color)
    const light = new THREE.PointLight(color, spec.intensity, 3.3, 1.7)
    const coreMaterial = trackMaterial(new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0,
      toneMapped: false
    }))
    const core = new THREE.Mesh(
      moteCoreGeometry,
      coreMaterial
    )
    let glowMaterial: InstanceType<typeof THREE.SpriteMaterial> | null = null

    group.add(light)
    group.add(core)

    if (moteGlowTexture) {
      glowMaterial = trackMaterial(new THREE.SpriteMaterial({
        map: moteGlowTexture,
        color,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: true,
        toneMapped: false
      }))
      const glow = new THREE.Sprite(glowMaterial)
      glow.scale.set(spec.size, spec.size, 1)
      group.add(glow)
    }

    group.userData = {
      ...spec,
      light,
      coreMaterial,
      glowMaterial,
      baseIntensity: spec.intensity,
      baseSize: spec.size
    }
    scene.add(group)
    return group
  })

  const tablePaths = makeTexturePaths('table')
  const tableRepeat = 2.05
  const tableMaterial = trackMaterial(new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: loadColorMap(tablePaths.albedo, tableRepeat),
    aoMap: loadDataMap(tablePaths.ao, tableRepeat),
    displacementMap: loadDataMap(tablePaths.height, tableRepeat),
    displacementScale: 0.012,
    metalnessMap: loadDataMap(tablePaths.metallic, tableRepeat),
    normalMap: loadDataMap(tablePaths.normal, tableRepeat),
    normalScale: new THREE.Vector2(1.08, 1.08),
    roughnessMap: loadInvertedSmoothnessMap(tablePaths.smoothness, tableRepeat),
    metalness: 0.36,
    roughness: 0.58,
    envMapIntensity: 0.72
  }))

  const platformGroup = new THREE.Group()
  const platformGlowGroup = new THREE.Group()
  const platformGeometries: Array<InstanceType<typeof THREE.BufferGeometry>> = []
  const platformPulseMaterials: Array<{ opacity: number; userData: { baseOpacity?: number } }> = []
  const platformRadius = 5.05
  const platformY = -2.75
  const platformZ = -1.8

  const platformTopGeometry = new THREE.CircleGeometry(platformRadius, 128)
  const platformBaseGeometry = new THREE.CylinderGeometry(platformRadius, platformRadius * 1.015, 0.18, 128, 1, false)
  const platformRingGeometry = new THREE.TorusGeometry(platformRadius, 0.11, 16, 128)
  platformGeometries.push(platformTopGeometry, platformBaseGeometry, platformRingGeometry)

  const platformTop = new THREE.Mesh(platformTopGeometry, tableMaterial)
  platformTop.rotation.x = -Math.PI / 2
  platformTop.position.y = 0.096
  platformTop.receiveShadow = true
  platformGroup.add(platformTop)

  const platformBase = new THREE.Mesh(
    platformBaseGeometry,
    trackMaterial(new THREE.MeshStandardMaterial({
      color: 0x080c12,
      roughness: 0.34,
      metalness: 0.75,
      envMapIntensity: 1.15
    }))
  )
  platformBase.castShadow = true
  platformBase.receiveShadow = true
  platformGroup.add(platformBase)

  const tableRingPaths = makeTexturePaths('tableRing')
  const tableRingRepeat = 1.6
  const platformRingMaterial = trackMaterial(new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    map: loadColorMap(tableRingPaths.albedo, tableRingRepeat),
    aoMap: loadDataMap(tableRingPaths.ao, tableRingRepeat),
    displacementMap: loadDataMap(tableRingPaths.height, tableRingRepeat),
    displacementScale: 0.006,
    metalnessMap: loadDataMap(tableRingPaths.metallic, tableRingRepeat),
    normalMap: loadDataMap(tableRingPaths.normal, tableRingRepeat),
    normalScale: new THREE.Vector2(0.72, 0.72),
    roughnessMap: loadInvertedSmoothnessMap(tableRingPaths.smoothness, tableRingRepeat),
    roughness: 0.28,
    metalness: 0.86,
    clearcoat: 0.48,
    clearcoatRoughness: 0.18,
    emissive: 0x0f3442,
    emissiveIntensity: 0.22,
    envMapIntensity: 1.55
  }))
  const platformRing = new THREE.Mesh(platformRingGeometry, platformRingMaterial)
  platformRing.rotation.x = Math.PI / 2
  platformRing.position.y = 0.13
  platformGroup.add(platformRing)

  function makePlatformGlowRing(radius: number, tube: number, color: number, opacity: number, y: number) {
    const geometry = new THREE.TorusGeometry(radius, tube, 8, 128)
    platformGeometries.push(geometry)
    const material = trackMaterial(new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false
    }))
    material.userData.baseOpacity = opacity
    platformPulseMaterials.push(material)
    const ring = new THREE.Mesh(geometry, material)
    ring.rotation.x = Math.PI / 2
    ring.position.y = y
    platformGlowGroup.add(ring)
    return ring
  }

  makePlatformGlowRing(platformRadius + 0.03, 0.024, 0x7dd3fc, 0.16, 0.176)
  makePlatformGlowRing(platformRadius - 0.16, 0.018, 0x2dd4bf, 0.1, 0.18)
  makePlatformGlowRing(platformRadius + 0.2, 0.045, 0x38bdf8, 0.055, 0.172)

  function makePlatformStrip(length: number, width: number, color: number, opacity: number) {
    const stripGeometry = new THREE.PlaneGeometry(length, width)
    platformGeometries.push(stripGeometry)
    const material = trackMaterial(new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false
    }))
    material.userData.baseOpacity = opacity
    platformPulseMaterials.push(material)
    const strip = new THREE.Mesh(stripGeometry, material)
    strip.rotation.x = -Math.PI / 2
    strip.position.y = 0.144
    return strip
  }

  function addPlatformLine(axis: 'x' | 'z', offset: number, color: number) {
    const length = Math.sqrt(Math.max(0, platformRadius * platformRadius - offset * offset)) * 2
    const core = makePlatformStrip(length, 0.022, color, 0.56)
    const glow = makePlatformStrip(length, 0.12, color, 0.1)

    if (axis === 'x') {
      core.position.z = offset
      glow.position.z = offset
    } else {
      core.rotation.z = Math.PI / 2
      glow.rotation.z = Math.PI / 2
      core.position.x = offset
      glow.position.x = offset
    }

    platformGlowGroup.add(glow)
    platformGlowGroup.add(core)
  }

  addPlatformLine('x', -2.6, 0x7dd3fc)
  addPlatformLine('x', 0.15, 0xa78bfa)
  addPlatformLine('x', 2.55, 0x2dd4bf)
  addPlatformLine('z', -3.45, 0x2dd4bf)
  addPlatformLine('z', -0.9, 0xc084fc)
  addPlatformLine('z', 2.0, 0x7dd3fc)

  if (moteGlowTexture) {
    const nodePositions = [
      [-3.45, -2.6, 0x7dd3fc],
      [-0.9, 0.15, 0xc084fc],
      [2, 2.55, 0x2dd4bf],
      [2, -2.6, 0x7dd3fc],
      [-3.45, 2.55, 0x2dd4bf]
    ]

    nodePositions.forEach(([x, z, color]) => {
      const material = trackMaterial(new THREE.SpriteMaterial({
        map: moteGlowTexture,
        color,
        transparent: true,
        opacity: 0.26,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: true,
        toneMapped: false
      }))
      material.userData.baseOpacity = 0.26
      platformPulseMaterials.push(material)
      const node = new THREE.Sprite(material)
      node.position.set(x, 0.17, z)
      node.scale.set(0.72, 0.72, 1)
      platformGlowGroup.add(node)
    })
  }

  platformGroup.position.set(2.2, platformY, platformZ)
  platformGroup.scale.set(1.45, 1, 0.68)
  platformGlowGroup.position.set(2.2, platformY, platformZ)
  platformGlowGroup.scale.copy(platformGroup.scale)
  scene.add(platformGroup)
  scene.add(platformGlowGroup)

  function makeLabelTexture(project: typeof featuredProjects[number]) {
    const labelCanvas = document.createElement('canvas')
    labelCanvas.width = 1024
    labelCanvas.height = 384
    const ctx = labelCanvas.getContext('2d')
    if (!ctx) return null

    ctx.clearRect(0, 0, labelCanvas.width, labelCanvas.height)
    ctx.fillStyle = 'rgba(7, 11, 15, 0.92)'
    ctx.fillRect(0, 0, labelCanvas.width, labelCanvas.height)
    ctx.fillStyle = project.accent
    ctx.fillRect(0, 0, 12, labelCanvas.height)
    ctx.fillRect(56, 58, 150, 10)

    ctx.fillStyle = '#f8fafc'
    ctx.font = '700 82px Arial, Helvetica, sans-serif'
    ctx.fillText(project.title, 56, 158)

    ctx.fillStyle = '#cbd5e1'
    ctx.font = '400 40px Arial, Helvetica, sans-serif'
    ctx.fillText(project.label, 56, 226)

    ctx.fillStyle = project.accent
    ctx.font = '700 30px Arial, Helvetica, sans-serif'
    ctx.fillText(project.stack, 56, 304)

    const texture = new THREE.CanvasTexture(labelCanvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.needsUpdate = true
    return texture
  }

  function makeCard(project: typeof featuredProjects[number], index: number) {
    const group = new THREE.Group()
    group.userData.slug = project.slug
    group.userData.index = index

    const accentColor = new THREE.Color(project.accent)
    group.userData.accentColor = accentColor
    const shellPaths = makeTexturePaths('shell')
    const screenPaths = makeTexturePaths('screen')
    const shellMaterial = trackMaterial(new THREE.MeshPhysicalMaterial({
      color: 0x0b1115,
      aoMap: loadDataMap(shellPaths.ao, 1.45),
      displacementMap: loadDataMap(shellPaths.height, 1.45),
      displacementScale: 0.018,
      metalnessMap: loadDataMap(shellPaths.metallic, 1.45),
      normalMap: loadDataMap(shellPaths.normal, 1.45),
      normalScale: new THREE.Vector2(0.22, 0.22),
      roughnessMap: loadInvertedSmoothnessMap(shellPaths.smoothness, 1.45),
      roughness: 0.38,
      metalness: 0.72,
      clearcoat: 0.18,
      clearcoatRoughness: 0.32,
      emissive: accentColor,
      emissiveIntensity: 0.07,
      envMapIntensity: 1.35
    }))
    const screenMaterial = trackMaterial(new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      displacementMap: loadDataMap(screenPaths.height, 1),
      displacementScale: 0.004,
      normalMap: loadDataMap(screenPaths.normal, 1),
      normalScale: new THREE.Vector2(0.05, 0.05),
      roughnessMap: loadInvertedSmoothnessMap(screenPaths.smoothness, 1),
      roughness: 0.24,
      metalness: 0,
      clearcoat: 0.42,
      clearcoatRoughness: 0.2,
      emissive: 0xffffff,
      emissiveIntensity: 0.34,
      envMapIntensity: 1.15,
      toneMapped: false
    }))
    const labelMaterial = screenMaterial.clone()
    labelMaterial.toneMapped = false
    trackMaterial(labelMaterial)
    group.userData.shellMaterial = shellMaterial
    group.userData.displayMaterials = [screenMaterial, labelMaterial]

    const shell = new THREE.Mesh(
      new THREE.BoxGeometry(2.85, 2.18, 0.16, 16, 12, 2),
      shellMaterial
    )
    shell.castShadow = true
    shell.receiveShadow = true
    shell.userData.cardGroup = group
    group.add(shell)
    hitTargets.push(shell)

    const texture = textureLoader.load(project.image, loadedTexture => {
      loadedTexture.colorSpace = THREE.SRGBColorSpace
      loadedTexture.anisotropy = renderer.capabilities.getMaxAnisotropy()
    })
    trackTexture(texture)
    screenMaterial.map = texture
    screenMaterial.emissiveMap = texture
    screenMaterial.needsUpdate = true

    const imagePlane = new THREE.Mesh(
      new THREE.PlaneGeometry(2.54, 1.32, 32, 18),
      screenMaterial
    )
    imagePlane.castShadow = true
    imagePlane.position.set(0, 0.34, 0.091)
    imagePlane.userData.cardGroup = group
    group.add(imagePlane)
    hitTargets.push(imagePlane)

    const labelTexture = makeLabelTexture(project)
    if (labelTexture) {
      trackTexture(labelTexture)
      labelMaterial.map = labelTexture
      labelMaterial.emissiveMap = labelTexture
      labelMaterial.needsUpdate = true

      const labelPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(2.54, 0.72, 32, 10),
        labelMaterial
      )
      labelPlane.castShadow = true
      labelPlane.position.set(0, -0.72, 0.092)
      labelPlane.userData.cardGroup = group
      group.add(labelPlane)
      hitTargets.push(labelPlane)
    }

    const edge = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(2.9, 2.22, 0.18)),
      trackMaterial(new THREE.LineBasicMaterial({
        color: accentColor,
        transparent: true,
        opacity: 0.55
      }))
    )
    group.add(edge)

    scene.add(group)
    cardGroups.push(group)
  }

  featuredProjects.forEach(makeCard)

  function positionCards() {
    const compact = currentLayoutName === 'mobile'

    cardGroups.forEach((group, index) => {
      const [x, y, z] = currentLayout.cardPositions[index]
      group.position.set(x, y, z)
      group.userData.baseX = x
      group.userData.baseY = y
      group.userData.baseZ = z
      group.userData.baseScale = currentLayout.cardScale
      group.userData.baseRotationX = compact ? -0.02 : -0.06
      group.userData.baseRotationY = index === 0 ? 0.1 : index === 2 ? -0.1 : 0
      group.userData.baseRotationZ = index === 1 ? 0 : index === 0 ? -0.035 : 0.035
      group.scale.setScalar(group.userData.baseScale)
      group.rotation.set(
        group.userData.baseRotationX,
        group.userData.baseRotationY,
        group.userData.baseRotationZ
      )
    })
  }

  function coverBackgroundPlane(plane: Mesh, overscan: number) {
    const distance = Math.abs(camera.position.z - plane.position.z)
    const visibleHeight = 2 * Math.tan((camera.fov * Math.PI) / 360) * distance
    const visibleWidth = visibleHeight * camera.aspect
    const nebulaAspect = 16 / 9
    let coverWidth = visibleWidth
    let coverHeight = visibleHeight

    if (coverWidth / coverHeight > nebulaAspect) {
      coverHeight = coverWidth / nebulaAspect
    } else {
      coverWidth = coverHeight * nebulaAspect
    }

    plane.scale.set(coverWidth * overscan, coverHeight * overscan, 1)
  }

  function resize() {
    const width = canvas.clientWidth || window.innerWidth
    const height = canvas.clientHeight || window.innerHeight
    currentLayoutName = getHeroViewportLayout(width)
    currentLayout = heroSceneLayouts[currentLayoutName]
    renderer.setPixelRatio(getRendererPixelRatio())
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.position.z = currentLayout.cameraZ
    camera.updateProjectionMatrix()
    positionCards()
    coverBackgroundPlane(redNebula, 1.55)
    coverBackgroundPlane(blueNebula, 1.48)
  }

  function onPointerMove(event: PointerEvent) {
    const rect = canvas.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    pointer.x = Math.max(-1, Math.min(1, x))
    pointer.y = Math.max(-1, Math.min(1, y))
    pointerIsActive = x >= -1 && x <= 1 && y >= -1 && y <= 1
    pointerOverHeroUi = Boolean((event.target as Element | null)?.closest('.hero-content'))
  }

  function onPointerLeave() {
    pointerIsActive = false
    pointerOverHeroUi = false
    canvas.style.cursor = 'default'
  }

  function onPointerDown() {
    raycaster.setFromCamera(pointer, camera)
    const [hit] = raycaster.intersectObjects(hitTargets)
    const group = hit?.object.userData.cardGroup as Group | undefined
    if (group?.userData.slug) {
      router.push(`/projects/${group.userData.slug}`)
    }
  }

  let pointerIsActive = false
  let pointerOverHeroUi = false
  let heroIsVisible = true
  let documentIsVisible = !document.hidden

  hero.addEventListener('pointermove', onPointerMove)
  hero.addEventListener('pointerleave', onPointerLeave)
  canvas.addEventListener('pointerdown', onPointerDown)
  window.addEventListener('resize', resize)
  resize()

  let frame = 0
  let running = true

  const visibilityObserver = new IntersectionObserver(([entry]) => {
    heroIsVisible = entry.isIntersecting
    updateAnimationState()
  }, { threshold: 0.04 })

  function requestNextFrame() {
    if (frame || !running || !heroIsVisible || !documentIsVisible) return
    frame = window.requestAnimationFrame(animate)
  }

  function updateAnimationState() {
    if (running && heroIsVisible && documentIsVisible) {
      requestNextFrame()
      return
    }

    if (frame) {
      window.cancelAnimationFrame(frame)
      frame = 0
    }
  }

  function onVisibilityChange() {
    documentIsVisible = !document.hidden
    updateAnimationState()
  }

  document.addEventListener('visibilitychange', onVisibilityChange)
  visibilityObserver.observe(hero)

  function animate() {
    frame = 0
    if (!running || !heroIsVisible || !documentIsVisible) return
    const time = performance.now() * 0.001

    raycaster.setFromCamera(pointer, camera)
    const canHitCards = pointerIsActive && !pointerOverHeroUi
    const [hovered] = canHitCards ? raycaster.intersectObjects(hitTargets) : []
    const hoveredGroup = hovered?.object.userData.cardGroup as Group | undefined
    const hoveredIndex = hoveredGroup?.userData.index as number | undefined
    canvas.style.cursor = hoveredGroup ? 'pointer' : 'default'
    const pointerIsInsideCanvas = pointerIsActive
    parallaxPointer.x = lerp(parallaxPointer.x, pointerIsActive ? pointer.x : 0, 0.08)
    parallaxPointer.y = lerp(parallaxPointer.y, pointerIsActive ? pointer.y : 0, 0.08)

    if (pointerIsInsideCanvas && raycaster.ray.direction.z !== 0) {
      const distanceToCardPlane = (0.4 - raycaster.ray.origin.z) / raycaster.ray.direction.z
      pointerWorld.copy(raycaster.ray.origin).addScaledVector(raycaster.ray.direction, distanceToCardPlane)
      mouseLight.position.lerp(
        hoverLightPosition.set(pointerWorld.x, pointerWorld.y + 0.32, 2.75),
        0.16
      )
    }

    if (hoveredGroup) {
      hoveredGroup.getWorldPosition(hoverWorld)
      hoverKeyLight.position.lerp(
        hoverLightPosition.set(hoverWorld.x - 0.45, hoverWorld.y + 0.95, hoverWorld.z + 3.1),
        0.14
      )
      hoverKeyLight.target.position.lerp(hoverWorld, 0.18)
      const accentColor = hoveredGroup.userData.accentColor as InstanceType<typeof THREE.Color> | undefined
      if (accentColor) {
        hoverKeyLight.color.lerp(accentColor, 0.1)
        mouseLight.color.lerp(accentColor, 0.08)
      }
    } else if (pointerIsInsideCanvas) {
      hoverKeyLight.position.lerp(hoverLightPosition.set(pointerWorld.x - 0.4, pointerWorld.y + 0.9, 3.2), 0.08)
      hoverKeyLight.target.position.lerp(pointerWorld, 0.08)
      hoverKeyLight.color.lerp(neutralHoverColor, 0.08)
      mouseLight.color.lerp(neutralMouseColor, 0.08)
    }

    mouseLight.intensity = lerp(mouseLight.intensity, pointerIsInsideCanvas ? 2.4 : 0, 0.12)
    hoverKeyLight.intensity = lerp(hoverKeyLight.intensity, hoveredGroup ? 8.4 : 0, 0.12)
    blueSweepLight.target.position.lerp(pointerIsInsideCanvas ? pointerWorld : hoverLightPosition.set(2.6, -0.5, -0.2), 0.06)

    stars.rotation.x = Math.sin(time * 0.08) * 0.018
    stars.rotation.y = time * 0.035
    stars.position.x = Math.sin(time * 0.055) * 0.18 - parallaxPointer.x * 0.06
    stars.position.y = Math.cos(time * 0.05) * 0.08 + parallaxPointer.y * 0.04
    const starPositionAttribute = starGeometry.getAttribute('position')
    for (let index = 0; index < starCount; index++) {
      const wrappedX = (starBaseX[index] - starFieldMinX + time * starSpeeds[index]) % starFieldWidth
      starPositions[index * 3] = starFieldMinX + wrappedX
    }
    starPositionAttribute.needsUpdate = true
    starMaterial.opacity = 0.84 + Math.sin(time * 1.4) * 0.12
    redNebula.position.x = 0.6 + Math.sin(time * 0.045) * 0.18 - parallaxPointer.x * 0.08
    redNebula.position.y = 0.7 + Math.cos(time * 0.035) * 0.08 + parallaxPointer.y * 0.05
    blueNebula.position.x = 1.2 + Math.sin(time * 0.085) * 0.34 - parallaxPointer.x * 0.22
    blueNebula.position.y = 0.35 + Math.cos(time * 0.06) * 0.16 + parallaxPointer.y * 0.12
    blueNebula.rotation.z = 0.025 + Math.sin(time * 0.05) * 0.012
    platformGlowGroup.position.z = platformZ + Math.sin(time * 0.45) * 0.055
    platformPulseMaterials.forEach((material, index) => {
      const baseOpacity = material.userData.baseOpacity ?? 0.2
      material.opacity = baseOpacity * (0.76 + Math.sin(time * 1.8 + index * 0.62) * 0.24)
    })
    platformRingMaterial.emissiveIntensity = 0.2 + Math.sin(time * 1.35) * 0.06

    lightMotes.forEach((mote, index) => {
      const pathWidth = currentLayout.motePathWidth
      const startX = currentLayout.moteStartX
      const phase = (time * mote.userData.speed + mote.userData.offset) % 1
      const loop = phase < 0 ? phase + 1 : phase
      const wave = time * 1.35 + index * 1.9
      const light = mote.userData.light as InstanceType<typeof THREE.PointLight>
      const coreMaterial = mote.userData.coreMaterial as { opacity: number }
      const glowMaterial = mote.userData.glowMaterial as { opacity: number } | null
      const fadeIn = smoothstep(0.05, 0.2, loop)
      const fadeOut = 1 - smoothstep(0.78, 0.96, loop)
      const visibility = fadeIn * fadeOut
      const pulse = 0.78 + Math.sin(time * 2.8 + index * 0.85) * 0.22
      const glowScale = mote.userData.baseSize * (0.58 + visibility * 0.42) * (0.88 + pulse * 0.18)

      mote.position.set(
        startX + loop * pathWidth,
        mote.userData.y + Math.sin(wave) * currentLayout.moteWaveY,
        mote.userData.z + Math.cos(wave * 0.72) * 0.22
      )
      mote.scale.setScalar(0.72 + visibility * pulse * 0.32)
      light.intensity = mote.userData.baseIntensity * pulse * visibility
      coreMaterial.opacity = 0.92 * visibility
      if (glowMaterial) {
        glowMaterial.opacity = 0.58 * visibility
      }

      const glow = mote.children.find(child => child.type === 'Sprite')
      glow?.scale.set(glowScale, glowScale, 1)
    })

    cardGroups.forEach((group, index) => {
      const isHovered = index === hoveredIndex
      const hasHover = hoveredIndex !== undefined
      const directionFromHovered = hasHover ? Math.sign(index - hoveredIndex) : 0
      const compact = currentLayoutName === 'mobile'
      const sidePush = currentLayout.cardPush
      const hoveredPull = isHovered && index === 0 ? (compact ? 0.12 : 0.28) : isHovered && index === 2 ? (compact ? -0.12 : -0.34) : 0
      const targetX = group.userData.baseX + (isHovered ? hoveredPull : directionFromHovered * sidePush)
      const targetY = group.userData.baseY + (isHovered ? 0.14 : hasHover ? -0.22 : 0) + Math.sin(time + index * 1.7) * 0.055
      const targetZ = group.userData.baseZ + (isHovered ? 1.22 : hasHover ? -0.62 : 0)
      const targetScale = group.userData.baseScale * (isHovered ? 1.16 : hasHover ? 0.9 : 1)
      const targetRotationX = group.userData.baseRotationX + (isHovered ? parallaxPointer.y * -0.045 : parallaxPointer.y * -0.02)
      const targetRotationY = group.userData.baseRotationY + (isHovered ? parallaxPointer.x * 0.08 : parallaxPointer.x * 0.03)
      const targetRotationZ = isHovered ? 0 : group.userData.baseRotationZ

      group.position.x = lerp(group.position.x, targetX, 0.08)
      group.position.y = lerp(group.position.y, targetY, 0.08)
      group.position.z = lerp(group.position.z, targetZ, 0.1)
      group.userData.isHovered = isHovered
      group.renderOrder = isHovered ? 10 : index
      const shellMaterial = group.userData.shellMaterial as { emissiveIntensity: number } | undefined
      const displayMaterials = group.userData.displayMaterials as Array<{ emissiveIntensity: number }> | undefined

      if (shellMaterial) {
        shellMaterial.emissiveIntensity = lerp(shellMaterial.emissiveIntensity, isHovered ? 0.22 : 0.09, 0.08)
      }

      displayMaterials?.forEach(material => {
        material.emissiveIntensity = lerp(material.emissiveIntensity, isHovered ? 0.72 : 0.34, 0.08)
      })

      const easedScale = lerp(group.scale.x, targetScale, 0.08)
      group.scale.setScalar(easedScale)
      group.rotation.x = lerp(group.rotation.x, targetRotationX, 0.06)
      group.rotation.y = lerp(group.rotation.y, targetRotationY, 0.06)
      group.rotation.z = lerp(group.rotation.z, targetRotationZ, 0.06)
    })

    resolveCardCollisions()

    renderer.clear()
    renderer.render(backgroundScene, camera)
    renderer.clearDepth()
    renderer.render(scene, camera)
    renderedFrameCount += 1
    revealHeroScene()
    requestNextFrame()
  }

  requestNextFrame()

  cleanupHeroScene = () => {
    running = false
    if (frame) window.cancelAnimationFrame(frame)
    window.clearTimeout(fallbackRevealTimer)
    if (revealTimer) window.clearTimeout(revealTimer)
    hero.removeEventListener('pointermove', onPointerMove)
    hero.removeEventListener('pointerleave', onPointerLeave)
    canvas.removeEventListener('pointerdown', onPointerDown)
    window.removeEventListener('resize', resize)
    document.removeEventListener('visibilitychange', onVisibilityChange)
    visibilityObserver.disconnect()
    renderer.dispose()
    pmremGenerator.dispose()
    starGeometry.dispose()
    moteCoreGeometry.dispose()
    scene.environment?.dispose()
    redNebula.geometry.dispose()
    blueNebula.geometry.dispose()
    platformGeometries.forEach(geometry => geometry.dispose())
    disposableTextures.forEach(texture => texture.dispose())
    disposableMaterials.forEach(material => material.dispose())
    hitTargets.forEach(mesh => {
      mesh.geometry.dispose()
    })
  }
})
</script>

<template>
  <section
    ref="heroRef"
    class="hero"
    :class="{ 'hero--ready': heroSceneReady }"
    aria-labelledby="hero-title"
  >
    <canvas ref="canvasRef" class="hero-canvas" aria-hidden="true" />

    <div
      class="hero-loader"
      :class="{ 'hero-loader--hidden': heroSceneReady }"
      :aria-hidden="heroSceneReady ? 'true' : 'false'"
      role="status"
    >
      <div class="hero-loader-panel">
        <span class="hero-loader-kicker">pdsystems.dev</span>
        <span class="hero-loader-title">Loading systems</span>
        <span class="hero-loader-track" aria-hidden="true">
          <span />
        </span>
      </div>
    </div>

    <div class="hero-content">
      <p class="eyebrow">Self-hosted systems, creative tools, and engine work</p>
      <h1 id="hero-title">Peter Deacon - Building practical software, tools, and systems.</h1>
      <p class="intro">
        Full-stack developer working across Flask, HTMX, Nuxt, Docker, Caddy, and C++ rendering systems.
      </p>

      <div class="hero-stats" aria-label="Portfolio highlights">
        <span>Live web apps</span>
        <span>Docker deployment</span>
        <span>C++ engines</span>
      </div>

      <div class="actions">
        <a href="#projects" class="btn primary">View Projects</a>
        <a href="#about" class="btn">About Me</a>
        <a href="https://github.com/rageypeep" target="_blank" rel="noopener noreferrer" class="btn">GitHub</a>
      </div>
    </div>
  </section>
</template>
