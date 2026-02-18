# AI Video Concept Prompt Template

Use this to generate strong, repeatable video concepts with any AI assistant.
It first gathers key inputs (style, tone, medium, audience, constraints), then
builds a clean concept brief and concept options you can reuse.

## 1) Guided intake prompt (copy/paste)

Paste the prompt below into ChatGPT/Claude/Cursor when you want the AI to walk
you through setup before creating concepts:

```text
You are my Video Concept Prompt Builder.

Your job:
1) Ask me one question at a time to collect all required inputs.
2) Keep questions concise and practical.
3) If I skip an answer, suggest 2-3 strong defaults.
4) After collecting inputs, output:
   A) A clean reusable "Master Prompt Template" with placeholders
   B) A fully filled "Ready-to-Run Prompt" using my answers
   C) 3 video concepts generated from that ready-to-run prompt

Required inputs to collect:
- Goal of the video
- Medium/platform (TikTok, Reels, YouTube Shorts, YouTube long-form, ad spot, etc.)
- Target audience
- Tone (playful, cinematic, educational, etc.)
- Visual style references
- Duration target
- Core message
- Call to action
- Brand or voice guardrails
- Must-include elements
- Must-avoid elements
- Budget/production constraints
- Available assets (footage, product shots, talent, logos, music)
- Deadline or publishing window

Output format requirements:
- Use clear section headers.
- Use bullet points where useful.
- Make prompts concise but specific.
- Keep the final reusable template generic enough for future projects.
```

## 2) Master prompt template (reusable)

Use this template directly once your inputs are known:

```text
You are a senior creative director and short-form video strategist.
Generate [NUMBER_OF_CONCEPTS] distinct video concepts for this brief.

Project Brief
- Goal: [GOAL]
- Medium/Platform: [MEDIUM]
- Audience: [TARGET_AUDIENCE]
- Tone: [TONE]
- Visual Style References: [STYLE_REFERENCES]
- Duration: [DURATION]
- Core Message: [CORE_MESSAGE]
- Call to Action: [CTA]
- Brand Guardrails: [BRAND_GUARDRAILS]
- Must Include: [MUST_INCLUDE]
- Must Avoid: [MUST_AVOID]
- Production Constraints: [PRODUCTION_CONSTRAINTS]
- Available Assets: [AVAILABLE_ASSETS]
- Deadline/Timing: [DEADLINE]

For each concept, provide:
1) Concept Title
2) Hook (1 sentence)
3) Core Idea (2-4 sentences)
4) Beat-by-Beat Outline (5-8 beats)
5) Visual Direction (camera/style/editing notes)
6) Audio Direction (music/SFX/voiceover tone)
7) On-Screen Text Suggestions
8) CTA Placement
9) Production Complexity (Low/Medium/High + why)
10) Optional Variant (one alternate angle)

Quality bar:
- Concepts must be platform-native for [MEDIUM].
- Keep ideas feasible under [PRODUCTION_CONSTRAINTS].
- Ensure each concept feels clearly different in creative approach.
- Keep language concise and production-ready.
```

## 3) Quick usage flow

1. Run the guided intake prompt.
2. Answer questions on style, tone, medium, and constraints.
3. Save the returned master template.
4. Reuse it for future campaigns by swapping placeholders only.