# Master Project Specification: MEERUB Haute Beauty Atelier
## 100% Step-by-Step Architecture, Cinematic Asset Pipeline & Production Build Blueprint

---

## 1. Executive Overview & Brand Strategy

### 1.1 Brand Identity
- **Brand / Maison Name:** `MEERUB Haute Beauty Atelier` (Operating as **MEERUB**)
- **Product Classification:** Luxury Beauty Salon, Couture Cosmetic Artistry & Bespoke Bridal Suites
- **Brand Ethos:** *"A beauty, reimagined."* — Where high-fashion French haute couture meets organic botanical alchemy.
- **Tone & Aesthetic:** Ultra-luxury, romantic, couture-grade, cinematic, and editorial — echoing Vogue Paris, Place Vendôme jewelry ateliers, and luxury runway campaigns.

### 1.2 Business & Conversion Objectives
1. **VIP Atelier Reservations:** Convert high-net-worth brides, celebrity stylists, and gala attendees into private atelier appointments.
2. **Product Artifact Acquisitions:** Showcase limited-edition cosmetic artifacts with direct checkout / inquiry.
3. **VIP Correspondence Acquisition:** Build an exclusive private clientele registry for seasonal couture drops.
4. **Digital Brand Authority:** Establish the premier 3D scrollytelling benchmark for luxury beauty websites worldwide.

---

## 2. Global Design System & Aesthetic Tokens

### 2.1 Color Palette
```css
:root {
  /* Surface Foundations */
  --bg-noir: #0A0506;             /* Obsidian Burgundy (Hero & Canvas base) */
  --bg-deep: #070304;             /* Deep Contrast Noir (Sections & Footer) */
  --bg-surface: #12090B;          /* Elevated Glass Card Surface */
  --bg-surface-elevated: #1A0D10; /* Hover and active element surface */

  /* Typography & High-Contrast Accents */
  --text-ivory: #F5ECE6;          /* Primary Display Ivory (Warm, Editorial) */
  --text-cream: #FBF6F0;          /* Display Headings & Highlights */
  --text-muted: rgba(245, 236, 230, 0.68); /* Editorial paragraph copy */
  --text-dim: rgba(245, 236, 230, 0.40);   /* Metadata & labels */

  /* Haute Brand Accents */
  --accent-gold: #C9A675;         /* Primary Beauty Gold (Scroll bar & badges) */
  --accent-gold-rich: #D4AF37;    /* 24K Rich Gold (Active CTAs & Keyframes) */
  --accent-beauty: #7A1128;       /* Deep Velvet Beauty (Garnet brand mark) */
  --accent-rose: #E2A89B;         /* Silk Rose Gold (Subtle borders & glows) */

  /* Gilded Borders & Translucency */
  --border-gold-subtle: rgba(201, 166, 117, 0.20);
  --border-gold-bright: rgba(212, 175, 55, 0.50);
  --glass-bg: rgba(18, 9, 11, 0.75);
}
```

### 2.2 Typography Hierarchy
- **Display Headings & Editorial Statements:** `Italiana`, `Fraunces`, `Playfair Display`, or `Cormorant Garamond` (Italicized moments, serif display, letter-spacing `-0.02em` to `+0.05em`).
- **Body, Nav & Metadata:** `Inter` or `Plus Jakarta Sans` (300 Light, 400 Regular, 500 Medium with uppercase letter-spacing `3px` to `6px`).

### 2.3 Structural & Motion Directives
- **Layout Constraint:** `overflow-x: clip;` on `html` and `body` (Never `overflow-x: hidden` which disables sticky positioning).
- **Smooth Scrolling:** Lenis smooth scrolling (`lerp: 0.1`, `autoRaf: false`, synced with GSAP ticker).
- **Motion Engine:** GSAP 3.12+ with `ScrollTrigger` and `Flip`.

---

## Section: Visual Atmosphere & Emotional Tone Presets

### UI Component Specification
* **Component Type:** Searchable Combobox / Select Dropdown.
* **Component ID:** `#visual-atmosphere-selector`
* **Behavior:** When a preset is selected, prepend or inject the selected atmospheric tone descriptor into the scene context block with the key: `[Visual Atmosphere: <DIRECTIVE>]`.
* **UI Label:** `Atmosphere & Mood Profile`

---

### Atmosphere & Feeling Matrix (20 Presets)

1. **Liminal Melancholy & Desolation**
   * **Directive:** `Quiet psychological unease, vacant architecture, sterile overhead fluorescents, vast negative space, low hum of spatial isolation, desaturated neutral tones.`

2. **Dystopian Industrial Decay**
   * **Directive:** `Heavy rust textures, choked toxic haze, oppressive industrial brutalism, soot-covered steel, corrosive acid-wash palette, palpable grit and mechanical neglect.`

3. **Sublime Ethereal Transcendence**
   * **Directive:** `Dreamlike ambient luminance, soft heavenly bloom, pristine volumetric light shafts, weightless spiritual tranquility, high-key cream and opalescent hues.`

4. **Foreboding Nordic Noir**
   * **Directive:** `Bleak overcast skies, bone-chilling mist, muted slate-gray and pine-green palettes, relentless tension, austere coastal terrain, suppressed dread.`

5. **Nostalgic Sun-Drenched Americana**
   * **Directive:** `Radiant midsummer haze, warm retro amber glow, heat shimmers across asphalt, carefree vintage Americana warmth, saturated Kodachrome feel.`

6. **Neo-Noir Rainy Cybernetic Isolation**
   * **Directive:** `Slick wet asphalt reflections, cold cobalt shadows punctuated by lonely red neon, dense damp air, solitary introspective mood, late-night urban solitude.`

7. **Primal Primordial Dread**
   * **Directive:** `Suffocating jungle canopy, damp mossy low-light, ancient untamed nature, heavy air pressure, camouflaged predatory silence, earthy umber and deep emeralds.`

8. **Sterile High-Tech Apathy**
   * **Directive:** `Clinical white corridors, cold surgical lighting, glossy reflective polymer finishes, emotional detachment, immaculate order, monochrome gray with sharp icy highlights.`

9. **Cosmic Eldritch Vastness**
   * **Directive:** `Incomprehensible scale, deep void blackness, alien nebular glows, swirling celestial dust, profound existential dread and awe, ultraviolet and violet gradients.`

10. **Warm Hearthside Intimacy**
    * **Directive:** `Crackle of low embers, soft wool textures, golden flickering candlelight, deep comforting shadows, comforting domestic security, burnt sienna and deep umber.`

11. **Surrealist Fever-Dream Haze**
    * **Directive:** `Shifting spatial logic, intoxicating warm colors, melting horizon gradients, disorienting beauty, heavy hypnotic air, warped daytime logic.`

12. **Gothic Victorian Gloom**
    * **Directive:** `Candle-lit cobwebs, bruised storm skies, cold granite masonry, decaying velvet drapes, romantic gloom, deep black, plum, and tarnished gold.`

13. **Vibrant Solarpunk Optimism**
    * **Directive:** `Sunlit lush rooftop gardens, clean sustainable urban curves, clear cascading water, radiant morning sunlight, revitalizing energy, bright emerald, terracotta, and sky blue.`

14. **High-Octane Claustrophobic Panic**
    * **Directive:** `Strobe-lit industrial red warnings, rapid erratic light changes, visual compression, claustrophobic framing, raw fight-or-flight kinetic urgency, harsh black and emergency crimson.`

15. **Hazy Late-Night Lo-Fi Chill**
    * **Directive:** `Soft sodium-vapor lamp spill, dusty incandescent grain, warm bedroom shadows, nostalgic cassette-tape calm, muted lavender, dusty orange, and slate.`

16. **Sun-Bleached Desert Solitude**
    * **Directive:** `Blinding arid midday sun, bone-dry cracked ground, bleached white highlights, heat-baked sand drifts, wind-scoured stillness, ochre, sand, and pale sky.`

17. **Haunted Pastoral Serenity**
    * **Directive:** `Golden wheat fields beneath bruised purple storm clouds, eerie stillness before the gale, wind-whipped tall grass, bittersweet rural beauty, amber and brooding indigo.`

18. **Gilded Opulence & Decadence**
    * **Directive:** `Shimmering polished marble, cascading crystal chandeliers, heavy gold-leaf filigree, dizzying excess, intoxicating wealth, warm champagne, velvet crimson, and bright gold.`

19. **Murky Abyssal Depths**
    * **Directive:** `Total light extinction, bioluminescent flickers, dense aquatic particle backscatter, crushing hydrostatic pressure, alien underwater mystery, deep teal, ink-black, and neon cyan.`

20. **Post-War Silent Ruin**
    * **Directive:** `Settled dust hanging motionless in shattered daylight, hollow concrete skeletons, nature slowly reclaiming urban debris, quiet solemnity, ash gray, washed-out moss, and pale chalk.`

---

## 3. Complete 100% Step-by-Step Production Workflow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    THE 6-STEP PRODUCTION PIPELINE                       │
├─────────────┬───────────────────────────────────────────────────────────┤
│ STEP 1      │ NANO BANANA 2: Reference-Chained Image Suite (01 ➔ 10)    │
│ STEP 2      │ VEO 3.1: Video Motion Choreography (V01 ➔ V06)            │
│ STEP 3      │ FFmpeg AUTOMATION: Stitch, Keyframe Re-encode & Extract   │
│ STEP 4      │ PROJECT DIRECTORY: Structured Asset Trees (images/videos) │
│ STEP 5      │ ANTIGRAVITY MASTER BUILD: 8-Section Scrollytelling Engine │
│ STEP 6      │ DEPLOYMENT: Git, GitHub & Edge CDN (Netlify / Vercel)     │
│ OPTIONAL 7  │ SUITE EXPANSION & SECTION POLISH: Lineup & Ritual Cards   │
└─────────────┴───────────────────────────────────────────────────────────┘
```

---

### Step 1 of 6: Nano Banana 2 — Chained Image Generation

> [!IMPORTANT]
> **Generation Rule:** Generate all images in a single continuous session. Never jump back and forth. Upload each generated image as the reference for the prompt that immediately follows.

#### 1.1 The Shared Style Language (Mandatory Anchor)
Include this exact optical and color phrasing in every single image prompt:
```text
Dark background transitioning from deep burgundy near the center to black at the edges, shot on a RED cinema camera with 85mm lens at f/4, single dramatic softbox key light from above plus a secondary soft fill light angled upward from below to evenly illuminate the full stem, subtle rim light on the petal edges, tack-sharp macro detail, luxury beauty commercial color grading, ultra photorealistic 8K, no people, no text overlay, no watermark, flower head centered not top-heavy, continuous unbroken stem, no cropping, no black or unlit sections.
```

---

#### 1.2 Sequential Image Prompts

##### Prompt 01 — Small Closed Beautybud
- **File Name:** `beauty salon-01-beauty-small-bud.jpeg`
- **Reference:** None (First image in sequence)
```text
A single red beautybud on its stem, the flower head's center point positioned at the exact vertical and horizontal center of the frame — not the overall composition, the flower head itself must be centered, with the top of the beauty details reaching no higher than 15 percent from the top edge of the frame, the beauty noticeably large and dominant, filling close to 65 percent of the frame width, beauty details fully closed and compact with fine visible water droplets, the stem continuing downward from the flower head in one unbroken continuous line all the way to the bottom edge of the frame with no gap, no cut, no missing section, delicate green stem with small thorns clearly visible and evenly lit along its entire length with no dark or underexposed areas, soft fill light specifically added to keep the lower half of the stem as bright and detailed as the flower head, dark background transitioning from deep burgundy near the center to black at the edges, shot on a RED cinema camera with 85mm lens at f/4, single dramatic softbox key light from above plus a secondary soft fill light angled upward from below to evenly illuminate the full stem, subtle rim light on the petal edges, tack-sharp macro detail, luxury beauty commercial color grading, ultra photorealistic 8K, no people, no text overlay, no watermark, flower head centered not top-heavy, continuous unbroken stem, no cropping, no black or unlit sections.
```

##### Prompt 03 — Beauty Opening Further
- **File Name:** `beauty salon-03-beauty-opening-further.jpeg`
- **Reference:** Upload Image 01
```text
The same red beauty, same exact framing and camera position as the reference image — flower head centered at the exact vertical and horizontal center of frame, continuous unbroken stem visible to the bottom edge — now noticeably more open, several outer beauty details unfurled and curling outward naturally, inner beauty details still loosely gathered, camera holding steady with only a very slight, almost imperceptible push-in compared to the previous frame, same evenly lit stem, same dark burgundy-to-black gradient background, same RED cinema camera 85mm lens at f/4, same softbox key light plus lower fill light on the stem, subtle rim light on petal edges, tack-sharp macro detail, luxury beauty commercial color grading, ultra photorealistic 8K, no people, no text overlay, no watermark, flower head centered not top-heavy, continuous stem, no cropping.
```

##### Prompt 05 — Full MEERUB Metamorphosis
- **File Name:** `beauty salon-05-beauty-full-MEERUB.jpeg`
- **Reference:** Upload Image 03
```text
The same red beauty, same exact framing and camera position as the reference image — flower head centered at the exact vertical and horizontal center of frame, continuous unbroken stem visible to the bottom edge — now in complete full MEERUB, every petal fully open and unfurled, rich velvety texture, the MEERUB at its widest and largest point in the sequence, outermost beauty details reaching close to the left and right edges of frame for maximum dramatic scale, same evenly lit stem, same dark burgundy-to-black gradient background, same RED cinema camera 85mm lens at f/4, same softbox key light plus lower fill light on the stem, subtle rim light on petal edges, tack-sharp macro detail, luxury beauty commercial color grading, ultra photorealistic 8K, no people, no text overlay, no watermark, flower head centered not top-heavy, continuous stem, no cropping.
```

##### Prompt 06 — Beauty Details Falling & Dissolving
- **File Name:** `beauty salon-06-beauty details-falling.jpeg`
- **Reference:** Upload Image 05
```text
The fully MEERUBed red beauty from the reference image, now actively shedding its beauty details in mid-air, multiple large deep-red velvety beauty details captured mid-fall around the central stem, some beauty details beginning to soften and dissolve into fine red liquid droplets as they drop, frozen in mid-motion with slight dynamic motion blur on the falling elements only, the central flower head now partially stripped with inner core exposed, same camera position, same RED cinema camera 85mm lens at f/4, same dramatic softbox lighting with rim light catching the edges of falling beauty details and droplets, same dark burgundy-to-black gradient background, ultra photorealistic 8K, luxury beauty commercial color grading, no people, no text overlay, no watermark.
```

##### Prompt 07 — Molten Beauty Artistry in Chrome Mold
- **File Name:** `beauty salon-07-beauty artistry-mold.jpeg`
- **Reference:** Upload Image 06
```text
The fallen beauty details now fully dissolved into a smooth stream of molten red beauty artistry pouring into a chrome beauty salon mold at the exact center of frame, viscous and glossy under studio lighting, cooling and setting into a precise matte final look shape exactly like real cosmetic manufacturing footage, same camera position, same RED cinema camera 85mm lens at f/4, same softbox key light with rim light, same dark burgundy-to-black gradient background, luxury beauty commercial color grading, ultra photorealistic 8K, no people, no text overlay, no watermark.
```

##### Prompt 08 — Finished Beauty Salon Standing Upright
- **File Name:** `beauty salon-08-finished-standing.jpeg`
- **Reference:** Upload Image 07
```text
A finished beauty salon, cap removed, standing perfectly upright and centered in the exact vertical and horizontal center of frame, precise matte-finish final look fully formed and set, sharp clean edges, no hands, no motion, product completely still as if freshly unmolded and presented, same dark burgundy-to-black gradient background, same RED cinema camera 85mm lens at f/4, single dramatic softbox key light with subtle rim light catching the final look's edge, tack-sharp product detail, luxury beauty commercial color grading, ultra photorealistic 8K, no people, no text overlay, no watermark.
```

##### Prompt 09 — Hand Lifting the Beauty Salon
- **File Name:** `beauty salon-09-hand-picking-up.jpeg`
- **Reference:** Upload Image 08
```text
A woman's manicured hand entering the frame from the lower right with clean nude-pink nails, fingers delicately grasping the lower base of the upright red beauty salon and lifting it upward, mid-motion capture, product tilted slightly as it is picked up, same dark burgundy-to-black gradient background, same RED cinema camera 85mm lens at f/4, same softbox key light with rim light catching both the fingers and the beauty salon surface, ultra photorealistic 8K, luxury beauty commercial color grading, no text overlay, no watermark.
```

##### Prompt 10 — Woman Styling the Final Look (Face Centered)
- **File Name:** `beauty salon-10-woman-styling-front.jpeg`
- **Reference:** Upload Image 09
```text
The same beauty salon now lifted and brought up by a woman's hand, front-on symmetrical view of her face, centered in frame, styling the rich red beauty salon directly to her lips. The woman is strikingly beautiful, model-caliber, early twenties, flawless smooth radiant skin with a natural dewy glow, high cheekbones, full symmetrical lips, large expressive eyes with long lashes, sleek glossy well-groomed hair, the polished flawless look of a top-tier luxury beauty campaign face, soft natural makeup elsewhere on the face so the lips remain the clear focal point, natural skin texture preserved but even-toned and luminous, soft catchlight in her eyes, same dark burgundy-to-black gradient background, same RED cinema camera 85mm lens at f/4, same softbox key light with rim light, shallow depth of field with background softly blurred, luxury beauty commercial color grading, ultra photorealistic 8K, no text overlay, no watermark.
```

---

### Step 2 of 6: Veo 3.1 — Video Motion Prompts

## Section: Veo 3.1 Style Fallback Directives (Append If Drifting)

### UI Component Specification
* **Component Type:** Interactive Select / Dropdown with 20 selectable presets.
* **Component ID:** `#veo-fallback-selector`
* **Behavior:** When a preset is selected, copy the exact fallback string to the clipboard or automatically append it to the active prompt generator output with the delimiter: `\n\n--style-fallback: `.
* **UI Label:** `Veo 3.1 Style Lock & Drift Remediation`

---

### Fallback Directives Matrix (20 Presets)

1. **Photorealistic Macro Drift Lock**
   * **Directive:** `Enforce 1:1 photorealism, tactile surface micro-textures, 85mm prime lens, f/2.8 shallow depth of field, natural subsurface scattering, zero edge halos, authentic sensor noise, eliminate waxy AI skin and smooth synthetic plastic artifacts.`

2. **Cinematic 35mm Film Fidelity**
   * **Directive:** `Enforce 35mm Eastman Kodak Vision3 500T film grain, subtle halation on high-contrast edges, organic gate weave, anamorphic lens flare artifacts, natural motion blur at 1/48 shutter angle, zero hyper-sharpening.`

3. **Hyper-Stylized Cyberpunk & Neon Noir**
   * **Directive:** `Lock volumetric atmospheric haze, cyan and magenta chromatic separation, specular puddle reflections with raytraced accuracy, high-contrast dynamic shadows, diffuse neon lighting, suppress flat uniform exposure.`

4. **Strict Architectural Structural Rigidity**
   * **Directive:** `Enforce straight, non-warping orthogonal lines, perfect two-point perspective, accurate load-bearing physics, unyielding geometric corners, zero floating or mutating structural elements.`

5. **Fluid Dynamics & Viscosity Lock**
   * **Directive:** `Strict Navier-Stokes fluid movement, coherent surface tension, accurate particle splash dissipation, liquid refractive transparency, eliminate blobby floating mass or reverse-gravity water artifacts.`

6. **Natural Anatomical Proportions & Hands**
   * **Directive:** `Strict anatomical adherence, exact 5-finger articulation, defined bone structure and knuckles, consistent pupillary gaze vector, non-sliding foot-to-ground contact, eliminate phantom limbs and limb morphing.`

7. **Documentary 16mm Handheld Realism**
   * **Directive:** `Simulated 16mm Bolex camera, natural micro-jitter, dynamic human breathing camera drift, uncorrected vintage lens vignette, authentic available light clipping, eliminate automated robotic camera tracks.`

8. **Hard Light High-Fashion Editorial**
   * **Directive:** `Single-source high-contrast directional spotlight, deep crisp cast shadows, reflective metallic highlights, stark chiaroscuro balance, editorial matte skin finish, eliminate ambient lighting wash.`

9. **Vintage 1970s Technicolor Palette**
   * **Directive:** `Three-strip Technicolor saturation profile, rich organic reds and amber greens, slightly soft edge contrast, warm tungsten color balance, analog film print stock degradation, eliminate modern digital clean look.`

10. **Atmospheric Aerial FPV Kinetic Consistency**
    * **Directive:** `Consistent forward momentum vector, rotational physics matching fixed-pitch drone dynamics, dynamic rolling shutter simulation, coherent landscape motion blur, eliminate sudden visual coordinate snapping.`

11. **Ethereal Golden Hour Low-Angle Warmth**
    * **Directive:** `Low-horizon sun angle at 8 degrees, long sweeping cast shadows, high-key warm ambient backlight, edge rim lighting on silhouettes, natural lens flare veil, eliminate cool overcast midtones.`

12. **Monochrome Film Noir & Specular Contrast**
    * **Directive:** `Pure silver-halide black and white, deep crushed blacks, silver-rich highlights, hard Venetian blind shadow casting, heavy textural contrast, eliminate digital mid-tone gray flatness.`

13. **Retro VHS & Analog Video Artifacts**
    * **Directive:** `NTSC 480i video head-switching noise, horizontal magnetic tape scan lines, color bleed on high-saturation reds, slight vertical sync jitter, 4:3 cathode-ray tube aspect ratio framing.`

14. **High-Speed Action & Motion Clarity**
    * **Directive:** `High-speed 120fps capture interpolated cleanly, pin-sharp individual debris and dust physics, zero frame-to-frame ghosting, directional velocity blur, eliminate smeared temporal blending.`

15. **Soft Studio Pastel Commercial Grade**
    * **Directive:** `Diffused 3-point softbox illumination, low dynamic range matte shadows, clean desaturated pastel color grading, immaculate surface cleanliness, eliminate harsh specular micro-reflections.`

16. **Claymation & Stop-Motion Coherence**
    * **Directive:** `Choppy 12fps tactile animation timing, hand-sculpted clay fingerprint imperfections, miniature shallow scale tilt-shift blur, frame-to-frame variable light bounce, eliminate smooth computerized interpolation.`

17. **Dystopian Weather & Particle Density**
    * **Directive:** `Continuous atmospheric occlusion, multi-layered volumetric fog, realistic turbulent snowfall or rain streaks reacting to wind physics, moisture accumulation on lenses, eliminate dry, clear backgrounds.`

18. **Steadicam Horizon & Perspective Stabilization**
    * **Directive:** `Locked three-axis gimbal stabilization, level horizon line, fluid parallax drift across foreground and background layers, zero jittery camera twitching or abrupt focal focal-length zooms.`

19. **Low-Poly Retro 90s Rendering**
    * **Directive:** `Rigid un-antialiased polygon edges, affine texture mapping with slight surface warping, 256-color dithered palette, pixelated bilinear filtering artifacts, eliminate modern high-poly smooth shaders.`

20. **Zero-Gravity Weightlessness & Trajectory**
    * **Directive:** `Zero-G inertia preservation, slow uniform 360-degree rotational drift, cloth and hair suspended in microgravity, frictionless continuous momentum, eliminate downward gravity bias and falling motion.`

---

#### 2.1 Video Motion Clip Matrix

| Clip ID | Start Frame | End Frame | Duration | Target File Name | Motion Objective |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **V01** | `Image 01` | `Image 03` | 2.5s | `beauty salon-v01-beauty-awakens-opens.mp4` | Slow opening of the bud, petals gently unfurling |
| **V02** | `Image 03` | `Image 05` | 1.5s | `beauty salon-v02-beauty-full-MEERUB.mp4` | Accelerated expansion into full velvety bloom |
| **V03** | `Image 05` | `Image 06` | 2.5s | `beauty salon-v03-beauty-details-release.mp4` | Petals detaching and falling in slow motion |
| **V04** | `Image 06` | `Image 07` | 2.0s | `beauty salon-v04-beauty-artistry-forms.mp4` | Dissolving into liquid pigment pouring into chrome mold |
| **V05** | `Image 07` | `Image 08` | 2.0s | `beauty salon-v05-beauty-salon-sets.mp4` | Cooling, solidifying, unmolding into pristine standing product |
| **V06** | `Image 08` | `Image 10` | 4.0s *(Hero)* | `beauty salon-v06-transformation-and-styling.mp4` | Elegant hand pickup, bringing to lips, flawless application |

#### 2.2 Verbatim Veo Motion Prompts

##### V01 — Beauty Awakens and Opens (2.5s)
- **Start Frame:** `beauty salon-01-beauty-small-bud.jpeg`
- **End Frame:** `beauty salon-03-beauty-opening-further.jpeg`
```text
The closed red beauty slowly and smoothly begins to open, outer beauty details unfurling naturally in ultra slow-motion, camera slowly pushing in slightly, maintaining exact center framing on the flower head, studio softbox lighting holding steady, dark burgundy background, tack-sharp macro detail, seamless transition from start frame to end frame.
```

##### V02 — Beauty Reaches Full MEERUB (1.5s)
- **Start Frame:** `beauty salon-03-beauty-opening-further.jpeg`
- **End Frame:** `beauty salon-05-beauty-full-MEERUB.jpeg`
```text
The opening red beauty accelerates smoothly into full, glorious MEERUB, every petal opening to its maximum width, rich velvety texture, flower head fills the frame with dramatic presence, camera holds steady, consistent studio lighting throughout, seamless transition into the end frame.
```

##### V03 — Beauty Details Release (2.5s)
- **Start Frame:** `beauty salon-05-beauty-full-MEERUB.jpeg`
- **End Frame:** `beauty salon-06-beauty details-falling.jpeg`
```text
The fully MEERUBed beauty begins shedding its beauty details in slow motion, multiple beauty details gently detaching and falling through the frame, some beauty details dissolving into fine red liquid droplets mid-air, dramatic rim lighting catching the falling edges, camera holds steady, seamless transition to the end frame.
```

##### V04 — Beauty Details Dissolve into Beauty Artistry (2.0s)
- **Start Frame:** `beauty salon-06-beauty details-falling.jpeg`
- **End Frame:** `beauty salon-07-beauty artistry-mold.jpeg`
```text
The falling beauty details fully liquefy into a rich, glossy stream of molten red beauty artistry pouring smoothly downward into a chrome beauty salon mold, viscous liquid settling into the shape, studio lighting reflecting off the chrome surface, seamless transition into the end frame.
```

##### V05 — Beauty Salon Sets and Stands (2.0s)
- **Start Frame:** `beauty salon-07-beauty artistry-mold.jpeg`
- **End Frame:** `beauty salon-08-finished-standing.jpeg`
```text
The molten beauty artistry cools and solidifies into a perfect matte finish within the mold, the mold slides away smoothly revealing the finished upright beauty salon standing perfectly centered, softbox light sweeps across the matte surface, seamless transition to the end frame.
```

##### V06 — Transformation and Styling Hero Beat (4.0s)
- **Start Frame:** `beauty salon-08-finished-standing.jpeg`
- **End Frame:** `beauty salon-10-woman-styling-front.jpeg`
```text
A woman's manicured hand smoothly enters frame, lifts the finished beauty salon from its base, and in one fluid continuous camera move tilts up to reveal her face as she styles the rich red beauty salon directly to her lips, soft natural expression, catchlight in her eyes, cinematic luxury commercial color grading, seamless transition from start frame to end frame.
```

---

### Step 3 of 6: Antigravity FFmpeg Processing Pipeline

#### 3.1 Processing Directives
- **3a: Raw Clip Stitching:** Concatenate `V01` through `V06` with hard cuts only (no transitions or dissolves).
- **3b: Keyframe Re-encoding (`-g 1`):** Force every frame to be an intra-coded keyframe (`I-frame`) so the browser canvas can scrub instantly with zero decoding latency.
- **3c: 20fps Frame Extraction:** Extract ~373 frames at `960px` width into `frames/frame_%04d.jpg`.

#### 3.2 Terminal Automation Script (`setup_assets.sh`)
```bash
#!/usr/bin/env bash
# ==============================================================================
# MEERUB Atelier Video Asset Automation Script (Step 3 of 6)
# ==============================================================================
set -e

echo "🎬 Step 3: Processing video assets for meerub-beauty-salon..."

# 1. Create required directories
mkdir -p videos images frames

# 2. Generate concatenation manifest
cat << 'EOF' > clips.txt
file 'videos/beauty salon-v01-beauty-awakens-opens.mp4'
file 'videos/beauty salon-v02-beauty-full-MEERUB.mp4'
file 'videos/beauty salon-v03-beauty-details-release.mp4'
file 'videos/beauty salon-v04-beauty-artistry-forms.mp4'
file 'videos/beauty salon-v05-beauty-salon-sets.mp4'
file 'videos/beauty salon-v06-transformation-and-styling.mp4'
EOF

echo "📦 3a — Merging clips in exact sequence: V01 → V02 → V03 → V04 → V05 → V06..."
ffmpeg -y -f concat -safe 0 -i clips.txt -c copy "beauty salon-story-raw.mp4"

echo "⚡ 3b — Re-encoding hero video with GOP=1 (-g 1) for instantaneous canvas scrubbing..."
ffmpeg -y -i "beauty salon-story-raw.mp4" \
  -vf "scale=960:-1" \
  -movflags faststart \
  -vcodec libx264 \
  -crf 20 \
  -g 1 \
  -pix_fmt yuv420p \
  -acodec aac \
  -b:a 128k \
  "beauty salon-story.mp4"

echo "🖼️ 3c — Extracting 20fps JPEG frames into frames/ directory..."
ffmpeg -y -i "beauty salon-story.mp4" \
  -vf "fps=20,scale=960:-1" \
  -q:v 4 \
  "frames/frame_%04d.jpg"

FRAME_COUNT=$(ls -1 frames/frame_*.jpg | wc -l)
echo "✅ Finished! Extracted $FRAME_COUNT frames into frames/ directory."
```

---

### Step 4 of 6: Project Directory Architecture

#### 4.1 Target File Tree
```text
meerub-beauty-salon/
├── index.html                                        ← Single-file production scrollytelling web app
├── MASTER_BUILD_PROMPT.md                            ← Blueprint documentation
├── beauty salon-story.mp4                            ← Merged + GOP=1 re-encoded hero video
├── images/                                           ← Chained & supporting high-res stills
│   ├── beauty salon-01-beauty-small-bud.jpeg
│   ├── beauty salon-03-beauty-opening-further.jpeg
│   ├── beauty salon-05-beauty-full-MEERUB.jpeg
│   ├── beauty salon-06-beauty details-falling.jpeg
│   ├── beauty salon-07-beauty artistry-mold.jpeg
│   ├── beauty salon-08-finished-standing.jpeg
│   ├── beauty salon-09-hand-picking-up.jpeg
│   ├── beauty salon-10-woman-styling-front.jpeg
│   ├── beauty salon-11-beauty-look-lineup.jpeg       (Optional Step 7)
│   ├── beauty salon-12-capped-experience.jpeg        (Optional Step 7)
│   ├── beauty salon-13-second-model-styling.jpeg     (Optional Step 7)
│   └── beauty salon-14-vanity-mirror-scene.jpeg      (Optional Step 7)
├── videos/                                           ← Raw generated clips
│   ├── beauty salon-v01-beauty-awakens-opens.mp4
│   ├── beauty salon-v02-beauty-full-MEERUB.mp4
│   ├── beauty salon-v03-beauty-details-release.mp4
│   ├── beauty salon-v04-beauty-artistry-forms.mp4
│   ├── beauty salon-v05-beauty-salon-sets.mp4
│   └── beauty salon-v06-transformation-and-styling.mp4
└── frames/                                           ← Extracted sequential canvas frames
    ├── frame_0001.jpg
    ├── frame_0002.jpg
    └── frame_0373.jpg
```

#### 4.2 Folder Organization Prompt (Give to Antigravity)
```text
I've dropped a batch of AI-generated images and videos into this folder along with the merged hero video. Please organize them into this exact structure: create an images/ subfolder and move every image file that starts with "beauty salon-" into it (except the merged hero video, which stays in the root); create a videos/ subfolder and move every video file that starts with "beauty salon-v" into it. Once done, show me the final folder tree so I can confirm everything is in the right place.
```

---

### Step 5 of 6: Master Website Build Prompt (Single-File Scrollytelling Engine)

```text
Build a premium luxury beauty salon 3D scroll website called MEERUB using vanilla HTML, CSS, and JavaScript.
The site must feel cinematic, romantic, couture-grade, and highly immersive — a beauty brand film translated into a website.
The hero section should be a scroll-driven cinematic reveal of a beauty MEERUBing and transforming into a beauty salon.
Use GSAP and ScrollTrigger for all scroll-linked motion.
Use Lenis for smooth scrolling.
Use a single-file structure with index.html only.

Use these assets exactly from the project folder:
Hero video: beauty salon-story.mp4
Hero frames: frames/frame_0001.jpg through frames/frame_0373.jpg (4-digit padded, 373 total)
Images: images/beauty salon-01-beauty-small-bud.jpeg, images/beauty salon-03-beauty-opening-further.jpeg, images/beauty salon-05-beauty-full-MEERUB.jpeg, images/beauty salon-06-beauty details-falling.jpeg, images/beauty salon-07-beauty artistry-mold.jpeg, images/beauty salon-08-finished-standing.jpeg, images/beauty salon-09-hand-picking-up.jpeg, images/beauty salon-10-woman-styling-front.jpeg
Videos: videos/beauty salon-v01-beauty-awakens-opens.mp4, videos/beauty salon-v02-beauty-full-MEERUB.mp4, videos/beauty salon-v03-beauty details-release.mp4, videos/beauty salon-v04-beauty artistry-forms.mp4, videos/beauty salon-v05-beauty salon-sets.mp4, videos/beauty salon-v06-transformation-and-styling.mp4

Build the page in this exact order:

1. Hero section.
Create a pinned hero scroll sequence using canvas + pre-extracted image frames from the frames/ directory (373 frames, frame_0001.jpg to frame_0373.jpg).
Load all frames as Image objects. Draw to canvas on scroll using getBoundingClientRect for progress calculation.
Add text overlays that fade in and out at scroll progress ranges:
- progress 0.05-0.15: MEERUB — 110px Fraunces (or Playfair Display) italic #f5ece6 centered.
- progress 0.20-0.30: A beauty, reimagined. — 26px Inter light italic #f5ece6 centered.
- progress 0.40-0.50: Beauty Details become beauty artistry. — 60px Fraunces #f5ece6 centered.
- progress 0.60-0.70: Beauty Artistry becomes couture. — 60px Fraunces #f5ece6 centered.
- progress 0.80-0.90: One beauty look. Every MEERUB. — 12px Inter uppercase letter-spacing 4px #f5ece6 position top 10% left 8%.
Nav: MEERUB fixed top-left, SHOP NOW fixed top-right. 11px Inter, letter-spacing 5px, color #f5ece6, z-index 100.
Progress bar: fixed 2px wide right edge, background #c9a675 (beauty gold), height grows 0 to 100vh as scroll progresses.

2. Sticky MEERUB-to-final look explainer.
Left 50%: product/story image, position sticky top 0, height 100vh. Start with images/beauty salon-01-beauty-small-bud.jpeg. Swap via IntersectionObserver as the right panels scroll through: images/beauty salon-05-beauty-full-MEERUB.jpeg, then images/beauty salon-07-beauty artistry-mold.jpeg, then images/beauty salon-08-finished-standing.jpeg.
Right 50%: four 100vh panels. Panel 1 THE MEERUB — a single beauty, grown for one purpose. Panel 2 THE RELEASE — beauty details fall and dissolve into liquid beauty artistry. Panel 3 THE FORM — beauty artistry sets into a precise matte final look. Panel 4 THE FINISH — one continuous motion from transformation to application. Add short, romantic, editorial-luxury copy to each panel (2-3 sentences, no marketing cliches).

3. Horizontal beauty craftsmanship rail.
4-5 panel horizontal rail using GSAP, pinned, smooth horizontal scroll, no black gaps. Feature videos/beauty salon-v03-beauty details-release.mp4, videos/beauty salon-v04-beauty artistry-forms.mp4, videos/beauty salon-v05-beauty salon-sets.mp4, videos/beauty salon-v06-transformation-and-styling.mp4 as autoplay muted loop background clips for each panel, each with a short editorial line about craft.

4. Parallax statement.
Use images/beauty salon-08-finished-standing.jpeg as full-bleed background with slow parallax (yPercent: 20). Centered luxury statement in Fraunces italic.

5. Reverse columns.
3-column section with alternating vertical parallax using images/beauty salon-06-beauty details-falling.jpeg, images/beauty salon-07-beauty artistry-mold.jpeg, images/beauty salon-09-hand-picking-up.jpeg. col-up images move yPercent: -20, col-down images move yPercent: +20.

6. Final look grid.
images/beauty salon-08-finished-standing.jpeg, images/beauty salon-09-hand-picking-up.jpeg, images/beauty salon-10-woman-styling-front.jpeg as three cards: THE BULLET / CRAFT, THE PICKUP, THE FINISH. Short romantic product copy under each.

7. Newsletter section. Full-bleed background using images/beauty salon-10-woman-styling-front.jpeg with dark overlay. Centered email capture form.

8. Footer. Minimal near-black footer with MEERUB branding and copyright line.

Design rules:
- Background #0a0506 (near-black burgundy). Text #f5ece6 (warm ivory). Accent #c9a675 (beauty gold) for progress bar and highlights, #7a1128 (deep beauty) as a secondary accent.
- Fraunces or Playfair Display for display headings/italic moments. Inter for body text and nav.
- Use overflow-x: clip on html and body (NOT overflow-x: hidden - that breaks sticky).
- Do NOT use a single global const named 'images' for multiple purposes - name canvas frames 'frames' and panel images 'panelImages'.
- Hero uses canvas image-sequence (frames/ directory), NOT video.currentTime scrubbing.
- beauty salon-story.mp4 is provided as a fallback/poster source only - the scroll-scrub itself must use the frames/ sequence.
- End the script with ScrollTrigger.refresh().
- Lenis: lerp 0.1, autoRaf false. Sync via gsap.ticker.add and lenis.on('scroll', ScrollTrigger.update).
```

---

#### 5.2 Post-Build Refinement Prompt (Give to Antigravity)
```text
Keep the hero section completely untouched.
Refine only the sections below the hero.
Make them more luxurious, romantic, and editorial — think couture beauty campaign, not sport or tech.
Improve the typography, spacing, motion, and visual depth.
Use the assets more creatively.
Add stronger parallax, text reveals, and section transitions.
If the font pairing is weak, replace it with a more premium serif-display + light-sans combination.
After updating, verify the result in the browser and refine any weak section.
```

---

### Step 6 of 6: Production Deployment & Pre-Flight QA

#### 6.1 Deploy Prompt (Give to Antigravity)
```text
Initialize a git repository in this project if one doesn't exist, commit all files, create a new GitHub repository for this project, and push it. Then connect that repository to a new Netlify site (or Vercel, if I prefer) and deploy it, using default build settings for a static HTML site (no build command needed since this is a single index.html file with local asset folders). Give me the live URL when done.
```

#### 6.2 Pre-Flight QA Verification Checklist
- [ ] **Asset Integrity:** All 373 canvas frames (`frame_0001.jpg` to `frame_0373.jpg`) are loaded and non-corrupt.
- [ ] **Canvas Scrubbing Performance:** Canvas renders at 60fps+ with `imageSmoothingQuality: "high"` and proper Device Pixel Ratio (`window.devicePixelRatio`) scaling.
- [ ] **Text Progress Overlays:** Verify text fades in/out cleanly at exact scroll markers (`0.05-0.15`, `0.20-0.30`, `0.40-0.50`, `0.60-0.70`, `0.80-0.90`).
- [ ] **Sticky Explainer:** Left image swaps accurately via `IntersectionObserver` across all 4 panels without jumping.
- [ ] **Horizontal Rail:** GSAP horizontal scroll functions seamlessly on desktop and provides fallback touch scroll on mobile.
- [ ] **CSS Overflow Safeguard:** Verify `overflow-x: clip` is set on `html, body` (no horizontal window scrolling, no broken sticky triggers).
- [ ] **Responsive Viewports:** Tested at `375px` (iPhone), `768px` (iPad), `1440px` (MacBook), and `1920px` (4K Desktop).
- [ ] **SEO & Metadata:** Semantic `<h1>`, OpenGraph social share cards, `<meta name="viewport">`, and descriptive `<title>`.

---

### Step 7 (Optional / Going Further): Extended Suite & Section Polish

#### 7.1 Extra Image Prompts (Nano Banana 2)

##### Prompt 11 — Beauty Look Lineup
- **File Name:** `beauty salon-11-beauty-look-lineup.jpeg`
- **Reference:** Nano Banana 2
```text
Five finished beauty salon final looks standing upright in a single elegant row, evenly spaced, each a distinct beauty look — classic red, deep berry, beauty nude, coral, and burgundy plum — cap removed on all five, same precise matte-finish casting, same dark burgundy-to-black gradient background, same RED cinema camera 85mm lens at f/4, single dramatic softbox key light sweeping across all five with individual rim lighting on each, tack-sharp product detail, luxury beauty commercial color grading, ultra photorealistic 8K, no people, no text overlay, no watermark.
```

##### Prompt 12 — Capped Beauty Product / Salon Experience
- **File Name:** `beauty salon-12-capped-experience.jpeg`
- **Reference:** Nano Banana 2
```text
The fully capped beauty salon beauty product, cap on, standing upright and centered in frame, engraved gold logo detail on the cap catching the light, precise reflective black lacquer finish, same dark burgundy-to-black gradient background, same RED cinema camera 85mm lens at f/4, single dramatic softbox key light with rim light tracing the cap's edge, tack-sharp product detail, luxury beauty commercial color grading, ultra photorealistic 8K, no people, no text overlay, no watermark.
```

##### Prompt 13 — Second Model Styling
- **File Name:** `beauty salon-13-second-model-styling.jpeg`
- **Reference:** Nano Banana 2
```text
A different strikingly beautiful woman, model-caliber, deep rich skin tone, early thirties, flawless radiant skin, high cheekbones, full symmetrical lips, natural coily or braided hair styled sleek, the polished flawless look of a top-tier luxury beauty campaign face, front-on symmetrical view styling the same red beauty salon directly to her lips, soft natural makeup elsewhere so lips remain the focal point, soft catchlight in her eyes, same dark burgundy-to-black gradient background, same RED cinema camera 85mm lens at f/4, same softbox key light with rim light, shallow depth of field, luxury beauty commercial color grading, ultra photorealistic 8K, no text overlay, no watermark.
```

##### Prompt 14 — Vanity Mirror Lifestyle Scene
- **File Name:** `beauty salon-14-vanity-mirror-scene.jpeg`
- **Reference:** Nano Banana 2
```text
A woman's reflection in an elegant round vanity mirror with soft warm bulb lighting around its frame, she is styling the red beauty salon while looking at her own reflection, marble vanity surface visible below with the capped beauty salon beauty product resting beside a small dish, soft warm ambient lighting instead of the hard studio spot, out-of-focus warm-toned bedroom or dressing room background, luxury lifestyle photography style, ultra photorealistic 8K, shallow depth of field, no text overlay, no watermark.
```

---

#### 7.2 Site Expansion Prompt (Give to Antigravity)
```text
I've added new images to the images/ folder. Update index.html to add the following sections, using the existing design system (colors, fonts, motion style) already established. Do not touch the hero section or the explainer section's structure/logic.

1. Beauty Look Range section — insert after the final look grid, before the newsletter section. Full-width section, dark background. Large centered heading in the display italic font. Below it, the beauty look lineup image as a full-width hero image with subtle parallax. Below that, a horizontal row of swatch cards with beauty look names underneath in small uppercase tracked-out type.
2. The Ritual section — insert directly after Beauty Look Range. 3-column asymmetric layout using your lifestyle images, each with soft parallax on scroll and a short editorial line about the ritual of application, not the product itself.
3. The Case section — insert after The Ritual, before the newsletter. Split layout: capped beauty product on one side, salon experience on the other, both with a subtle scale-in reveal on scroll. Centered short copy about the salon experience beneath.
```

---

#### 7.3 Surgical Section Polish Prompt (Give to Antigravity)
```text
Refine only [SECTION NAME]. Do not touch any other section, the hero, or the color palette/fonts already established.

1. Background depth. Replace the flat background with a subtle radial gradient echoing the hero, so the section feels lit rather than flat.
2. Image treatment. Give every image a soft vignette or gradient mask blending its edges into the section background, plus a subtle glow instead of a hard edge.
3. Size hierarchy. Make one image noticeably larger/dominant and others smaller and offset.
4. Typography as a design element. Give the section a large display-italic statement line positioned with intention rather than centered under everything by default.
5. Motion. Add staggered scroll-triggered reveals and slow parallax on the largest image.
6. Kill dead space. Fill empty gaps intentionally or tighten the layout so they disappear.

After updating, verify in the browser.
```

---

## 4. Multi-Page Haute Maison Architecture

### 4.1 Route Inventory

| Route | View Name | Key Architecture & Components |
| :--- | :--- | :--- |
| `/` | **Main Atelier Scrollytelling** | 373-frame Canvas Hero, Sticky 50/50 Explainer, Horizontal Craftsmanship Rail, Parallax Statement, Reverse Columns, Look Grid, VIP Newsletter |
| `/about` | **Maison & Heritage** | Botanical Sourcing Archive (*Rosa Damascena*), Master Formulator Profiles, Place Vendôme Heritage Timeline |
| `/services` | **Couture Services & Private Suites** | 4-Tier Bridal/Runway/Gala Pricing Matrix, Service Inclusions, Interactive Availability Calendar |
| `/contact` | **VIP Concierge & Studio Directory** | Multi-step Atelier Booking Form, Studio Addresses (Paris, Lahore, London, New York), 4-Hour Response SLA |

---

### 4.2 Haute Service Tier Comparison Matrix (`/services`)

```markdown
| Service Tier | Investment | Included Artisans | Session Duration | Deliverables & Inclusions |
| :--- | :--- | :--- | :--- | :--- |
| **Bridal Haute Couture Suite** | $1,200 | Master Bridal Couturier + Senior Hair Stylist | 4.5 Hours + Touchup Standby | Bespoke pre-wedding trial, 24K gold skin prep, custom bridal lip shade blend, veil placement, full bridal party touchup kit. |
| **Red Carpet & Gala Transformation** | $850 | Senior Runway Artist | 2.5 Hours | High-definition cinema lighting prep, sweat/transfer-proof 16h wear formulation, contour sculpting, bespoke lash design. |
| **Editorial Runway & Campaign** | $1,800 | Creative Director + 2 Assistants | Full Day (8 Hours) | Up to 4 look changes, live monitor collaboration with director, continuous on-set touchups, full skincare revival. |
| **Private Atelier Masterclass** | $600 | Master Formulator | 2.0 Hours | 1-on-1 personalized technique instruction, facial symmetry analysis, customized cosmetic kit curation. |
```

---

## 5. Technical Implementation Blueprints

### 5.1 High-Performance Canvas Sequencer Pattern
```javascript
// Preload 373 frames into memory with progress tracking
const FRAME_COUNT = 373;
const frames = [];
let loadedCount = 0;

const currentFrame = (index) => 
  `frames/frame_${(index + 1).toString().padStart(4, '0')}.jpg`;

for (let i = 0; i < FRAME_COUNT; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  img.onload = () => {
    loadedCount++;
    if (loadedCount === 1) renderFrame(0); // Draw first frame immediately
  };
  frames.push(img);
}

// Draw to canvas with DPR scaling and aspect-ratio preservation
function renderFrame(index) {
  const clampedIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(index)));
  const img = frames[clampedIndex];
  if (!img || !img.complete) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.scale(dpr, dpr);

  const hRatio = window.innerWidth / img.width;
  const vRatio = window.innerHeight / img.height;
  const ratio = Math.max(hRatio, vRatio); // Cover fit
  
  const centerShiftX = (window.innerWidth - img.width * ratio) / 2;
  const centerShiftY = (window.innerHeight - img.height * ratio) / 2;

  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.drawImage(img, 0, 0, img.width, img.height, centerShiftX, centerShiftY, img.width * ratio, img.height * ratio);
}

// GSAP ScrollTrigger Binding
gsap.to({ frame: 0 }, {
  frame: FRAME_COUNT - 1,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    trigger: "#heroPinned",
    start: "top top",
    end: "+=350%",
    pin: true,
    scrub: 0.5,
    onUpdate: (self) => {
      renderFrame(self.progress * (FRAME_COUNT - 1));
      updateTextOverlays(self.progress);
    }
  }
});
```

---

### 5.2 Lenis & GSAP Synchronization Pattern
```javascript
// Initialize Lenis smooth scroll
const lenis = new Lenis({
  lerp: 0.1,
  smoothWheel: true,
  autoRaf: false
});

// Bind Lenis scroll to GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
```

---

## 6. Verification, Core Web Vitals & Compliance Standards

1. **Performance Metrics (Lighthouse Targets):**
   - **LCP (Largest Contentful Paint):** `< 1.2s` (Achieved via early `<link rel="preload">` for `frame_0001.jpg`).
   - **INP (Interaction to Next Paint):** `< 50ms` (Passive event listeners, web workers where applicable).
   - **CLS (Cumulative Layout Shift):** `0.00` (Strict explicit aspect-ratio containers on all elements).
2. **Accessibility Compliance:** WCAG 2.1 Level AA with high-contrast text ratios (`#F5ECE6` on `#0A0506` yields `15.8:1`).
3. **Cross-Browser Verification:** Tested on Chrome 120+, Safari 17+ (WebKit), Firefox 122+, Edge, and Mobile Safari.
