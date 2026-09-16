# ANTIGRAVITY — 25 DYNAMIC 3D STORYTELLING PRESET ENGINE

## PROJECT OBJECTIVE

Update the existing website/application.

Do NOT rebuild the existing project.

Do NOT remove existing functionality.

Do NOT break the current search, navigation, storytelling, animations, product data, preset system, or responsive behavior.

The goal is to create a reusable **25-PRESET 3D STORYTELLING ENGINE** that can be used for any topic, product, brand, campaign, portfolio, service, or story.

The system must dynamically adapt:

- Visual style
- 3D behavior
- Camera movement
- Typography
- Lighting
- Depth
- Transitions
- Scroll choreography
- Object behavior
- Atmosphere
- Interaction style

to the selected topic and preset.

---

# 01 — CORE SYSTEM

Create:

## `CHOOSE PRESET`

with exactly **25 premium 3D storytelling presets**.

The presets must NOT simply change colors.

Each preset must represent a different creative direction.

The selected preset changes the **presentation language**, while preserving the underlying:

- Content
- Topic
- Product
- Brand
- Images
- Videos
- CTA
- Business logic

---

# 02 — TOPIC-AWARE ENGINE

The engine must analyze the user's topic and determine the most suitable visual storytelling approach.

Supported topic families should include, but not be limited to:

- Product
- Beauty
- Fashion
- Technology
- AI
- Real Estate
- Architecture
- Automotive
- Food
- Travel
- Nature
- Education
- Finance
- Healthcare
- Art
- Music
- Sports
- Gaming
- Sustainability
- Luxury
- Portfolio
- Events
- Corporate
- Creative campaigns

Do not restrict the system to these categories.

If a completely new topic is entered, intelligently adapt the visual language.

The system must never force an inappropriate 3D style onto a topic.

---

# 03 — EXACTLY 25 PRESETS

Create exactly these presets:

### 01 — CINEMATIC FILM
Dark cinematic environments, slow camera movement, dramatic reveals and film-like transitions.

### 02 — LUXURY FASHION
Editorial typography, oversized imagery, asymmetric compositions and runway-inspired movement.

### 03 — FUTURE TECH
Spatial interfaces, controlled 3D objects, futuristic lighting and technological transitions.

### 04 — ARCHITECTURAL
Large-scale spatial compositions, structural reveals, camera travel and architectural depth.

### 05 — PRODUCT CINEMA
Hero-product focus, macro presentation, controlled rotation, reflections and premium lighting.

### 06 — ORGANIC NATURE
Organic movement, natural textures, atmospheric depth and environmental transitions.

### 07 — MINIMAL 3D
Extreme whitespace, one primary visual object, restrained movement and sophisticated typography.

### 08 — GLASS WORLD
Transparent layers, reflections, depth planes and elegant glass-like spatial composition.

Do not create excessive glassmorphism.

### 09 — CHROME FUTURE
Metallic surfaces, reflections, hard highlights and futuristic spatial transitions.

### 10 — PAPER / EDITORIAL
Layered planes, editorial layouts, page-like transitions and dimensional typography.

### 11 — LIQUID
Fluid transitions, flowing forms, smooth morphing and organic movement.

### 12 — PARTICLE UNIVERSE
Particles assemble, transform and dissolve to create cinematic spatial storytelling.

Keep particle counts performance-conscious.

### 13 — MACRO WORLD
Extreme close-ups, texture, shallow depth of field and slow detail reveals.

### 14 — PARALLAX DIMENSION
Multiple depth layers moving at different speeds to create a strong 3D illusion.

### 15 — MUSEUM / ART
Gallery-like presentation, dramatic lighting, isolated objects and slow camera movement.

### 16 — NEON NIGHT
Controlled neon lighting, dark environments and atmospheric depth.

Avoid gaming aesthetics.

### 17 — RETRO FUTURE
Modern 3D combined with tasteful retro-futuristic typography and composition.

### 18 — TYPOGRAPHIC 3D
Typography becomes part of the spatial environment.

Words can move through depth, mask imagery and interact with scrolling.

### 19 — BLUEPRINT
Technical lines, grids, measurements, diagrams and structured spatial reveals.

### 20 — SCULPTURE
Present the subject like a museum-quality sculpture.

Use slow camera orbit, dramatic shadows and controlled composition.

### 21 — DREAMSCAPE
Surreal but elegant environments, atmospheric depth and dreamlike transitions.

Avoid random fantasy effects.

### 22 — SPORTS ENERGY
Dynamic spatial compositions, controlled speed changes and impact moments.

Avoid constant fast movement.

### 23 — EARTH / PLANET
Large environmental scale, atmospheric lighting, geographic storytelling and planetary depth.

### 24 — DATA DIMENSION
3D data visualization, spatial charts, information layers and numerical storytelling.

Prioritize clarity.

### 25 — SIGNATURE HYBRID
An intelligent adaptive preset that combines the most appropriate visual behaviors from the other presets according to the topic.

This is the default smart preset.

---

# 04 — REUSABLE PRESET ARCHITECTURE

Do NOT create 25 separate websites.

Build one reusable preset engine.

Each preset should be configuration-driven.

Recommended structure:

```text
Preset
├── id
├── name
├── description
├── category
├── topicCompatibility
├── background
├── colorSystem
├── typography
├── lighting
├── camera
├── depth
├── objectBehavior
├── scrollBehavior
├── transition
├── hover
├── cursor
├── atmosphere
├── sectionStyle
└── performanceProfile
```

If an equivalent architecture already exists, extend it rather than creating another system.

---

# 05 — 3D CAMERA ENGINE

Create a reusable camera system supporting:

- Slow push-in
- Slow pull-out
- Orbit
- Horizontal tracking
- Vertical movement
- Depth travel
- Object reveal
- Camera focus
- Perspective shift

IMPORTANT:

Use **one primary camera intention per scene**.

Do not stack:

`orbit + zoom + pan + rotate + shake`

simultaneously.

Camera movement must feel deliberate and cinematic.

---

# 06 — SCROLL STORY ENGINE

Scrolling controls the narrative.

Core sequence:

**SCROLL → CAMERA → OBJECT → TYPOGRAPHY → TRANSITION**

Default storytelling structure:

### 0–20%
ARRIVAL

### 20–40%
REVEAL

### 40–60%
TRANSFORMATION

### 60–80%
DETAIL

### 80–100%
FINAL HERO + CTA

Adapt the sequence according to the topic.

---

# 07 — STORY RHYTHM

Never animate everything simultaneously.

Use:

**MOVE → PAUSE → REVEAL → MOVE → PAUSE → IMPACT**

Include moments of stillness.

Stillness is part of the cinematic experience.

---

# 08 — PRESET TRANSITION LANGUAGE

Each preset must have its own transition vocabulary.

Examples:

**Cinematic Film**  
Crossfade + depth

**Luxury Fashion**  
Image mask + typography

**Future Tech**  
Spatial displacement

**Architectural**  
Camera travel

**Liquid**  
Fluid morph

**Particle Universe**  
Particle dissolve

**Paper / Editorial**  
Plane/page transition

**Blueprint**  
Line/grid reveal

**Sculpture**  
Camera orbit

Do not use one universal transition for all 25 presets.

---

# 09 — 3D OBJECT ENGINE

When appropriate, support:

- Rotation
- Scale
- Morph
- Assembly
- Disassembly
- Floating
- Depth movement
- Material change
- Light response
- Particle transformation
- Camera orbit

Only use behaviors that make conceptual sense.

The system must understand that:

**visual style should support the subject, not overpower it.**

---

# 10 — CHOOSE PRESET UI

Create a premium:

## `CHOOSE PRESET`

selector.

Display:

- Number
- Name
- Description
- Optional visual preview
- Active state
- Smooth transition

Example:

```text
CHOOSE PRESET

01  CINEMATIC FILM
02  LUXURY FASHION
03  FUTURE TECH
04  ARCHITECTURAL
05  PRODUCT CINEMA
06  ORGANIC NATURE
...
25  SIGNATURE HYBRID
```

Keep the selector compact.

Do not create a large dashboard.

---

# 11 — SEARCH + PRESET

If a search interface exists, integrate:

`CHOOSE PRESET`

into the search experience.

Suggested:

```text
[ SEARCH TOPIC... ] [ CHOOSE PRESET ▾ ]
```

When a topic is entered:

1. Analyze the topic.
2. Recommend the most suitable preset.
3. Show the recommendation.
4. Allow manual selection of all 25 presets.
5. Preserve the selected topic.
6. Preserve existing content.

---

# 12 — SMART PRESET RECOMMENDATION

Examples:

`Luxury perfume`

→ Product Cinema

Alternative → Luxury Fashion

`Modern skyscraper`

→ Architectural

`AI platform`

→ Future Tech

`Organic skincare`

→ Organic Nature / Macro World

`Investment dashboard`

→ Data Dimension

`Fashion campaign`

→ Luxury Fashion

`Museum exhibition`

→ Museum / Art

`Travel destination`

→ Earth / Planet

`Creative portfolio`

→ Signature Hybrid

Do not hard-code only these examples.

Create a scalable topic-to-preset compatibility system.

---

# 13 — PRESET PREVIEW

On desktop hover:

- Show a subtle preview.
- Animate only the preview.
- Do not change the active experience.

On mobile:

Use tap interaction.

Keep previews lightweight.

---

# 14 — PRODUCT / CONTENT PROTECTION

If a real product image exists:

**USE THE REAL PRODUCT.**

Do not replace it with generic AI imagery.

Preserve:

- Logo
- Packaging
- Shape
- Proportions
- Product name
- Label
- Colors
- Materials
- Recognizable details

Improve only the presentation around it.

---

# 15 — PERFORMANCE

Do NOT load every heavy 3D system simultaneously.

Use:

- Lazy loading
- Dynamic imports
- Selective asset loading
- GPU-friendly transforms
- Efficient rendering
- Reduced particles on mobile
- Adaptive quality
- Asset preloading only when necessary

Only activate expensive systems required by the selected preset.

---

# 16 — MOBILE ADAPTATION

Every preset must have a mobile behavior.

Do not simply scale desktop.

On mobile:

- Simplify 3D
- Reduce camera movement
- Reduce particles
- Reduce blur
- Reduce expensive effects
- Preserve storytelling
- Maintain typography hierarchy
- Keep controls touch-friendly

No horizontal overflow.

---

# 17 — ACCESSIBILITY

Support:

`prefers-reduced-motion: reduce`

When enabled:

- Reduce camera movement.
- Reduce 3D transforms.
- Reduce parallax.
- Reduce particles.
- Preserve content.
- Preserve hierarchy.
- Preserve usability.

---

# 18 — EXISTING WEBSITE PROTECTION

Before implementation:

1. Inspect current architecture.
2. Inspect existing search.
3. Inspect existing preset system.
4. Inspect existing 3D components.
5. Inspect existing scroll engine.
6. Inspect existing animations.
7. Reuse existing systems.
8. Avoid duplicate components.
9. Do not remove working functionality.
10. Do not change business logic.
11. Do not change product information.

If an existing system already performs part of this requirement:

**EXTEND IT INSTEAD OF REPLACING IT.**

---

# 19 — QUALITY CONTROL

The 25 presets must be genuinely different.

Do NOT create:

> 25 versions of the same website with different colors.

Differences must be visible in:

- Camera
- Depth
- Lighting
- Typography
- Transitions
- Object behavior
- Scroll rhythm
- Atmosphere
- Composition

---

# 20 — FINAL VALIDATION

Test all 25 presets.

For each verify:

- Correct loading
- No console errors
- No broken assets
- No layout shift
- Scroll works
- Preset switching works
- Search works
- Desktop works
- Tablet works
- Mobile works
- Content remains intact
- CTA remains functional
- No horizontal overflow
- Performance remains acceptable

---

# FINAL CREATIVE-DIRECTOR PASS

After technical testing, inspect the experience visually.

Ask:

- Does the topic immediately communicate its identity?
- Does the chosen preset feel appropriate?
- Does the product/content remain the hero?
- Does scrolling feel cinematic?
- Are there moments of anticipation?
- Are transitions seamless?
- Does typography feel intentional?
- Is there enough negative space?
- Is anything repetitive?
- Is anything excessive?
- Does anything look like a generic AI website?
- Does mobile still feel premium?

Fix weak areas.

---

# FINAL EXECUTION

Follow this exact workflow:

### PHASE 1
Inspect.

### PHASE 2
Audit.

### PHASE 3
Identify missing functionality.

### PHASE 4
Identify weak visual areas.

### PHASE 5
Build/extend the reusable preset engine.

### PHASE 6
Implement all 25 presets.

### PHASE 7
Connect topic analysis.

### PHASE 8
Connect `CHOOSE PRESET`.

### PHASE 9
Implement live preset switching.

### PHASE 10
Test every preset.

### PHASE 11
Optimize performance.

### PHASE 12
Test responsive behavior.

### PHASE 13
Perform final cinematic art-direction pass.

---

# SUCCESS CRITERIA

The final system must allow:

**ENTER TOPIC → GET SMART PRESET → CHOOSE ANY OF 25 PRESETS → EXPERIENCE 3D STORY → SCROLL THROUGH NARRATIVE → REACH FINAL CTA**

The result should feel like:

> **ONE CONTENT ENGINE + 25 DISTINCT CINEMATIC ART DIRECTIONS**

Not 25 duplicated websites.

Not 25 color themes.

Not a generic animation library.

A true **topic-aware 3D storytelling engine**.

**Make every preset distinctive, intelligent, cinematic, responsive, performant and production-ready.**
