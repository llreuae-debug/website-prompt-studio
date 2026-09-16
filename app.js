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
// 4. Output Generators (Steps 1 to 6)
// ==========================================================================

function generateImagePrompts(d) {
  const prefix = slugify(d.prefix, "product");
  const camera = fallback(d.camera, "ARRI Alexa 65, 85mm lens, softbox key light, ultra photorealistic 8K, cinematic commercial lighting.");
  const bg = fallback(d.background, "clean cinematic studio backdrop with soft atmospheric rim light");
  const avoid = fallback(d.avoid, "no text, no watermark, no logos");
  const colors = fallback(d.colors, "brand colors");
  const brand = fallback(d.brand, "The Brand");
  const product = fallback(d.product, "The Product");
  const texture = fallback(d.texture, "high-end luxury texture");

  const scenes = [
    ["01", "opening-scene", d.scene1 || "Opening genesis raw state"],
    ["02", "first-transformation", d.scene2 || "Unfolding metamorphosis step"],
    ["03", "hero-detail", d.scene3 || "Material extraction and particle dissolve"],
    ["04", "material-change", d.scene4 || "Forging and molding the piece"],
    ["05", "finished-product", d.scene5 || "Completed hero piece presented in center"],
    ["06", "product-closeup", `${d.productName || product} shown in a macro close-up highlighting ${texture}`],
    ["07", "lifestyle-moment", d.person === "yes" ? (d.personDescription || "High-fashion model interaction") : `${product} standing alone in a sculptural architectural pose`],
    ["08", "final-campaign-frame", `${d.productName || product} presented as the definitive luxury campaign hero visual`],
    ["09", "supporting-angle", `An elevated 45-degree angle of ${d.productName || product} with dramatic rim light`],
    ["10", "closing-scene", `Final polished atmospheric brand composition for ${brand}`]
  ];

  const count = parseInt(d.imageCount, 10) || 8;
  return scenes.slice(0, count).map(([num, name, sceneDesc], idx) => {
    const isFirst = idx === 0;
    const refText = isFirst ? "Genesis shot (No reference)" : `Reference: Image ${scenes[idx - 1][0]}`;
    const filename = `${prefix}-${num}-${name}.jpg`;
    
    const promptText = `${sceneDesc} for ${brand}, featuring ${product} in a ${d.feeling || "cinematic luxury"} aesthetic. Maintain consistent optical camera angle, sharp focus, and subject continuity with the previous frame. Environment: ${bg}. Optics & Lighting: ${camera}. Color Palette: ${colors}. ${avoid}.`;

    return {
      num,
      name,
      filename,
      refText,
      promptText,
      tokens: Math.round(promptText.split(" ").length * 1.35)
    };
  });
}

function generateVideoPrompts(d) {
  const prefix = slugify(d.prefix, "product");
  const camera = fallback(d.camera, "cinematic commercial lighting");
  const bg = fallback(d.background, "premium studio background");
  const product = fallback(d.productName || d.product, "product");

  const clips = [
    ["V01", "opening-transition", "Image 01", "Image 02", "2.5s", `${d.scene1 || "Opening scene"} transforms smoothly into ${d.scene2 || "scene 2"}`],
    ["V02", "main-reveal", "Image 02", "Image 03", "2.0s", `${d.scene2 || "Scene 2"} dissolves dynamically into ${d.scene3 || "scene 3"}`],
    ["V03", "material-shift", "Image 03", "Image 04", "2.5s", `${d.scene3 || "Scene 3"} cascades and flows into ${d.scene4 || "scene 4"}`],
    ["V04", "product-formation", "Image 04", "Image 05", "2.0s", `${d.scene4 || "Scene 4"} solidifies and locks into ${d.scene5 || "scene 5"}`],
    ["V05", "product-beauty", "Image 05", "Image 06", "2.0s", `A slow orbital beauty rotation revealing the tactile details of ${product}`],
    ["V06", "hero-finish", "Image 06", "Image 08", "4.0s", d.person === "yes" ? `${product} transitions into the final model application moment` : `${product} rests in an epic centered campaign pose with subtle atmospheric lighting`],
    ["V07", "extra-detail", "Image 08", "Image 09", "2.0s", `An elevated macro glide across the fine surface textures of ${product}`]
  ];

  const count = parseInt(d.videoCount, 10) || 6;
  return clips.slice(0, count).map(([id, name, startFrame, endFrame, length, motion]) => {
    const filename = `${prefix}-${id.toLowerCase()}-${name}.mp4`;
    const promptText = `Continuous cinematic commercial video clip where ${motion}. Camera motion must be slow, fluid, steady, and natural. Maintain identical studio lighting, framing, color grading, and product geometry throughout. Style: ${camera}. Backdrop: ${bg}. Zero watermarks, zero text, zero jitter, zero abrupt cuts.`;

    return {
      id,
      name,
      filename,
      startFrame,
      endFrame,
      length,
      promptText
    };
  });
}

function generateFFmpegCommands(d) {
  const prefix = slugify(d.prefix, "product");
  const folder = slugify(d.folder || d.brand, "website");

  return {
    rawMerge: `# 1. Combine all video clips into a single raw story sequence
ffmpeg -f concat -safe 0 -i clips.txt -c copy ${prefix}-story-raw.mp4`,

    reEncode: `# 2. Re-encode hero video for instant smooth canvas scroll playback (GOP=1, Faststart)
ffmpeg -i ${prefix}-story-raw.mp4 -vf "scale=960:-1" -movflags +faststart -vcodec libx264 -crf 19 -g 1 -pix_fmt yuv420p -an ${prefix}-story.mp4`,

    extractFrames: `# 3. Extract 20fps high-quality JPEG frames for HTML5 Canvas Scroll Sequence
mkdir -p frames
ffmpeg -i ${prefix}-story.mp4 -vf "fps=20,scale=960:-1" -q:v 3 frames/frame_%04d.jpg`,

    fullScript: `#!/usr/bin/env bash
# ==============================================================================
# ${d.brand || "Brand"} Video Asset Automation Script
# Generated by PromptCraft Studio
# ==============================================================================

set -e
echo "🎬 Processing video assets for ${folder}..."

# Create directories
mkdir -p videos images frames

# Verify clips list
if [ ! -f "clips.txt" ]; then
  echo "Creating clips.txt manifest..."
  ls -1v videos/${prefix}-v*.mp4 | sed "s/^/file '/" | sed "s/$/'/" > clips.txt
fi

echo "📦 Merging clips..."
ffmpeg -y -f concat -safe 0 -i clips.txt -c copy ${prefix}-story-raw.mp4

echo "⚡ Re-encoding hero story for scroll performance..."
ffmpeg -y -i ${prefix}-story-raw.mp4 -vf "scale=960:-1" -movflags +faststart -vcodec libx264 -crf 19 -g 1 -pix_fmt yuv420p -an ${prefix}-story.mp4

echo "🖼️ Extracting frame sequence for HTML5 Canvas..."
ffmpeg -y -i ${prefix}-story.mp4 -vf "fps=20,scale=960:-1" -q:v 3 frames/frame_%04d.jpg

FRAME_COUNT=$(ls -1 frames/frame_*.jpg | wc -l)
echo "✅ Finished! Extracted $FRAME_COUNT frames into frames/ directory."
`
  };
}

function generateFolderTree(d) {
  const prefix = slugify(d.prefix, "product");
  const folder = slugify(d.folder || d.brand, "website");
  const images = generateImagePrompts(d);
  const videos = generateVideoPrompts(d);

  const imageLines = images.map(img => `│   ├── ${img.filename}`).join("\n");
  const videoLines = videos.map(vid => `│   ├── ${vid.filename}`).join("\n");

  return `${folder}/
├── index.html
├── styles.css
├── app.js
├── master-build-prompt.md
├── ${prefix}-story.mp4
├── images/
${imageLines}
├── videos/
${videoLines}
└── frames/
    ├── frame_0001.jpg
    ├── frame_0002.jpg
    └── frame_0120.jpg`;
}

function generateMasterBuildPrompt(d) {
  const brand = fallback(d.brand, "Brand");
  const product = fallback(d.product, "Product");
  const productName = fallback(d.productName, product);
  const headline = fallback(d.headline, brand);
  const prefix = slugify(d.prefix, "product");
  const navItems = fallback(d.nav, "Story, Craft, Specs, Shop").split(",").map(s => s.trim()).filter(Boolean).join(" / ");

  return `Build a world-class, premium ${d.feeling || "cinematic luxury"} website for ${brand} promoting ${productName}.

Tech Stack: ${d.codeStyle || "vanilla HTML, CSS, and JavaScript"}.
The finished application must feel immersive, smooth, responsive, visually stunning, and production-ready.

Brand Specifications:
- Brand Name: ${brand}
- Product: ${product} (${productName})
- Category: ${fallback(d.productType, "Luxury Item")}
- Tactile Finish: ${fallback(d.texture, "Premium finish")}
- Target Audience: ${fallback(d.audience, "Design-conscious buyers")}
- Color Palette: ${fallback(d.colors, "Curated luxury palette")}
- Background Atmosphere: ${fallback(d.background, "Cinematic studio gradient")}
- Visual Vibe: ${fallback(d.feeling, "Cinematic luxury")}
- Avoid: ${fallback(d.avoid, "Distortions, noisy textures, watermarks")}

Asset Manifest:
- Hero Video: ${prefix}-story.mp4
- Canvas Scroll Frames: frames/frame_0001.jpg through frames/frame_0120.jpg
- Image Assets: images/ folder
- Video Clips: videos/ folder

Layout & Page Architecture (Build in this exact order):

1. Sticky Glassmorphism Navigation:
   - Left: ${brand} wordmark logo with refined typography
   - Center/Right: Navigation links (${navItems})
   - Call to Action: "${fallback(d.cta, "Acquire Now")}" button with subtle hover glow

2. Pinned Canvas Scroll Hero Section:
   - Sticky full-viewport HTML5 <canvas> element linked to window scroll progress.
   - Preload image frames sequentially from frames/frame_0001.jpg. Render frame 0001 immediately on load.
   - Smoothly draw frames into canvas on requestAnimationFrame based on scroll percentage.
   - Floating typography overlays that smoothly fade in, hold, and fade out as user scrolls:
     • Stage 1: "${headline}"
     • Stage 2: "${fallback(d.subtitle, "A masterwork of design.")}"
     • Stage 3: "${fallback(d.section1Title, "Pure Material Metamorphosis")}"
     • Stage 4: "${fallback(d.section2Title, "Sculpted Into Perfection")}"

3. Transformation Narrative Section:
   - Large editorial headline tracking the 5-stage transformation:
     "${fallback(d.scene1, "Genesis")}" → "${fallback(d.scene5, "Hero Reveal")}"
   - Deep rich typography, generous whitespace, and luxury spacing.

4. Product Architectural Feature Section:
   - Feature ${productName} in high fidelity with micro-details.
   - Showcase tactile material finish: ${fallback(d.texture, "premium texture")}.
   - Multi-column grid showcasing macro imagery from images/.

5. Engineering / Formula Specification Section:
   - Title: "${fallback(d.section1Title, "The Alchemy")}"
   - Narrative: "${fallback(d.copy, "A bespoke sensory creation.")}"
   - Include spec badges, dimension markers, or key ingredient breakdown.

6. Final Campaign / Acquisition Section:
   - Title: "${fallback(d.section2Title, "Reserve Your Piece")}"
   - Full-bleed hero campaign visual presentation.
   - Main CTA Button: "${fallback(d.cta, "Shop Now")}".

7. Footer:
   - ${brand} copyright, navigation map, legal links, newsletter signup, and brand philosophy tagline.

Engineering & Design Standards:
- Zero external CSS libraries (Pure CSS with custom properties & glassmorphism).
- Silky smooth 60fps canvas scroll with responsive window resizing and devicePixelRatio handling.
- Flawless responsiveness across Mobile (375px), Tablet (768px), and 4K Desktop (1920px+).
- Accessible semantics (ARIA labels, focus outlines, contrast ratios 4.5:1+).`;
}

function generateChecklist(d) {
  const prefix = slugify(d.prefix, "product");
  const folder = slugify(d.folder || d.brand, "website");
  const hosting = fallback(d.hosting, "Netlify");
  const imageCountFormatted = String(d.imageCount || 8).padStart(2, "0");

  return [
    { id: "c1", category: "Assets", text: `Generate all ${d.imageCount || 8} image prompts sequentially in Midjourney / FLUX.` },
    { id: "c2", category: "Assets", text: `Generate all ${d.videoCount || 6} video motion clips with matching start/end keyframes in Runway / Luma / Kling.` },
    { id: "c3", category: "Assets", text: `Verify all images are named cleanly as ${prefix}-01-*.jpg through ${prefix}-${imageCountFormatted}-*.jpg in images/.` },
    { id: "c4", category: "FFmpeg", text: `Run FFmpeg merge to generate ${prefix}-story-raw.mp4 without audio sync issues.` },
    { id: "c5", category: "FFmpeg", text: `Re-encode hero video with faststart & GOP=1 into ${prefix}-story.mp4.` },
    { id: "c6", category: "FFmpeg", text: `Extract canvas frames into frames/frame_%04d.jpg and confirm 100+ frames exist.` },
    { id: "c7", category: "Code", text: `Confirm index.html preloads frame_0001.jpg immediately to prevent initial layout flash.` },
    { id: "c8", category: "Code", text: `Verify canvas aspect ratio resize listener and devicePixelRatio scaling.` },
    { id: "c9", category: "QA", text: "Test on mobile phone viewport (iOS Safari and Android Chrome)." },
    { id: "c10", category: "Deploy", text: `Deploy ${folder}/ to ${hosting} and verify live link.` }
  ];
}

function generateFullUnifiedDocument(d) {
  const brand = fallback(d.brand, "Brand");
  const product = fallback(d.product, "Product");
  const prefix = slugify(d.prefix, "product");
  const folder = slugify(d.folder || d.brand, "website");

  const images = generateImagePrompts(d);
  const videos = generateVideoPrompts(d);
  const ffmpeg = generateFFmpegCommands(d);
  const masterPrompt = generateMasterBuildPrompt(d);

  return `# SIX-STEP CINEMATIC WEBSITE & ASSET WORKFLOW: ${brand.toUpperCase()}

Generated by PromptCraft Studio
Date: ${new Date().toLocaleDateString()}

--------------------------------------------------------------------------------
PROJECT BRIEF & IDENTITY
--------------------------------------------------------------------------------
Brand: ${brand}
Product: ${product} (${fallback(d.productName, product)})
Atmosphere / Vibe: ${fallback(d.feeling, "Cinematic Luxury")}
Target Audience: ${fallback(d.audience, "High-end consumers")}
Color Palette: ${fallback(d.colors, "Brand colors")}
Backdrop: ${fallback(d.background, "Studio background")}
Camera & Optics: ${fallback(d.camera, "ARRI Cinema")}

================================================================================
STEP 1: IMAGE PROMPTS (Reference Chaining Sequence)
================================================================================
Generate sequentially. Keep identical lighting, color grading, and framing.

${images.map(img => `### [${img.num}] ${img.name} (${img.refText})
Filename: ${img.filename}
Prompt:
${img.promptText}
`).join("\n")}

================================================================================
STEP 2: VIDEO PROMPTS (Keyframe Motion Sequence)
================================================================================
Generate clips using corresponding start and end images.

${videos.map(vid => `### [${vid.id}] ${vid.name} (Length: ${vid.length})
Filename: ${vid.filename}
Start Frame: ${vid.startFrame} | End Frame: ${vid.endFrame}
Motion Prompt:
${vid.promptText}
`).join("\n")}

================================================================================
STEP 3: FFMPEG PIPELINE INSTRUCTIONS
================================================================================
${ffmpeg.rawMerge}

${ffmpeg.reEncode}

${ffmpeg.extractFrames}

================================================================================
STEP 4: FOLDER STRUCTURE
================================================================================
${generateFolderTree(d)}

================================================================================
STEP 5: FULL MASTER AI WEBSITE BUILD PROMPT
================================================================================
${masterPrompt}

================================================================================
STEP 6: DEPLOY CHECKLIST
================================================================================
${generateChecklist(d).map(c => `[ ] (${c.category}) ${c.text}`).join("\n")}
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

  // 4. Render Folder Architecture
  const folderTree = generateFolderTree(d);
  if (folderStructureContainer) {
    folderStructureContainer.innerHTML = `<pre><code>${folderTree}</code></pre>`;
  }

  // 5. Render Master Build Prompt
  const masterPrompt = generateMasterBuildPrompt(d);
  if (masterPromptDisplay) {
    masterPromptDisplay.textContent = masterPrompt;
  }

  // 6. Render Checklist
  const checklistItems = generateChecklist(d);
  renderChecklistElements(checklistItems);

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
    { num: "01", title: "Genesis", desc: d.scene1 || "Opening scene" },
    { num: "02", title: "Bloom / Shift", desc: d.scene2 || "Unfolding metamorphosis" },
    { num: "03", title: "Essence", desc: d.scene3 || "Material extraction" },
    { num: "04", title: "Sculpting", desc: d.scene4 || "Forging in mold" },
    { num: "05", title: "Reveal", desc: d.scene5 || "Hero application" }
  ];

  if (storyboardTimeline) {
    storyboardTimeline.innerHTML = stages.map((st, idx) => `
      <div class="timeline-stage-card ${idx === 2 ? 'active' : ''}">
        <div class="stage-header">
          <span class="stage-num">STAGE ${st.num}</span>
          <span class="stage-title">${st.title}</span>
        </div>
        <div class="stage-visual-sim">
          <span style="font-size: 11px; color: #9ca3af; text-align: center; padding: 4px;">🎬 ${st.title}</span>
        </div>
        <p style="font-size: 11.5px; color: var(--text-muted); line-height: 1.35; margin-top: 4px;">${st.desc}</p>
      </div>
    `).join("");
  }

  // Update Live Mockup Header & Text
  const brand = fallback(d.brand, "BRAND");
  
  if (mockNavBrand) mockNavBrand.textContent = brand;
  if (mockTag) mockTag.textContent = `${fallback(d.productType, "SPECIAL EDITION").toUpperCase()}`;
  if (mockH1) mockH1.textContent = fallback(d.headline, brand);
  if (mockSub) mockSub.textContent = fallback(d.subtitle, "A masterwork of design.");
  if (mockNavCta) mockNavCta.textContent = fallback(d.cta, "Acquire");

  const navs = fallback(d.nav, "Genesis, Craft, Specs").split(",").map(n => n.trim()).filter(Boolean);
  if (mockNavLinks) {
    mockNavLinks.innerHTML = navs.slice(0, 4).map(n => `<span>${n}</span>`).join("");
  }

  if (mockSec1Title) mockSec1Title.textContent = fallback(d.section1Title, "Pure Transformation");
  if (mockSec1Desc) mockSec1Desc.textContent = fallback(d.scene3, "Material extraction and synthesis.");
  if (mockSec2Title) mockSec2Title.textContent = fallback(d.section2Title, "Sculpted Object");
  if (mockSec2Desc) mockSec2Desc.textContent = fallback(d.copy, "Crafted with bespoke materials.");
  if (mockupUrl) mockupUrl.textContent = `https://${slugify(d.folder || d.brand)}.live`;
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
      "6": "sectionDeployChecklist"
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
  } else if (target === "allVideosText") {
    const videos = generateVideoPrompts(d);
    const text = videos.map(vid => `${vid.id} - ${vid.name} (${vid.length})\nFile name: ${vid.filename}\nStart: ${vid.startFrame} | End: ${vid.endFrame}\n${vid.promptText}`).join("\n\n");
    copyTextToClipboard(text, "All video prompts copied!");
  } else if (target === "ffmpegScriptText") {
    const ffmpeg = generateFFmpegCommands(d);
    copyTextToClipboard(ffmpeg.fullScript, "FFmpeg commands copied!");
  } else if (target === "folderTreeText") {
    const tree = generateFolderTree(d);
    copyTextToClipboard(tree, "Folder tree copied!");
  } else if (target === "masterPromptText") {
    const prompt = generateMasterBuildPrompt(d);
    copyTextToClipboard(prompt, "Master AI Build Prompt copied!");
  } else if (target === "rawDocOutput") {
    const doc = generateFullUnifiedDocument(d);
    copyTextToClipboard(doc, "Full 6-Step Plan copied!");
  }
});

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
  if (confirm("Reset form to default preset?")) {
    if (typeof presets !== "undefined" && presets.realEstateLuxuryVilla) {
      applyPreset("realEstateLuxuryVilla");
      presetPicker.value = "realEstateLuxuryVilla";
    }
    showToast("Reset to default preset.", "info");
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
// 7. Initialization
// ==========================================================================

function init() {
  const savedTheme = localStorage.getItem("promptcraft_theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }

  populatePresetDropdown();

  if (typeof presets !== "undefined" && presets.realEstateLuxuryVilla) {
    presetPicker.value = "realEstateLuxuryVilla";
    applyPreset("realEstateLuxuryVilla");
  } else {
    renderAllOutputs();
  }
}

document.addEventListener("DOMContentLoaded", init);
