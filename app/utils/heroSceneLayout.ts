export type HeroViewportLayout = 'mobile' | 'tablet' | 'midDesktop' | 'desktop' | 'wide'

export type HeroSceneLayout = {
  cameraZ: number
  cardScale: number
  cardPositions: [number, number, number][]
  cardPush: number
  collisionGap: number
  collisionPushScale: number
  collisionEdgeInset: number
  motePathWidth: number
  moteStartX: number
  moteWaveY: number
  pixelRatioCap: number
}

export const heroSceneLayouts: Record<HeroViewportLayout, HeroSceneLayout> = {
  mobile: {
    cameraZ: 9.8,
    cardScale: 0.46,
    cardPositions: [
      [-1.42, -1.98, 0],
      [0, -1.36, -0.32],
      [1.42, -1.98, 0]
    ],
    cardPush: 0.42,
    collisionGap: 8,
    collisionPushScale: 2.5,
    collisionEdgeInset: 6,
    motePathWidth: 6.8,
    moteStartX: -3.4,
    moteWaveY: 0.1,
    pixelRatioCap: 1.45
  },
  tablet: {
    cameraZ: 10,
    cardScale: 0.5,
    cardPositions: [
      [0.95, -2.02, 0],
      [2.55, -1.5, -0.3],
      [4.05, -2.02, 0]
    ],
    cardPush: 0.5,
    collisionGap: 12,
    collisionPushScale: 2.9,
    collisionEdgeInset: 10,
    motePathWidth: 8.2,
    moteStartX: -4.1,
    moteWaveY: 0.12,
    pixelRatioCap: 1.5
  },
  midDesktop: {
    cameraZ: 9.35,
    cardScale: 0.68,
    cardPositions: [
      [1.28, -0.92, 0],
      [3.48, -0.92, -0.18],
      [5.58, -0.92, 0]
    ],
    cardPush: 0.74,
    collisionGap: 24,
    collisionPushScale: 3.9,
    collisionEdgeInset: 24,
    motePathWidth: 10.4,
    moteStartX: -4.7,
    moteWaveY: 0.16,
    pixelRatioCap: 1.6
  },
  desktop: {
    cameraZ: 8.85,
    cardScale: 0.78,
    cardPositions: [
      [0.72, -0.62, 0],
      [3.16, -0.62, -0.08],
      [5.5, -0.62, 0]
    ],
    cardPush: 0.92,
    collisionGap: 34,
    collisionPushScale: 4.4,
    collisionEdgeInset: 28,
    motePathWidth: 11.6,
    moteStartX: -4.8,
    moteWaveY: 0.18,
    pixelRatioCap: 1.75
  },
  wide: {
    cameraZ: 8.4,
    cardScale: 0.9,
    cardPositions: [
      [-0.18, -0.48, 0],
      [2.42, -0.48, 0],
      [4.98, -0.48, 0]
    ],
    cardPush: 1.08,
    collisionGap: 42,
    collisionPushScale: 4.8,
    collisionEdgeInset: 30,
    motePathWidth: 12.4,
    moteStartX: -4.6,
    moteWaveY: 0.18,
    pixelRatioCap: 1.75
  }
}

export function getHeroViewportLayout(width: number): HeroViewportLayout {
  if (width < 760) return 'mobile'
  if (width < 1100) return 'tablet'
  if (width < 1500) return 'midDesktop'
  if (width < 1800) return 'desktop'
  return 'wide'
}
