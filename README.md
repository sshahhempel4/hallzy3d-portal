# Rendermint Simple Prompt Builder

This repo contains a simplified website app for your production workflow:

- client fills a short, dropdown-guided intake
- client can attach custom reference files in Must Include
- client can explicitly attach image references from Downloads
- you generate one final prompt stack
- you copy from one box and run production

The prompt builder now analyzes uploaded reference image downloads (dimensions,
palette, filename cues) and injects richer brand/product descriptions into each
scene prompt.

The final output is ordered exactly for your pipeline:

1. image keyframe prompts (scene by scene)
2. video prompts (scene by scene)
3. full final video generation prompt

Each scene includes two complete copy-ready prompts:

- one full image prompt
- one full video prompt

Attachment filenames and attachment links are injected into each scene prompt
and the final master prompt to keep custom elements traceable.

The customer intake page is plain-English and mostly dropdown-based for
non-technical users.

## Files

- `index.html` - simple client intake + one output box
- `client-intake.html` - customer-friendly intake form only (shareable)
- `client-intake.js` - customer form copy/download logic
- `styles.css` - clean UI styling
- `app.js` - prompt generation logic
- `RENDERMENT_CREATIVE_WORKFLOW_DATASET.md` - full Rendermint dataset reference
- `CUSTOMER_VISION_INTAKE_FORM.md` - long-form intake reference (optional)

## Run locally

```bash
python3 -m http.server 8080
```

Open:

```text
http://localhost:8080
```

Customer-shareable form page:

```text
http://localhost:8080/client-intake.html
```

## App flow

1. Fill short client inputs
2. Click **Generate Final Prompt Stack**
3. Click **Copy**
4. Paste into your AI generation workflow

## Notes

- The app keeps your inputs in browser local storage.
- Use **Load Demo** to instantly test the full pipeline.
