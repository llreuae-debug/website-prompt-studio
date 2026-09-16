/**
 * PromptCraft Studio — 25 Dynamic 3D Storytelling Preset Engine
 * Specification Reference: 3D_PRESET_STORY_ENGINE.md
 * Topic-aware visual choreography, camera movement, depth, typography, and atmosphere.
 */

const story3dPresets = {
  "01_cinematic_film": {
    id: "01_cinematic_film",
    number: "01",
    name: "CINEMATIC FILM",
    tagline: "Anamorphic Depth & 35mm Grain",
    description: "Dark cinematic environments, slow camera movement, dramatic reveals and film-like transitions.",
    category: "cinematic",
    topicCompatibility: ["film", "cinema", "movie", "documentary", "story", "luxury", "beauty", "perfume", "dramatic"],
    background: "radial-gradient(ellipse at center, #1a0f14 0%, #080406 80%)",
    colorSystem: {
      primary: "#c9a675",
      accent: "#e11d48",
      background: "#080406",
      cardBg: "rgba(26, 15, 20, 0.75)",
      text: "#f5ece6"
    },
    typography: {
      fontDisplay: "Cinzel, serif",
      fontBody: "Inter, sans-serif",
      letterSpacing: "0.15em",
      textTransform: "uppercase"
    },
    lighting: "Dramatic 85mm softbox key light, subtle rim light, warm halogen halation on high-contrast edges",
    camera: "Slow push-in on 85mm prime lens with shallow f/2.0 depth-of-field",
    depth: "Layered atmospheric haze with organic 35mm grain gate weave",
    objectBehavior: "Slow, stately floating with gentle axial drift",
    scrollBehavior: "0-20% Arrival, 20-40% Reveal, 40-60% Transformation, 60-80% Detail, 80-100% Final Hero",
    transition: "Crossfade + depth rack",
    atmosphere: "Quiet psychological reverence, rich shadow falloff, film gate weave",
    cssThemeClass: "theme-cinematic-film",
    fallbackDirective: "Enforce 35mm Eastman Kodak Vision3 500T film grain, subtle halation on high-contrast edges, organic gate weave, anamorphic flare."
  },

  "02_luxury_fashion": {
    id: "02_luxury_fashion",
    number: "02",
    name: "LUXURY FASHION",
    tagline: "Editorial Asymmetry & Runway Tracking",
    description: "Editorial typography, oversized imagery, asymmetric compositions and runway-inspired movement.",
    category: "fashion",
    topicCompatibility: ["fashion", "couture", "apparel", "luxury", "beauty", "clothing", "editorial", "runway", "jewelry"],
    background: "radial-gradient(circle at 60% 40%, #171717 0%, #050505 100%)",
    colorSystem: {
      primary: "#ffffff",
      accent: "#d4af37",
      background: "#050505",
      cardBg: "rgba(23, 23, 23, 0.75)",
      text: "#f3f4f6"
    },
    typography: {
      fontDisplay: "Playfair Display, serif",
      fontBody: "Inter, sans-serif",
      letterSpacing: "0.22em",
      textTransform: "uppercase"
    },
    lighting: "High-contrast editorial strobe lighting with hard specular highlights and razor-sharp shadow drop",
    camera: "Lateral runway tracking shot with sudden focal snap",
    depth: "Multi-layered editorial text planes slicing through negative space",
    objectBehavior: "Asymmetrical poise, crisp rotation stops, angular silhouette alignment",
    scrollBehavior: "Split-screen reveal, editorial text mask wipe, full-bleed hero presentation",
    transition: "Image mask wipe + typographic snap",
    atmosphere: "Haute couture minimalism, stark black & white contrast, understated gold accents",
    cssThemeClass: "theme-luxury-fashion",
    fallbackDirective: "Enforce stark high-fashion editorial strobe, razor-sharp edge contrast, tactile fabric weave, monochromatic balance."
  },

  "03_future_tech": {
    id: "03_future_tech",
    number: "03",
    name: "FUTURE TECH",
    tagline: "Spatial HUD & Cybernetic Precision",
    description: "Spatial interfaces, controlled 3D objects, futuristic lighting and technological transitions.",
    category: "tech",
    topicCompatibility: ["tech", "technology", "ai", "software", "cyber", "robotics", "drone", "hardware", "quantum", "vr"],
    background: "radial-gradient(circle at 50% 30%, #0a192f 0%, #020817 90%)",
    colorSystem: {
      primary: "#38bdf8",
      accent: "#818cf8",
      background: "#020817",
      cardBg: "rgba(10, 25, 47, 0.8)",
      text: "#e2e8f0"
    },
    typography: {
      fontDisplay: "JetBrains Mono, monospace",
      fontBody: "Inter, sans-serif",
      letterSpacing: "0.08em",
      textTransform: "uppercase"
    },
    lighting: "Volumetric cyan and cobalt laser scans with luminous edge emission and holographic dispersion",
    camera: "Orbital spatial tracking with 45° isometric pitch tilt",
    depth: "3D floating spatial HUD telemetry nodes and depth-mapped wireframe grids",
    objectBehavior: "Modular segment disassembly, precision rotational lock, telemetry readout tracking",
    scrollBehavior: "Wireframe construction → volumetric materialization → telemetry breakdown → hero lock",
    transition: "Spatial displacement + vector wireframe slice",
    atmosphere: "Advanced quantum telemetry, ultra-clean digital atmosphere, zero organic noise",
    cssThemeClass: "theme-future-tech",
    fallbackDirective: "Enforce crisp CAD wireframe precision, volumetric laser telemetry, cyan specular rim lighting, zero synthetic smear."
  },

  "04_architectural": {
    id: "04_architectural",
    number: "04",
    name: "ARCHITECTURAL",
    tagline: "Monumental Scale & Structural Depth",
    description: "Large-scale spatial compositions, structural reveals, camera travel and architectural depth.",
    category: "architecture",
    topicCompatibility: ["architecture", "real estate", "villa", "skyscraper", "building", "interior", "residence", "estate", "concrete", "structural"],
    background: "linear-gradient(180deg, #18181b 0%, #09090b 100%)",
    colorSystem: {
      primary: "#d4d4d8",
      accent: "#d97706",
      background: "#09090b",
      cardBg: "rgba(24, 24, 27, 0.8)",
      text: "#f4f4f5"
    },
    typography: {
      fontDisplay: "Cinzel, serif",
      fontBody: "Inter, sans-serif",
      letterSpacing: "0.12em",
      textTransform: "uppercase"
    },
    lighting: "Golden hour raking sunlight through floor-to-ceiling architectural apertures with clean shadow geometries",
    camera: "Monumental vertical jib crane shot ascending along raw concrete facades",
    depth: "Deep architectural vanishing points, structural columns slicing z-space",
    objectBehavior: "Massive solid mass with sectional tectonic displacement",
    scrollBehavior: "Site blueprint → structural framing → material envelope → interior light immersion",
    transition: "Sectional architectural slice + camera travel",
    atmosphere: "Brutalist monumentality, travertine marble warmth, peaceful cavernous space",
    cssThemeClass: "theme-architectural",
    fallbackDirective: "Enforce photorealistic raw board-formed concrete textures, architectural perspective lines, raytraced golden hour sunlight."
  },

  "05_product_cinema": {
    id: "05_product_cinema",
    number: "05",
    name: "PRODUCT CINEMA",
    tagline: "Hero Presentation & Studio Turntable",
    description: "Hero-product focus, macro presentation, controlled rotation, reflections and premium lighting.",
    category: "product",
    topicCompatibility: ["product", "gadget", "watch", "perfume", "bottle", "cosmetics", "device", "automobile", "sneakers"],
    background: "radial-gradient(circle at 50% 50%, #1c1917 0%, #0c0a09 100%)",
    colorSystem: {
      primary: "#fbbf24",
      accent: "#f59e0b",
      background: "#0c0a09",
      cardBg: "rgba(28, 25, 23, 0.8)",
      text: "#fafaf9"
    },
    typography: {
      fontDisplay: "Playfair Display, serif",
      fontBody: "Inter, sans-serif",
      letterSpacing: "0.1em",
      textTransform: "uppercase"
    },
    lighting: "Twin studio softbox strip lights with circular polarizer reflection control and brushed rim glint",
    camera: "Smooth 360° product turntable orbit with continuous micro-tilt",
    depth: "Isolated hero product on infinite dark matte stage with soft specular puddle reflection",
    objectBehavior: "Slow continuous axial rotation, unmolding assembly, cap lift reveal",
    scrollBehavior: "Material close-up → mechanism reveal → full silhouette rotation → purchase trigger",
    transition: "Specular gleam wipe + reflection dissolve",
    atmosphere: "Pristine luxury commercial studio, dust-free vacuum, hyper-focused tactile finish",
    cssThemeClass: "theme-product-cinema",
    fallbackDirective: "Enforce 1:1 macro product fidelity, brushed titanium/chrome specular sheen, studio reflection mapping, zero edge halos."
  },

  "06_organic_nature": {
    id: "06_organic_nature",
    number: "06",
    name: "ORGANIC NATURE",
    tagline: "Biophilic Caustics & Botanical Flow",
    description: "Organic movement, natural textures, atmospheric depth and environmental transitions.",
    category: "nature",
    topicCompatibility: ["nature", "organic", "botanical", "skincare", "wellness", "sustainability", "eco", "flora", "green", "herbal"],
    background: "radial-gradient(circle at 50% 40%, #064e3b 0%, #022c22 70%, #011510 100%)",
    colorSystem: {
      primary: "#34d399",
      accent: "#fbbf24",
      background: "#022c22",
      cardBg: "rgba(6, 78, 59, 0.6)",
      text: "#ecfdf5"
    },
    typography: {
      fontDisplay: "Playfair Display, serif",
      fontBody: "Inter, sans-serif",
      letterSpacing: "0.06em",
      textTransform: "none"
    },
    lighting: "Dappled canopy sunlight filtering through botanical leaves with underwater caustic refractions",
    camera: "Slow organic fluid pan drifting with natural wind physics",
    depth: "Layered foliage foreground blur with morning mist atmospheric falloff",
    objectBehavior: "Gentle respiration breathing animation, petal unfurl, droplet surface roll",
    scrollBehavior: "Sprout germination → full bloom unfurl → botanical oil extraction → pure essence",
    transition: "Petal dissolve + soft bloom bleed",
    atmosphere: "Lush dewy morning air, living biophilic pulse, gentle water acoustics",
    cssThemeClass: "theme-organic-nature",
    fallbackDirective: "Enforce subsurface scattering on botanical petals, organic micro water droplets, dappled natural canopy sunbeams."
  },

  "07_minimal_3d": {
    id: "07_minimal_3d",
    number: "07",
    name: "MINIMAL 3D",
    tagline: "Restrained Whitespace & Monolithic Form",
    description: "Extreme whitespace, one primary visual object, restrained movement and sophisticated typography.",
    category: "minimal",
    topicCompatibility: ["minimal", "design", "portfolio", "art", "typography", "clean", "simple", "modern", "agency"],
    background: "#09090b",
    colorSystem: {
      primary: "#fafafa",
      accent: "#71717a",
      background: "#09090b",
      cardBg: "rgba(24, 24, 27, 0.5)",
      text: "#e4e4e7"
    },
    typography: {
      fontDisplay: "Inter, sans-serif",
      fontBody: "Inter, sans-serif",
      letterSpacing: "0.04em",
      textTransform: "none"
    },
    lighting: "Subtle top-down ambient occlusion with zero colored lights and soft matte shadow footprint",
    camera: "Pure single-axis z-space dolly with mathematical precision",
    depth: "Vast negative space with a single central sculpture",
    objectBehavior: "Pure geometrical restraint, micro-rotation only on hover",
    scrollBehavior: "Silent arrival → solitary inspection → detail dimension → quiet conclusion",
    transition: "Zero-friction slide + clean alpha fade",
    atmosphere: "Monastic quietude, Swiss typographic discipline, total absence of visual clutter",
    cssThemeClass: "theme-minimal-3d",
    fallbackDirective: "Enforce extreme minimalist composure, neutral monochromatic palette, flawless subtle ambient occlusion, crisp geometric edges."
  },

  "08_glass_world": {
    id: "08_glass_world",
    number: "08",
    name: "GLASS WORLD",
    tagline: "Prismatic Refraction & Caustic Depth",
    description: "Transparent layers, reflections, depth planes and elegant glass-like spatial composition.",
    category: "materials",
    topicCompatibility: ["glass", "crystal", "jewelry", "refraction", "optics", "luxury", "fragrance", "clean", "transparent"],
    background: "radial-gradient(circle at 50% 50%, #0f172a 0%, #020617 100%)",
    colorSystem: {
      primary: "#93c5fd",
      accent: "#a78bfa",
      background: "#020617",
      cardBg: "rgba(15, 23, 42, 0.45)",
      text: "#f8fafc"
    },
    typography: {
      fontDisplay: "Cinzel, serif",
      fontBody: "Inter, sans-serif",
      letterSpacing: "0.14em",
      textTransform: "uppercase"
    },
    lighting: "Dual spotlight caustics casting iridescent rainbow dispersion fringes across glass facets",
    camera: "Parallax travel looking through multi-layered glass panes",
    depth: "Stacked optical glass planes with variable refractive indices",
    objectBehavior: "Internal light transmission, subtle optical refraction of background elements",
    scrollBehavior: "Frosted veil → optical clarity focus → caustic beam focus → crystalline hero",
    transition: "Refractive chromatic aberration wipe",
    atmosphere: "Pristine optical laboratory, crystal glass purity, subtle spectral refractions",
    cssThemeClass: "theme-glass-world",
    fallbackDirective: "Enforce physically accurate glass refraction, thin-film rainbow iridescence, caustic light scattering, crystal clarity."
  },

  "09_chrome_future": {
    id: "09_chrome_future",
    number: "09",
    name: "CHROME FUTURE",
    tagline: "Liquid Mercury & Specular Sweeps",
    description: "Metallic surfaces, reflections, hard highlights and futuristic spatial transitions.",
    category: "materials",
    topicCompatibility: ["chrome", "automotive", "supercar", "hardware", "metal", "futuristic", "cyber", "industrial"],
    background: "radial-gradient(circle at 40% 40%, #1e293b 0%, #0f172a 60%, #020617 100%)",
    colorSystem: {
      primary: "#e2e8f0",
      accent: "#38bdf8",
      background: "#020617",
      cardBg: "rgba(30, 41, 59, 0.7)",
      text: "#f1f5f9"
    },
    typography: {
      fontDisplay: "JetBrains Mono, monospace",
      fontBody: "Inter, sans-serif",
      letterSpacing: "0.18em",
      textTransform: "uppercase"
    },
    lighting: "High-voltage white strobe light sweeps reflecting off mirror-polished liquid chrome curves",
    camera: "Low-angle high-contrast orbit tracking the horizon line reflection",
    depth: "Infinite reflective floor grid with high metallic reflectivity",
    objectBehavior: "Liquid mercury surface ripples settling into hardened aerodynamic geometry",
    scrollBehavior: "Molten metal pool → extrusion into chassis → chrome polish sweep → high-speed reflection",
    transition: "Liquid metal morph + chrome streak",
    atmosphere: "Futuristic concept wind tunnel, high-gloss aerodynamic velocity, silver reflections",
    cssThemeClass: "theme-chrome-future",
    fallbackDirective: "Enforce mirror-finish liquid chrome, high-contrast studio reflection map, sharp specular highlights, aerodynamic curves."
  },

  "10_paper_editorial": {
    id: "10_paper_editorial",
    number: "10",
    name: "PAPER / EDITORIAL",
    tagline: "Deckle Edges & Tactile Cardstock",
    description: "Layered planes, editorial layouts, page-like transitions and dimensional typography.",
    category: "editorial",
    topicCompatibility: ["editorial", "publishing", "magazine", "book", "journal", "literature", "typography", "paper", "craft"],
    background: "#141415",
    colorSystem: {
      primary: "#e4d9c6",
      accent: "#c9a675",
      background: "#141415",
      cardBg: "rgba(228, 217, 198, 0.08)",
      text: "#f5f2eb"
    },
    typography: {
      fontDisplay: "Playfair Display, serif",
      fontBody: "Inter, sans-serif",
      letterSpacing: "0.08em",
      textTransform: "none"
    },
    lighting: "Warm gallery ambient flood with soft paper cast shadows defining deckled edges",
    camera: "Layered depth tilt mimicking the turning of heavy archival art paper",
    depth: "Three-dimensional paper stock planes stacked along z-space",
    objectBehavior: "Gentle origami folding, paper curl, embossed letterpress depth",
    scrollBehavior: "Blank archival sheet → blind deboss imprint → ink absorption → bound masterpiece",
    transition: "Page peel + dimensional paper push",
    atmosphere: "Artisan printmaking studio, rich fibrous tactile cardstock, letterpress ink aroma",
    cssThemeClass: "theme-paper-editorial",
    fallbackDirective: "Enforce heavy 350gsm archival cotton paper texture, subtle deckled edge shadow, letterpress blind deboss depth."
  },

  "11_liquid": {
    id: "11_liquid",
    number: "11",
    name: "LIQUID",
    tagline: "Viscous Fluid Dynamics & Surface Tension",
    description: "Fluid transitions, flowing forms, smooth morphing and organic movement.",
    category: "fluid",
    topicCompatibility: ["liquid", "water", "beverage", "skincare", "cosmetics", "wine", "perfume", "fluid", "ocean"],
    background: "radial-gradient(ellipse at center, #1e1b4b 0%, #0f172a 70%, #020617 100%)",
    colorSystem: {
      primary: "#818cf8",
      accent: "#c084fc",
      background: "#020617",
      cardBg: "rgba(30, 27, 75, 0.6)",
      text: "#f8fafc"
    },
    typography: {
      fontDisplay: "Cinzel, serif",
      fontBody: "Inter, sans-serif",
      letterSpacing: "0.12em",
      textTransform: "uppercase"
    },
    lighting: "Subsurface light diffusion penetrating viscous fluid volumes with internal luminescence",
    camera: "Fluid flow follow camera gliding along moving liquid currents",
    depth: "Dynamic refractive depth planes with organic surface distortion",
    objectBehavior: "Smooth Navier-Stokes fluid morphing, droplet cohesion and splash crowns",
    scrollBehavior: "Single droplet drop → impact ripple expansion → vortex funnel → suspended fluid sphere",
    transition: "Viscous ripple morph + droplet dissolve",
    atmosphere: "Sensory fluid immersion, weightless aqueous suspension, silky viscosity",
    cssThemeClass: "theme-liquid",
    fallbackDirective: "Enforce photorealistic fluid physics, realistic surface tension and meniscus, internal light caustics, smooth viscous flow."
  },

  "12_particle_universe": {
    id: "12_particle_universe",
    number: "12",
    name: "PARTICLE UNIVERSE",
    tagline: "Quantum Dust & Constellation Swarm",
    description: "Particles assemble, transform and dissolve to create cinematic spatial storytelling.",
    category: "particle",
    topicCompatibility: ["particle", "ai", "data", "space", "cosmos", "quantum", "science", "creative", "abstract"],
    background: "radial-gradient(circle at 50% 50%, #111827 0%, #030712 100%)",
    colorSystem: {
      primary: "#fbbf24",
      accent: "#38bdf8",
      background: "#030712",
      cardBg: "rgba(17, 24, 39, 0.7)",
      text: "#f9fafb"
    },
    typography: {
      fontDisplay: "JetBrains Mono, monospace",
      fontBody: "Inter, sans-serif",
      letterSpacing: "0.1em",
      textTransform: "uppercase"
    },
    lighting: "Self-luminous point emitters casting delicate glow onto adjacent particle neighbors",
    camera: "Orbital galaxy swirl accelerating through particle point clouds",
    depth: "Volumetric 3D particle swarm stretching to infinite depth horizon",
    objectBehavior: "Dispersed quantum dust assembling into solid recognizable product silhouettes",
    scrollBehavior: "Freeform nebula → gravitational collapse → structured point cloud → solid silhouette",
    transition: "Particle disperse & constellation reassemble",
    atmosphere: "Celestial cosmic quiet, floating quantum particles, subtle gravity pull",
    cssThemeClass: "theme-particle-universe",
    fallbackDirective: "Enforce lightweight luminous particle point cloud, gravitational particle gathering, dark celestial void background."
  },

  "13_macro_world": {
    id: "13_macro_world",
    number: "13",
    name: "MACRO WORLD",
    tagline: "1:1 Micro-Texture & Shallow Focus",
    description: "Extreme close-ups, texture, shallow depth of field and slow detail reveals.",
    category: "macro",
    topicCompatibility: ["macro", "texture", "detail", "skincare", "materials", "craftsmanship", "jewelry", "watch"],
    background: "radial-gradient(circle at 50% 50%, #27272a 0%, #09090b 100%)",
    colorSystem: {
      primary: "#fb7185",
      accent: "#fda4af",
      background: "#09090b",
      cardBg: "rgba(39, 39, 42, 0.7)",
      text: "#fff1f2"
    },
    typography: {
      fontDisplay: "Cinzel, serif",
      fontBody: "Inter, sans-serif",
      letterSpacing: "0.14em",
      textTransform: "uppercase"
    },
    lighting: "Directional fiber-optic micro spotlight accentuating fine surface pores and engravings",
    camera: "Extreme 1:1 macro lens crawl with paper-thin 2mm depth of field",
    depth: "Extreme bokeh blur background with razor-sharp 2D focus plane",
    objectBehavior: "Slow, intimate glide revealing minute microscopic textural details",
    scrollBehavior: "Micro-texture landscape → focal plane rack → component reveal → macro hero",
    transition: "Focal depth rack wipe",
    atmosphere: "Intimate microscopic realm, sensory tactile proximity, breath-like pacing",
    cssThemeClass: "theme-macro-world",
    fallbackDirective: "Enforce 1:1 photorealistic macro texture, razor-sharp micro-engraving, ultra-shallow depth of field, creamy bokeh."
  },

  "14_parallax_dimension": {
    id: "14_parallax_dimension",
    number: "14",
    name: "PARALLAX DIMENSION",
    tagline: "Multi-Plane Depth & Kinetic Layers",
    description: "Multiple depth layers moving at different speeds to create a strong 3D illusion.",
    category: "parallax",
    topicCompatibility: ["parallax", "scrollytelling", "story", "campaign", "interactive", "portfolio", "creative"],
    background: "linear-gradient(180deg, #0f172a 0%, #1e1b4b 50%, #020617 100%)",
    colorSystem: {
      primary: "#60a5fa",
      accent: "#f472b6",
      background: "#020617",
      cardBg: "rgba(15, 23, 42, 0.75)",
      text: "#f8fafc"
    },
    typography: {
      fontDisplay: "Playfair Display, serif",
      fontBody: "Inter, sans-serif",
      letterSpacing: "0.08em",
      textTransform: "uppercase"
    },
    lighting: "Layer-isolated directional keys creating clear spatial separation between foreground and background",
    camera: "Multi-speed z-axis thrust passing through successive visual gateways",
    depth: "5 distinct discrete depth planes moving at 0.2x, 0.5x, 1.0x, 1.8x, and 2.5x scroll velocities",
    objectBehavior: "Layered foreground silhouettes framing deep background spectacles",
    scrollBehavior: "Foreground gate pass → midground convergence → background scale-up → unified frame",
    transition: "Layered parallax slide & z-space push",
    atmosphere: "Expansive theatrical stage depth, continuous motion illusion, visual rhythm",
    cssThemeClass: "theme-parallax-dimension",
    fallbackDirective: "Enforce multi-plane parallax depth separation, distinct foreground/midground/background lighting, zero 2D flatness."
  },

  "15_museum_art": {
    id: "15_museum_art",
    number: "15",
    name: "MUSEUM / ART",
    tagline: "Curated Pedestal & Gallery Reverence",
    description: "Gallery-like presentation, dramatic lighting, isolated objects and slow camera movement.",
    category: "art",
    topicCompatibility: ["museum", "art", "gallery", "sculpture", "history", "exhibition", "luxury", "curated", "relic"],
    background: "radial-gradient(circle at 50% 30%, #1c1917 0%, #0c0a09 100%)",
    colorSystem: {
      primary: "#d4af37",
      accent: "#a8a29e",
      background: "#0c0a09",
      cardBg: "rgba(28, 25, 23, 0.7)",
      text: "#f5f5f4"
    },
    typography: {
      fontDisplay: "Cinzel, serif",
      fontBody: "Inter, sans-serif",
      letterSpacing: "0.2em",
      textTransform: "uppercase"
    },
    lighting: "Narrow 15° museum pin-spotlight illuminating the isolated artifact from high ceiling rafters",
    camera: "Slow, respectful 180° curatorial orbit at eye level",
    depth: "Vast dark gallery space with soft velvet wall acoustic dampening",
    objectBehavior: "Stationary marble/bronze pedestal presentation with slow contemplative turn",
    scrollBehavior: "Dark entrance → gallery plaque title → spotlight illumination → curatorial thesis",
    transition: "Gallery spotlight fade + curated reveal",
    atmosphere: "Solemn institutional reverence, whisper-quiet gallery halls, timeless artifact honor",
    cssThemeClass: "theme-museum-art",
    fallbackDirective: "Enforce high-end fine art gallery spotlighting, dark stone pedestal, museum curatorial placard typography, dramatic chiaroscuro."
  },

  "16_neon_night": {
    id: "16_neon_night",
    number: "16",
    name: "NEON NIGHT",
    tagline: "Midnight Cyber & Wet Asphalt Reflections",
    description: "Controlled neon lighting, dark environments and atmospheric depth.",
    category: "cyber",
    topicCompatibility: ["night", "neon", "cyberpunk", "entertainment", "music", "club", "beverage", "automotive", "gaming"],
    background: "radial-gradient(circle at 50% 50%, #1e1028 0%, #09030d 100%)",
    colorSystem: {
      primary: "#f43f5e",
      accent: "#06b6d4",
      background: "#09030d",
      cardBg: "rgba(30, 16, 40, 0.75)",
      text: "#fff1f2"
    },
    typography: {
      fontDisplay: "JetBrains Mono, monospace",
      fontBody: "Inter, sans-serif",
      letterSpacing: "0.14em",
      textTransform: "uppercase"
    },
    lighting: "Dual saturated neon tube lights (magenta & cyan) casting luminous streaks onto rain-soaked asphalt",
    camera: "Low-angle street-level tracking shot sliding past neon light pillars",
    depth: "Rain-hazed night city alley with deep wet ground mirror reflections",
    objectBehavior: "Luminous neon outline ignition, pulsing glow cycle, high-contrast silhouette",
    scrollBehavior: "Dark alley silence → neon ignition buzz → full city reflection sweep → electric hero",
    transition: "Neon pulse wipe + chromatic lens blur",
    atmosphere: "Cyberpunk rain-drenched midnight, moody electric hum, evocative chromatic contrast",
    cssThemeClass: "theme-neon-night",
    fallbackDirective: "Enforce saturated neon tube lighting, wet rain-soaked pavement reflections, deep midnight contrast, avoid tacky arcade effects."
  },

  "17_retro_future": {
    id: "17_retro_future",
    number: "17",
    name: "RETRO FUTURE",
    tagline: "80s Synthwave & Phosphor Wireframe",
    description: "Modern 3D combined with tasteful retro-futuristic typography and composition.",
    category: "retro",
    topicCompatibility: ["retro", "vintage", "synthwave", "80s", "nostalgia", "gaming", "music", "auto", "creative"],
    background: "linear-gradient(180deg, #180928 0%, #2d124d 50%, #0a0314 100%)",
    colorSystem: {
      primary: "#f59e0b",
      accent: "#ec4899",
      background: "#0a0314",
      cardBg: "rgba(45, 18, 77, 0.65)",
      text: "#fdf4ff"
    },
    typography: {
      fontDisplay: "JetBrains Mono, monospace",
      fontBody: "Inter, sans-serif",
      letterSpacing: "0.16em",
      textTransform: "uppercase"
    },
    lighting: "Horizon sun sunset glow coupled with vector grid line neon emission and amber phosphor",
    camera: "Perspective grid fly-through toward a glowing vector horizon sun",
    depth: "Infinite neon wireframe ground plane receding to the horizon",
    objectBehavior: "Wireframe mesh materializing into solid polygonal retro supercar chassis",
    scrollBehavior: "Vector wireframe grid → horizon sunrise → solid polygon assembly → synthwave hero",
    transition: "CRT raster scanline wipe + vector wireframe build",
    atmosphere: "Nostalgic 1984 cinematic synthwave, analog tape warmth, futuristic optimism",
    cssThemeClass: "theme-retro-future",
    fallbackDirective: "Enforce retro-futuristic perspective grid, sunset amber-to-magenta horizon gradient, subtle scanline texture, polygonal chrome."
  },

  "18_typographic_3d": {
    id: "18_typographic_3d",
    number: "18",
    name: "TYPOGRAPHIC 3D",
    tagline: "Kinetic Spatial Letterforms & Video Masking",
    description: "Typography becomes part of the spatial environment. Words can move through depth, mask imagery and interact with scrolling.",
    category: "typography",
    topicCompatibility: ["typography", "editorial", "creative", "branding", "agency", "words", "manifesto", "culture"],
    background: "#000000",
    colorSystem: {
      primary: "#ffffff",
      accent: "#fbbf24",
      background: "#000000",
      cardBg: "rgba(255, 255, 255, 0.05)",
      text: "#ffffff"
    },
    typography: {
      fontDisplay: "Playfair Display, serif",
      fontBody: "Inter, sans-serif",
      letterSpacing: "0.02em",
      textTransform: "uppercase"
    },
    lighting: "Stark monochrome lighting casting deep typographic drop shadows onto spatial planes",
    camera: "Camera fly-through moving directly through the hollow counters of oversized letterforms",
    depth: "Massive 3D letterforms arranged in staggered z-depth layers",
    objectBehavior: "Letterforms rotating as solid monolithic sculptures with masked video texture inside",
    scrollBehavior: "Typographic headline emergence → spatial tunnel passage → masked video reveal → final title",
    transition: "Letterform mask reveal + typography scale explosion",
    atmosphere: "Bold editorial power, architectural typography, uncompromising typographic dominance",
    cssThemeClass: "theme-typographic-3d",
    fallbackDirective: "Enforce monumental 3D spatial letterforms, high-contrast black and white typography, clean video masking through glyphs."
  },

  "19_blueprint": {
    id: "19_blueprint",
    number: "19",
    name: "BLUEPRINT",
    tagline: "Technical Schematics & CAD Dimensions",
    description: "Technical lines, grids, measurements, diagrams and structured spatial reveals.",
    category: "technical",
    topicCompatibility: ["blueprint", "engineering", "hardware", "aerospace", "automotive", "architecture", "industrial", "code"],
    background: "#031738",
    colorSystem: {
      primary: "#60a5fa",
      accent: "#93c5fd",
      background: "#031738",
      cardBg: "rgba(30, 58, 138, 0.4)",
      text: "#e0f2fe"
    },
    typography: {
      fontDisplay: "JetBrains Mono, monospace",
      fontBody: "Inter, sans-serif",
      letterSpacing: "0.12em",
      textTransform: "uppercase"
    },
    lighting: "Uniform technical blueprint backlit panel with glowing cyan CAD vector line strokes",
    camera: "Orthographic plan view tracking smoothly along technical dimension callout axes",
    depth: "Precision millimeter grid coordinate system layered behind exploded CAD components",
    objectBehavior: "Exploded engineering assembly diagram with dynamic dimension measurement callouts",
    scrollBehavior: "2D schematic grid → 3D isometric wireframe extrusion → exploded parts callout → calibrated product",
    transition: "Technical line draw + coordinate grid build",
    atmosphere: "Master engineering precision, aerospace blueprint clarity, rigorous calibration",
    cssThemeClass: "theme-blueprint",
    fallbackDirective: "Enforce cobalt blue technical blueprint background, millimeter dimension callouts, crisp white and cyan vector line drawing."
  },

  "20_sculpture": {
    id: "20_sculpture",
    number: "20",
    name: "SCULPTURE",
    tagline: "Chiseled Carrara & Dramatic Chiaroscuro",
    description: "Present the subject like a museum-quality sculpture. Use slow camera orbit, dramatic shadows and controlled composition.",
    category: "sculpture",
    topicCompatibility: ["sculpture", "classical", "heritage", "luxury", "perfume", "monument", "statue", "timeless", "craft"],
    background: "radial-gradient(circle at 45% 45%, #262626 0%, #0a0a0a 100%)",
    colorSystem: {
      primary: "#f5f5f4",
      accent: "#a8a29e",
      background: "#0a0a0a",
      cardBg: "rgba(38, 38, 38, 0.7)",
      text: "#fafaf9"
    },
    typography: {
      fontDisplay: "Cinzel, serif",
      fontBody: "Inter, sans-serif",
      letterSpacing: "0.22em",
      textTransform: "uppercase"
    },
    lighting: "Severe single-source side key light creating deep Caravaggio chiaroscuro shadow carving",
    camera: "Slow, stately 360° circular turntable orbit highlighting surface curvature",
    depth: "Pure pitch-black void isolating the luminous sculpted marble form",
    objectBehavior: "Chiseled solid stone form rotating slowly in timeless space",
    scrollBehavior: "Raw marble block → chisel carving marks → polished curvature reveal → timeless sculpture",
    transition: "Chiaroscuro shadow reveal + stone orbit",
    atmosphere: "Classical Renaissance marble atelier, timeless sculptural weight, reverent silence",
    cssThemeClass: "theme-sculpture",
    fallbackDirective: "Enforce photorealistic Carrara marble micro-veining, dramatic chiaroscuro side lighting, sculpted museum turntable orbit."
  },

  "21_dreamscape": {
    id: "21_dreamscape",
    number: "21",
    name: "DREAMSCAPE",
    tagline: "Weightless Ethereal Cloud Geometry",
    description: "Surreal but elegant environments, atmospheric depth and dreamlike transitions.",
    category: "surreal",
    topicCompatibility: ["dream", "ethereal", "wellness", "beauty", "perfume", "spa", "creative", "meditation", "ambient"],
    background: "radial-gradient(ellipse at center, #2e1065 0%, #1e1b4b 60%, #090317 100%)",
    colorSystem: {
      primary: "#e9d5ff",
      accent: "#f472b6",
      background: "#090317",
      cardBg: "rgba(46, 16, 101, 0.6)",
      text: "#faf5ff"
    },
    typography: {
      fontDisplay: "Playfair Display, serif",
      fontBody: "Inter, sans-serif",
      letterSpacing: "0.1em",
      textTransform: "none"
    },
    lighting: "Soft ambient lavender and sunset peach glow with zero harsh shadows and gentle volumetric fog",
    camera: "Weightless drifting camera floating upward through pastel cloud banks",
    depth: "Infinite ethereal dream horizon with softly floating geometric forms",
    objectBehavior: "Weightless anti-gravity hovering with slow rhythmic floating oscillation",
    scrollBehavior: "Mist veil → floating pastel geometry → weightless product hover → transcendent sunset",
    transition: "Cloud mist dissolve + pastel glow fade",
    atmosphere: "Serene dreamlike transcendence, weightless floating calm, poetic ambient light",
    cssThemeClass: "theme-dreamscape",
    fallbackDirective: "Enforce ethereal dreamlike lighting, soft pastel cloud volume, weightless anti-gravity floating, zero harsh shadows."
  },

  "22_sports_energy": {
    id: "22_sports_energy",
    number: "22",
    name: "SPORTS ENERGY",
    tagline: "Kinetic Velocity & Dynamic Impact",
    description: "Dynamic spatial compositions, controlled speed changes and impact moments.",
    category: "energy",
    topicCompatibility: ["sports", "fitness", "energy", "sneakers", "speed", "athletics", "racing", "performance", "motion"],
    background: "linear-gradient(135deg, #18181b 0%, #09090b 60%, #450a0a 100%)",
    colorSystem: {
      primary: "#ef4444",
      accent: "#f59e0b",
      background: "#09090b",
      cardBg: "rgba(24, 24, 27, 0.8)",
      text: "#ffffff"
    },
    typography: {
      fontDisplay: "Inter, sans-serif",
      fontBody: "Inter, sans-serif",
      letterSpacing: "0.06em",
      textTransform: "uppercase"
    },
    lighting: "High-intensity athletic arena stadium floodlights with fiery speed streak trails",
    camera: "Dynamic speed-ramping tracking shot with sudden deceleration on impact",
    depth: "Diagonal spatial thrust lines slicing aggressively through the viewport",
    objectBehavior: "High-speed rotation exploding into hero pose at peak acceleration",
    scrollBehavior: "Kinetic coiled tension → sudden explosive thrust → mid-air freeze-frame → hero landing",
    transition: "Velocity blur streak + impact freeze",
    atmosphere: "Championship adrenaline, raw muscular power, explosive kinetic precision",
    cssThemeClass: "theme-sports-energy",
    fallbackDirective: "Enforce dynamic athletic motion blur, stadium floodlight flare, aggressive diagonal composition, impact freeze-frame."
  },

  "23_earth_planet": {
    id: "23_earth_planet",
    number: "23",
    name: "EARTH / PLANET",
    tagline: "Planetary Scale & Topographic Vista",
    description: "Large environmental scale, atmospheric lighting, geographic storytelling and planetary depth.",
    category: "environment",
    topicCompatibility: ["earth", "planet", "travel", "nature", "geography", "sustainability", "climate", "space", "landscape"],
    background: "radial-gradient(circle at 50% 60%, #0c4a6e 0%, #082f49 50%, #020617 100%)",
    colorSystem: {
      primary: "#38bdf8",
      accent: "#34d399",
      background: "#020617",
      cardBg: "rgba(12, 74, 110, 0.6)",
      text: "#f0f9ff"
    },
    typography: {
      fontDisplay: "Cinzel, serif",
      fontBody: "Inter, sans-serif",
      letterSpacing: "0.16em",
      textTransform: "uppercase"
    },
    lighting: "Solar orbital rim light cresting the Earth's atmospheric curvature against deep space",
    camera: "Monumental orbital descent from outer atmosphere down into continental topography",
    depth: "Vast planetary curvature with volumetric cloud layers suspended above terrain",
    objectBehavior: "Planetary rotation with terrain relief displacement and cloud shadow sweeps",
    scrollBehavior: "Deep orbital space → atmospheric entry cloud pass → continental mountain sweep → hero locale",
    transition: "Atmospheric cloud pass + orbital descent",
    atmosphere: "Overwhelming planetary majesty, blue atmospheric limb glow, orbital silence",
    cssThemeClass: "theme-earth-planet",
    fallbackDirective: "Enforce photorealistic Earth atmospheric rim light, detailed terrain elevation mapping, volumetric cloud shadows, orbital vista."
  },

  "24_data_dimension": {
    id: "24_data_dimension",
    number: "24",
    name: "DATA DIMENSION",
    tagline: "Volumetric Telemetry & Spatial Analytics",
    description: "3D data visualization, spatial charts, information layers and numerical storytelling.",
    category: "data",
    topicCompatibility: ["data", "finance", "analytics", "crypto", "trading", "dashboard", "fintech", "ai", "cloud", "saas"],
    background: "radial-gradient(circle at 50% 30%, #064e3b 0%, #022c22 40%, #020617 100%)",
    colorSystem: {
      primary: "#10b981",
      accent: "#38bdf8",
      background: "#020617",
      cardBg: "rgba(6, 78, 59, 0.7)",
      text: "#ecfdf5"
    },
    typography: {
      fontDisplay: "JetBrains Mono, monospace",
      fontBody: "Inter, sans-serif",
      letterSpacing: "0.1em",
      textTransform: "uppercase"
    },
    lighting: "Glowing data coordinate nodes with volumetric green and cyan light pulses along network edges",
    camera: "Isometric 45° fly-through navigating complex 3D financial and metric nodes",
    depth: "Stacked isometric data planes with floating numerical telemetry ribbons",
    objectBehavior: "Dynamic bar height growth, network node interconnectivity pulse, volumetric graph reveal",
    scrollBehavior: "Raw data point cascade → node network formation → volumetric chart elevation → real-time insight",
    transition: "Node link trace + data cascade",
    atmosphere: "High-frequency quantitative precision, crystalline digital intelligence, clean financial mastery",
    cssThemeClass: "theme-data-dimension",
    fallbackDirective: "Enforce volumetric 3D data nodes, glowing network interconnect ribbons, monospace financial typography, dark trading terminal aura."
  },

  "25_signature_hybrid": {
    id: "25_signature_hybrid",
    number: "25",
    name: "SIGNATURE HYBRID",
    tagline: "Adaptive Smart Engine (Default)",
    description: "An intelligent adaptive preset that combines the most appropriate visual behaviors from the other presets according to the topic.",
    category: "hybrid",
    topicCompatibility: ["*"],
    background: "radial-gradient(circle at 50% 30%, rgba(122, 17, 40, 0.3) 0%, #07090e 75%)",
    colorSystem: {
      primary: "#c9a675",
      accent: "#f59e0b",
      background: "#07090e",
      cardBg: "rgba(22, 31, 49, 0.8)",
      text: "#ffffff"
    },
    typography: {
      fontDisplay: "Cinzel, serif",
      fontBody: "Inter, sans-serif",
      letterSpacing: "0.12em",
      textTransform: "uppercase"
    },
    lighting: "Multi-layered hybrid cinematic studio lighting with adaptive rim color grading",
    camera: "Smart responsive multi-mode camera matching narrative stage pacing",
    depth: "5-stage visual metamorphosis scrollytelling depth engine with canvas scrub simulation",
    objectBehavior: "5-stage progressive morphological transformation from raw bud to hero product standing silhouette",
    scrollBehavior: "0-20% Origin Bud → 20-40% Full Bloom → 40-60% Molten Extraction → 60-80% Mold Casting → 80-100% Standing Hero",
    transition: "Intelligent multi-stage metamorphosis transition",
    atmosphere: "Awwwards-level luxury storytelling, rich velvety shadows, tactile craftsmanship",
    cssThemeClass: "theme-signature-hybrid",
    fallbackDirective: "Enforce 1:1 photorealism, tactile surface micro-textures, 85mm prime lens, f/2.8 shallow depth of field, natural subsurface scattering."
  }
};

/**
 * Intelligent topic-to-preset recommendation algorithm
 * Analyzes topic words, brand, product, and feeling to select the best 3D Storytelling Preset
 */
function recommendStory3DPreset(topicText) {
  if (!topicText || typeof topicText !== "string" || !topicText.trim()) {
    return story3dPresets["25_signature_hybrid"];
  }

  const query = topicText.toLowerCase();

  let bestPreset = story3dPresets["25_signature_hybrid"];
  let maxScore = 0;

  Object.values(story3dPresets).forEach(preset => {
    if (preset.id === "25_signature_hybrid") return;
    let score = 0;

    preset.topicCompatibility.forEach(kw => {
      if (query.includes(kw)) {
        score += 3;
      }
    });

    if (query.includes(preset.name.toLowerCase())) score += 5;
    if (query.includes(preset.category.toLowerCase())) score += 2;

    if (score > maxScore) {
      maxScore = score;
      bestPreset = preset;
    }
  });

  return bestPreset;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { story3dPresets, recommendStory3DPreset };
}
