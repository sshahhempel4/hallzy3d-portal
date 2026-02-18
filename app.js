const STORAGE_KEY = "renderment_simple_prompt_builder_v2";

const CATEGORY_PRESETS = {
  viral_hook: {
    label: "Funny AI Intro / Viral Hook",
    dna: "comedic social realism, high-retention pacing, twist-to-promo storytelling",
    pacing: "fast open with sharp pattern interrupts and energetic transitions",
    cameraFlavor: "handheld POV framing, eye-level perspective, social-native movement",
    sceneBeats: [
      "an immediate conflict-or-curiosity hook that stops the scroll in under one second",
      "a relatable setup that feels candid and native to social feeds",
      "a sudden reveal that pivots the moment toward the product or app value",
      "quick proof that validates the value proposition in a believable way",
      "a crisp, high-clarity CTA close that drives immediate action",
    ],
  },
  hyper_product: {
    label: "Hyper-Real Product",
    dna: "luxury commercial visuals, hyper-real textures, premium ad-grade product storytelling",
    pacing: "smooth premium pacing with deliberate reveal rhythm",
    cameraFlavor: "macro close-ups, controlled hero framing, slow cinematic movement",
    sceneBeats: [
      "a premium hero hook focused on texture and material detail",
      "a refined setup that establishes product context and desirability",
      "a signature reveal of packaging, logo, and product hero angle",
      "proof detail emphasizing quality, ingredients, or tactile realism",
      "a polished branded end frame with conversion-focused CTA",
    ],
  },
  pixar_3d: {
    label: "Pixar-Style 3D Animation",
    dna: "stylized 3D cinematic storytelling, expressive character motion, emotionally clear beats",
    pacing: "smooth animation arcs with clear emotional progression",
    cameraFlavor: "tracking camera, layered depth staging, character-first composition",
    sceneBeats: [
      "a character-led opening moment that instantly defines tone and personality",
      "a world-establishing beat that anchors the scene environment",
      "an action or transformation reveal tied to the core concept",
      "a proof or payoff beat that reinforces value through animation storytelling",
      "a warm branded close with clear narrative completion and CTA",
    ],
  },
  app_brand: {
    label: "Cinematic App/Brand Ad",
    dna: "clean commercial persuasion, modern cinematic framing, value-first storytelling",
    pacing: "clarity-driven pacing with controlled escalation",
    cameraFlavor: "cinematic readability, clear subject hierarchy, polished ad framing",
    sceneBeats: [
      "a high-impact hook centered on a relatable problem, desire, or tension",
      "a setup that clarifies context and raises curiosity",
      "a clear reveal of brand/app value in visual and narrative terms",
      "proof and trust-building beat with concrete benefit clarity",
      "a strong CTA close built for conversion",
    ],
  },
  gallery_showcase: {
    label: "Gallery-Style Showcase",
    dna: "elegant luxury composition, artistic presentation, prestige-driven visual language",
    pacing: "slow cinematic admiration pacing with controlled movement",
    cameraFlavor: "smooth tracking shots, measured pans, detail-first close-ups",
    sceneBeats: [
      "a prestige opening frame that feels curated and high-end",
      "an admiration setup emphasizing composition and detail",
      "a hero reveal moment framed like a premium visual exhibit",
      "an emotional proof beat through reactions, atmosphere, or detail focus",
      "a refined luxury CTA finish",
    ],
  },
  social_shortform: {
    label: "Social Short-Form Optimized",
    dna: "vertical-first social storytelling, retention-optimized pacing, immediate visual clarity",
    pacing: "rapid but readable pacing with high-impact transitions",
    cameraFlavor: "dynamic social-native movement and strong focal hierarchy",
    sceneBeats: [
      "an immediate pattern interrupt in the first second",
      "instant scenario context to lock attention",
      "fast value reveal with clear visual focus",
      "proof stack that reinforces utility and trust quickly",
      "direct CTA ending optimized for action",
    ],
  },
  custom: {
    label: "Custom / Hybrid",
    dna: "hybrid visual strategy adapted from customer data",
    pacing: "balanced pacing tuned to campaign objective",
    cameraFlavor: "camera language defined by client direction",
    sceneBeats: [
      "a clear opening hook",
      "an intuitive setup beat",
      "a focused reveal moment",
      "a concise proof segment",
      "a conversion-ready CTA finish",
    ],
  },
};

const SCENES = [
  { id: "S1", name: "HOOK", startRatio: 0, endRatio: 0.18 },
  { id: "S2", name: "SETUP", startRatio: 0.18, endRatio: 0.38 },
  { id: "S3", name: "REVEAL", startRatio: 0.38, endRatio: 0.63 },
  { id: "S4", name: "PROOF", startRatio: 0.63, endRatio: 0.85 },
  { id: "S5", name: "CTA", startRatio: 0.85, endRatio: 1 },
];

let selectedAttachmentNames = [];
let selectedImageAttachmentNames = [];

function byId(id) {
  return document.getElementById(id);
}

function readRaw(id) {
  const el = byId(id);
  if (!el) return "";
  return (el.value || "").trim();
}

function pick(value, fallback) {
  return value ? value : fallback;
}

function combinePresetAndCustom(presetValue, customValue, fallback) {
  const preset = (presetValue || "").trim();
  const custom = (customValue || "").trim();
  const presetIsCustom = preset.toLowerCase() === "custom";

  if (preset && !presetIsCustom && custom) {
    return `${preset}; ${custom}`;
  }
  if (preset && !presetIsCustom) {
    return preset;
  }
  if (custom) {
    return custom;
  }
  return fallback;
}

function cleanMulti(text) {
  return text.replace(/\s+/g, " ").trim();
}

function currentAttachmentNames() {
  const input = byId("mustIncludeAttachments");
  if (!input || !input.files) {
    return [];
  }
  return [...input.files].map((file) => file.name).filter(Boolean);
}

function currentImageAttachmentNames() {
  const input = byId("mustIncludeImages");
  if (!input || !input.files) {
    return [];
  }
  return [...input.files].map((file) => file.name).filter(Boolean);
}

function attachmentSummary() {
  if (!selectedAttachmentNames.length) {
    return "None provided";
  }
  return selectedAttachmentNames.join(", ");
}

function imageAttachmentSummary() {
  if (!selectedImageAttachmentNames.length) {
    return "None provided";
  }
  return selectedImageAttachmentNames.join(", ");
}

function updateAttachmentList() {
  selectedAttachmentNames = currentAttachmentNames();
  const list = byId("attachmentList");
  if (!list) {
    return;
  }
  list.textContent = selectedAttachmentNames.length
    ? `Attached files: ${selectedAttachmentNames.join(", ")}`
    : "No attachment files selected.";
}

function updateImageAttachmentList() {
  selectedImageAttachmentNames = currentImageAttachmentNames();
  const list = byId("imageAttachmentList");
  if (!list) {
    return;
  }
  list.textContent = selectedImageAttachmentNames.length
    ? `Images selected from Downloads: ${selectedImageAttachmentNames.join(", ")}`
    : "No image files selected from Downloads.";
}

function clampDuration(value) {
  const parsed = Number.parseFloat(value);
  if (!Number.isFinite(parsed)) return 8;
  if (parsed < 3) return 3;
  if (parsed > 60) return 60;
  return parsed;
}

function toSceneTimes(totalSeconds) {
  return SCENES.map((scene) => ({
    ...scene,
    start: Number((scene.startRatio * totalSeconds).toFixed(1)),
    end: Number((scene.endRatio * totalSeconds).toFixed(1)),
  }));
}

function collectInputs() {
  const categoryKey = pick(readRaw("category"), "custom");
  const preset = CATEGORY_PRESETS[categoryKey] || CATEGORY_PRESETS.custom;
  const durationSeconds = clampDuration(readRaw("durationSeconds"));

  return {
    clientName: pick(readRaw("clientName"), "Client"),
    projectName: pick(readRaw("projectName"), "Campaign"),
    productName: pick(readRaw("productName"), "the featured product"),
    productType: pick(readRaw("productType"), "Not specified"),
    marketType: pick(readRaw("marketType"), "Not specified"),
    goal: pick(readRaw("goal"), "create a high-performing marketing video"),
    audience: pick(readRaw("audience"), "social media viewers"),
    platforms: pick(readRaw("platforms"), "TikTok and Instagram Reels"),
    categoryKey,
    categoryLabel: preset.label,
    categoryDna: preset.dna,
    categoryPacing: preset.pacing,
    categoryCameraFlavor: preset.cameraFlavor,
    sceneBeats: preset.sceneBeats,
    durationSeconds,
    tone: pick(readRaw("tone"), "cinematic and premium"),
    style: pick(readRaw("style"), preset.dna),
    camera: pick(readRaw("camera"), preset.cameraFlavor),
    lighting: pick(
      readRaw("lighting"),
      "cinematic key and rim lighting with clear subject separation",
    ),
    environment: pick(
      readRaw("environment"),
      "a controlled premium environment with strong visual depth",
    ),
    motion: pick(readRaw("motion"), preset.pacing),
    cta: pick(readRaw("cta"), "Learn more"),
    mustInclude: combinePresetAndCustom(
      readRaw("mustIncludePreset"),
      readRaw("mustInclude"),
      "brand consistency, clear product readability, and accurate logo treatment",
    ),
    mustIncludePreset: pick(readRaw("mustIncludePreset"), "Not specified"),
    mustIncludeImages: imageAttachmentSummary(),
    mustIncludeAttachments: attachmentSummary(),
    attachmentLinks: pick(readRaw("attachmentLinks"), "None provided"),
    mustAvoid: combinePresetAndCustom(
      readRaw("mustAvoidPreset"),
      readRaw("mustAvoid"),
      "blurry output, warped logos, poor texture detail, and visual artifacts",
    ),
    mustAvoidPreset: pick(readRaw("mustAvoidPreset"), "Not specified"),
    vision: pick(
      readRaw("vision"),
      "The final output should feel premium, clear, engaging, and conversion-ready.",
    ),
  };
}

function buildImagePrompt(data, scene, beatText) {
  return cleanMulti(
    `Create a cinematic still keyframe for Scene ${scene.id} (${scene.name}) representing ${scene.start}s to ${scene.end}s of a ${data.durationSeconds}-second ad.
    The frame must communicate ${beatText}.
    Feature ${data.productName} as the visual priority, designed for ${data.audience}.
    Product type context: ${data.productType}. Market context: ${data.marketType}.
    Keep the overall tone ${data.tone} and style ${data.style}, aligned with ${data.categoryLabel} direction.
    Camera treatment should follow ${data.camera}, with ${data.categoryCameraFlavor}.
    Lighting should follow ${data.lighting}.
    Environment should follow ${data.environment}.
    The frame must include ${data.mustInclude}.
    Download image references to honor: ${data.mustIncludeImages}.
    Custom element attachments to honor: ${data.mustIncludeAttachments}.
    Attachment links: ${data.attachmentLinks}.
    Compose for ${data.platforms} with strong focal hierarchy, premium texture clarity, and readable brand details.
    Creative intent from customer: ${data.vision}.`
  );
}

function buildVideoPrompt(data, scene, nextScene, beatText) {
  const transitionLine = nextScene
    ? `Transition smoothly into Scene ${nextScene.id} (${nextScene.name}) while preserving color, framing logic, and subject continuity.`
    : "Resolve into a clean final hold that sets up the CTA lockup without visual clutter.";

  return cleanMulti(
    `Generate the Scene ${scene.id} (${scene.name}) video segment from ${scene.start}s to ${scene.end}s using the matching keyframe as the visual anchor.
    This shot should express ${beatText}.
    Product type context: ${data.productType}. Market context: ${data.marketType}.
    Motion direction must follow ${data.motion} with ${data.categoryPacing}.
    Preserve continuity of subject identity, logo placement, environment styling, and color language.
    Keep camera behavior consistent with ${data.camera}.
    Maintain lighting consistency with ${data.lighting}.
    Ensure the segment clearly supports campaign goal: ${data.goal}.
    Keep download image references visually consistent: ${data.mustIncludeImages}.
    Keep custom elements from attachments consistent: ${data.mustIncludeAttachments}.
    Attachment links: ${data.attachmentLinks}.
    ${transitionLine}`
  );
}

function buildFinalMasterPrompt(data) {
  return cleanMulti(
    `Using Scene S1 through S5 image keyframes and video segments, generate one final ${data.durationSeconds}-second master video.
    Keep strict sequence: HOOK -> SETUP -> REVEAL -> PROOF -> CTA.
    Maintain ${data.categoryLabel} style behavior with ${data.categoryDna}.
    Product type: ${data.productType}. Market type: ${data.marketType}.
    Preserve tone ${data.tone}, style ${data.style}, camera direction ${data.camera}, lighting ${data.lighting}, and environment ${data.environment}.
    Keep all must-include elements visible where relevant: ${data.mustInclude}. Must-include preset selected: ${data.mustIncludePreset}.
    Respect image references from Downloads: ${data.mustIncludeImages}.
    Respect custom attachment references: ${data.mustIncludeAttachments}.
    Reference links: ${data.attachmentLinks}.
    Strictly avoid: ${data.mustAvoid}. Must-avoid preset selected: ${data.mustAvoidPreset}.
    Ensure the value proposition is clear for ${data.audience} and optimized for ${data.platforms}.
    End with a clean and legible CTA: ${data.cta}.
    Customer intent to preserve: ${data.vision}.`
  );
}

function buildNegativePrompt(data) {
  return cleanMulti(
    `blurry subject, warped or incorrect logos, wrong packaging text, low-resolution textures, inconsistent lighting direction,
    muddy shadows, clipped highlights, oversaturation, banding, flicker, temporal jitter, ghosting, duplicate objects,
    unreadable CTA text, poor subject isolation, off-brand color palette, visual clutter, incorrect anatomy`
  );
}

function buildFinalPromptStack(data) {
  const scenes = toSceneTimes(data.durationSeconds);
  const sceneBlocks = scenes.map((scene, index) => {
    const beatText = data.sceneBeats[index] || "the intended scene beat";
    const nextScene = scenes[index + 1] || null;
    const imagePrompt = buildImagePrompt(data, scene, beatText);
    const videoPrompt = buildVideoPrompt(data, scene, nextScene, beatText);

    return `SCENE ${scene.id} - ${scene.name} (${scene.start}s-${scene.end}s)
Trace ID: IMG_${scene.id} -> VID_${scene.id}

Image Prompt:
"${imagePrompt}"

Video Prompt:
"${videoPrompt}"`;
  });

  return `RENDERMINT FINAL SCENE PROMPT STACK

PROJECT
${data.clientName} - ${data.projectName}

CREATIVE DIRECTION SUMMARY
Create a ${data.durationSeconds}-second ${data.categoryLabel} piece for ${data.platforms} featuring ${data.productName}.
The core objective is ${data.goal}.
Product type: ${data.productType}
Market type: ${data.marketType}
Target audience: ${data.audience}.
Tone/style direction: ${data.tone}; ${data.style}.
Customer vision: ${data.vision}
Images from Downloads: ${data.mustIncludeImages}
Must-include attachments: ${data.mustIncludeAttachments}
Attachment links: ${data.attachmentLinks}

PRODUCTION ORDER (FOLLOW EXACTLY)
1) Generate all image keyframes first (IMG_S1 to IMG_S5).
2) Generate each matching video segment second (VID_S1 to VID_S5).
3) Assemble final master video last.

${sceneBlocks.join("\n\n")}

FINAL MASTER VIDEO PROMPT
Trace ID: VID_MASTER
"${buildFinalMasterPrompt(data)}"

GLOBAL NEGATIVE PROMPT
"${buildNegativePrompt(data)}"`;
}

function saveDraft() {
  const form = byId("intakeForm");
  const fields = form.querySelectorAll("input, textarea, select");
  const draft = {};
  fields.forEach((field) => {
    if (!field.id || field.type === "file") {
      return;
    }
    draft[field.id] = field.value;
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
    // Ignore invalid cache and keep default form state.
  }
}

function clearForm() {
  if (!window.confirm("Clear all inputs and output?")) return;
  byId("intakeForm").reset();
  byId("finalPromptOutput").textContent = "";
  localStorage.removeItem(STORAGE_KEY);
  selectedAttachmentNames = [];
  selectedImageAttachmentNames = [];
  updateAttachmentList();
  updateImageAttachmentList();
}

function loadDemo() {
  const demo = {
    clientName: "NovaGlow Skincare",
    projectName: "8s Serum Launch",
    productName: "NovaGlow Vitamin C Serum",
    productType: "Tincture/Topical",
    marketType: "Both adult-use + medical",
    goal: "Drive product sales/conversions",
    audience: "Adult-use consumers (21+)",
    platforms: "TikTok/Reels/Shorts (vertical short-form)",
    category: "hyper_product",
    durationSeconds: "8",
    tone: "Premium cinematic",
    style: "Hyper-real product commercial",
    camera: "Macro close-ups + slow orbit",
    lighting: "Soft studio beauty lighting",
    environment: "Minimal studio set",
    motion: "Smooth and elegant pacing",
    cta: "Shop now",
    mustIncludePreset: "Logo + packaging + hero product close-up",
    mustInclude: "accurate logo, readable label text, bottle hero close-up, brand color palette",
    attachmentLinks: "https://drive.google.com/example-folder",
    mustAvoidPreset: "No medical cure claims",
    mustAvoid: "wrong packaging text, blur, oversaturation, busy backgrounds",
    vision:
      "The video should feel expensive and highly polished, with a strong opening visual and smooth cinematic progression into a clear conversion-focused ending.",
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
  byId("mustIncludeAttachments").addEventListener("change", () => {
    updateAttachmentList();
    saveDraft();
  });
  byId("mustIncludeImages").addEventListener("change", () => {
    updateImageAttachmentList();
    saveDraft();
  });

  loadDraft();
  updateAttachmentList();
  updateImageAttachmentList();
}

init();
