# PromptCraft Studio — 6-Step Cinematic Website & Asset Workflow Builder

PromptCraft Studio is a comprehensive, client-side web application for generating complete 6-step prompt architectures, asset manifests, FFmpeg automation pipelines, folder structures, and master build prompts for cinematic luxury websites and digital products.

🌐 **Live Website**: [https://website-prompt-studio.vercel.app](https://website-prompt-studio.vercel.app)  
📦 **Repository**: [https://github.com/llreuae-debug/website-prompt-studio](https://github.com/llreuae-debug/website-prompt-studio)

---

## 🚀 Key Features

- **500+ Complete Commercial Presets**: Including exact, verbatim presets for **MEERUB Beauty Salon** and **BLOOM Luxury Lipstick** build guides.
- **Exact 6-Step Workflow & Prompt Architecture**:
  - **Step 1 — Nano Banana 2 Image Prompt Chaining**: Reference chaining prompts (01, 03, 05, 06, 07, 08, 09, 10) with exact shared style language.
  - **Step 2 — Veo 3.1 Video Motion Prompts**: Start-to-end frame motion choreographies (V01 to V06) with timing and fallback style directives.
  - **Step 3 — Antigravity FFmpeg Pipeline**: Exact commands for raw merging (3a), keyframe GOP=1 re-encoding (3b), and 20fps JPEG canvas frame extraction (3c).
  - **Step 4 — Clean Folder Architecture**: Exact folder hierarchy with copyable Antigravity file organization prompt.
  - **Step 5 — Master Website Build Prompt**: 8-section master blueprint (pinned canvas sequence with progress text overlays, sticky 50/50 explainer, horizontal craftsmanship rail, reverse parallax, look grid, newsletter, footer) + post-build Refinement prompt.
  - **Step 6 — Production Deploy Prompt & Checklist**: Single-prompt deployment to GitHub + Netlify/Vercel with pre-flight checklist.
  - **Optional Step 7 — Site Expansion & Section Polish**: Prompts for extra image generation (11-14), site expansion sections, and surgical section polish.
- **Export & Integration Hub**:
  - **Export PDF**: Clean printable document with monospace code blocks, brand headings, and automatic print triggers.
  - **Download Files**: Export full plan as Markdown (`.md`), Plain Text (`.txt`), Bash Script (`.sh`), or JSON configuration (`.json`).
  - **Single-Click Copy**: Instant clipboard copying for active tabs or full unified documents.
  - **Import / Export State**: Save and load custom form state JSON.
  - **Theme Switcher**: Dark Mode and Light Mode support.

---

## 🛠️ Project Structure

```
├── index.html        # Main semantic HTML5 interface
├── styles.css        # Responsive styling, design tokens, print stylesheets
├── app.js            # Reactive workflow engine, generators, export handlers
├── presets.js        # 500 complete commercial presets across 50 categories
├── assets/           # Local project icons and branding assets
└── README.md         # Project documentation
```

---

## 💻 Local Development

No framework build step is needed. Run with any static server:

```bash
# Using Python
python3 -m http.server 8080

# Using Node.js npx serve
npx serve .
```

Visit `http://localhost:8080` in your browser.

---

## 🚢 Deployment

Deployed as a zero-config static site on Vercel:
- **Build Command**: None
- **Output / Publish Directory**: `.` (root)
