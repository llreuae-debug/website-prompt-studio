/**
 * PromptCraft Studio — 6-Step Cinematic Website & Asset Workflow Engine
 * Core Reactive Application Logic & Generators with 50-Preset Engine
 */

// ==========================================================================
// 1. DOM Elements & State Management
// ==========================================================================

const form = document.getElementById("builderForm");
const presetPicker = document.getElementById("presetPicker");
const loadPresetButton = document.getElementById("loadPresetButton");
const topGenerateBtn = document.getElementById("topGenerateBtn");
const topCopyMasterBtn = document.getElementById("topCopyMasterBtn");
const exportPdf = document.getElementById("exportPdf");
const copyActiveTabBtn = document.getElementById("copyActiveTabBtn");
const exportPdfTabBtn = document.getElementById("exportPdfTabBtn");
const themeToggleBtn = document.getElementById("themeToggleBtn");
const toastContainer = document.getElementById("toastContainer");

// Dropdowns
const exportMenuBtn = document.getElementById("exportMenuBtn");
const exportDropdownMenu = document.getElementById("exportDropdownMenu");
const downloadPdfBtn = document.getElementById("downloadPdfBtn");
const downloadMdBtn = document.getElementById("downloadMdBtn");
const downloadTxtBtn = document.getElementById("downloadTxtBtn");
const downloadShBtn = document.getElementById("downloadShBtn");
const exportJsonBtn = document.getElementById("exportJsonBtn");
const importJsonBtn = document.getElementById("importJsonBtn");
const jsonFileInput = document.getElementById("jsonFileInput");
const resetFormBtn = document.getElementById("resetFormBtn");
const resetChecklistBtn = document.getElementById("resetChecklistBtn");

// Output Containers
const imageCardsContainer = document.getElementById("imageCardsContainer");
const videoCardsContainer = document.getElementById("videoCardsContainer");
const ffmpegCardsContainer = document.getElementById("ffmpegCardsContainer");
const folderStructureContainer = document.getElementById("folderStructureContainer");
const masterPromptDisplay = document.getElementById("masterPromptDisplay");
const checklistContainer = document.getElementById("checklistContainer");
const rawDocOutput = document.getElementById("rawDocOutput");
const storyboardTimeline = document.getElementById("storyboardTimeline");
const terminalLabContent = document.getElementById("terminalLabContent");
const checklistFullView = document.getElementById("checklistFullView");

// Exact Build Guide Prompt Callout Containers
const sharedStyleDisplay = document.getElementById("sharedStyleDisplay");
const videoStyleDisplay = document.getElementById("videoStyleDisplay");
const veoFallbackSelector = document.getElementById("veo-fallback-selector");
const appendVeoFallbackBtn = document.getElementById("appendVeoFallbackBtn");
const folderOrgDisplay = document.getElementById("folderOrgDisplay");
const refinementDisplay = document.getElementById("refinementDisplay");
const deployPromptDisplay = document.getElementById("deployPromptDisplay");
const extraImageCardsContainer = document.getElementById("extraImageCardsContainer");
const siteExpansionDisplay = document.getElementById("siteExpansionDisplay");
const sectionPolishDisplay = document.getElementById("sectionPolishDisplay");

// Metrics elements
const metricBrand = document.getElementById("metricBrand");
const metricImages = document.getElementById("metricImages");
const metricVideos = document.getElementById("metricVideos");
const metricTokens = document.getElementById("metricTokens");
const metricScore = document.getElementById("metricScore");
const colorChipsContainer = document.getElementById("colorChipsContainer");

// Mockup elements
const mockNavBrand = document.getElementById("mockNavBrand");
const mockNavLinks = document.getElementById("mockNavLinks");
const mockNavCta = document.getElementById("mockNavCta");
const mockTag = document.getElementById("mockTag");
const mockH1 = document.getElementById("mockH1");
const mockSub = document.getElementById("mockSub");
const mockSec1Title = document.getElementById("mockSec1Title");
const mockSec1Desc = document.getElementById("mockSec1Desc");
const mockSec2Title = document.getElementById("mockSec2Title");
const mockSec2Desc = document.getElementById("mockSec2Desc");
const mockupUrl = document.getElementById("mockupUrl");

const ALL_FORM_FIELDS = [
  "brand", "product", "purpose", "feeling", "audience",
  "colors", "background", "camera",
  "scene1", "scene2", "scene3", "scene4", "scene5",
  "productName", "productType", "texture", "person", "personDescription",
  "headline", "subtitle", "cta", "nav", "section1Title", "section2Title", "copy",
  "prefix", "folder", "imageCount", "videoCount", "codeStyle", "hosting",
  "avoid"
];

// Persistent Checklist State in LocalStorage
let checklistState = JSON.parse(localStorage.getItem("promptcraft_checklist") || "{}");

// ==========================================================================
// 2. Preset Engine & Dropdown Population
// ==========================================================================

function populatePresetDropdown() {
  if (!presetPicker || typeof presets === "undefined") return;
  
  presetPicker.innerHTML = `<option value="" disabled selected>✨ Choose preset (500 available)...</option>`;
  
  Object.entries(presets)
    .sort((a, b) => a[1].label.localeCompare(b[1].label))
    .forEach(([key, preset]) => {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = preset.label;
      presetPicker.appendChild(option);
    });
}

function applyPreset(key) {
  if (typeof presets === "undefined") return;
  const preset = presets[key];
  if (!preset) return;

  Object.entries(preset).forEach(([field, value]) => {
    if (field !== "label" && form.elements[field]) {
      form.elements[field].value = value;
    }
  });

  generate();
  showToast(`Loaded preset: "${preset.label}"!`, "success");
}

function generate() {
  updatePersonFieldVisibility();
  updateColorChips();
  renderAllOutputs();
}

// ==========================================================================
// 3. Helper Functions
// ==========================================================================

function getFormData() {
  const data = {};
  ALL_FORM_FIELDS.forEach(field => {
    const el = form.elements[field];
    data[field] = el ? el.value.trim() : "";
  });
  return data;
}

function setFormData(data) {
  ALL_FORM_FIELDS.forEach(field => {
    if (data[field] !== undefined && form.elements[field]) {
      form.elements[field].value = data[field];
    }
  });
  updatePersonFieldVisibility();
  updateColorChips();
  renderAllOutputs();
}

function escapeHtml(value) {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function slugify(val, fallback = "item") {
  const clean = (val || fallback)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return clean || fallback;
}

function fallback(val, defaultVal) {
  return val && val.trim().length > 0 ? val : defaultVal;
}

function showToast(message, type = "success") {
  if (!toastContainer) return;
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-10px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

async function copyTextToClipboard(text, successMsg = "Copied to clipboard!") {
  try {
    await navigator.clipboard.writeText(text);
    showToast(successMsg, "success");
  } catch (err) {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    showToast(successMsg, "success");
  }
}

function downloadFile(content, fileName, mimeType = "text/plain") {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  showToast(`Downloaded ${fileName}`, "info");
}

// ==========================================================================
// 4. Output Generators & 20-Preset Veo 3.1 Style Lock Matrix
// ==========================================================================

const VEO_FALLBACK_DIRECTIVES = {
  default: {
    label: "00. Default Cinematic Beauty / Brand Lock",
    directive: "Smooth slow-motion, locked-off camera with subtle push-in only, continuous softbox studio lighting, no flicker, no sudden jump cuts, dark burgundy-to-black gradient background throughout, RED cinema camera 85mm look, luxury beauty commercial color grading, ultra photorealistic 8K, no watermark, no text."
  },
  macro: {
    label: "01. Photorealistic Macro Drift Lock",
    directive: "Enforce 1:1 photorealism, tactile surface micro-textures, 85mm prime lens, f/2.8 shallow depth of field, natural subsurface scattering, zero edge halos, authentic sensor noise, eliminate waxy AI skin and smooth synthetic plastic artifacts."
  },
  film35: {
    label: "02. Cinematic 35mm Film Fidelity",
    directive: "Enforce 35mm Eastman Kodak Vision3 500T film grain, subtle halation on high-contrast edges, organic gate weave, anamorphic lens flare artifacts, natural motion blur at 1/48 shutter angle, zero hyper-sharpening."
  },
  cyberpunk: {
    label: "03. Hyper-Stylized Cyberpunk & Neon Noir",
    directive: "Lock volumetric atmospheric haze, cyan and magenta chromatic separation, specular puddle reflections with raytraced accuracy, high-contrast dynamic shadows, diffuse neon lighting, suppress flat uniform exposure."
  },
  architectural: {
    label: "04. Strict Architectural Structural Rigidity",
    directive: "Enforce straight, non-warping orthogonal lines, perfect two-point perspective, accurate load-bearing physics, unyielding geometric corners, zero floating or mutating structural elements."
  },
  fluid: {
    label: "05. Fluid Dynamics & Viscosity Lock",
    directive: "Strict Navier-Stokes fluid movement, coherent surface tension, accurate particle splash dissipation, liquid refractive transparency, eliminate blobby floating mass or reverse-gravity water artifacts."
  },
  anatomy: {
    label: "06. Natural Anatomical Proportions & Hands",
    directive: "Strict anatomical adherence, exact 5-finger articulation, defined bone structure and knuckles, consistent pupillary gaze vector, non-sliding foot-to-ground contact, eliminate phantom limbs and limb morphing."
  },
  doc16: {
    label: "07. Documentary 16mm Handheld Realism",
    directive: "Simulated 16mm Bolex camera, natural micro-jitter, dynamic human breathing camera drift, uncorrected vintage lens vignette, authentic available light clipping, eliminate automated robotic camera tracks."
  },
  hardlight: {
    label: "08. Hard Light High-Fashion Editorial",
    directive: "Single-source high-contrast directional spotlight, deep crisp cast shadows, reflective metallic highlights, stark chiaroscuro balance, editorial matte skin finish, eliminate ambient lighting wash."
  },
  technicolor: {
    label: "09. Vintage 1970s Technicolor Palette",
    directive: "Three-strip Technicolor saturation profile, rich organic reds and amber greens, slightly soft edge contrast, warm tungsten color balance, analog film print stock degradation, eliminate modern digital clean look."
  },
  aerial: {
    label: "10. Atmospheric Aerial FPV Kinetic Consistency",
    directive: "Consistent forward momentum vector, rotational physics matching fixed-pitch drone dynamics, dynamic rolling shutter simulation, coherent landscape motion blur, eliminate sudden visual coordinate snapping."
  },
  goldenhour: {
    label: "11. Ethereal Golden Hour Low-Angle Warmth",
    directive: "Low-horizon sun angle at 8 degrees, long sweeping cast shadows, high-key warm ambient backlight, edge rim lighting on silhouettes, natural lens flare veil, eliminate cool overcast midtones."
  },
  noir: {
    label: "12. Monochrome Film Noir & Specular Contrast",
    directive: "Pure silver-halide black and white, deep crushed blacks, silver-rich highlights, hard Venetian blind shadow casting, heavy textural contrast, eliminate digital mid-tone gray flatness."
  },
  vhs: {
    label: "13. Retro VHS & Analog Video Artifacts",
    directive: "NTSC 480i video head-switching noise, horizontal magnetic tape scan lines, color bleed on high-saturation reds, slight vertical sync jitter, 4:3 cathode-ray tube aspect ratio framing."
  },
  highspeed: {
    label: "14. High-Speed Action & Motion Clarity",
    directive: "High-speed 120fps capture interpolated cleanly, pin-sharp individual debris and dust physics, zero frame-to-frame ghosting, directional velocity blur, eliminate smeared temporal blending."
  },
  pastel: {
    label: "15. Soft Studio Pastel Commercial Grade",
    directive: "Diffused 3-point softbox illumination, low dynamic range matte shadows, clean desaturated pastel color grading, immaculate surface cleanliness, eliminate harsh specular micro-reflections."
  },
  claymation: {
    label: "16. Claymation & Stop-Motion Coherence",
    directive: "Choppy 12fps tactile animation timing, hand-sculpted clay fingerprint imperfections, miniature shallow scale tilt-shift blur, frame-to-frame variable light bounce, eliminate smooth computerized interpolation."
  },
  weather: {
    label: "17. Dystopian Weather & Particle Density",
    directive: "Continuous atmospheric occlusion, multi-layered volumetric fog, realistic turbulent snowfall or rain streaks reacting to wind physics, moisture accumulation on lenses, eliminate dry, clear backgrounds."
  },
  steadicam: {
    label: "18. Steadicam Horizon & Perspective Stabilization",
    directive: "Locked three-axis gimbal stabilization, level horizon line, fluid parallax drift across foreground and background layers, zero jittery camera twitching or abrupt focal focal-length zooms."
  },
  lowpoly: {
    label: "19. Low-Poly Retro 90s Rendering",
    directive: "Rigid un-antialiased polygon edges, affine texture mapping with slight surface warping, 256-color dithered palette, pixelated bilinear filtering artifacts, eliminate modern high-poly smooth shaders."
  },
  zerog: {
    label: "20. Zero-Gravity Weightlessness & Trajectory",
    directive: "Zero-G inertia preservation, slow uniform 360-degree rotational drift, cloth and hair suspended in microgravity, frictionless continuous momentum, eliminate downward gravity bias and falling motion."
  }
};

let currentVeoFallbackKey = "default";
let isVeoFallbackAppended = false;

const ATMOSPHERE_PRESETS = {
  "cinematic luxury": {
    label: "00. Default — Cinematic Luxury & Editorial",
    directive: "Quiet luxury, couture beauty editorial styling, and rich burgundy gradients."
  },
  "liminal": {
    label: "01. Liminal Melancholy & Desolation",
    directive: "Quiet psychological unease, vacant architecture, sterile overhead fluorescents, vast negative space, low hum of spatial isolation, desaturated neutral tones."
  },
  "industrial": {
    label: "02. Dystopian Industrial Decay",
    directive: "Heavy rust textures, choked toxic haze, oppressive industrial brutalism, soot-covered steel, corrosive acid-wash palette, palpable grit and mechanical neglect."
  },
  "sublime": {
    label: "03. Sublime Ethereal Transcendence",
    directive: "Dreamlike ambient luminance, soft heavenly bloom, pristine volumetric light shafts, weightless spiritual tranquility, high-key cream and opalescent hues."
  },
  "nordic": {
    label: "04. Foreboding Nordic Noir",
    directive: "Bleak overcast skies, bone-chilling mist, muted slate-gray and pine-green palettes, relentless tension, austere coastal terrain, suppressed dread."
  },
  "americana": {
    label: "05. Nostalgic Sun-Drenched Americana",
    directive: "Radiant midsummer haze, warm retro amber glow, heat shimmers across asphalt, carefree vintage Americana warmth, saturated Kodachrome feel."
  },
  "neorainy": {
    label: "06. Neo-Noir Rainy Cybernetic Isolation",
    directive: "Slick wet asphalt reflections, cold cobalt shadows punctuated by lonely red neon, dense damp air, solitary introspective mood, late-night urban solitude."
  },
  "primordial": {
    label: "07. Primal Primordial Dread",
    directive: "Suffocating jungle canopy, damp mossy low-light, ancient untamed nature, heavy air pressure, camouflaged predatory silence, earthy umber and deep emeralds."
  },
  "sterile": {
    label: "08. Sterile High-Tech Apathy",
    directive: "Clinical white corridors, cold surgical lighting, glossy reflective polymer finishes, emotional detachment, immaculate order, monochrome gray with sharp icy highlights."
  },
  "cosmic": {
    label: "09. Cosmic Eldritch Vastness",
    directive: "Incomprehensible scale, deep void blackness, alien nebular glows, swirling celestial dust, profound existential dread and awe, ultraviolet and violet gradients."
  },
  "hearthside": {
    label: "10. Warm Hearthside Intimacy",
    directive: "Crackle of low embers, soft wool textures, golden flickering candlelight, deep comforting shadows, comforting domestic security, burnt sienna and deep umber."
  },
  "surrealist": {
    label: "11. Surrealist Fever-Dream Haze",
    directive: "Shifting spatial logic, intoxicating warm colors, melting horizon gradients, disorienting beauty, heavy hypnotic air, warped daytime logic."
  },
  "victorian": {
    label: "12. Gothic Victorian Gloom",
    directive: "Candle-lit cobwebs, bruised storm skies, cold granite masonry, decaying velvet drapes, romantic gloom, deep black, plum, and tarnished gold."
  },
  "solarpunk": {
    label: "13. Vibrant Solarpunk Optimism",
    directive: "Sunlit lush rooftop gardens, clean sustainable urban curves, clear cascading water, radiant morning sunlight, revitalizing energy, bright emerald, terracotta, and sky blue."
  },
  "panic": {
    label: "14. High-Octane Claustrophobic Panic",
    directive: "Strobe-lit industrial red warnings, rapid erratic light changes, visual compression, claustrophobic framing, raw fight-or-flight kinetic urgency, harsh black and emergency crimson."
  },
  "lofi": {
    label: "15. Hazy Late-Night Lo-Fi Chill",
    directive: "Soft sodium-vapor lamp spill, dusty incandescent grain, warm bedroom shadows, nostalgic cassette-tape calm, muted lavender, dusty orange, and slate."
  },
  "desert": {
    label: "16. Sun-Bleached Desert Solitude",
    directive: "Blinding arid midday sun, bone-dry cracked ground, bleached white highlights, heat-baked sand drifts, wind-scoured stillness, ochre, sand, and pale sky."
  },
  "pastoral": {
    label: "17. Haunted Pastoral Serenity",
    directive: "Golden wheat fields beneath bruised purple storm clouds, eerie stillness before the gale, wind-whipped tall grass, bittersweet rural beauty, amber and brooding indigo."
  },
  "opulence": {
    label: "18. Gilded Opulence & Decadence",
    directive: "Shimmering polished marble, cascading crystal chandeliers, heavy gold-leaf filigree, dizzying excess, intoxicating wealth, warm champagne, velvet crimson, and bright gold."
  },
  "abyssal": {
    label: "19. Murky Abyssal Depths",
    directive: "Total light extinction, bioluminescent flickers, dense aquatic particle backscatter, crushing hydrostatic pressure, alien underwater mystery, deep teal, ink-black, and neon cyan."
  },
  "postwar": {
    label: "20. Post-War Silent Ruin",
    directive: "Settled dust hanging motionless in shattered daylight, hollow concrete skeletons, nature slowly reclaiming urban debris, quiet solemnity, ash gray, washed-out moss, and pale chalk."
  }
};

function getAtmosphereDirective(d) {
  const feelingKey = d.feeling || "cinematic luxury";
  if (ATMOSPHERE_PRESETS[feelingKey]) {
    return ATMOSPHERE_PRESETS[feelingKey].directive;
  }
  return fallback(d.feeling, "Quiet luxury, couture beauty editorial styling, and rich burgundy gradients.");
}

function getActiveVeoFallbackDirective(d) {
  if (currentVeoFallbackKey && VEO_FALLBACK_DIRECTIVES[currentVeoFallbackKey]) {
    return VEO_FALLBACK_DIRECTIVES[currentVeoFallbackKey].directive;
  }
  const bg = fallback(d.background, "dark burgundy-to-black gradient background");
  return `Smooth slow-motion, locked-off camera with subtle push-in only, continuous softbox studio lighting, no flicker, no sudden jump cuts, ${bg} throughout, RED cinema camera 85mm look, luxury beauty commercial color grading, ultra photorealistic 8K, no watermark, no text.`;
}

function generateSharedStyleLanguage(d) {
  const baseCamera = fallback(d.camera, "RED cinema camera, 85mm lens at f/4, single dramatic softbox key light with rim light, dark burgundy-to-black gradient background, ultra photorealistic 8K, luxury beauty commercial color grading, no text overlay, no watermark.");
  const atmo = getAtmosphereDirective(d);
  if (d.feeling && d.feeling !== "cinematic luxury") {
    return `${baseCamera} [Visual Atmosphere: ${atmo}]`;
  }
  return baseCamera;
}

function generateVideoStyleFallback(d) {
  return getActiveVeoFallbackDirective(d);
}

function generateImagePrompts(d) {
  const prefix = slugify(d.prefix, "beauty salon");
  const brand = fallback(d.brand, "MEERUB");
  const product = fallback(d.product, "beauty");
  const productName = fallback(d.productName, "MEERUB Beauty Salon");
  const camera = fallback(d.camera, "RED cinema camera, 85mm lens at f/4, single dramatic softbox key light with rim light, dark burgundy-to-black gradient background, ultra photorealistic 8K, luxury beauty commercial color grading, no text overlay, no watermark.");
  const bg = fallback(d.background, "dark burgundy-to-black gradient background");
  const avoid = fallback(d.avoid, "no people, no text overlay, no watermark, flower head centered not top-heavy, continuous stem, no cropping, no black or unlit sections");

  const isMeerub = brand.toUpperCase().includes("MEERUB") || prefix.includes("beauty");
  const isBloom = brand.toUpperCase().includes("BLOOM") || prefix.includes("lipstick");

  let p01, p03, p05, p06, p07, p08, p09, p10;

  if (isMeerub) {
    p01 = `A single red beautybud on its stem, the flower head's center point positioned at the exact vertical and horizontal center of the frame — not the overall composition, the flower head itself must be centered, with the top of the beauty details reaching no higher than 15 percent from the top edge of the frame, the beauty noticeably large and dominant, filling close to 65 percent of the frame width, beauty details fully closed and compact with fine visible water droplets, the stem continuing downward from the flower head in one unbroken continuous line all the way to the bottom edge of the frame with no gap, no cut, no missing section, delicate green stem with small thorns clearly visible and evenly lit along its entire length with no dark or underexposed areas, soft fill light specifically added to keep the lower half of the stem as bright and detailed as the flower head, dark background transitioning from deep burgundy near the center to black at the edges, shot on a RED cinema camera with 85mm lens at f/4, single dramatic softbox key light from above plus a secondary soft fill light angled upward from below to evenly illuminate the full stem, subtle rim light on the petal edges, tack-sharp macro detail, luxury beauty commercial color grading, ultra photorealistic 8K, no people, no text overlay, no watermark, flower head centered not top-heavy, continuous unbroken stem, no cropping, no black or unlit sections.`;

    p03 = `The same red beauty, same exact framing and camera position as the reference image — flower head centered at the exact vertical and horizontal center of frame, continuous unbroken stem visible to the bottom edge — now noticeably more open, several outer beauty details unfurled and curling outward naturally, inner beauty details still loosely gathered, camera holding steady with only a very slight, almost imperceptible push-in compared to the previous frame, same evenly lit stem, same dark burgundy-to-black gradient background, same RED cinema camera 85mm lens at f/4, same softbox key light plus lower fill light on the stem, subtle rim light on petal edges, tack-sharp macro detail, luxury beauty commercial color grading, ultra photorealistic 8K, no people, no text overlay, no watermark, flower head centered not top-heavy, continuous stem, no cropping.`;

    p05 = `The same red beauty, same exact framing and camera position as the reference image — flower head centered at the exact vertical and horizontal center of frame, continuous unbroken stem visible to the bottom edge — now in complete full MEERUB, every petal fully open and unfurled, rich velvety texture, the MEERUB at its widest and largest point in the sequence, outermost beauty details reaching close to the left and right edges of frame for maximum dramatic scale, same evenly lit stem, same dark burgundy-to-black gradient background, same RED cinema camera 85mm lens at f/4, same softbox key light plus lower fill light on the stem, subtle rim light on petal edges, tack-sharp macro detail, luxury beauty commercial color grading, ultra photorealistic 8K, no people, no text overlay, no watermark, flower head centered not top-heavy, continuous stem, no cropping.`;

    p06 = `The same fully MEERUBed red beauty, same exact framing and camera position as the reference image — flower head centered at the exact vertical and horizontal center of frame, continuous unbroken stem visible to the bottom edge — now releasing its outer beauty details, each petal gently detaching and drifting downward with natural weight and air resistance, soft motion blur on the falling beauty details, some beginning to dissolve at their edges into liquid red beauty artistry near the bottom of frame, same evenly lit stem, same dark burgundy-to-black gradient background, same RED cinema camera 85mm lens at f/4, same softbox key light plus lower fill light, subtle rim light on remaining petal edges, tack-sharp macro detail, luxury beauty commercial color grading, ultra photorealistic 8K, no people, no text overlay, no watermark, flower head centered, continuous stem, no cropping.`;

    p07 = `The fallen beauty details now fully dissolved into a smooth stream of molten red beauty artistry pouring into a chrome beauty salon mold at the exact center of frame, viscous and glossy under studio lighting, cooling and setting into a precise matte final look shape exactly like real cosmetic manufacturing footage, same camera position, same RED cinema camera 85mm lens at f/4, same softbox key light with rim light, same dark burgundy-to-black gradient background, luxury beauty commercial color grading, ultra photorealistic 8K, no people, no text overlay, no watermark.`;

    p08 = `A finished beauty salon, cap removed, standing perfectly upright and centered in the exact vertical and horizontal center of frame, precise matte-finish final look fully formed and set, sharp clean edges, no hands, no motion, product completely still as if freshly unmolded and presented, same dark burgundy-to-black gradient background, same RED cinema camera 85mm lens at f/4, single dramatic softbox key light with subtle rim light catching the final look's edge, tack-sharp product detail, luxury beauty commercial color grading, ultra photorealistic 8K, no people, no text overlay, no watermark.`;

    p09 = `The same finished beauty salon standing in the exact center of frame, a woman's hand entering the frame from the side, elegant fingers reaching in and gently closing around the beauty salon as if about to lift it, natural skin texture, soft catchlight on her fingertips, product and hand both in sharp focus, same dark burgundy-to-black gradient background, same RED cinema camera 85mm lens at f/4, same softbox key light with rim light, luxury beauty commercial color grading, ultra photorealistic 8K, no text overlay, no watermark.`;

    p10 = `The same beauty salon now lifted and brought up by a woman's hand, front-on symmetrical view of her face, centered in frame, styling the rich red beauty salon directly to her lips. The woman is strikingly beautiful, model-caliber, early twenties, flawless smooth radiant skin with a natural dewy glow, high cheekbones, full symmetrical lips, large expressive eyes with long lashes, sleek glossy well-groomed hair, the polished flawless look of a top-tier luxury beauty campaign face, soft natural makeup elsewhere on the face so the lips remain the clear focal point, natural skin texture preserved but even-toned and luminous, soft catchlight in her eyes, same dark burgundy-to-black gradient background, same RED cinema camera 85mm lens at f/4, same softbox key light with rim light, shallow depth of field with background softly blurred, luxury beauty commercial color grading, ultra photorealistic 8K, no text overlay, no watermark.`;
  } else if (isBloom) {
    p01 = `A single red rosebud on its stem, the flower head's center point positioned at the exact vertical and horizontal center of the frame — not the overall composition, the flower head itself must be centered, with the top of the petals reaching no higher than 15 percent from the top edge of the frame, the rose noticeably large and dominant, filling close to 65 percent of the frame width, petals fully closed and compact with fine visible water droplets, the stem continuing downward from the flower head in one unbroken continuous line all the way to the bottom edge of the frame with no gap, no cut, no missing section, delicate green stem with small thorns clearly visible and evenly lit along its entire length with no dark or underexposed areas, soft fill light specifically added to keep the lower half of the stem as bright and detailed as the flower head, dark background transitioning from deep burgundy near the center to black at the edges, shot on a RED cinema camera with 85mm lens at f/4, single dramatic softbox key light from above plus a secondary soft fill light angled upward from below to evenly illuminate the full stem, subtle rim light on the petal edges, tack-sharp macro detail, luxury beauty commercial color grading, ultra photorealistic 8K, no people, no text overlay, no watermark, flower head centered not top-heavy, continuous unbroken stem, no cropping, no black or unlit sections.`;

    p03 = `The same red rose, same exact framing and camera position as the reference image — flower head centered at the exact vertical and horizontal center of frame, continuous unbroken stem visible to the bottom edge — now noticeably more open, several outer petals unfurled and curling outward naturally, inner petals still loosely gathered, camera holding steady with only a very slight, almost imperceptible push-in compared to the previous frame, same evenly lit stem, same dark burgundy-to-black gradient background, same RED cinema camera 85mm lens at f/4, same softbox key light plus lower fill light on the stem, subtle rim light on petal edges, tack-sharp macro detail, luxury beauty commercial color grading, ultra photorealistic 8K, no people, no text overlay, no watermark, flower head centered not top-heavy, continuous stem, no cropping.`;

    p05 = `The same red rose, same exact framing and camera position as the reference image — flower head centered at the exact vertical and horizontal center of frame, continuous unbroken stem visible to the bottom edge — now in complete full bloom, every petal fully open and unfurled, rich velvety texture, the bloom at its widest and largest point in the sequence, outermost petals reaching close to the left and right edges of frame for maximum dramatic scale, same evenly lit stem, same dark burgundy-to-black gradient background, same RED cinema camera 85mm lens at f/4, same softbox key light plus lower fill light on the stem, subtle rim light on petal edges, tack-sharp macro detail, luxury beauty commercial color grading, ultra photorealistic 8K, no people, no text overlay, no watermark, flower head centered not top-heavy, continuous stem, no cropping.`;

    p06 = `The same fully bloomed red rose, same exact framing and camera position as the reference image — flower head centered at the exact vertical and horizontal center of frame, continuous unbroken stem visible to the bottom edge — now releasing its outer petals, each petal gently detaching and drifting downward with natural weight and air resistance, soft motion blur on the falling petals, some beginning to dissolve at their edges into liquid red pigment near the bottom of frame, same evenly lit stem, same dark burgundy-to-black gradient background, same RED cinema camera 85mm lens at f/4, same softbox key light plus lower fill light, subtle rim light on remaining petal edges, tack-sharp macro detail, luxury beauty commercial color grading, ultra photorealistic 8K, no people, no text overlay, no watermark, flower head centered, continuous stem, no cropping.`;

    p07 = `The fallen petals now fully dissolved into a smooth stream of molten red pigment pouring into a chrome lipstick mold at the exact center of frame, viscous and glossy under studio lighting, cooling and setting into a precise matte bullet shape exactly like real cosmetic manufacturing footage, same camera position, same RED cinema camera 85mm lens at f/4, same softbox key light with rim light, same dark burgundy-to-black gradient background, luxury beauty commercial color grading, ultra photorealistic 8K, no people, no text overlay, no watermark.`;

    p08 = `A finished lipstick, cap removed, standing perfectly upright and centered in the exact vertical and horizontal center of frame, precise matte-finish bullet fully formed and set, sharp clean edges, no hands, no motion, product completely still as if freshly unmolded and presented, same dark burgundy-to-black gradient background, same RED cinema camera 85mm lens at f/4, single dramatic softbox key light with subtle rim light catching the bullet's edge, tack-sharp product detail, luxury beauty commercial color grading, ultra photorealistic 8K, no people, no text overlay, no watermark.`;

    p09 = `The same finished lipstick standing in the exact center of frame, a woman's hand entering the frame from the side, elegant fingers reaching in and gently closing around the lipstick as if about to lift it, natural skin texture, soft catchlight on her fingertips, product and hand both in sharp focus, same dark burgundy-to-black gradient background, same RED cinema camera 85mm lens at f/4, same softbox key light with rim light, luxury beauty commercial color grading, ultra photorealistic 8K, no text overlay, no watermark.`;

    p10 = `The same lipstick now lifted and brought up by a woman's hand, front-on symmetrical view of her face, centered in frame, applying the rich red lipstick directly to her lips. The woman is strikingly beautiful, model-caliber, early twenties, flawless smooth radiant skin with a natural dewy glow, high cheekbones, full symmetrical lips, large expressive eyes with long lashes, sleek glossy well-groomed hair, the polished flawless look of a top-tier luxury beauty campaign face, soft natural makeup elsewhere on the face so the lips remain the clear focal point, natural skin texture preserved but even-toned and luminous, soft catchlight in her eyes, same dark burgundy-to-black gradient background, same RED cinema camera 85mm lens at f/4, same softbox key light with rim light, shallow depth of field with background softly blurred, luxury beauty commercial color grading, ultra photorealistic 8K, no text overlay, no watermark.`;
  } else {
    const s1 = d.scene1 || "Opening genesis state";
    const s2 = d.scene2 || "Unfolding metamorphosis step";
    const s3 = d.scene3 || "Full peak expansion";
    const s4 = d.scene4 || "Material particles dissolving";
    const s5 = d.scene5 || "Finished product molded and set";
    const modelCue = d.person === "yes" ? (d.personDescription || "Strikingly beautiful model interacting with product in front-on symmetrical view") : `${productName} in ultimate luxury campaign spotlight`;

    p01 = `${s1}, the subject centered at the exact vertical and horizontal center of the frame, dominant and detailed. Environment: ${bg}. Optics & Lighting: ${camera}. Color Palette: ${d.colors || "Curated"}. ${avoid}.`;
    p03 = `The same subject, same exact framing and camera position as the reference image — centered in frame — now noticeably more open/developed: ${s2}. Same lighting, same ${bg}, same ${camera}, ${avoid}.`;
    p05 = `The same subject, same exact framing and camera position as the reference image — now in complete full peak expansion: ${s3}. Reaching maximum dramatic scale, same ${bg}, same ${camera}, ${avoid}.`;
    p06 = `The same fully expanded subject, same framing — now releasing elements and dissolving: ${s4}. Soft motion blur, same ${bg}, same ${camera}, ${avoid}.`;
    p07 = `The dissolved essence now pouring smoothly and casting into a mold/chassis at exact center of frame under studio lighting, cooling and setting into ${productName}. Same ${camera}, same ${bg}, ${avoid}.`;
    p08 = `A finished ${productName}, standing perfectly upright and centered in the exact vertical and horizontal center of frame, precise finish fully set, sharp clean edges, product completely still. Same ${bg}, same ${camera}, single dramatic softbox key light with rim light, tack-sharp product detail, ${avoid}.`;
    p09 = `The same finished ${productName} standing in exact center of frame, a hand entering gracefully from the side, elegant fingers reaching in and gently closing around it as if about to lift it. Natural skin texture, soft catchlight, product and hand both in sharp focus, same ${bg}, same ${camera}, no text, no watermark.`;
    p10 = `The same ${productName} now lifted in a front-on symmetrical view: ${modelCue}. Flawless smooth radiant skin, soft catchlight, same ${bg}, same ${camera}, shallow depth of field, ultra photorealistic 8K, no text overlay, no watermark.`;
  }

  const scenes = [
    { num: "01", name: isMeerub ? "beauty-small-bud" : (isBloom ? "rose-small-bud" : "genesis-origin"), title: "Small Bud (no reference)", ref: "none — first image", prompt: p01 },
    { num: "03", name: isMeerub ? "beauty-opening-further" : (isBloom ? "rose-opening-further" : "opening-further"), title: "Opening Further", ref: "image 01", prompt: p03 },
    { num: "05", name: isMeerub ? `beauty-full-${slugify(brand)}` : (isBloom ? "rose-full-bloom" : "full-expansion"), title: isMeerub ? `Full ${brand}, Largest` : (isBloom ? "Full Bloom, Largest" : "Full Expansion, Largest"), ref: "image 03", prompt: p05 },
    { num: "06", name: isMeerub ? "beauty-details-falling" : (isBloom ? "petals-falling" : "elements-falling"), title: isMeerub ? "Beauty Details Gently Falling" : (isBloom ? "Petals Gently Falling" : "Elements Gently Falling"), ref: "image 05", prompt: p06 },
    { num: "07", name: isMeerub ? "beauty-artistry-mold" : (isBloom ? "pigment-mold" : "material-mold"), title: isMeerub ? "Beauty Artistry Into Mold" : (isBloom ? "Pigment Into Mold" : "Material Into Mold"), ref: "image 06", prompt: p07 },
    { num: "08", name: isMeerub ? "finished-standing" : (isBloom ? "finished-standing" : "finished-product-standing"), title: isMeerub ? "Finished Beauty Salon, Standing" : (isBloom ? "Finished Lipstick, Standing" : "Finished Product, Standing"), ref: "image 07", prompt: p08 },
    { num: "09", name: "hand-picking-up", title: "Hand Picking Up", ref: "image 08", prompt: p09 },
    { num: "10", name: isMeerub ? "woman-styling-front" : (isBloom ? "woman-applying-front" : "woman-styling-front"), title: isMeerub ? "Woman Styling, Front View" : (isBloom ? "Woman Applying, Front View" : "Model Styling, Front View"), ref: "image 09", prompt: p10 }
  ];

  const count = parseInt(d.imageCount, 10) || 8;
  return scenes.slice(0, count).map(s => {
    const filename = `${prefix}-${s.num}-${s.name}.jpeg`;
    return {
      num: s.num,
      name: s.name,
      title: s.title,
      filename,
      refText: s.ref,
      promptText: s.prompt,
      tokens: Math.round(s.prompt.split(/\s+/).length * 1.35)
    };
  });
}

function generateVideoPrompts(d) {
  const prefix = slugify(d.prefix, "beauty salon");
  const brand = fallback(d.brand, "MEERUB");
  const isMeerub = brand.toUpperCase().includes("MEERUB") || prefix.includes("beauty");
  const isBloom = brand.toUpperCase().includes("BLOOM") || prefix.includes("lipstick");

  let v01Prompt, v02Prompt, v03Prompt, v04Prompt, v05Prompt, v06Prompt;

  if (isMeerub) {
    v01Prompt = `A cinematic macro beauty scene, the same red beautybud on its full stem floating at the exact center of frame, dramatic softbox key light with rim light, the outer beauty details gradually loosening and parting in one continuous natural motion, several beauty details unfurling and curling outward, inner beauty details beginning to loosen, the MEERUB steadily growing fuller and larger within frame, the flower head remaining centered and dominant throughout, continuous unbroken stem visible, gradual organic growth with no abrupt jump, no clutter, no cropping, ultra photorealistic, luxury beauty commercial style, smooth slow-motion, no watermark, no text.`;

    v02Prompt = `A cinematic macro beauty scene, the same red beauty floating at the exact center of frame, continuing to unfurl through several more stages of MEERUBing in one continuous natural motion, inner beauty details progressively loosening and spreading outward, the beauty steadily growing larger and fuller until reaching complete full MEERUB with every petal open and velvety texture fully visible, outermost beauty details reaching close to the frame edges at the peak, flower head remaining centered throughout, continuous unbroken stem visible, same softbox key light with rim light, gradual and organic growth with no abrupt jump, no clutter, no cropping, ultra photorealistic, luxury beauty commercial style, smooth slow-motion, no watermark, no text.`;

    v03Prompt = `A cinematic macro beauty scene, the same fully MEERUBed red beauty floating at the exact center of frame, outer beauty details gently detaching and drifting downward with natural weight and air resistance, soft motion blur on the falling beauty details, some beginning to dissolve at their edges into liquid red beauty artistry near the bottom of frame, flower head and stem remaining centered, same softbox key light with rim light, no clutter, no cropping, ultra photorealistic, luxury beauty commercial style, smooth slow-motion, no watermark, no text.`;

    v04Prompt = `A cinematic macro beauty scene beginning with the falling beauty beauty details dissolving into liquid beauty artistry, the camera slowly pushing forward and downward to follow the falling beauty artistry stream, the beauty and its stem receding out of focus and fading into darkness behind the camera's forward motion as it moves past them, by the second half of the clip the beauty is fully out of focus and swallowed into the dark background shadow, attention entirely on the sharp, in-focus stream of molten red beauty artistry pouring into a chrome beauty salon mold at the exact center of frame, viscous and glossy under studio lighting, same softbox key light with rim light, shallow depth of field used deliberately to blur the background flower into unrecognizable darkness, no clutter, no people, ultra photorealistic, luxury beauty commercial style, smooth slow-motion, exactly like real cosmetic manufacturing footage, no watermark, no text.`;

    v05Prompt = `A cinematic macro beauty scene, the molten red beauty artistry inside the mold cooling and setting, the mold retracting away to reveal a finished beauty salon standing perfectly upright and centered in frame, precise matte-finish final look fully formed, sharp clean edges catching the key light, same softbox key light with rim light, dark burgundy-to-black gradient background, no clutter, no people, ultra photorealistic, luxury beauty commercial style, smooth slow-motion, no watermark, no text.`;

    v06Prompt = `A single continuous cinematic macro beauty scene, the finished beauty salon standing centered in frame, a woman's hand entering gracefully from the side, elegant fingers closing around the beauty salon and lifting it in one fluid motion, the camera and lighting holding steady as her hand rises and the framing transitions smoothly into a front-on symmetrical view of her face, styling the rich red beauty salon directly to her lips in the same unbroken take, natural skin texture, soft catchlight in her eyes and on her fingertips, shallow depth of field with background softly blurred, same softbox key light with rim light throughout, dark burgundy-to-black gradient background, no cuts, no jumps, one continuous fluid motion from transformation to application, ultra photorealistic, luxury beauty commercial style, smooth slow-motion, no watermark, no text.`;
  } else if (isBloom) {
    v01Prompt = `A cinematic macro beauty scene, the same red rosebud on its full stem floating at the exact center of frame, dramatic softbox key light with rim light, the outer petals gradually loosening and parting in one continuous natural motion, several petals unfurling and curling outward, inner petals beginning to loosen, the bloom steadily growing fuller and larger within frame, the flower head remaining centered and dominant throughout, continuous unbroken stem visible, gradual organic growth with no abrupt jump, no clutter, no cropping, ultra photorealistic, luxury beauty commercial style, smooth slow-motion, no watermark, no text.`;

    v02Prompt = `A cinematic macro beauty scene, the same red rose floating at the exact center of frame, continuing to unfurl through several more stages of blooming in one continuous natural motion, inner petals progressively loosening and spreading outward, the rose steadily growing larger and fuller until reaching complete full bloom with every petal open and velvety texture fully visible, outermost petals reaching close to the frame edges at the peak, flower head remaining centered throughout, continuous unbroken stem visible, same softbox key light with rim light, gradual and organic growth with no abrupt jump, no clutter, no cropping, ultra photorealistic, luxury beauty commercial style, smooth slow-motion, no watermark, no text.`;

    v03Prompt = `A cinematic macro beauty scene, the same fully bloomed red rose floating at the exact center of frame, outer petals gently detaching and drifting downward with natural weight and air resistance, soft motion blur on the falling petals, some beginning to dissolve at their edges into liquid red pigment near the bottom of frame, flower head and stem remaining centered, same softbox key light with rim light, no clutter, no cropping, ultra photorealistic, luxury beauty commercial style, smooth slow-motion, no watermark, no text.`;

    v04Prompt = `A cinematic macro beauty scene beginning with the falling rose petals dissolving into liquid pigment, the camera slowly pushing forward and downward to follow the falling pigment stream, the rose and its stem receding out of focus and fading into darkness behind the camera's forward motion as it moves past them, by the second half of the clip the rose is fully out of focus and swallowed into the dark background shadow, attention entirely on the sharp, in-focus stream of molten red pigment pouring into a chrome lipstick mold at the exact center of frame, viscous and glossy under studio lighting, same softbox key light with rim light, shallow depth of field used deliberately to blur the background flower into unrecognizable darkness, no clutter, no people, ultra photorealistic, luxury beauty commercial style, smooth slow-motion, exactly like real cosmetic manufacturing footage, no watermark, no text.`;

    v05Prompt = `A cinematic macro beauty scene, the molten red pigment inside the mold cooling and setting, the mold retracting away to reveal a finished lipstick standing perfectly upright and centered in frame, precise matte-finish bullet fully formed, sharp clean edges catching the key light, same softbox key light with rim light, dark burgundy-to-black gradient background, no clutter, no people, ultra photorealistic, luxury beauty commercial style, smooth slow-motion, no watermark, no text.`;

    v06Prompt = `A single continuous cinematic macro beauty scene, the finished lipstick standing centered in frame, a woman's hand entering gracefully from the side, elegant fingers closing around the lipstick and lifting it in one fluid motion, the camera and lighting holding steady as her hand rises and the framing transitions smoothly into a front-on symmetrical view of her face, applying the rich red lipstick directly to her lips in the same unbroken take, natural skin texture, soft catchlight in her eyes and on her fingertips, shallow depth of field with background softly blurred, same softbox key light with rim light throughout, dark burgundy-to-black gradient background, no cuts, no jumps, one continuous fluid motion from pickup to application, ultra photorealistic, luxury beauty commercial style, smooth slow-motion, no watermark, no text.`;
  } else {
    const s1 = d.scene1 || "Opening genesis state";
    const s2 = d.scene2 || "Unfolding metamorphosis";
    const s3 = d.scene3 || "Full bloom / peak expansion";
    const s4 = d.scene4 || "Material particles dissolving";
    const s5 = d.scene5 || "Finished product molded and set";
    const product = fallback(d.productName || d.product, "product");

    v01Prompt = `A cinematic macro scene, ${s1} smoothly transitions and unfolds into ${s2}. Slow, fluid, steady camera motion, dramatic softbox key light with rim light, gradual organic growth with no abrupt jump, no clutter, ultra photorealistic, smooth slow-motion, no watermark, no text.`;

    v02Prompt = `A cinematic macro scene, continuing from ${s2} into full peak expansion: ${s3}. Outer edges reaching close to frame edges at peak, subject remaining centered throughout, same lighting and color grading, no abrupt jump, ultra photorealistic, smooth slow-motion, no watermark, no text.`;

    v03Prompt = `A cinematic macro scene, the fully expanded subject now gently releasing its outer elements, drifting downward with natural weight and air resistance, soft motion blur, beginning to dissolve into pure liquid essence near the bottom of frame. Same lighting, ultra photorealistic, smooth slow-motion, no watermark, no text.`;

    v04Prompt = `A cinematic macro scene beginning with the falling elements dissolving into liquid essence: ${s4}. Camera slowly pushes forward and downward to follow the stream, background receding out of focus into dark background shadow, attention on the sharp in-focus stream pouring into a chrome mold/chassis at exact center of frame. Viscous and glossy, smooth slow-motion, no watermark, no text.`;

    v05Prompt = `A cinematic macro scene, the molten material cooling and setting inside the mold, mold retracting away to reveal ${s5}, finished ${product} standing perfectly upright and centered in frame, precise finish fully formed, sharp clean edges catching key light. Ultra photorealistic, smooth slow-motion, no watermark, no text.`;

    v06Prompt = `A single continuous cinematic macro scene, finished ${product} standing centered in frame, a hand entering gracefully from the side, elegant fingers closing around it and lifting in one fluid motion, camera holding steady as framing transitions into a front-on symmetrical view. One continuous fluid motion from transformation to presentation, ultra photorealistic, smooth slow-motion, no watermark, no text.`;
  }

  const clips = [
    { id: "V01", name: isMeerub ? "beauty-awakens-opens" : (isBloom ? "rose-awakens-opens" : "awakens-and-opens"), title: isMeerub ? "Beauty Awakens and Opens" : (isBloom ? "Rose Awakens and Opens" : "Awakens and Opens"), startFrame: "image 01", endFrame: "image 03", length: "2.5s", prompt: v01Prompt },
    { id: "V02", name: isMeerub ? `beauty-full-${slugify(brand)}` : (isBloom ? "rose-full-bloom" : "full-bloom"), title: isMeerub ? `Beauty Reaches Full ${brand}` : (isBloom ? "Rose Reaches Full Bloom" : "Reaches Full Expansion"), startFrame: "image 03", endFrame: "image 05", length: "1.5s", prompt: v02Prompt },
    { id: "V03", name: isMeerub ? "beauty-details-release" : (isBloom ? "petals-release" : "details-release"), title: isMeerub ? "Beauty Details Release" : (isBloom ? "Petals Release" : "Elements Release"), startFrame: "image 05", endFrame: "image 06", length: "2.5s", prompt: v03Prompt },
    { id: "V04", name: isMeerub ? "beauty-artistry-forms" : (isBloom ? "pigment-forms" : "material-forms"), title: isMeerub ? "Beauty Details Dissolve into Beauty Artistry" : (isBloom ? "Petals Dissolve into Pigment" : "Details Dissolve into Molten Liquid"), startFrame: "image 06", endFrame: "image 07", length: "2s", prompt: v04Prompt },
    { id: "V05", name: isMeerub ? "beauty-salon-sets" : (isBloom ? "lipstick-sets" : "product-sets"), title: isMeerub ? "Beauty Salon Sets and Stands" : (isBloom ? "Lipstick Sets and Stands" : "Product Sets and Stands"), startFrame: "image 07", endFrame: "image 08", length: "2s", prompt: v05Prompt },
    { id: "V06", name: isMeerub ? "transformation-and-styling" : (isBloom ? "pickup-and-application" : "pickup-and-styling"), title: isMeerub ? "Transformation and Styling" : (isBloom ? "Pickup and Application" : "Hand Picks Up and Applies"), startFrame: "image 08", endFrame: "image 10", length: "4s (hero beat)", prompt: v06Prompt }
  ];

  const count = parseInt(d.videoCount, 10) || 6;
  const fallbackStr = isVeoFallbackAppended ? `\n\n--style-fallback: ${getActiveVeoFallbackDirective(d)}` : "";
  return clips.slice(0, count).map(c => {
    const filename = `${prefix}-${c.id.toLowerCase()}-${c.name}.mp4`;
    return {
      id: c.id,
      name: c.name,
      title: c.title,
      filename,
      startFrame: c.startFrame,
      endFrame: c.endFrame,
      length: c.length,
      promptText: c.prompt + fallbackStr
    };
  });
}

function generateFFmpegCommands(d) {
  const prefix = slugify(d.prefix, "beauty salon");
  const folder = slugify(d.folder || d.brand, "your-site");

  return {
    stitch: `Hard cuts only, no fades, in this exact order — trimmed to the durations from Step 2:
V01 → V02 → V03 → V04 → V05 → V06 (all sub-clips)

Save the result as your merged hero video — this guide calls it ${prefix}-story.mp4. Any basic video editor, or Google Flow's own stitching feature, can do this.`,

    rawMerge: `# Step 3a: Combine all video clips into a single raw story sequence
ffmpeg -f concat -safe 0 -i clips.txt -c copy ${prefix}-story-raw.mp4`,

    reEncode: `# Step 3b: Re-encode so every frame is a keyframe (-g 1 enables smooth scroll-scrubbing)
ffmpeg -i ${prefix}-story-raw.mp4 -vf scale=960:-1 -movflags faststart -vcodec libx264 -crf 20 -g 1 -pix_fmt yuv420p -acodec aac -b:a 128k ${prefix}-story.mp4`,

    extractFrames: `# Step 3c: Extract every frame as a JPEG (produces roughly 300-380 frames)
mkdir -p frames
ffmpeg -i ${prefix}-story.mp4 -vf "fps=20,scale=960:-1" -q:v 4 frames/frame_%04d.jpg`,

    fullScript: `#!/usr/bin/env bash
# ==============================================================================
# ${d.brand || "Brand"} Video Asset Automation Script (Step 3 of 6)
# Generated by PromptCraft Studio — Build Guide Exact
# ==============================================================================

set -e
echo "🎬 Step 3: Processing video assets for ${folder}..."

# Create project folders
mkdir -p videos images frames

# Create clips manifest if not present
if [ ! -f "clips.txt" ]; then
  echo "Creating clips.txt manifest in exact order (V01 -> V06)..."
  ls -1v videos/${prefix}-v*.mp4 | sed "s/^/file '/" | sed "s/$/'/" > clips.txt
fi

echo "📦 3a — Merging clips in exact sequence: V01 → V02 → V03 → V04 → V05 → V06..."
ffmpeg -y -f concat -safe 0 -i clips.txt -c copy ${prefix}-story-raw.mp4

echo "⚡ 3b — Re-encoding hero video with GOP=1 (-g 1) for instant scroll-scrubbing..."
ffmpeg -y -i ${prefix}-story-raw.mp4 -vf scale=960:-1 -movflags faststart -vcodec libx264 -crf 20 -g 1 -pix_fmt yuv420p -acodec aac -b:a 128k ${prefix}-story.mp4

echo "🖼️ 3c — Extracting 20fps JPEG frames into frames/..."
ffmpeg -y -i ${prefix}-story.mp4 -vf "fps=20,scale=960:-1" -q:v 4 frames/frame_%04d.jpg

FRAME_COUNT=$(ls -1 frames/frame_*.jpg | wc -l)
echo "✅ Finished! Extracted $FRAME_COUNT frames into frames/ directory."
`
  };
}

function generateFolderTree(d) {
  const prefix = slugify(d.prefix, "beauty salon");
  const folder = slugify(d.folder || d.brand, "your-site");
  const images = generateImagePrompts(d);
  const videos = generateVideoPrompts(d);

  const imageLines = images.map(img => `│   ├── ${img.filename}`).join("\n");
  const videoLines = videos.map(vid => `│   ├── ${vid.filename}`).join("\n");

  return `${folder}/
├── index.html               ← generated by Antigravity
├── MASTER_BUILD_PROMPT.md   ← the master prompt (Step 5)
├── ${prefix}-story.mp4       ← merged + re-encoded hero video
├── images/                  ← all story + supporting images
${imageLines}
├── videos/                  ← all raw video clips
${videoLines}
└── frames/                  ← extracted JPEGs, frame_0001.jpg ...
    ├── frame_0001.jpg
    ├── frame_0002.jpg
    └── frame_0373.jpg`;
}

function generateFolderOrgPrompt(d) {
  const prefix = slugify(d.prefix, "beauty salon");
  return `I've dropped a batch of AI-generated images and videos into this folder along with the merged hero video. Please organize them into this exact structure: create an images/ subfolder and move every image file that starts with "${prefix}-" into it (except the merged hero video, which stays in the root); create a videos/ subfolder and move every video file that starts with "${prefix}-v" into it. Once done, show me the final folder tree so I can confirm everything is in the right place.`;
}

function generateMasterBuildPrompt(d) {
  const brand = fallback(d.brand, "MEERUB");
  const product = fallback(d.product, "beauty salon");
  const prefix = slugify(d.prefix, "beauty salon");
  const isMeerub = brand.toUpperCase().includes("MEERUB") || prefix.includes("beauty");
  const isBloom = brand.toUpperCase().includes("BLOOM") || prefix.includes("lipstick");

  const heroHeadline = fallback(d.headline, brand);
  const subtitle = fallback(d.subtitle, isMeerub ? "A beauty, reimagined." : (isBloom ? "A rose, reimagined." : "A masterwork, reimagined."));
  const sec1 = fallback(d.section1Title, isMeerub ? "Beauty Details become beauty artistry." : (isBloom ? "Petals become pigment." : "Form becomes essence."));
  const sec2 = fallback(d.section2Title, isMeerub ? "Beauty Artistry becomes couture." : (isBloom ? "Pigment becomes couture." : "Craft becomes couture."));
  const heroTagline = isMeerub ? `One beauty look. Every ${brand}.` : (isBloom ? "One shade. Every bloom." : `One design. Every expression.`);
  const cta = fallback(d.cta, "SHOP NOW");

  const img01 = isMeerub ? `beauty salon-01-beauty-small-bud.jpeg` : (isBloom ? `lipstick-01-rose-small-bud.jpeg` : `${prefix}-01-small-bud.jpeg`);
  const img03 = isMeerub ? `beauty salon-03-beauty-opening-further.jpeg` : (isBloom ? `lipstick-03-rose-opening-further.jpeg` : `${prefix}-03-opening-further.jpeg`);
  const img05 = isMeerub ? `beauty salon-05-beauty-full-MEERUB.jpeg` : (isBloom ? `lipstick-05-rose-full-bloom.jpeg` : `${prefix}-05-full-expansion.jpeg`);
  const img06 = isMeerub ? `beauty salon-06-beauty details-falling.jpeg` : (isBloom ? `lipstick-06-petals-falling.jpeg` : `${prefix}-06-details-falling.jpeg`);
  const img07 = isMeerub ? `beauty salon-07-beauty artistry-mold.jpeg` : (isBloom ? `lipstick-07-pigment-mold.jpeg` : `${prefix}-07-artistry-mold.jpeg`);
  const img08 = isMeerub ? `beauty salon-08-finished-standing.jpeg` : (isBloom ? `lipstick-08-finished-standing.jpeg` : `${prefix}-08-finished-standing.jpeg`);
  const img09 = isMeerub ? `beauty salon-09-hand-picking-up.jpeg` : (isBloom ? `lipstick-09-hand-picking-up.jpeg` : `${prefix}-09-hand-picking-up.jpeg`);
  const img10 = isMeerub ? `beauty salon-10-woman-styling-front.jpeg` : (isBloom ? `lipstick-10-woman-applying-front.jpeg` : `${prefix}-10-woman-styling-front.jpeg`);

  const v01 = isMeerub ? `beauty salon-v01-beauty-awakens-opens.mp4` : (isBloom ? `lipstick-v01-rose-awakens-opens.mp4` : `${prefix}-v01-awakens-opens.mp4`);
  const v02 = isMeerub ? `beauty salon-v02-beauty-full-MEERUB.mp4` : (isBloom ? `lipstick-v02-rose-full-bloom.mp4` : `${prefix}-v02-full-bloom.mp4`);
  const v03 = isMeerub ? `beauty salon-v03-beauty details-release.mp4` : (isBloom ? `lipstick-v03-petals-release.mp4` : `${prefix}-v03-details-release.mp4`);
  const v04 = isMeerub ? `beauty salon-v04-beauty artistry-forms.mp4` : (isBloom ? `lipstick-v04-pigment-forms.mp4` : `${prefix}-v04-artistry-forms.mp4`);
  const v05 = isMeerub ? `beauty salon-v05-beauty salon-sets.mp4` : (isBloom ? `lipstick-v05-lipstick-sets.mp4` : `${prefix}-v05-product-sets.mp4`);
  const v06 = isMeerub ? `beauty salon-v06-hand-picks-up.mp4` : (isBloom ? `lipstick-v06-hand-picks-up.mp4` : `${prefix}-v06-hand-picks-up.mp4`);
  const v07 = isMeerub ? `beauty salon-v07-transformation-and-apply.mp4` : (isBloom ? `lipstick-v07-pickup-and-apply.mp4` : `${prefix}-v07-transformation-and-apply.mp4`);
  const v08 = isMeerub ? `beauty salon-v08-beauty salon-applied.mp4` : (isBloom ? `lipstick-v08-lipstick-applied.mp4` : `${prefix}-v08-product-applied.mp4`);

  return `Build a premium luxury ${isMeerub ? "beauty salon" : (isBloom ? "lipstick" : product)} 3D scroll website called ${brand} using vanilla HTML, CSS, and JavaScript.
The site must feel cinematic, romantic, couture-grade, and highly immersive — a beauty brand film translated into a website.
The hero section should be a scroll-driven cinematic reveal of a ${isMeerub ? "beauty MEERUBing and transforming into a beauty salon" : (isBloom ? "rose blooming and transforming into a lipstick" : "subject transforming into finished hero piece")}.
Use GSAP and ScrollTrigger for all scroll-linked motion.
Use Lenis for smooth scrolling.
Use a single-file structure with index.html only.

Use these assets exactly from the project folder:
Hero video: ${prefix}-story.mp4
Hero frames: frames/frame_0001.jpg through frames/frame_0373.jpg (4-digit padded, 373 total)
Images: images/${img01}, images/${img03}, images/${img05}, images/${img06}, images/${img07}, images/${img08}, images/${img09}, images/${img10}
Videos: videos/${v01}, videos/${v02}, videos/${v03}, videos/${v04}, videos/${v05}, videos/${v06}, videos/${v07}, videos/${v08}

Build the page in this exact order:

1. Hero section.
Create a pinned hero scroll sequence using canvas + pre-extracted image frames from the frames/ directory (373 frames, frame_0001.jpg to frame_0373.jpg).
Load all frames as Image objects. Draw to canvas on scroll using getBoundingClientRect for progress calculation.
Add text overlays that fade in and out at scroll progress ranges:
- progress 0.05-0.15: ${heroHeadline} — 110px Fraunces (or Playfair Display) italic #f5ece6 centered.
- progress 0.20-0.30: ${subtitle} — 26px Inter light italic #f5ece6 centered.
- progress 0.40-0.50: ${sec1} — 60px Fraunces #f5ece6 centered.
- progress 0.60-0.70: ${sec2} — 60px Fraunces #f5ece6 centered.
- progress 0.80-0.90: ${heroTagline} — 12px Inter uppercase letter-spacing 4px #f5ece6 position top 10% left 8%.
Nav: ${brand} fixed top-left, ${cta} fixed top-right. 11px Inter, letter-spacing 5px, color #f5ece6, z-index 100.
Progress bar: fixed 2px wide right edge, background #c9a675 (${isMeerub ? "beauty gold" : "rose gold"}), height grows 0 to 100vh as scroll progresses.

2. Sticky ${isMeerub ? "MEERUB-to-final look" : (isBloom ? "bloom-to-bullet" : "genesis-to-product")} explainer.
Left 50%: product/story image, position sticky top 0, height 100vh. Start with images/${img01}. Swap via IntersectionObserver as the right panels scroll through: images/${img05}, then images/${img07}, then images/${img08}.
Right 50%: four 100vh panels. Panel 1 THE ${isMeerub ? "MEERUB" : (isBloom ? "BLOOM" : "ORIGIN")} — a single ${isMeerub ? "beauty" : (isBloom ? "rose" : "subject")}, grown for one purpose. Panel 2 THE RELEASE — ${isMeerub ? "beauty details" : "petals"} fall and dissolve into liquid ${isMeerub ? "beauty artistry" : "pigment"}. Panel 3 THE FORM — ${isMeerub ? "beauty artistry" : "pigment"} sets into a precise matte ${isMeerub ? "final look" : "bullet"}. Panel 4 THE FINISH — one continuous motion from ${isMeerub ? "transformation" : "pickup"} to application. Add short, romantic, editorial-luxury copy to each panel (2-3 sentences, no marketing cliches).

3. Horizontal ${isMeerub ? "beauty craftsmanship" : "craftsmanship"} rail.
4-5 panel horizontal rail using GSAP, pinned, smooth horizontal scroll, no black gaps. Feature videos/${v03}, videos/${v04}, videos/${v05}, videos/${v06} as autoplay muted loop background clips for each panel, each with a short editorial line about craft.

4. Parallax statement.
Use images/${img08} as full-bleed background with slow parallax (yPercent: 20). Centered luxury statement in Fraunces italic.

5. Reverse columns.
3-column section with alternating vertical parallax using images/${img06}, images/${img07}, images/${img09}. col-up images move yPercent: -20, col-down images move yPercent: +20.

6. Final look grid.
images/${img08}, images/${img09}, images/${img10} as three cards: THE ${isMeerub ? "BULLET / CRAFT" : "BULLET"}, THE PICKUP, THE FINISH. Short romantic product copy under each.

7. Newsletter section. Full-bleed background using images/${img10} with dark overlay. Centered email capture form.

8. Footer. Minimal near-black footer with ${brand} branding and copyright line.

Design rules:
- Background #0a0506 (near-black burgundy). Text #f5ece6 (warm ivory). Accent #c9a675 (${isMeerub ? "beauty gold" : "rose gold"}) for progress bar and highlights, #7a1128 (${isMeerub ? "deep beauty" : "deep rose"}) as a secondary accent.
- Fraunces or Playfair Display for display headings/italic moments. Inter for body text and nav.
- Use overflow-x: clip on html and body (NOT overflow-x: hidden - that breaks sticky).
- Do NOT use a single global const named 'images' for multiple purposes - name canvas frames 'frames' and panel images 'panelImages'.
- Hero uses canvas image-sequence (frames/ directory), NOT video.currentTime scrubbing.
- ${prefix}-story.mp4 is provided as a fallback/poster source only - the scroll-scrub itself must use the frames/ sequence.
- End the script with ScrollTrigger.refresh().
- Lenis: lerp 0.1, autoRaf false. Sync via gsap.ticker.add and lenis.on('scroll', ScrollTrigger.update).`;
}

function generateRefinementPrompt() {
  return `Keep the hero section completely untouched.
Refine only the sections below the hero.
Make them more luxurious, romantic, and editorial — think couture beauty campaign, not sport or tech.
Improve the typography, spacing, motion, and visual depth.
Use the assets more creatively.
Add stronger parallax, text reveals, and section transitions.
If the font pairing is weak, replace it with a more premium serif-display + light-sans combination.
After updating, verify the result in the browser and refine any weak section.`;
}

function generateDeployPrompt() {
  return `Initialize a git repository in this project if one doesn't exist, commit all files, create a new GitHub repository for this project, and push it. Then connect that repository to a new Netlify site (or Vercel, if I prefer) and deploy it, using default build settings for a static HTML site (no build command needed since this is a single index.html file with local asset folders). Give me the live URL when done.`;
}

function generateExtraPrompts(d) {
  const brand = fallback(d.brand, "MEERUB");
  const prefix = slugify(d.prefix, "beauty salon");
  const isMeerub = brand.toUpperCase().includes("MEERUB") || prefix.includes("beauty");
  const isBloom = brand.toUpperCase().includes("BLOOM") || prefix.includes("lipstick");

  const extraImages = [
    {
      num: "11",
      title: isMeerub ? "Beauty Look lineup" : (isBloom ? "Shade lineup" : "Product Lineup"),
      ref: "Nano Banana 2",
      prompt: isMeerub ? 
`Five finished beauty salon final looks standing upright in a single elegant row, evenly spaced, each a distinct beauty look — classic red, deep berry, beauty nude, coral, and burgundy plum — cap removed on all five, same precise matte-finish casting, same dark burgundy-to-black gradient background, same RED cinema camera 85mm lens at f/4, single dramatic softbox key light sweeping across all five with individual rim lighting on each, tack-sharp product detail, luxury beauty commercial color grading, ultra photorealistic 8K, no people, no text overlay, no watermark.` :
`Five finished lipstick bullets standing upright in a single elegant row, evenly spaced, each a distinct shade — classic red, deep berry, rose nude, coral, and burgundy plum — cap removed on all five, same precise matte-finish casting, same dark burgundy-to-black gradient background, same RED cinema camera 85mm lens at f/4, single dramatic softbox key light sweeping across all five with individual rim lighting on each, tack-sharp product detail, luxury beauty commercial color grading, ultra photorealistic 8K, no people, no text overlay, no watermark.`
    },
    {
      num: "12",
      title: isMeerub ? "Capped beauty product / salon experience" : (isBloom ? "Capped tube / packaging box" : "Capped Product / Packaging Box"),
      ref: "Nano Banana 2",
      prompt: isMeerub ?
`The fully capped beauty salon beauty product, cap on, standing upright and centered in frame, engraved gold logo detail on the cap catching the light, precise reflective black lacquer finish, same dark burgundy-to-black gradient background, same RED cinema camera 85mm lens at f/4, single dramatic softbox key light with rim light tracing the cap's edge, tack-sharp product detail, luxury beauty commercial color grading, ultra photorealistic 8K, no people, no text overlay, no watermark.` :
`The fully capped lipstick tube, cap on, standing upright and centered in frame, engraved gold logo detail on the cap catching the light, precise reflective black lacquer finish, same dark burgundy-to-black gradient background, same RED cinema camera 85mm lens at f/4, single dramatic softbox key light with rim light tracing the cap's edge, tack-sharp product detail, luxury beauty commercial color grading, ultra photorealistic 8K, no people, no text overlay, no watermark.`
    },
    {
      num: "13",
      title: isMeerub ? "Second model styling" : (isBloom ? "Second model applying" : "Second Model Styling"),
      ref: "Nano Banana 2",
      prompt: isMeerub ?
`A different strikingly beautiful woman, model-caliber, deep rich skin tone, early thirties, flawless radiant skin, high cheekbones, full symmetrical lips, natural coily or braided hair styled sleek, the polished flawless look of a top-tier luxury beauty campaign face, front-on symmetrical view styling the same red beauty salon directly to her lips, soft natural makeup elsewhere so lips remain the focal point, soft catchlight in her eyes, same dark burgundy-to-black gradient background, same RED cinema camera 85mm lens at f/4, same softbox key light with rim light, shallow depth of field, luxury beauty commercial color grading, ultra photorealistic 8K, no text overlay, no watermark.` :
`A different strikingly beautiful woman, model-caliber, deep rich skin tone, early thirties, flawless radiant skin, high cheekbones, full symmetrical lips, natural coily or braided hair styled sleek, the polished flawless look of a top-tier luxury beauty campaign face, front-on symmetrical view applying the same red lipstick directly to her lips, soft natural makeup elsewhere so lips remain the focal point, soft catchlight in her eyes, same dark burgundy-to-black gradient background, same RED cinema camera 85mm lens at f/4, same softbox key light with rim light, shallow depth of field, luxury beauty commercial color grading, ultra photorealistic 8K, no text overlay, no watermark.`
    },
    {
      num: "14",
      title: "Vanity mirror lifestyle scene",
      ref: "Nano Banana 2",
      prompt: isMeerub ?
`A woman's reflection in an elegant round vanity mirror with soft warm bulb lighting around its frame, she is styling the red beauty salon while looking at her own reflection, marble vanity surface visible below with the capped beauty salon beauty product resting beside a small dish, soft warm ambient lighting instead of the hard studio spot, out-of-focus warm-toned bedroom or dressing room background, luxury lifestyle photography style, ultra photorealistic 8K, shallow depth of field, no text overlay, no watermark.` :
`A woman's reflection in an elegant round vanity mirror with soft warm bulb lighting around its frame, she is applying the red lipstick while looking at her own reflection, marble vanity surface visible below with the capped lipstick tube resting beside a small dish, soft warm ambient lighting instead of the hard studio spot, out-of-focus warm-toned bedroom or dressing room background, luxury lifestyle photography style, ultra photorealistic 8K, shallow depth of field, no text overlay, no watermark.`
    }
  ];

  const siteExpansionPrompt = isMeerub ?
`I've added new images to the images/ folder. Update index.html to add the following sections, using the existing design system (colors, fonts, motion style) already established. Do not touch the hero section or the explainer section's structure/logic.

1. Beauty Look Range section — insert after the final look grid, before the newsletter section. Full-width section, dark background. Large centered heading in the display italic font. Below it, the beauty look lineup image as a full-width hero image with subtle parallax. Below that, a horizontal row of swatch cards with beauty look names underneath in small uppercase tracked-out type.
2. The Ritual section — insert directly after Beauty Look Range. 3-column asymmetric layout using your lifestyle images, each with soft parallax on scroll and a short editorial line about the ritual of application, not the product itself.
3. The Case section — insert after The Ritual, before the newsletter. Split layout: capped beauty product on one side, salon experience on the other, both with a subtle scale-in reveal on scroll. Centered short copy about the salon experience beneath.` :
`I've added new images to the images/ folder. Update index.html to add the following sections, using the existing design system (colors, fonts, motion style) already established. Do not touch the hero section or the explainer section's structure/logic.

1. Shade Range section — insert after the final look grid, before the newsletter section. Full-width section, dark background. Large centered heading in the display italic font. Below it, the shade lineup image as a full-width hero image with subtle parallax. Below that, a horizontal row of swatch cards with shade names underneath in small uppercase tracked-out type.
2. The Ritual section — insert directly after Shade Range. 3-column asymmetric layout using your lifestyle images, each with soft parallax on scroll and a short editorial line about the ritual of application, not the product itself.
3. The Case section — insert after The Ritual, before the newsletter. Split layout: capped tube on one side, packaging box on the other, both with a subtle scale-in reveal on scroll. Centered short copy about the unboxing experience beneath.`;

  const sectionPolishPrompt = `Refine only [SECTION NAME]. Do not touch any other section, the hero, or the color palette/fonts already established.

1. Background depth. Replace the flat background with a subtle radial gradient echoing the hero, so the section feels lit rather than flat.
2. Image treatment. Give every image a soft vignette or gradient mask blending its edges into the section background, plus a subtle glow instead of a hard edge.
3. Size hierarchy. Make one image noticeably larger/dominant and others smaller and offset.
4. Typography as a design element. Give the section a large display-italic statement line positioned with intention rather than centered under everything by default.
5. Motion. Add staggered scroll-triggered reveals and slow parallax on the largest image.
6. Kill dead space. Fill empty gaps intentionally or tighten the layout so they disappear.

After updating, verify in the browser.`;

  return {
    extraImages,
    siteExpansionPrompt,
    sectionPolishPrompt
  };
}

function generateChecklist(d) {
  const prefix = slugify(d.prefix, "beauty salon");
  const folder = slugify(d.folder || d.brand, "your-site");
  const hosting = fallback(d.hosting, "Netlify");

  return [
    { id: "c1", category: "Step 1: Nano Banana 2", text: `Generate all story images in one sitting using reference chaining (${prefix}-01 through ${prefix}-10).` },
    { id: "c2", category: "Step 2: Veo 3.1", text: `Generate video clips V01 to V06 start-frame to end-frame with smooth slow motion.` },
    { id: "c3", category: "Step 3a: Stitch", text: `Stitch raw clips into ${prefix}-story-raw.mp4 in exact order (hard cuts only, no fades).` },
    { id: "c4", category: "Step 3b: Keyframe Re-encode", text: `Re-encode with GOP=1 (-g 1) so every frame is a keyframe for scroll scrubbing.` },
    { id: "c5", category: "Step 3c: Extract Frames", text: `Extract 20fps JPEGs into frames/frame_%04d.jpg (approx. 300-380 frames).` },
    { id: "c6", category: "Step 4: Project Tree", text: `Run folder organization prompt in Antigravity to structure images/, videos/, and frames/.` },
    { id: "c7", category: "Step 5: Master Prompt", text: `Hand Antigravity the master prompt with canvas image sequence and 8 exact sections.` },
    { id: "c8", category: "Step 5: Polish", text: `Apply refinement prompt to elevate below-hero sections into a couture editorial campaign.` },
    { id: "c9", category: "QA", text: "Verify overflow-x: clip on html/body and confirm sticky explainer works smoothly." },
    { id: "c10", category: "Step 6: Deploy", text: `Deploy ${folder}/ to GitHub + ${hosting} and confirm live URL.` }
  ];
}

function generateFullUnifiedDocument(d) {
  const brand = fallback(d.brand, "MEERUB");
  const product = fallback(d.product, "Beauty Salon");
  const prefix = slugify(d.prefix, "beauty salon");
  const folder = slugify(d.folder || d.brand, "your-site");

  const sharedStyle = generateSharedStyleLanguage(d);
  const videoStyle = generateVideoStyleFallback(d);
  const images = generateImagePrompts(d);
  const videos = generateVideoPrompts(d);
  const ffmpeg = generateFFmpegCommands(d);
  const folderTree = generateFolderTree(d);
  const folderOrgPrompt = generateFolderOrgPrompt(d);
  const masterPrompt = generateMasterBuildPrompt(d);
  const refinementPrompt = generateRefinementPrompt();
  const deployPrompt = generateDeployPrompt();
  const expansion = generateExtraPrompts(d);
  const checklist = generateChecklist(d);

  return `# ${brand.toUpperCase()} — BUILD GUIDE · FREE TOOLS EDITION
A 100% free, six-step build: a cinematic experience becomes a luxury scroll website.
Google Flow · Google Antigravity · GitHub + Netlify/Vercel

================================================================================
START HERE — How this guide works
================================================================================
Rule of thumb: generate all your images first, then all your videos, then merge — don't jump back and forth.
Finishing each stage completely before moving to the next is what keeps the final site consistent.

The Six Steps:
1. Generate every story image in one sitting, chaining each new image from the one before it — Nano Banana 2.
2. Generate every video clip from those images, start-frame to end-frame — Veo 3.1.
3. Merge all the clips into one hero video and prepare it for scroll-scrubbing — Antigravity.
4. Build your hero section assets and organize everything into one clean project folder — Antigravity.
5. Hand Antigravity one master prompt — it designs the entire site.
6. Push the finished site to GitHub and deploy it live on Netlify or Vercel.

================================================================================
STEP 1 OF 6 — NANO BANANA 2: Generate all your story images
================================================================================

The Shared Style Language:
Keep this exact phrasing in every prompt below — it's what ties the whole sequence together:
${sharedStyle}

The Chain (Generate in this exact order, each one referencing the image before it):
${images.map(img => `### Prompt ${img.num} — ${img.title} (Reference: ${img.refText})
Filename: ${img.filename}
COPY THIS PROMPT:
${img.promptText}
`).join("\n")}

================================================================================
STEP 2 OF 6 — VEO 3.1: Generate all your video clips
================================================================================

Style Fallback Line (Append if clip drifts off-style):
${videoStyle}

The Clip Plan:
${videos.map(vid => `### ${vid.id} — ${vid.title} (Length: ${vid.length} | ${vid.startFrame} ➔ ${vid.endFrame})
Filename: ${vid.filename}
COPY THIS PROMPT:
${vid.promptText}
`).join("\n")}

================================================================================
STEP 3 OF 6 — ANTIGRAVITY: Merge and prepare the hero video
================================================================================

3a — Stitch the clips into one video:
${ffmpeg.stitch}

TERMINAL COMMAND (Raw Merge):
${ffmpeg.rawMerge}

3b — Re-encode so every frame is a keyframe:
TERMINAL COMMAND:
${ffmpeg.reEncode}

3c — Extract every frame as a JPEG:
TERMINAL COMMAND:
${ffmpeg.extractFrames}

================================================================================
STEP 4 OF 6 — ANTIGRAVITY: Organize your project folder
================================================================================

Exact Project Structure:
${folderTree}

Folder Organization Prompt:
COPY THIS PROMPT:
${folderOrgPrompt}

================================================================================
STEP 5 OF 6 — ANTIGRAVITY: Build the site with one master prompt
================================================================================

COPY THIS ENTIRE PROMPT:
${masterPrompt}

--------------------------------------------------------------------------------
Once the structure is up, polish it (Refinement Prompt):
--------------------------------------------------------------------------------
COPY THIS PROMPT:
${refinementPrompt}

================================================================================
STEP 6 OF 6 — GITHUB + NETLIFY/VERCEL: Deploy
================================================================================

Deploy Prompt:
COPY THIS PROMPT:
${deployPrompt}

================================================================================
OPTIONAL — GOING FURTHER: Expanding your site
================================================================================

Extra Image Prompts (Nano Banana 2):
${expansion.extraImages.map(img => `### ${img.title} (${img.ref})
COPY THIS PROMPT:
${img.prompt}
`).join("\n")}

Site Expansion Prompt:
COPY THIS PROMPT:
${expansion.siteExpansionPrompt}

Section Polish Prompt:
COPY THIS PROMPT:
${expansion.sectionPolishPrompt}

================================================================================
PRE-FLIGHT & PRODUCTION DEPLOY CHECKLIST
================================================================================
${checklist.map(c => `[ ] (${c.category}) ${c.text}`).join("\n")}
`;
}

// ==========================================================================
// 5. Renderers & UI Synchronizers
// ==========================================================================

function updateColorChips() {
  const colorStr = form.elements["colors"] ? form.elements["colors"].value : "";
  if (!colorChipsContainer) return;
  colorChipsContainer.innerHTML = "";
  if (!colorStr) return;

  const colorList = colorStr.split(",").map(c => c.trim()).filter(Boolean);
  
  const colorMap = {
    crimson: "#e11d48",
    red: "#ef4444",
    gold: "#f59e0b",
    champagne: "#fde68a",
    obsidian: "#0b0f17",
    black: "#111827",
    ivory: "#fef3c7",
    white: "#ffffff",
    slate: "#64748b",
    cyan: "#06b6d4",
    emerald: "#10b981",
    green: "#22c55e",
    sage: "#84a98c",
    amber: "#d97706",
    titanium: "#94a3b8",
    silver: "#e2e8f0",
    violet: "#8b5cf6",
    travertine: "#e6d5be",
    azure: "#0284c7",
    terracotta: "#c2410c",
    navy: "#1e3a8a",
    orange: "#ea580c",
    yellow: "#eab308",
    charcoal: "#334155",
    teal: "#0d9488",
    pink: "#ec4899",
    purple: "#9333ea"
  };

  colorList.forEach(c => {
    const chip = document.createElement("div");
    chip.className = "color-chip";
    
    const lower = c.toLowerCase();
    let hex = "#d97706";
    for (const key in colorMap) {
      if (lower.includes(key)) {
        hex = colorMap[key];
        break;
      }
    }

    chip.innerHTML = `
      <span class="color-dot" style="background-color: ${hex};"></span>
      <span>${c}</span>
    `;
    colorChipsContainer.appendChild(chip);
  });
}

function updatePersonFieldVisibility() {
  const personSelect = form.elements["person"];
  const personDescField = document.getElementById("personDescField");
  if (personSelect && personDescField) {
    if (personSelect.value === "yes") {
      personDescField.style.display = "flex";
    } else {
      personDescField.style.display = "none";
    }
  }
}

function renderAllOutputs() {
  const d = getFormData();

  // Update Atmosphere & Mood description hint
  const visualAtmosphereDesc = document.getElementById("visualAtmosphereDesc");
  if (visualAtmosphereDesc) {
    visualAtmosphereDesc.textContent = getAtmosphereDirective(d);
  }

  // Metrics update
  const brandName = fallback(d.brand, "PROJECT");
  if (metricBrand) metricBrand.textContent = brandName;
  if (metricImages) metricImages.textContent = `${d.imageCount || 8} prompts`;
  if (metricVideos) metricVideos.textContent = `${d.videoCount || 6} clips`;

  const rawDoc = generateFullUnifiedDocument(d);
  const approxTokens = Math.round(rawDoc.length / 3.8);
  if (metricTokens) metricTokens.textContent = `~${approxTokens.toLocaleString()}`;

  // 1. Render Image Cards
  const images = generateImagePrompts(d);
  if (imageCardsContainer) {
    imageCardsContainer.innerHTML = images.map(img => `
      <div class="prompt-card">
        <div class="card-top-meta">
          <span class="card-num-badge">PROMPT ${img.num}</span>
          <span class="card-ref-badge">${img.refText}</span>
        </div>
        <div class="card-filename">📁 ${img.filename}</div>
        <div class="card-content-text">${img.promptText}</div>
        <div class="card-footer">
          <span class="card-tokens">~${img.tokens} tokens</span>
          <button type="button" class="btn-ghost-sm copy-btn" data-copy-text="${encodeURIComponent(img.promptText)}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            <span>Copy</span>
          </button>
        </div>
      </div>
    `).join("");
  }

  // 2. Render Video Cards
  const videos = generateVideoPrompts(d);
  if (videoCardsContainer) {
    videoCardsContainer.innerHTML = videos.map(vid => `
      <div class="prompt-card">
        <div class="card-top-meta">
          <span class="card-num-badge">${vid.id} • ${vid.name}</span>
          <span class="card-ref-badge">${vid.length} Clip</span>
        </div>
        <div class="card-filename">🎥 ${vid.filename}</div>
        <div class="card-content-text">
          <strong>${vid.startFrame} ➔ ${vid.endFrame}:</strong><br>
          ${vid.promptText}
        </div>
        <div class="card-footer">
          <span class="card-tokens">${vid.startFrame} ➔ ${vid.endFrame}</span>
          <button type="button" class="btn-ghost-sm copy-btn" data-copy-text="${encodeURIComponent(vid.promptText)}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            <span>Copy</span>
          </button>
        </div>
      </div>
    `).join("");
  }

  // 3. Render FFmpeg Commands
  const ffmpeg = generateFFmpegCommands(d);
  if (ffmpegCardsContainer) {
    ffmpegCardsContainer.innerHTML = `
      <pre><code>${ffmpeg.rawMerge}

${ffmpeg.reEncode}

${ffmpeg.extractFrames}</code></pre>
    `;
  }

  // FFmpeg Lab Tab
  if (terminalLabContent) {
    terminalLabContent.innerHTML = `
      <div class="code-terminal-card" style="margin-bottom: 16px;">
        <pre><code>${ffmpeg.fullScript}</code></pre>
      </div>
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <button type="button" class="btn btn-secondary copy-btn" data-copy-text="${encodeURIComponent(ffmpeg.fullScript)}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          <span>Copy setup_assets.sh Script</span>
        </button>
        <button type="button" class="btn btn-primary" id="downloadShFromLabBtn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          <span>Download .SH Script</span>
        </button>
      </div>
    `;

    document.getElementById("downloadShFromLabBtn")?.addEventListener("click", () => {
      downloadFile(ffmpeg.fullScript, `setup_assets_${slugify(d.prefix)}.sh`, "text/x-sh");
    });
  }

  // Shared Style Language Box (Step 1)
  const sharedStyle = generateSharedStyleLanguage(d);
  if (sharedStyleDisplay) {
    sharedStyleDisplay.textContent = sharedStyle;
  }

  // Video Style Fallback Box (Step 2)
  const videoStyle = generateVideoStyleFallback(d);
  if (videoStyleDisplay) {
    videoStyleDisplay.textContent = videoStyle;
  }

  // 4. Render Folder Architecture
  const folderTree = generateFolderTree(d);
  if (folderStructureContainer) {
    folderStructureContainer.innerHTML = `<pre><code>${folderTree}</code></pre>`;
  }

  // Folder Organization Prompt (Step 4)
  const folderOrg = generateFolderOrgPrompt(d);
  if (folderOrgDisplay) {
    folderOrgDisplay.textContent = folderOrg;
  }

  // 5. Render Master Build Prompt (Step 5)
  const masterPrompt = generateMasterBuildPrompt(d);
  if (masterPromptDisplay) {
    masterPromptDisplay.textContent = masterPrompt;
  }

  // Refinement Prompt (Step 5)
  const refinementPrompt = generateRefinementPrompt();
  if (refinementDisplay) {
    refinementDisplay.textContent = refinementPrompt;
  }

  // Deploy Prompt (Step 6)
  const deployPrompt = generateDeployPrompt();
  if (deployPromptDisplay) {
    deployPromptDisplay.textContent = deployPrompt;
  }

  // 6. Render Checklist
  const checklistItems = generateChecklist(d);
  renderChecklistElements(checklistItems);

  // 7. Render Extra Prompts & Site Expansion (Step 7 / Optional)
  const expansion = generateExtraPrompts(d);
  if (extraImageCardsContainer) {
    extraImageCardsContainer.innerHTML = expansion.extraImages.map(img => `
      <div class="prompt-card">
        <div class="card-top-meta">
          <span class="card-num-badge">EXTRA ${img.num}</span>
          <span class="card-ref-badge">${img.ref}</span>
        </div>
        <div class="card-filename">📁 ${slugify(d.prefix, "beauty salon")}-${img.num}-${slugify(img.title)}.jpeg</div>
        <div class="card-content-text">${img.prompt}</div>
        <div class="card-footer">
          <span class="card-tokens">${img.title}</span>
          <button type="button" class="btn-ghost-sm copy-btn" data-copy-text="${encodeURIComponent(img.prompt)}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            <span>Copy</span>
          </button>
        </div>
      </div>
    `).join("");
  }
  if (siteExpansionDisplay) {
    siteExpansionDisplay.textContent = expansion.siteExpansionPrompt;
  }
  if (sectionPolishDisplay) {
    sectionPolishDisplay.textContent = expansion.sectionPolishPrompt;
  }

  // Tab 2: Raw Document View
  if (rawDocOutput) {
    rawDocOutput.textContent = rawDoc;
  }

  // Tab 3: Storyboard & Live Mockup Synchronization
  renderStoryboardSimulation(d);
}

function renderChecklistElements(items) {
  const html = items.map(item => {
    const isChecked = checklistState[item.id] ? "checked" : "";
    return `
      <div class="checklist-item ${isChecked}" data-checklist-id="${item.id}" role="checkbox" aria-checked="${isChecked ? 'true' : 'false'}" tabindex="0">
        <div class="checklist-checkbox">
          ${isChecked ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>` : ''}
        </div>
        <div class="checklist-label">
          <strong>[${item.category}]</strong> ${item.text}
        </div>
      </div>
    `;
  }).join("");

  if (checklistContainer) checklistContainer.innerHTML = html;
  if (checklistFullView) checklistFullView.innerHTML = `<div class="checklist-grid">${html}</div>`;

  document.querySelectorAll(".checklist-item").forEach(el => {
    const toggleCheck = () => {
      const id = el.dataset.checklistId;
      checklistState[id] = !checklistState[id];
      localStorage.setItem("promptcraft_checklist", JSON.stringify(checklistState));
      renderChecklistElements(items);
    };

    el.addEventListener("click", toggleCheck);
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleCheck();
      }
    });
  });
}

function renderStoryboardSimulation(d) {
  const stages = [
    { num: "01", title: "Origin / Bud", desc: fallback(d.scene1, "Opening scene") },
    { num: "02", title: "Metamorphosis", desc: fallback(d.scene2, "Unfolding bloom expansion") },
    { num: "03", title: "Extraction", desc: fallback(d.scene3, "Molten material extraction") },
    { num: "04", title: "Casting / Craft", desc: fallback(d.scene4, "Forging inside mold") },
    { num: "05", title: "Hero Reveal", desc: fallback(d.scene5, "Hero application & finish") }
  ];

  if (storyboardTimeline) {
    storyboardTimeline.innerHTML = stages.map((st, idx) => `
      <div class="timeline-stage-card ${idx === currentStageIndex ? 'active' : ''}" data-index="${idx}">
        <div class="stage-header">
          <span class="stage-num">0${idx + 1} / STAGE</span>
          <span class="stage-title">${st.title}</span>
        </div>
        <div class="stage-visual-sim">
          <span style="font-size: 11px; color: var(--accent-gold-light); font-weight: 600; text-align: center; padding: 4px;">🎬 ${st.title}</span>
        </div>
        <p style="font-size: 11.5px; color: var(--text-muted); line-height: 1.35; margin-top: 4px;">${st.desc}</p>
      </div>
    `).join("");
  }

  // Update Live Mockup Header & Text
  const brand = fallback(d.brand, "MEERUB");
  
  if (mockNavBrand) mockNavBrand.textContent = brand;
  if (mockTag) mockTag.textContent = `${fallback(d.productType, "COUTURE BEAUTY ARTISTRY").toUpperCase()}`;
  if (mockH1) mockH1.textContent = fallback(d.headline, brand);
  if (mockSub) mockSub.textContent = fallback(d.subtitle, "A beauty, reimagined through cinematic scroll craft.");
  if (mockNavCta) mockNavCta.textContent = fallback(d.cta, "Acquire");

  const navs = fallback(d.nav, "Story, Craftsmanship, Ritual, Shades").split(",").map(n => n.trim()).filter(Boolean);
  if (mockNavLinks) {
    mockNavLinks.innerHTML = navs.slice(0, 4).map(n => `<span>${n}</span>`).join("");
  }

  if (mockSec1Title) mockSec1Title.textContent = fallback(d.section1Title, "Beauty Details become beauty artistry.");
  if (mockSec1Desc) mockSec1Desc.textContent = fallback(d.scene3, "Fallen beauty details dissolve into molten red beauty artistry pouring into a chrome beauty salon mold.");
  if (mockSec2Title) mockSec2Title.textContent = fallback(d.section2Title, "Beauty Artistry becomes couture.");
  if (mockSec2Desc) mockSec2Desc.textContent = fallback(d.copy, "Cooling and setting into a precise matte final look shape in front-on luxury editorial presentation.");
  if (mockupUrl) mockupUrl.textContent = `https://${slugify(d.folder || d.brand)}.live`;

  setStoryboardStage(currentStageIndex, false);
}

// ==========================================================================
// 6. Event Listeners & Interaction Handlers
// ==========================================================================

// Form change / keyup real-time listener
form.addEventListener("input", () => {
  updateColorChips();
  renderAllOutputs();
});

form.addEventListener("change", (e) => {
  if (e.target.name === "person") {
    updatePersonFieldVisibility();
  }
  updateColorChips();
  renderAllOutputs();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  renderAllOutputs();
  showToast("All 6 workflow steps regenerated!", "success");
});

// Top Generate Button
topGenerateBtn?.addEventListener("click", () => {
  renderAllOutputs();
  showToast("Generated all 6 workflow steps!", "success");
  document.querySelector('[data-tab="cards"]')?.click();
  document.getElementById("sectionImages")?.scrollIntoView({ behavior: "smooth", block: "start" });
});

// Preset selection listeners
presetPicker.addEventListener("change", () => {
  if (presetPicker.value) applyPreset(presetPicker.value);
});

loadPresetButton.addEventListener("click", () => {
  if (presetPicker.value) {
    applyPreset(presetPicker.value);
  } else {
    showToast("Please choose a preset from the dropdown first.", "info");
  }
});

// Accordions toggle
document.querySelectorAll(".accordion-toggle").forEach(btn => {
  btn.addEventListener("click", () => {
    const parent = btn.closest(".accordion-group");
    const isOpen = parent.classList.contains("open");
    parent.classList.toggle("open", !isOpen);
    btn.setAttribute("aria-expanded", !isOpen);
  });
});

// Tab Switcher
const tabBtns = document.querySelectorAll(".tab-btn");
const tabPanes = document.querySelectorAll(".tab-pane");

tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const targetTab = btn.dataset.tab;

    tabBtns.forEach(b => {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
    });
    tabPanes.forEach(p => p.classList.remove("active"));

    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");

    const targetPaneId = {
      cards: "tabCards",
      doc: "tabDoc",
      storyboard: "tabStoryboard",
      terminal: "tabTerminal",
      checklist: "tabChecklist"
    }[targetTab];

    if (targetPaneId) {
      document.getElementById(targetPaneId)?.classList.add("active");
    }
  });
});

// Workflow progress step clicks
document.querySelectorAll(".workflow-step").forEach(step => {
  const handleStepClick = () => {
    document.querySelectorAll(".workflow-step").forEach(s => s.classList.remove("active"));
    step.classList.add("active");

    document.querySelector('[data-tab="cards"]')?.click();
    const stepNum = step.dataset.step;
    const targetSection = {
      "1": "sectionImages",
      "2": "sectionVideos",
      "3": "sectionMerge",
      "4": "sectionFolder",
      "5": "sectionBuildPrompt",
      "6": "sectionDeployChecklist",
      "7": "sectionExpansion"
    }[stepNum];

    if (targetSection) {
      const el = document.getElementById(targetSection);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  step.addEventListener("click", handleStepClick);
  step.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleStepClick();
    }
  });
});

// Copy button handlers (delegated)
document.addEventListener("click", (e) => {
  const copyBtn = e.target.closest(".copy-btn");
  if (!copyBtn) return;

  const d = getFormData();
  const directText = copyBtn.dataset.copyText;
  const target = copyBtn.dataset.copyTarget;

  if (directText) {
    copyTextToClipboard(decodeURIComponent(directText), "Prompt copied!");
    return;
  }

  if (target === "allImagesText") {
    const images = generateImagePrompts(d);
    const text = images.map(img => `Prompt ${img.num} - ${img.name} (${img.refText})\nFile name: ${img.filename}\n${img.promptText}`).join("\n\n");
    copyTextToClipboard(text, "All image prompts copied!");
  } else if (target === "sharedStyleText") {
    const style = generateSharedStyleLanguage(d);
    copyTextToClipboard(style, "Shared style language copied!");
  } else if (target === "allVideosText") {
    const videos = generateVideoPrompts(d);
    const text = videos.map(vid => `${vid.id} - ${vid.name} (${vid.length})\nFile name: ${vid.filename}\nStart: ${vid.startFrame} | End: ${vid.endFrame}\n${vid.promptText}`).join("\n\n");
    copyTextToClipboard(text, "All video prompts copied!");
  } else if (target === "videoStyleText") {
    const vStyle = generateVideoStyleFallback(d);
    copyTextToClipboard(vStyle, "Video style fallback copied!");
  } else if (target === "ffmpegScriptText") {
    const ffmpeg = generateFFmpegCommands(d);
    copyTextToClipboard(ffmpeg.fullScript, "FFmpeg commands copied!");
  } else if (target === "folderTreeText") {
    const tree = generateFolderTree(d);
    copyTextToClipboard(tree, "Folder tree copied!");
  } else if (target === "folderOrgText") {
    const orgPrompt = generateFolderOrgPrompt(d);
    copyTextToClipboard(orgPrompt, "Folder organization prompt copied!");
  } else if (target === "masterPromptText") {
    const prompt = generateMasterBuildPrompt(d);
    copyTextToClipboard(prompt, "Master AI Build Prompt copied!");
  } else if (target === "refinementText") {
    const refinePrompt = generateRefinementPrompt();
    copyTextToClipboard(refinePrompt, "Refinement prompt copied!");
  } else if (target === "deployPromptText") {
    const depPrompt = generateDeployPrompt();
    copyTextToClipboard(depPrompt, "Deploy prompt copied!");
  } else if (target === "allExpansionText") {
    const exp = generateExtraPrompts(d);
    const extraImgText = exp.extraImages.map(img => `### ${img.title} (${img.ref})\n${img.prompt}`).join("\n\n");
    const fullExp = `${extraImgText}\n\n### Site Expansion Prompt:\n${exp.siteExpansionPrompt}\n\n### Section Polish Prompt:\n${exp.sectionPolishPrompt}`;
    copyTextToClipboard(fullExp, "Expansion suite copied!");
  } else if (target === "siteExpansionText") {
    const exp = generateExtraPrompts(d);
    copyTextToClipboard(exp.siteExpansionPrompt, "Site expansion prompt copied!");
  } else if (target === "sectionPolishText") {
    const exp = generateExtraPrompts(d);
    copyTextToClipboard(exp.sectionPolishPrompt, "Section polish prompt copied!");
  } else if (target === "rawDocOutput") {
    const doc = generateFullUnifiedDocument(d);
    copyTextToClipboard(doc, "Full 6-Step Plan copied!");
  }
});

// Veo Fallback Selector & Append Handlers
if (veoFallbackSelector) {
  veoFallbackSelector.addEventListener("change", () => {
    currentVeoFallbackKey = veoFallbackSelector.value;
    const d = getFormData();
    const directive = getActiveVeoFallbackDirective(d);
    if (videoStyleDisplay) {
      videoStyleDisplay.textContent = directive;
    }
    const presetObj = VEO_FALLBACK_DIRECTIVES[currentVeoFallbackKey];
    const label = presetObj ? presetObj.label : "Custom Lock";
    showToast(`Loaded ${label}. Click Copy or Append to use.`, "info");
    if (isVeoFallbackAppended) {
      renderAllOutputs();
    }
  });
}

if (appendVeoFallbackBtn) {
  appendVeoFallbackBtn.addEventListener("click", () => {
    isVeoFallbackAppended = !isVeoFallbackAppended;
    appendVeoFallbackBtn.classList.toggle("active-btn", isVeoFallbackAppended);
    const span = appendVeoFallbackBtn.querySelector("span");
    if (span) {
      span.textContent = isVeoFallbackAppended ? "Appended ✓" : "Append to Prompts";
    }
    renderAllOutputs();
    const d = getFormData();
    const directive = getActiveVeoFallbackDirective(d);
    if (isVeoFallbackAppended) {
      copyTextToClipboard(`\n\n--style-fallback: ${directive}`, "Appended & copied fallback directive!");
      showToast("Appended '--style-fallback: ' to all video motion prompts!", "success");
    } else {
      showToast("Removed style fallback from video motion prompts.", "info");
    }
  });
}

// Top Action Buttons
topCopyMasterBtn.addEventListener("click", () => {
  const d = getFormData();
  const prompt = generateMasterBuildPrompt(d);
  copyTextToClipboard(prompt, "Master AI Build Prompt copied to clipboard!");
});

copyActiveTabBtn.addEventListener("click", () => {
  const activeTab = document.querySelector(".tab-btn.active")?.dataset.tab;
  const d = getFormData();

  if (activeTab === "cards" || activeTab === "doc") {
    copyTextToClipboard(generateFullUnifiedDocument(d), "Full plan copied!");
  } else if (activeTab === "terminal") {
    copyTextToClipboard(generateFFmpegCommands(d).fullScript, "FFmpeg script copied!");
  } else if (activeTab === "storyboard") {
    copyTextToClipboard(generateMasterBuildPrompt(d), "Master prompt copied!");
  } else if (activeTab === "checklist") {
    const items = generateChecklist(d).map(c => `[ ] (${c.category}) ${c.text}`).join("\n");
    copyTextToClipboard(items, "Checklist copied!");
  }
});

// Export PDF Implementation
function handleExportPdf() {
  const d = getFormData();
  
  // If the output is empty, generate the six-step plan first
  if (!masterPromptDisplay || !masterPromptDisplay.textContent || masterPromptDisplay.textContent.includes("Click Generate")) {
    generate();
  }

  const brand = fallback(d.brand, "Website Plan");
  const fullPlanText = generateFullUnifiedDocument(d);

  // Open clean printable page in new window
  const printWindow = window.open("", "_blank");
  if (!printWindow || printWindow.closed || typeof printWindow.closed === "undefined") {
    showToast("Popup blocked! Please allow popups for this site and try Export PDF again.", "info");
    return;
  }

  const printableHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(brand)} — 6-Step Website Specification</title>
  <style>
    @page {
      size: letter portrait;
      margin: 18mm 15mm 18mm 15mm;
    }
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      background: #ffffff !important;
      color: #111827 !important;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 13px;
      line-height: 1.5;
      padding: 24px;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .pdf-header {
      border-bottom: 2px solid #111827;
      padding-bottom: 14px;
      margin-bottom: 20px;
    }
    .pdf-title {
      font-size: 24px;
      font-weight: 800;
      color: #000000;
      letter-spacing: -0.02em;
      margin-bottom: 4px;
    }
    .pdf-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      color: #4b5563;
      font-weight: 500;
    }
    .pdf-note {
      font-style: italic;
      color: #374151;
    }
    .pdf-date {
      color: #6b7280;
    }
    .pdf-content {
      font-family: ui-monospace, "SF Mono", "Cascadia Mono", "Segoe UI Mono", "Roboto Mono", "JetBrains Mono", "Courier New", monospace;
      font-size: 11px;
      line-height: 1.55;
      color: #000000;
      white-space: pre-wrap;
      word-break: break-word;
      tab-size: 2;
    }
    @media print {
      body {
        padding: 0;
      }
      .pdf-header {
        margin-bottom: 16px;
      }
    }
  </style>
</head>
<body>
  <div class="pdf-header">
    <h1 class="pdf-title">${escapeHtml(brand)}</h1>
    <div class="pdf-meta">
      <span class="pdf-note">Generated from the website prompt form.</span>
      <span class="pdf-date">${new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
    </div>
  </div>
  <pre class="pdf-content">${escapeHtml(fullPlanText)}</pre>
  <script>
    window.addEventListener('load', () => {
      setTimeout(() => {
        window.focus();
        window.print();
      }, 300);
    });
  <\/script>
</body>
</html>`;

  printWindow.document.open();
  printWindow.document.write(printableHtml);
  printWindow.document.close();

  showToast("Opening print dialog for PDF export...", "success");
}

// Export PDF Button Listeners
exportPdf?.addEventListener("click", handleExportPdf);
downloadPdfBtn?.addEventListener("click", handleExportPdf);
exportPdfTabBtn?.addEventListener("click", handleExportPdf);

// Export Dropdown
exportMenuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  exportDropdownMenu.classList.toggle("show");
  exportMenuBtn.setAttribute("aria-expanded", exportDropdownMenu.classList.contains("show"));
});

document.addEventListener("click", () => {
  exportDropdownMenu.classList.remove("show");
  exportMenuBtn.setAttribute("aria-expanded", "false");
});

downloadMdBtn.addEventListener("click", () => {
  const d = getFormData();
  const content = generateFullUnifiedDocument(d);
  downloadFile(content, `${slugify(d.brand, "project")}-cinematic-plan.md`, "text/markdown");
});

downloadTxtBtn.addEventListener("click", () => {
  const d = getFormData();
  const content = generateFullUnifiedDocument(d);
  downloadFile(content, `${slugify(d.brand, "project")}-cinematic-plan.txt`, "text/plain");
});

downloadShBtn.addEventListener("click", () => {
  const d = getFormData();
  const ffmpeg = generateFFmpegCommands(d);
  downloadFile(ffmpeg.fullScript, `setup_assets_${slugify(d.prefix, "project")}.sh`, "text/x-sh");
});

exportJsonBtn.addEventListener("click", () => {
  const d = getFormData();
  const jsonStr = JSON.stringify(d, null, 2);
  downloadFile(jsonStr, `${slugify(d.brand, "project")}-config.json`, "application/json");
});

// Import JSON
importJsonBtn.addEventListener("click", () => {
  jsonFileInput.click();
});

jsonFileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      setFormData(data);
      showToast(`Imported "${data.brand || 'Project'}" configuration!`, "success");
    } catch (err) {
      showToast("Invalid JSON file format.", "info");
    }
  };
  reader.readAsText(file);
});

// Reset Form
resetFormBtn.addEventListener("click", () => {
  if (confirm("Reset form to default MEERUB Beauty Salon preset?")) {
    if (typeof presets !== "undefined" && presets.meerubBeautySalon) {
      presetPicker.value = "meerubBeautySalon";
      applyPreset("meerubBeautySalon");
    } else if (typeof presets !== "undefined" && presets.bloomLuxuryLipstick) {
      presetPicker.value = "bloomLuxuryLipstick";
      applyPreset("bloomLuxuryLipstick");
    } else if (typeof presets !== "undefined" && presets.realEstateLuxuryVilla) {
      applyPreset("realEstateLuxuryVilla");
      presetPicker.value = "realEstateLuxuryVilla";
    }
    showToast("Reset to MEERUB Beauty Salon preset.", "info");
  }
});

// Reset Checklist
resetChecklistBtn?.addEventListener("click", () => {
  checklistState = {};
  localStorage.removeItem("promptcraft_checklist");
  renderChecklistElements(generateChecklist(getFormData()));
  showToast("Checklist reset.", "info");
});

// Theme Toggle
themeToggleBtn.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("promptcraft_theme", newTheme);
  showToast(`Switched to ${newTheme} mode!`, "info");
});

// ==========================================================================
// 7. Luxury Interactive Enhancements & Scrollytelling Simulator
// ==========================================================================

let currentStageIndex = 0;
let isStoryboardPlaying = false;
let storyboardInterval = null;

function setStoryboardStage(stageIdx, updateScrubber = true) {
  currentStageIndex = Math.max(0, Math.min(4, stageIdx));
  
  // Update timeline cards
  document.querySelectorAll(".timeline-stage-card").forEach((card, idx) => {
    card.classList.toggle("active", idx === currentStageIndex);
  });

  // Update morphing canvas stage artwork
  for (let i = 1; i <= 5; i++) {
    const art = document.getElementById(`stageArt${i}`);
    if (art) art.classList.toggle("active", i === currentStageIndex + 1);
  }

  // Update Scrubber
  const scrubber = document.getElementById("storyboardScrubber");
  const scrubPct = document.getElementById("scrubPct");
  const pct = currentStageIndex * 25;
  if (scrubber && updateScrubber) {
    scrubber.value = pct;
  }
  if (scrubPct) {
    scrubPct.textContent = `${pct}%`;
  }

  // Update Stage Indicator Text
  const d = getFormData();
  const stageLabels = [
    `STAGE 01 / ORIGIN · ${fallback(d.scene1, "A single centered beautybud on unbroken stem")}`,
    `STAGE 02 / METAMORPHOSIS · ${fallback(d.scene2, "Complete full bloom expansion")}`,
    `STAGE 03 / EXTRACTION · ${fallback(d.scene3, "Molten beauty artistry extraction")}`,
    `STAGE 04 / CRAFT · ${fallback(d.scene4, "Chrome mold casting & precision forging")}`,
    `STAGE 05 / HERO REVEAL · ${fallback(d.scene5, "Finished standing silhouette & model styling")}`
  ];

  const indicator = document.getElementById("mockStageIndicator");
  if (indicator && stageLabels[currentStageIndex]) {
    indicator.textContent = stageLabels[currentStageIndex].toUpperCase();
  }
}

function initStoryboardScroller() {
  const scrubber = document.getElementById("storyboardScrubber");
  const scrubPct = document.getElementById("scrubPct");
  const playBtn = document.getElementById("playStoryboardBtn");
  const playBtnLabel = document.getElementById("playBtnLabel");

  if (scrubber) {
    scrubber.addEventListener("input", (e) => {
      const val = parseInt(e.target.value, 10);
      if (scrubPct) scrubPct.textContent = `${val}%`;
      const stage = Math.min(4, Math.floor(val / 20.01));
      setStoryboardStage(stage, false);
    });
  }

  if (playBtn) {
    playBtn.addEventListener("click", () => {
      if (isStoryboardPlaying) {
        clearInterval(storyboardInterval);
        isStoryboardPlaying = false;
        if (playBtnLabel) playBtnLabel.textContent = "Play Sequence";
      } else {
        isStoryboardPlaying = true;
        if (playBtnLabel) playBtnLabel.textContent = "Pause Sequence";
        storyboardInterval = setInterval(() => {
          let next = (currentStageIndex + 1) % 5;
          setStoryboardStage(next, true);
        }, 1800);
      }
    });
  }

  // Timeline card click delegation
  document.getElementById("storyboardTimeline")?.addEventListener("click", (e) => {
    const card = e.target.closest(".timeline-stage-card");
    if (card && typeof card.dataset.index !== "undefined") {
      setStoryboardStage(parseInt(card.dataset.index, 10), true);
    }
  });

  // Interactive 3D Perspective Tilt on Live Mockup
  const wrapper = document.getElementById("liveMockupWrapper");
  if (wrapper) {
    wrapper.addEventListener("mousemove", (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotX = (y / (rect.height / 2)) * -3.5;
      const rotY = (x / (rect.width / 2)) * 3.5;
      wrapper.style.transform = `perspective(1200px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
    });

    wrapper.addEventListener("mouseleave", () => {
      wrapper.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)";
    });
  }
}

function initCustomCursor() {
  const cursor = document.getElementById("customCursor");
  const badge = document.getElementById("cursorBadge");
  if (!cursor) return;

  let mouseX = -100, mouseY = -100;
  let cursorX = -100, cursorY = -100;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderCursor() {
    cursorX += (mouseX - cursorX) * 0.22;
    cursorY += (mouseY - cursorY) * 0.22;
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  function attachHoverLabels() {
    document.querySelectorAll(".copy-btn, .highlight-btn").forEach(el => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("hovering");
        if (badge) badge.textContent = "COPY";
      });
      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("hovering");
        if (badge) badge.textContent = "";
      });
    });

    document.querySelectorAll(".tab-btn, .workflow-step").forEach(el => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("hovering");
        if (badge) badge.textContent = "VIEW";
      });
      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("hovering");
        if (badge) badge.textContent = "";
      });
    });

    document.querySelectorAll("#storyboardScrubber, #playStoryboardBtn, .timeline-stage-card").forEach(el => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("hovering");
        if (badge) badge.textContent = "SCRUB";
      });
      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("hovering");
        if (badge) badge.textContent = "";
      });
    });

    document.querySelectorAll("select, .accordion-toggle").forEach(el => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("hovering");
        if (badge) badge.textContent = "SELECT";
      });
      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("hovering");
        if (badge) badge.textContent = "";
      });
    });
  }

  attachHoverLabels();
}

function initScrollProgress() {
  const line = document.getElementById("scrollProgressLine");
  if (!line) return;

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    line.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
  }, { passive: true });
}

// ==========================================================================
// 8. Master Initialization
// ==========================================================================

function init() {
  const savedTheme = localStorage.getItem("promptcraft_theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }

  populatePresetDropdown();
  initCustomCursor();
  initScrollProgress();
  initStoryboardScroller();

  if (typeof presets !== "undefined") {
    if (presets.meerubBeautySalon) {
      presetPicker.value = "meerubBeautySalon";
      applyPreset("meerubBeautySalon");
    } else if (presets.bloomLuxuryLipstick) {
      presetPicker.value = "bloomLuxuryLipstick";
      applyPreset("bloomLuxuryLipstick");
    } else if (presets.realEstateLuxuryVilla) {
      presetPicker.value = "realEstateLuxuryVilla";
      applyPreset("realEstateLuxuryVilla");
    }
  } else {
    renderAllOutputs();
  }
}

document.addEventListener("DOMContentLoaded", init);
