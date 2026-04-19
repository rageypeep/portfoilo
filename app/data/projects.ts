export const projects = [
  {
    title: 'ChromaForge',
    description: 'A PBR texture pipeline tool with AI integration, designed to make material creation faster, smoother and more user-friendly.',
    link: 'https://chromaforge.duckdns.org/',
    type: 'webapp',
    tech: ['Python', 'Flask', 'Three.js', 'Texture Generation', 'HTMX', 'AI Integration'],
    slug: 'chromaforge',
    content: [
        'ChromaForge is a PBR texture pipeline tool focused on speeding up material creation while keeping the workflow friendly and approachable.',
        'It combines AI-assisted generation with a polished interface and practical tooling for building texture sets.',
        'The project puts a lot of emphasis on usability, not just technical output.',
        'It was a rewarding project that allowed me to explore the intersection of AI and creative tools, while also focusing on user experience and practical features for artists.',
        'Overall, ChromaForge is a project that reflects my passion for both technical development and creative tools, and it was a great opportunity to experiment with new technologies while building something useful and enjoyable to use.',
        'It came from a need of a quick and easy way to generate textures for my game projects in Unity, and it was a fun challenge to build a tool that could handle that workflow while also being enjoyable to use.',
        "This project evolved from an earlier tool called Texture Map Generator, which explored procedural PBR map creation in Python before being reworked into a more performant and feature-rich system."    
    ],
    hero: '/images/chromaforge-hero.png',
    video: '/videos/chromaforge.mp4',
    caption: 'Live workflow demo showing material preview and map controls',
    seoDescription: 'ChromaForge is a Flask, HTMX and Three.js PBR texture workflow tool for AI-assisted material creation and real-time previewing.',
    caseStudy: [
      {
        label: 'Problem',
        title: 'Texture work needed a faster loop',
        body: 'The original Python prototype proved the idea, but real-time previewing and iteration were too slow for a practical creative workflow. ChromaForge reframed the tool as a web app where generation, map controls, and previewing sit in one focused interface.'
      },
      {
        label: 'Approach',
        title: 'Server-driven controls with a real-time preview',
        body: 'The app keeps the core workflow simple: Flask handles the backend, HTMX keeps interface updates light, and Three.js gives the user an immediate material preview without turning the whole product into a heavy SPA.'
      },
      {
        label: 'Result',
        title: 'A better foundation for creative tooling',
        body: 'The rebuild moved the project away from a useful script and toward a maintainable product: clearer controls, better feedback, a stronger visual pipeline, and room to keep improving map generation quality.'
      }
    ],
    architecture: {
      title: 'ChromaForge material pipeline',
      description: 'A server-rendered creative tool with AI-assisted generation, map processing, and an interactive Three.js material preview.',
      nodes: [
        { label: 'Prompt + controls', detail: 'User input, presets, map options, and generation settings.' },
        { label: 'Flask workflow', detail: 'Coordinates requests, file handling, and texture processing steps.' },
        { label: 'Texture outputs', detail: 'Albedo, roughness, normal, height, and supporting PBR maps.' },
        { label: 'Three.js preview', detail: 'Material updates are inspected in-browser before export or reuse.' }
      ],
      flows: [
        'HTMX keeps controls fast without forcing a large client-side state model.',
        'The preview loop exposes quality issues early, before the texture set is treated as finished.',
        'The project evolved directly from the Texture Map Generator prototype.'
      ]
    },
    features: [
    'AI-assisted texture generation',
    'PBR material pipeline workflow',
    'Real-time preview with Three.js',
    'User-focused interface design'
    ],
    challenges: [
      'Balancing AI output quality with usability',
      'Designing a workflow that feels intuitive rather than technical',
      'Handling real-time preview performance in the browser'
    ]

  },
  {
    title: 'JotSpot',
    description: 'A fast note-sharing web app focused on simple publishing and clean writing.',
    link: 'https://jotspot.io/',
    type: 'webapp',
    tech: ['Python', 'Flask', 'HTMX', 'PostgreSQL', 'Publishing', 'Notes', 'Auto-saving'],
    slug: 'jotspot',
    content: [
        'JotSpot is a web app for sharing notes quickly and easily.',
        'It emphasizes a clean writing experience with minimal distractions, while providing practical features like auto-saving and simple publishing.',
        'The project was a fun experiment in building a focused web app with a strong emphasis on user experience and simplicity.',
        'Overall, it was a rewarding project that allowed me to explore web development with a focus on writing and sharing content in a streamlined way.',
        'Extra attention was given to page loading times and smooth interactions, with the goal of making jotting down and sharing notes as fast and seamless as possible.',
        "JotSpot evolved from an earlier full-stack prototype called Simple Pages, where the core ideas of user-owned content and frictionless publishing were first explored.",

    ],
    hero: '/images/jotspot-hero.png',
    seoDescription: 'JotSpot is a Flask, HTMX and PostgreSQL note publishing platform with auto-save, public sharing, comments, likes, and CLI publishing.',
    caseStudy: [
      {
        label: 'Problem',
        title: 'Publishing notes should not feel like managing a CMS',
        body: 'JotSpot focuses on reducing friction: open the editor, write, auto-save, publish, and share. The product direction came from learning where the earlier Simple Pages prototype felt too heavy for a writing-first tool.'
      },
      {
        label: 'Approach',
        title: 'Server-rendered interaction instead of SPA overhead',
        body: 'Flask owns routing, persistence, authentication, and permissions, with PostgreSQL storing user-owned notes, metadata, comments, and publishing state. HTMX is used where the interface needs to update quickly, such as previews, saving states, and smaller interaction loops.'
      },
      {
        label: 'Result',
        title: 'A focused publishing system with useful developer edges',
        body: 'The CLI path and developer options make it more than a basic note app: it can support terminal workflows, logs, API-style publishing, and quick sharing without losing the clean writing experience.'
      }
    ],
    architecture: {
      title: 'JotSpot publishing flow',
      description: 'A Flask, HTMX and PostgreSQL publishing system built around low-friction writing, auto-save, public discovery, and optional CLI workflows.',
      nodes: [
        { label: 'Editor', detail: 'Markdown writing, preview, and auto-save feedback.' },
        { label: 'Flask app', detail: 'Routes, auth, permissions, pages, comments, and publishing logic.' },
        { label: 'PostgreSQL', detail: 'User-owned jots, metadata, likes, comments, and API tokens.' },
        { label: 'Public + CLI', detail: 'Shared pages, explore views, and terminal publishing paths.' }
      ],
      flows: [
        'Auto-save keeps the writing loop fast while Flask remains the source of truth.',
        'The CLI gives the system a practical path for logs, automation, and developer workflows.',
        'The product is the cleaner rebuild of ideas first explored in Simple Pages.'
      ]
    },
    features: [
      'Instant saving and live updates',
      'CLI Interface leting you push logs from command line',
      'Publish content for others to read, like and comment',
      'Share jots with ease, with one click links'

    ],
    challenges: [
      'Designing a fast and fluid user experience',
      'Creating a auto-save feature that supports a number of users at once',
      'Making a user management system with admin controls'
    ],
    timeline: [
      {
        image: '/images/screenshots/jotspot/jotspot-1.png',
        title: '01 — The Welcome Page',
        caption: 'The first thing a user sees when they visit the site, with a simple and clean design that encourages them to start jotting down their thoughts and sharing them with others.'
      },
      {
        image: '/images/screenshots/jotspot/jotspot-2.png',
        title: '02 — Making a Jot',
        caption: 'The interface for creating and editing notes, with a focus on providing a smooth and intuitive writing experience, supporting Markdown and with a live preview, the site auto saves after 100ms of inactivity.'
      },
      {
        image: '/images/screenshots/jotspot/jotspot-3.png',
        title: '03 — The Explore Page',
        caption: 'This page allows users to browse and discover notes shared by others, with filtering and search capabilities to find relevant content quickly. Jots are scored based on a like to dislike ratio, making it easy to find popular and well-received content.'
      },
      {
        image: '/images/screenshots/jotspot/jotspot-4.png',
        title: '04 — CLI Options',
        caption: 'Command-line interface options for pushing logs and managing content directly from the terminal. This allows for quick and easy content creation without needing to navigate the web interface, making it ideal for users who prefer working in a terminal environment or want to automate content creation through scripts.'
      },
      {
        image: '/images/screenshots/jotspot/jotspot-5.png',
        title: '05 — User Settings',
        caption: 'Here users can manage their account settings, with optional developer options for API access and CLI token management, giving users more control over how they interact with the platform and integrate it into their workflows.'
      },
    ],
  },
  {
    title: 'rageypeep.gg',
    description: "A custom-built gaming platform for tracking playthroughs, reviews and automatically generating game pages from live data.",
    link: 'https://rageypeep.gg/',
    type: 'webapp',
    tech: ['Python', 'Flask', 'HTMX', 'Steam API', 'Auto-build', 'Cronjobs'],
    slug: 'rageypeep',
    hero: '/images/rageypeep-hero.png',
    video: '/videos/rageypeep.mp4',
    caption: 'A demo of the rageypeep.gg platform, showcasing automatic game page generation, custom content and dynamic updates.',
    seoDescription: 'rageypeep.gg is a self-hosted Flask and HTMX gaming platform using Steam API data, cron jobs, admin tools, and generated game pages.',
    caseStudy: [
      {
        label: 'Problem',
        title: 'A game log needed automation and manual control',
        body: 'The goal was to avoid hand-building every game page while still allowing custom pages, screenshots, reviews, and notes. Steam data provides the seed, while the admin tools keep the final result editable.'
      },
      {
        label: 'Approach',
        title: 'Live data feeds into a server-rendered content system',
        body: 'The app uses Steam authentication and API data to generate structured pages, then relies on Flask, HTMX, and admin workflows to refine content without requiring a complex client application.'
      },
      {
        label: 'Result',
        title: 'A self-hosted content platform for a real hobby workflow',
        body: 'rageypeep.gg became a practical example of the wider stack: external APIs, scheduled background jobs, admin tooling, generated content, custom theming, Docker deployment, and live maintenance.'
      }
    ],
    architecture: {
      title: 'rageypeep.gg data loop',
      description: 'A self-hosted Flask platform that turns Steam activity into generated game pages, then lets the admin layer refine the result.',
      nodes: [
        { label: 'Steam login + API', detail: 'Authentication, owned games, recent activity, and source metadata.' },
        { label: 'Cron sync', detail: 'Scheduled refresh jobs update activity and detect useful changes.' },
        { label: 'Flask admin', detail: 'Content editing, page generation, theme controls, and manual overrides.' },
        { label: 'Game pages', detail: 'Published reviews, screenshots, notes, and generated layouts.' }
      ],
      flows: [
        'Automation creates the first pass, but the admin tools keep the pages personal.',
        'HTMX partials support dynamic admin actions without turning the app into a SPA.',
        'The system runs as part of the same Docker and Caddy self-hosted environment as the portfolio.'
      ]
    },
    content: [
      "rageypeep.gg is a custom-built web application designed to track playthroughs, reviews and personal game logs, combining automation with flexible content creation.",

      "The platform integrates with the Steam API to retrieve owned games and recent activity, allowing new game pages to be generated automatically with relevant data such as titles, descriptions and playtime.",

      "Each game page can then be extended with custom content, including screenshots, notes and structured layouts, giving a balance between automation and manual control.",

      "The site is built using Flask and HTMX, focusing on a server-rendered approach with dynamic updates rather than relying on heavy frontend frameworks. This keeps the application fast, simple and maintainable while still allowing interactive features.",

      "The system also includes an admin interface for managing content, triggering updates and handling background processes such as refreshing Steam activity data.",

      "rageypeep.gg is hosted and maintained on a self-managed server, forming part of a wider personal infrastructure for deploying and running web applications in a live environment."
    ],
    features: [
      "Automatic game page generation using Steam API data",
      "Customisable game pages with screenshots and structured content",
      "Server-rendered dynamic interface using Flask and HTMX",
      "Admin tools for managing content and triggering updates",
      "Background processes for refreshing and syncing game data",
      "Self-hosted deployment on a managed server environment"
    ],
    challenges: [
      "Integrating external API data into a structured content system",
      "Balancing automated page generation with manual customisation",
      "Designing a flexible content model for different types of game pages",
      "Handling background updates and data refresh without interrupting the user experience",
      "Managing deployment, hosting and performance on a self-hosted server"
    ],
    timeline: [
      {
        image: '/images/screenshots/rageypeep/rageypeep-1.png',
        title: '01 — Login via Steam',
        caption: 'The login page, which uses the Steam OpenID system to authenticate users and retrieve their game data for automatic page generation.'
      },
      {
        image: '/images/screenshots/rageypeep/rageypeep-2.png',
        title: '02 — Showing the Admin Dashboard',
        caption: 'Info regarding hourly cronjobs, with the latest Steam activity and quick links to manage content and trigger updates.'
      },
      {
        image: '/images/screenshots/rageypeep/rageypeep-3.png',
        title: '03 — The New Game Page',
        caption: 'Taking product information and generating a new game page. The page is generated with the relevant data from the Steam API, including title, description and playtime, which can then be extended with custom content and screenshots.'
      },
      {
        image: '/images/screenshots/rageypeep/rageypeep-4.png',
        title: '04 — The Theme Editor',
        caption: 'A simple interface for changing the styling of the site, with live preview and the ability to create and manage multiple themes. This allows for quick visual updates without needing to redeploy or change code. Includes HTMX partials for different components, making it easy to update the look and feel of the site on the fly.'
      },
      {
        image: '/images/screenshots/rageypeep/rageypeep-5.png',
        title: '05 — Select or make your own Game Banner',
        caption: 'Take the game banner from Steam assets or upload your own. This allows for more control over the visual presentation of each game page, while still providing a quick option to use existing assets from Steam.'
      },
    ],

  },
  {
    title: 'Ultima Props',
    description: 'A custom-built e-commerce platform with a full admin backend, product management and flexible shipping logic.',
    link: 'https://ultimaprops.shop/',
    type: 'webapp',
    tech: ['Python', 'Flask', 'HTMX', 'Stripe API', 'Custom CMS'],
    slug: 'ultimaprops',
    status: "In Development / Demo",
    hero: '/images/props-hero.png',
    content: [
      "Ultima Props is a custom-built e-commerce platform designed to handle both physical and digital products, with a focus on flexibility and control over the entire system.",

      "The project includes a full admin backend for managing products, categories and orders, built using Flask and HTMX to provide a dynamic interface without relying on heavy frontend frameworks.",

      "Each product supports its own shipping cost, with additional logic for discounts and thresholds, allowing more granular control than typical fixed-rate systems.",

      "The platform was designed to be reusable, with the goal of adapting it for multiple shops by changing styling and content while keeping the core functionality consistent.",

      "Although the current live version is in a development/demo state, the underlying system demonstrates a complete end-to-end e-commerce workflow, including product management, pricing logic and user interaction."
    ],
    features: [
      "Custom admin dashboard for product and category management",
      "Support for both physical and digital products",
      "Flexible shipping logic with per-product pricing",
      "Dynamic interface using Flask and HTMX",
      "Reusable platform design for multiple storefronts"
    ],
    timeline: [
    {
      image: '/images/screenshots/props/props-1.png',
      title: '01 — Showing the Home page',
      caption: 'Showing the home page.'
    },
    {
      image: '/images/screenshots/props/props-2.png',
      title: '02 — Showing the Shop page',
      caption: 'Items listed on the shop page on titdy cards.'
    },
    {
      image: '/images/screenshots/props/props-3.png',
      title: '03 — A product page',
      caption: 'Showing the product, with clear pricing and photos which can be easily updated from the admin panel.'
    },
    {
      image: '/images/screenshots/props/props-4.png',
      title: '04 — The Admin Dashboard',
      caption: 'Immidiately see the products and orders, with quick links to manage them and keep track of new orders as they come in.'
    },
    {
      image: '/images/screenshots/props/props-5.png',
      title: '05 — The New Product Form',
      caption: 'Lets the user add a new product, physical or digital, with all the relevant information and shipping cost, which is then automatically added to the shop page and available for purchase without any additional work needed.'
    },
    {
      image: '/images/screenshots/props/props-6.png',
      title: '06 — Accounting and Orders',
      caption: 'Full accounts page showing all orders, with details and totals, making it easy to keep track of sales and manage the business side of things.'
    },
    {
      image: '/images/screenshots/props/props-7.png',
      title: '07 — Stripe Payment Integration',
      caption: 'The checkout page, which securely collects payment information and processes orders through Stripe, with support for both one-time purchases and digital downloads.'
    },
    {
      image: '/images/screenshots/props/props-8.png',
      title: '08 — Payment confirmation and Order Management',
      caption: 'Order has been made and will be waiting in the admin dashboard, with all the relevant information and payment confirmation, ready to be fulfilled by the shop owner.'
    },
    {
      image: '/images/screenshots/props/props-9.png',
      title: '09 — Digital Download Management',
      caption: 'On completion of payment for a digital product, the user is given access to a secure download link, which can be managed and monitored from the admin dashboard, ensuring a smooth experience for both the customer and the shop owner.'
    },
  ],
  },
  {
    title: 'Planetary Voxel Engine',
    description: 'A voxel-based planetary engine built in C++ with DirectX 12, featuring procedural spherical worlds, chunk streaming and real-time terrain deformation.',
    type: 'engine',
    tech: ['C++', 'DirectX 12', 'Procedural Generation', 'Chunk Streaming', '3D Graphics', 'Voxel Manipulation'],
    slug: 'minecraft-in-space',
    challenges: [
      'My first time working with DirectX 12, which was a steep learning curve in terms of understanding the graphics pipeline and low-level rendering concepts',
      'Adapting voxel systems designed for flat worlds to work on a spherical surface',
      'Managing chunk streaming efficiently while maintaining seamless transitions',
      'Handling terrain deformation across chunk boundaries without visual artifacts',
      'Balancing CPU mesh generation with GPU rendering performance',
      'Designing coordinate systems that remain stable across a curved world'
    ],
    learning: [
      'Deeper understanding of spatial transformations and coordinate systems',
      'Practical experience with DirectX 12 and low-level rendering pipelines',
      'Techniques for managing large procedural datasets in real time',
      'The importance of balancing flexibility, performance and complexity in engine design'
    ],
    content: [
      'This project started as a simple question: what if Minecraft-style voxel worlds were built on a fully spherical planet instead of a flat grid? That idea quickly evolved into a full custom engine focused on solving the technical challenges of planetary voxel rendering.',
      
      'At its core, the engine handles procedurally generated spherical worlds, where traditional voxel assumptions break down. Instead of a flat coordinate system, the terrain is mapped across a curved surface, requiring careful handling of chunk positioning, coordinate transformations and level-of-detail management.',
      
      'The system implements chunk streaming to dynamically load and unload sections of the planet based on player position. This allows large-scale worlds to be explored without overwhelming memory or performance, while still maintaining real-time responsiveness.',
      
      'Terrain deformation is fully supported, allowing the player to modify the surface in real time. This required handling updates across chunk boundaries and ensuring mesh consistency while maintaining performance.',
      
      'Rendering is handled through a custom DirectX 12 pipeline, giving fine-grained control over performance and resource management. The project explores low-level graphics concepts such as GPU memory usage, batching, and efficient mesh generation.',
      
      'This project is less about building a game and more about exploring engine-level problems: how to represent curved voxel worlds, how to stream and update large datasets efficiently, and how to maintain performance in a dynamic environment.'
    ],
    hero: '/images/mc-space-hero.jpg',
    video: '/videos/mcs.mp4',
    caption: 'A play test demo of the planetary voxel engine, showcasing terrain deformation, chunk streaming and real-time rendering.',
    timeline: [
  {
    image: '/images/screenshots/mcs/mc-space-01.jpg',
    title: '01 — Curved planetary tests',
    caption: 'First experiments wrapping voxel terrain onto a curved planetary surface.'
  },
  {
    image: '/images/screenshots/mcs/mc-space-02.jpg',
    title: '02 — Grass and Mud',
    caption: 'The beginning of biome generation.'
  },
  {
    image: '/images/screenshots/mcs/mc-space-03.jpg',
    title: '03 — Stone and Terrain Deformation',
    caption: 'Real-time terrain editing with chunk updates and mesh regeneration.'
  },
  {
    image: '/images/screenshots/mcs/mc-space-04.jpg',
    title: '04 — Snow and Suns',
    caption: 'Real-time Orbits with other Planetary Bodies.'
  },
  {
    image: '/images/screenshots/mcs/mc-space-05.jpg',
    title: '05 — Flying',
    caption: 'Take a tour of the solar system.'
  },
  {
    image: '/images/screenshots/mcs/mc-space-06.jpg',
    title: '06 — Textures and Atmosphire',
    caption: 'Atmospheric light scattering, fog and haze.'
  },
    {
    image: '/images/screenshots/mcs/mc-space-07.jpg',
    title: '07 — Clouds and Biome colours.',
    caption: 'Dynamic Clouds.'
  }
],
  },
  {
    title: 'An ARPG Prototype',
    description: 'An isometric ARPG built in C++ with custom rendering, terrain deformation, procedural level generation and combat mechanics.',
    type: 'engine',
    tech: ['C++', 'Custom Renderer', 'Procedural Generation', 'Combat Mechanics', 'Custom Tools', '3D Graphics'],
    slug: 'arpg',
    content: [
      'This ARPG prototype is an isometric game built in C++ with a custom rendering engine, I have had a couple of iterations over the years, with the most recent one being a more focused attempt at building a playable prototype with core gameplay mechanics.',
      'It features procedural level generation, terrain deformation and basic combat mechanics.',
      'The project was a playground for experimenting with game systems and engine architecture.',
      'It was also a great opportunity to build custom tools for level design and content creation, which was a rewarding part of the process.',
      'The engine works by rendering a skin of voxels over the terrain allowing for real-time modifications by the player.',
      'Overall, it was a fun and educational project that allowed me to explore various aspects of game development, from engine design to gameplay mechanics.'
    ],
    challenges: [
      'My first time working with C++ for game development, which was a learning curve in terms of memory management and engine architecture',
      'Designing procedural level generation that creates interesting and varied environments while still being playable',
      'Implementing real-time terrain deformation that interacts well with the gameplay mechanics and doesn’t cause performance issues',
      'Balancing combat mechanics to be engaging and fun while also fitting within the constraints of the engine and procedural levels',
      'Building custom tools for level design and content creation that are efficient and user-friendly, which was a rewarding challenge in itself'
    ],
    video: '/videos/arpg.mp4',
    caption: 'A demo of the ARPG prototype, showcasing its isometric gameplay, custom rendering engine and itterations over the years.',
    hero: '/images/arpg-hero.png',
    timeline: [
      {
        image: '/images/screenshots/arpg/07.png',
        title: '01 — The First Tests',
        caption: 'First experiments with the isometric perspective, with "walls". The player is light green.'
      },
      {
        image: '/images/screenshots/arpg/08.jpg',
        title: '02 — Biomes and Terrain',
        caption: 'An early test with grass, trees and UI. biome generation and a more natural look.'
      },
      {
        image: '/images/screenshots/arpg/01.png',
        title: '03 — A New Engine',
        caption: 'The starts of a new engine iteration, with a focus on building a playable prototype.'
      },
      {
        image: '/images/screenshots/arpg/02.png',
        title: '04 — Biomes and Trees',
        caption: 'Added a new biome generation system, with more varied terrain and tree models.'
      },
      {
        image: '/images/screenshots/arpg/03.png',
        title: '05 — PBR Lighting and Shadows',
        caption: 'The introduction of a new rendering system with PBR lighting and shadows, giving the game a more polished look.'
      },
      {
        image: '/images/screenshots/arpg/04.png',
        title: '06 — Engine tools and texture painter',
        caption: 'The introduction of custom tools for level design and content creation, including a texture painter for terrain and a level editor for placing objects and designing levels.'
      },
        {
        image: '/images/screenshots/arpg/05.png',
        title: '07 — Deforiming Terrain.',
        caption: 'Giving the player the ability to modify the terrain in real-time with attacks.'
      },
        {
        image: '/images/screenshots/arpg/06.png',
        title: '07 — Custom Levels',
        caption: 'Making tools and testing height levels with the custom level editor.'
      }
    ],
  },
  {
    title: 'Aquaforge',
    description: 'A Rust + Bevy prototype using real ocean heightmap data to simulate large-scale water environments.',
    type: 'experimental',
    tech: ['Rust', 'Bevy', 'Ocean Simulation', 'Heightmap Data', '3D Graphics'],
    slug: 'aquaforge',
    content: [
      "Aquaforge was an experimental project exploring the use of real-world ocean heightmap data within a 3D environment built using Rust and Bevy.",
      
      "The goal was to investigate how large-scale terrain data could be visualised and interacted with in real time, using modern ECS-based architecture.",
      
      "While the project did not reach a fully working state, it provided valuable insight into shader development, rendering pipelines and the challenges of working with WGSL."
    ],
    challenges: [
      "Working with WGSL shaders and understanding the constraints of Bevy’s rendering pipeline",
      "Handling large heightmap datasets efficiently in real time",
      "Adapting to Rust’s ownership model within an ECS architecture",
      "Debugging rendering issues with limited tooling compared to more mature engines"
    ],
    learning: [
      "Fundamentals of Rust and ECS-based engine design",
      "Shader programming concepts using WGSL",
      "Challenges of real-time rendering with large datasets",
      "How to approach experimental projects and iterate on unknown problems"
    ],
    postmortem: [
    "Aquaforge began as an experiment in using real-world ocean heightmap data (GEBCO) inside a 3D environment powered by Rust and Bevy. The goal was to explore how large-scale, real-world datasets could be rendered and interacted with in real time.",
    
    "One of the first challenges was simply handling the size of the data. The GEBCO dataset is massive, and it quickly became clear that loading it as a single resource was not feasible. To work around this, the data was split into many smaller binary (.bin) chunks, allowing sections to be loaded and processed individually.",
    
    "At the time, the project was built on Bevy 0.13 (2024), which was still evolving rapidly. While the ECS architecture was powerful and flexible, the rendering pipeline and tooling - particularly around WGSL shaders - were still relatively immature.",

    "Since then, Bevy has progressed significantly (reaching 0.18 by 2026), with improvements in rendering, tooling and overall stability.",
    
    "A significant portion of development time was spent working with WGSL shaders. Debugging shader issues proved difficult due to limited tooling and feedback compared to more mature engines. Small mistakes could result in silent failures or unclear rendering issues, making iteration slower than expected.",
    
    "The combination of large datasets, custom data handling, and a still-maturing rendering pipeline made the project increasingly complex. Progress slowed as more time was spent working around engine limitations rather than exploring the original idea.",
    
    "Ultimately, the project did not reach a fully working state, but it provided valuable insight into the challenges of working with experimental engines, large-scale data, and modern GPU pipelines.",

    "Revisiting the project in 2026, it’s clear that while the original vision was ambitious, the surrounding ecosystem has evolved significantly. Bevy’s improvements in rendering, tooling and overall stability would likely have made the project more feasible if started today. At the time, however, it was a challenging experiment that pushed the boundaries of what was possible with the available technology... particularly around shader development with WGSL, which at the time proved to be a significant source of friction."
  ]
  },
  {
    title: "Simple Pages",
    slug: "simple-pages",
    description: "A full-stack publishing prototype built with React, Express and PostgreSQL, exploring user-created pages and low-friction content sharing.",

    github: "https://github.com/rageypeep/simple-pages",
    type: "experimental",

    tech: [
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "JWT Authentication",
      "bcrypt"
    ],

    content: [
      "Simple Pages was an early full-stack prototype exploring the idea of creating and sharing simple web pages with minimal friction.",
      
      "The frontend was built in React, providing a basic interface for interacting with the system, while the backend was developed using Node.js and Express, with PostgreSQL handling persistent data storage.",
      
      "The application included a full user system with registration, login, password hashing and JWT-based authentication, allowing users to create and manage their own pages.",
      
      "Core functionality included creating, viewing and deleting pages, as well as retrieving user-specific content, forming the foundation of a lightweight publishing platform.",
      
      "Although the project remained a prototype, many of the concepts explored here — particularly around user-owned content and simple publishing workflows — were later developed further in JotSpot."
    ],

    features: [
      "React-based frontend interface",
      "Express backend with PostgreSQL database",
      "User registration and login system",
      "JWT-based authentication",
      "Page creation, retrieval and deletion",
      "User-specific content management"
    ],
    learning: [
      "Frontend framework choice should align with the complexity of the product",
      "Not all applications benefit from heavy client-side architecture",
      "Simplicity and user experience can be more important than technical stack choice",
      "Recognising friction early can lead to better long-term design decisions"
    ],

    postmortem: [
      "Simple Pages began as an exploration into building a lightweight, multi-user publishing platform, with a React frontend and an Express/PostgreSQL backend.",

      "The core functionality was in place early on, including authentication, user-owned content and page creation, forming the foundation of a functional system.",

      "However, as development progressed, the choice of React for the frontend began to introduce friction for this particular type of application. The additional complexity and overhead did not align well with the goal of creating a fast, simple and low-friction writing experience.",

      "This led to a shift in thinking around how the interface should behave. Rather than building a more complex client-side application, a server-driven approach with simpler frontend logic became a more suitable direction.",

      "At this point, development of Simple Pages was intentionally paused, with the focus moving toward rethinking the architecture and user experience.",

      "These ideas were later developed further in JotSpot, where a different approach to rendering and interaction was used to better match the original goal of simplicity and speed."
    ]
  },
  {
    title: "Texture Map Generator",
    slug: "texture-map-generator",
    description: "An early Python-based tool for generating PBR texture maps, created as a precursor to ChromaForge.",

    github: "https://github.com/rageypeep/Texture-Map-Generator/blob/main/MapMaker.py",
    type: "experimental",

    tech: [
      "Python",
      "Image Processing",
      "PBR Textures",
      "Procedural Generation",
      "Desktop Tooling"
    ],

    content: [
      "Texture Map Generator was an early attempt at building a tool for generating PBR texture maps, originally created to produce simple noise masks for use in Unity projects.",

      "The tool explored procedural texture generation and the creation of maps such as roughness, height and other supporting data used in physically based rendering workflows.",

      "It was developed as a standalone Python application, focusing on functionality and experimentation rather than performance or user interface design.",

      "One of the main challenges encountered was real-time preview performance. Rendering and updating texture previews proved to be slow, highlighting the limitations of using Python for this type of interactive graphical tool.",

      "These limitations ultimately led to the idea of rebuilding the concept using more suitable technologies, which later evolved into ChromaForge — a more advanced and performant system with real-time rendering and improved workflow design."
    ],

    features: [
      "Procedural generation of texture maps",
      "Support for multiple PBR-related outputs",
      "Noise-based mask generation for Unity workflows",
      "Early experimentation with texture processing pipelines"
    ],
    learning: [
      "Choosing the right language and tools is critical for performance-sensitive applications",
      "Real-time visual tools require a different approach than offline data processing",
      "Prototyping can reveal limitations early and guide better architectural decisions",
      "Recognising when to rebuild is often more valuable than continuing to patch a system"
    ],


    postmortem: [
      "This project was an early attempt at building a practical PBR texture generation tool, but it quickly exposed the limitations of using Python for interactive graphical applications.",

      "The core functionality worked, but real-time preview performance was consistently poor. Updating and rendering texture maps at interactive speeds proved difficult, especially when trying to iterate quickly on visual output.",

      "Much of the friction came from the mismatch between the problem and the chosen technology. Python was effective for prototyping logic and processing data, but it struggled when used as the foundation for a responsive, real-time visual tool.",

      "This led to a key realisation: while the idea of the tool was sound, achieving a smooth and usable workflow required a different approach, particularly in how rendering and user interaction were handled.",

      "Rather than continuing to push against these limitations, the project was rethought and rebuilt using more suitable technologies. This ultimately led to the creation of ChromaForge, which addressed the performance and workflow issues encountered here.",

      "Looking back, this project was less about the final result and more about understanding where the bottlenecks were. It provided a clear direction for what needed to change, and directly influenced the design and technology choices of the system that followed."
    ]
  },
  {
    title: "YouTube Style Video Player",
    slug: "youtube-style-video-player",
    description: "A custom React video player with a YouTube-inspired interface and dynamic ambient box-shadows driven by sampled colours from the video edges.",

    github: "https://github.com/rageypeep/testing/blob/main/src/components/VideoPlayer.js",
    type: "fun",
    tech: [
      "React",
      "JavaScript",
      "Custom UI",
      "Media Playback",
      "Dynamic Styling",
      "Colour Sampling"
    ],

    content: [
      "This project started as a fun challenge: recreating the feel of a YouTube-style player using React and custom UI controls.",
      "The most interesting part of the project was experimenting with dynamic visual styling. Rather than using a static box-shadow, the player calculated average colours from each edge of the video and used that data to render a shadow that responded to the media being shown.",
      "This gave the interface a more reactive and immersive feel, with the player visually adapting to the content rather than simply displaying it inside a fixed frame.",
      "Alongside the styling experiment, the project also explored custom playback controls, responsive layout and component structure in React."
    ],

    features: [
      "Custom video player interface inspired by YouTube",
      "Dynamic box-shadow rendering based on sampled edge colours",
      "React-based component structure",
      "Custom playback controls",
      "Responsive layout for different screen sizes"
    ],

    challenges: [
      "Sampling colour data from video edges in a way that remained performant",
      "Turning average colour values into a visual effect that felt natural rather than distracting",
      "Balancing custom styling with playback usability",
      "Structuring the player as a reusable React component"
    ]
  },
  {
    title: "Voxel Sphere Prototype",
    slug: "voxel-sphere-rendering-experiment",
    description: "A React and Three.js experiment that generates a rounded voxel sphere, renders only visible faces, and merges geometry for more efficient real-time display.",

    github: "https://github.com/rageypeep/testing/blob/main/src/components/Voxel.js",
    type: "fun",
    tech: [
      "React",
      "Three.js",
      "JavaScript",
      "Voxel Rendering",
      "Geometry Merging",
      "Performance Monitoring"
    ],

    content: [
      "This project was a rendering experiment focused on building a rounded 3D form from voxels using React and Three.js.",
      "Rather than rendering every face of every voxel, the system checks which parts of the structure are actually exposed and only generates the visible faces. This reduces unnecessary geometry and makes the rendered result more efficient.",
      "The voxel data is then merged into a single geometry, helping performance further and making the scene easier to render in real time.",
      "The finished shape is displayed as a rotating voxel sphere-like form, with alternating vertex colours and an on-screen FPS monitor to help evaluate performance during rendering."
    ],

    features: [
      "Rounded voxel sphere generation",
      "Visible-face-only voxel rendering",
      "Merged geometry for improved rendering efficiency",
      "Alternating voxel colour pattern",
      "Real-time rotation and FPS monitoring"
    ],

    challenges: [
      "Determining which voxel faces should actually be rendered",
      "Building a curved form from a voxel-based structure",
      "Reducing geometry overhead by merging many voxel meshes together",
      "Balancing visual detail with real-time rendering performance"
    ]
  },
  {
    title: "IT Games Website (2003)",
    slug: "it-games",
    description: "An early full-stack web project integrating a retail EPOS system with a dynamic ASP backend.",
    link: "https://web.archive.org/web/20031224144306/http://81.130.209.148:8080/",
    type: "archive",
    tech: ["Classic ASP", "HTML", "EPOS Integration", "MS Access"],
    hero: '/images/itgames-hero.png',
    content: [
      "This project was one of my earliest web builds, created in 2003, but it went far beyond a simple static website. It included a dynamic ASP backend connected to a retail EPOS system, allowing the site to retrieve and display live stock data from the shop.",

      "The system was designed to synchronise with real-world inventory, pulling product information and availability from the EPOS and reflecting it on the website. At the time, this involved working with custom data feeds and integration approaches, long before modern APIs and standardised tooling became common.",

      "The site also included an online ordering system with PayPal integration, enabling customers to purchase items directly through the website. This required handling product data, order flow and payment interaction in a much more manual environment than modern frameworks provide today.",

      "The application was deployed on Windows Server 2003, requiring setup and management of the server environment alongside the application itself. This added another layer of complexity, covering hosting, configuration and keeping the system running reliably.",

      "Looking back, this project represents an early introduction to full-stack development, real-world system integration and running live services, combining backend logic, external integrations and deployment into a single working system.",

      "Built during a time when much of this functionality required custom solutions, rather than relying on modern frameworks and services."
    ],
    challenges: [
      "Integrating a web application with a retail EPOS system without modern APIs",
      "Handling stock synchronisation between physical and online systems",
      "Working with early PayPal integration in a less structured environment",
      "Designing a reliable data flow between systems with limited tooling",
      "Building dynamic web functionality using Classic ASP"
    ],
    learning: [
      "Early experience with full-stack web development and backend logic",
      "Understanding of real-world system integration and data synchronisation",
      "Working with payment systems and online ordering flows",
      "Practical problem-solving in a less mature web ecosystem"
    ],
  }
]
