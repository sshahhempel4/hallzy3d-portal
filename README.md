# Renderment Simple Prompt Builder

This repo contains a simplified website app for your production workflow:

- client fills a short intake
- you generate one final prompt stack
- you copy from one box and run production

The final output is ordered exactly for your pipeline:

1. image keyframe prompts (scene by scene)
2. video prompts (scene by scene)
3. full final video generation prompt

Each scene includes two complete copy-ready prompts:

- one full image prompt
- one full video prompt

## Files

- `index.html` - simple client intake + one output box
- `styles.css` - clean UI styling
- `app.js` - prompt generation logic
- `RENDERMENT_CREATIVE_WORKFLOW_DATASET.md` - full Renderment dataset reference
- `CUSTOMER_VISION_INTAKE_FORM.md` - long-form intake reference (optional)

## Run locally

```bash
python3 -m http.server 8080
```

Open:

```text
http://localhost:8080
```

## App flow

1. Fill short client inputs
2. Click **Generate Final Prompt Stack**
3. Click **Copy**
4. Paste into your AI generation workflow

## Notes

- The app keeps your inputs in browser local storage.
- Use **Load Demo** to instantly test the full pipeline.
