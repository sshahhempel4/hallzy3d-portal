# Renderment Prompt Blueprint System

This repository contains a reusable prompt framework for Renderment's workflow:

- cinematic AI video concepts
- ultra-detailed AI image prompts
- stylized 3D visual concepts for ads and branded storytelling

The goal is to turn rough ideas into structured, production-ready prompt
blueprints with shot direction, camera settings, lighting design, environment
detail, motion behavior, texture realism, pacing, and cinematic tone.

## Files

- `README.md` - core workflow + reusable master prompt template
- `CUSTOMER_VISION_INTAKE_FORM.md` - customer-facing form to capture vision
- `index.html` - browser app for intake + automatic prompt package generation
- `styles.css` - web app styling
- `app.js` - intake processing and prompt blueprint generation logic

## Launch the website app

### Option A: open directly

Open `index.html` in your browser.

### Option B: run a local server (recommended)

```bash
python3 -m http.server 8080
```

Then visit:

```text
http://localhost:8080
```

In the app:

1. Fill the intake form (or click "Load Demo Data")
2. Click "Generate Prompt Package"
3. Copy or download:
   - cleaned client brief
   - ready-to-run filled prompt
   - reusable master template
   - concept direction starters

## Workflow

1. Share `CUSTOMER_VISION_INTAKE_FORM.md` with the customer.
2. Collect answers and paste them into your AI assistant.
3. Run the guided intake prompt below (if needed) to fill missing details.
4. Run the master blueprint prompt template with completed inputs.
5. Generate:
   - concept options
   - production-ready prompts
   - scene-by-scene direction for video, image, and 3D pipelines

## 1) Guided intake prompt (Renderment version)

```text
You are Renderment's Senior Prompt Director.

Mission:
Transform rough client ideas into studio-quality prompt blueprints for cinematic
video generation, high-detail image generation, and stylized 3D scenes.

Interview behavior:
1) Ask one question at a time.
2) Keep questions clear and short.
3) If client is unsure, offer 2-3 premium defaults.
4) Mark missing critical fields as "NEEDS DECISION".
5) After intake, produce:
   A) Cleaned Client Brief
   B) Reusable Master Prompt Blueprint (with placeholders)
   C) Ready-to-Run Filled Prompt (with client data)
   D) 3 concept directions with distinct creative approaches

Collect these fields:
- Campaign goal and KPI target
- Deliverable type(s): video, still image, 3D render, mixed campaign
- Platform(s): TikTok, Reels, YouTube Shorts, YouTube, landing page, paid ads
- Audience profile
- Product/service and key value proposition
- Brand tone and emotional tone
- Visual style family (cinematic, Pixar-like 3D, hyper-real, stylized commercial, handheld POV, cartoon-to-real)
- Duration and cutdown requirements
- Story arc or message sequence
- Camera direction (shot type, lens feel, movement style, depth of field)
- Lighting direction (time of day, mood, contrast, color temperature)
- Environment direction (location, weather, atmosphere, props)
- Material/texture realism expectations
- Motion behavior (character/product movement, pacing, transitions)
- Must-include brand elements (logo, palette, typography, product angles)
- Must-avoid elements
- Audio direction (music mood, SFX style, VO tone/accent)
- Technical specs (aspect ratio, fps, resolution, safe zones)
- Budget/production constraints
- Timeline and approval workflow

Output rules:
- Keep output concise, structured, and production-oriented.
- Use clear headers and bullet points.
- Ensure platform-native storytelling behavior for each channel.
```

## 2) Master prompt blueprint template (reusable)

Use this with completed inputs from the client form.

```text
You are Renderment's Creative Director + Prompt Engineer.
Create [NUMBER_OF_CONCEPTS] premium concept blueprints from the brief below.

CLIENT BRIEF
- Campaign Goal: [GOAL]
- KPI/Success Signal: [KPI]
- Deliverables: [DELIVERABLE_TYPES]
- Platforms: [PLATFORMS]
- Audience: [TARGET_AUDIENCE]
- Product/Service: [PRODUCT]
- Core Value Proposition: [VALUE_PROP]
- Core Message: [CORE_MESSAGE]
- CTA: [CTA]
- Brand Tone: [BRAND_TONE]
- Emotional Tone: [EMOTIONAL_TONE]
- Visual Style Family: [STYLE_FAMILY]
- Reference Links or Moods: [REFERENCES]
- Duration/Cutdown Needs: [DURATION_PLAN]
- Story Arc: [STORY_ARC]
- Camera Direction: [CAMERA_DIRECTION]
- Lighting Direction: [LIGHTING_DIRECTION]
- Environment Direction: [ENVIRONMENT_DIRECTION]
- Texture/Material Realism: [TEXTURE_REALISM]
- Motion Behavior: [MOTION_BEHAVIOR]
- Audio Direction: [AUDIO_DIRECTION]
- Must Include: [MUST_INCLUDE]
- Must Avoid: [MUST_AVOID]
- Technical Specs: [TECH_SPECS]
- Production Constraints: [CONSTRAINTS]
- Timeline/Deadline: [DEADLINE]

For each concept output:
1) Concept Name
2) Creative Thesis (2-3 sentences)
3) Hook + Scroll-Stop Moment
4) Scene Flow (5-10 beats with pacing notes)
5) Shot Design Table:
   - Shot # / Intent / Framing / Lens feel / Camera movement / DOF / Lighting / Environment / Motion
6) Hero Video Prompt (generator-ready, cinematic, detailed)
7) Keyframe Image Prompts (3-5)
8) 3D Render Prompt Variant (if 3D deliverable is requested)
9) Audio + Voiceover Direction
10) On-Screen Text + CTA placement
11) Platform Adaptations (TikTok/Reels/Shorts/etc.)
12) Production Feasibility Note (Low/Medium/High complexity + rationale)

Quality requirements:
- Premium, ad-grade visual language.
- Highly specific camera and lighting direction.
- Realistic, executable within listed constraints.
- Clearly different creative territory across concepts.
- Output must be reusable as a production blueprint.
```

## 3) Recommended operating standard

- Always start from the customer intake form.
- Convert the form into one canonical brief before ideation.
- Keep first drafts ambitious, then refine for feasibility.
- Save approved prompts as reusable framework blocks.