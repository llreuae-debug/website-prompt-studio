# PromptCraft Studio — 6-Step Cinematic Website & Asset Workflow Builder

PromptCraft Studio is a comprehensive, client-side web application for generating complete 6-step prompt architectures, asset manifests, FFmpeg automation pipelines, folder structures, and master build prompts for cinematic luxury websites and digital products.

🌐 **Live Website**: [https://website-prompt-studio.vercel.app](https://website-prompt-studio.vercel.app)  
📦 **Repository**: [https://github.com/llreuae-debug/website-prompt-studio](https://github.com/llreuae-debug/website-prompt-studio)

---

## 🚀 Key Features

- **500 Complete Commercial Presets**: Alphabetically indexed across 50 categories (Real Estate, Ecommerce, Fashion, SaaS, Hospitality, Dining, Health, Tech, and more).
- **Reactive 6-Step Workflow Engine**:
  - **Step 1 — Image Generation Prompts**: Continuous camera optics, cinematic lighting, and custom aspect ratios.
  - **Step 2 — Video Generation Prompts**: Fluid start/end frame choreography with motion timing.
  - **Step 3 — FFmpeg Terminal Automation**: Scripts for merging video clips, re-encoding for web canvas scroll, and 20fps frame extraction.
  - **Step 4 — Clean Folder Tree**: Standardized lowercase hyphenated project directory structure.
  - **Step 5 — Master Website Build Prompt**: Comprehensive blueprint with CTA, branding, navigation, sections, and asset bindings.
  - **Step 6 — Production Deploy Checklist**: Interactive verification checklist tailored to your selected hosting provider.
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
