const STORAGE_KEY = "renderment_simple_prompt_builder_v1";

const CATEGORY_PRESETS = {
  viral_hook: {
    label: "Funny AI Intro / Viral Hook",
    dna: "comedic, high-retention, street-level realism, twist-based reveal",
    pacing: "fast open, sharp pattern interrupts, short dialogue energy",
    shotBias: "handheld POV, eye-level framing, social-native movement",
    sceneFocus: [
      "instant conflict or curiosity trigger",
      "relatable scenario setup",
      "sudden product/app reveal",
      "quick value proof beat",
      "hard CTA finish",
    ],
  },
  hyper_product: {
    label: "Hyper-Real Product",
    dna: "luxury, ultra-real, ad-grade product cinematics, logo accuracy",
    pacing: "controlled, smooth, premium reveal progression",
    shotBias: "macro close-ups, slow rotations, precise hero framing",
    sceneFocus: [
      "hero texture hook",
      "environment and product context",
      "primary product reveal with branding",
      "material and claim proof details",
      "elegant CTA lockup",
    ],
  },
  pixar_3d: {
    label: "Pixar-Style 3D Animation",
    dna: "stylized 3D, expressive character motion, bright cinematic storytelling",
    pacing: "smooth arcs with emotional beats",
    shotBias: "tracking cameras, layered depth staging, character emphasis",
    sceneFocus: [
      "character-led opening moment",
      "world establishment",
      "action/reveal transition",
      "emotional payoff or proof",
      "warm branded CTA close",
    ],
  },
  app_brand: {
    label: "Cinematic App/Brand Ad",
    dna: "clean, persuasive, inspirational, message-first commercial structure",
    pacing: "clarity-first rhythm with strong value transitions",
    shotBias: "high-legibility framing with narrative continuity",
    sceneFocus: [
      "strong problem or desire hook",
      "scenario setup",
      "brand/app value reveal",
      "proof and trust beat",
      "clear conversion CTA",
    ],
  },
  gallery_showcase: {
    label: "Gallery-Style Showcase",
    dna: "elegant, artistic, premium showcase, museum-like visual tone",
    pacing: "slow cinematic admiration pacing",
    shotBias: "tracking/pan compositions and detail close-ups",
    sceneFocus: [
      "prestige opening frame",
      "detail admiration setup",
      "hero reveal moment",
      "social proof / emotional admiration",
      "luxury CTA finish",
    ],
  },
  social_shortform: {
    label: "Social Short-Form Optimized",
    dna: "vertical-first, retention-driven, immediate clarity and value",
    pacing: "rapid but readable with early hooks",
    shotBias: "high-contrast openers, dynamic social-native motion",
    sceneFocus: [
      "0-1 second pattern interrupt",
      "instant context setup",
      "value reveal",
      "proof stack",
      "direct CTA ending",
    ],
  },
  custom: {
    label: "Custom / Hybrid",
    dna: "hybrid style adapted from client direction",
    pacing: "balanced pacing tuned to campaign goal",
    shotBias: "camera style from custom inputs",
    sceneFocus: [
      "hook",
      "setup",
      "reveal",
      "proof",
      "CTA",
    ],
  },
};

const SCENE_NAMES = ["HOOK", "SETUP", "REVEAL", "PROOF", "CTA"];
const SCENE_SPLITS = [0, 0.18, 0.38, 0.63, 0.85, 1];

function byId(id) {
  return document.getElementById(id);
}

function read(id, fallback = "Not provided") {
  const el = byId(id);
  if (!el) return fallback;
  const value = (el.value || "").trim();
  return value || fallback;
}

function secondsRange(totalSeconds) {
  const total = Number.isFinite(totalSeconds) && totalSeconds > 0 ? totalSeconds : 8;
  return SCENE_SPLITS.map((p) => Number((p * total).toFixed(1)));
}

function cleanMulti(text) {
  return text.replace(/\s+/g, " ").trim();
}

function collectInputs() {
  const durationRaw = Number.parseFloat(read("durationSeconds", "8"));
  const durationSeconds = Number.isFinite(durationRaw) ? durationRaw : 8;
  const categoryKey = read("category", "custom");
  const preset = CATEGORY_PRESETS[categoryKey] || CATEGORY_PRESETS.custom;

  return {
    clientName: read("clientName"),
    projectName: read("projectName"),
    productName: read("productName"),
    goal: read("goal"),
    audience: read("audience"),
    platforms: read("platforms"),
    categoryKey,
    categoryLabel: preset.label,
    categoryDna: preset.dna,
    categoryPacing: preset.pacing,
    categoryShotBias: preset.shotBias,
    sceneFocus: preset.sceneFocus,
    durationSeconds,
    tone: read("tone"),
    style: read("style"),
    camera: read("camera"),
    lighting: read("lighting"),
    environment: read("environment"),
    motion: read("motion"),
    cta: read("cta"),
    mustInclude: read("mustInclude"),
    mustAvoid: read("mustAvoid"),
    extraNotes: read("extraNotes"),
  };
}

function buildScenePromptBlock(data, sceneIndex, start, end) {
  const sceneName = SCENE_NAMES[sceneIndex];
  const sceneIntent = data.sceneFocus[sceneIndex] || "scene progression";

  const imagePrompt = cleanMulti(
    `Create keyframe image for Scene ${sceneIndex + 1} (${sceneName}), ${start}s-${end}s of an ${data.durationSeconds}s ad.
    Subject: ${data.productName}.
    Creative category: ${data.categoryLabel} (${data.categoryDna}).
    Intent: ${sceneIntent}.
    Tone: ${data.tone}.
    Style: ${data.style}.
    Camera: ${data.camera} with ${data.categoryShotBias}.
    Lighting: ${data.lighting}.
    Environment: ${data.environment}.
    Keep brand requirements: ${data.mustInclude}.
    Avoid: ${data.mustAvoid}.
    Audience: ${data.audience}.
    Platform-safe composition for ${data.platforms}.
    Ultra clear product/logo readability and cinematic detail.`
  );

  const videoPrompt = cleanMulti(
    `Animate Scene ${sceneIndex + 1} (${sceneName}) from ${start}s to ${end}s using the keyframe as visual anchor.
    Motion behavior: ${data.motion} with ${data.categoryPacing}.
    Keep continuity of subject, color palette, logo placement, and environment.
    Push scene intent: ${sceneIntent}.
    Ensure this segment clearly supports campaign goal: ${data.goal}.
    End this scene with a clean transition into Scene ${sceneIndex + 2 > 5 ? 5 : sceneIndex + 2}.`
  );

  return `SCENE ${sceneIndex + 1} - ${sceneName} (${start}s-${end}s)
Image prompt:
"${imagePrompt}"

Video shot prompt:
"${videoPrompt}"`;
}

function buildFinalPromptStack(data) {
  const marks = secondsRange(data.durationSeconds);
  const sceneBlocks = [];

  for (let i = 0; i < 5; i += 1) {
    sceneBlocks.push(buildScenePromptBlock(data, i, marks[i], marks[i + 1]));
  }

  const finalAssemblyPrompt = cleanMulti(
    `Using Scene 1-5 keyframes and scene prompts, generate one final ${data.durationSeconds}-second video.
    Story order must stay exact: HOOK -> SETUP -> REVEAL -> PROOF -> CTA.
    Category style lock: ${data.categoryLabel} (${data.categoryDna}).
    Camera direction: ${data.camera}.
    Lighting direction: ${data.lighting}.
    Environment direction: ${data.environment}.
    Motion/pacing: ${data.motion} with ${data.categoryPacing}.
    Preserve must-include elements: ${data.mustInclude}.
    Strictly avoid: ${data.mustAvoid}.
    Final CTA: ${data.cta}.
    Optimize for ${data.platforms}.
    Output should look premium, polished, and ad-ready.`
  );

  const negativePrompt = cleanMulti(
    `low detail, blurry subject, logo distortion, wrong text on packaging, inconsistent brand colors,
    low-resolution textures, messy composition, overexposed highlights, crushed shadows,
    jitter artifacts, flicker, duplicated objects, awkward anatomy, unreadable CTA text`
  );

  return `FINAL RENDERMENT PROMPT STACK

CLIENT SNAPSHOT
- Client: ${data.clientName}
- Project: ${data.projectName}
- Product/Subject: ${data.productName}
- Goal: ${data.goal}
- Audience: ${data.audience}
- Platform(s): ${data.platforms}
- Category: ${data.categoryLabel}
- Duration: ${data.durationSeconds}s
- Tone: ${data.tone}
- Style: ${data.style}
- Camera: ${data.camera}
- Lighting: ${data.lighting}
- Environment: ${data.environment}
- Motion: ${data.motion}
- Must Include: ${data.mustInclude}
- Must Avoid: ${data.mustAvoid}
- CTA: ${data.cta}
- Extra Notes: ${data.extraNotes}

GENERATION ORDER (FOLLOW EXACTLY)
1) Generate Scene 1-5 IMAGE keyframes first.
2) Generate Scene 1-5 VIDEO shots second.
3) Generate FINAL FULL VIDEO from all scene references.

${sceneBlocks.join("\n\n")}

FINAL FULL VIDEO PROMPT (${data.durationSeconds}s MASTER)
"${finalAssemblyPrompt}"

NEGATIVE PROMPT
"${negativePrompt}"`;
}

function saveDraft() {
  const form = byId("intakeForm");
  const fields = form.querySelectorAll("input, textarea, select");
  const draft = {};
  fields.forEach((field) => {
    if (field.id) draft[field.id] = field.value;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
}

function loadDraft() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const draft = JSON.parse(raw);
    Object.entries(draft).forEach(([id, value]) => {
      const field = byId(id);
      if (field) field.value = value;
    });
  } catch (_error) {
    // Ignore invalid cache and continue with clean form.
  }
}

function clearForm() {
  if (!window.confirm("Clear all inputs and output?")) return;
  byId("intakeForm").reset();
  byId("finalPromptOutput").textContent = "";
  localStorage.removeItem(STORAGE_KEY);
}

function loadDemo() {
  const demo = {
    clientName: "NovaGlow Skincare",
    projectName: "8s Serum Launch",
    productName: "NovaGlow Vitamin C Serum",
    goal: "Drive conversion on paid social",
    audience: "Women 22-35 interested in premium skincare",
    platforms: "TikTok, Instagram Reels, YouTube Shorts",
    category: "hyper_product",
    durationSeconds: "8",
    tone: "premium, cinematic, clean",
    style: "hyper-real macro product commercial",
    camera: "macro close-ups, slow orbit reveal, shallow depth of field",
    lighting: "soft high-contrast studio with cool rim highlights",
    environment: "minimal luxury studio with reflective surfaces",
    motion: "smooth, controlled, elegant pacing",
    cta: "Shop now",
    mustInclude: "logo end-card, bottle hero close-up, claim text: dermatologist tested",
    mustAvoid: "wrong label text, oversaturation, busy background",
    extraNotes: "Keep all packaging/logo details highly accurate.",
  };

  Object.entries(demo).forEach(([id, value]) => {
    const field = byId(id);
    if (field) field.value = value;
  });

  const data = collectInputs();
  byId("finalPromptOutput").textContent = buildFinalPromptStack(data);
  saveDraft();
}

async function copyOutput() {
  const button = byId("copyBtn");
  const text = byId("finalPromptOutput").textContent || "";
  if (!text.trim()) return;

  try {
    await navigator.clipboard.writeText(text);
    button.classList.add("copy-ok");
    button.textContent = "Copied";
  } catch (_error) {
    button.classList.add("copy-fail");
    button.textContent = "Copy failed";
  }

  window.setTimeout(() => {
    button.classList.remove("copy-ok");
    button.classList.remove("copy-fail");
    button.textContent = "Copy";
  }, 1200);
}

function init() {
  const form = byId("intakeForm");
  const output = byId("finalPromptOutput");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = collectInputs();
    output.textContent = buildFinalPromptStack(data);
    saveDraft();
  });

  form.addEventListener("input", saveDraft);
  form.addEventListener("change", saveDraft);

  byId("loadDemoBtn").addEventListener("click", loadDemo);
  byId("clearBtn").addEventListener("click", clearForm);
  byId("copyBtn").addEventListener("click", copyOutput);

  loadDraft();
}

init();
