const STORAGE_KEY = "rendermint_prompt_builder_v3";

const CATEGORY_PRESETS = {
  viral_hook: {
    label: "Funny AI Intro / Viral Hook",
    dna: "comedic social realism with fast scroll-stopping twists",
    pacing: "aggressive first-second hook, fast beat changes, punchy transitions",
    cameraFlavor: "handheld POV + eye-level social framing",
    sceneBeats: [
      "trigger immediate curiosity with unexpected behavior",
      "ground the moment in a relatable real-world setup",
      "flip tone into product reveal without losing momentum",
      "prove value quickly through visual payoff",
      "land a direct CTA with social-native clarity",
    ],
    sceneInnovation: [
      "Use an attention-jolt prop interaction in the foreground to force a pause.",
      "Switch from candid framing to cleaner ad framing mid-scene.",
      "Introduce a tonal twist that transforms conflict into curiosity.",
      "Use one surprising visual proof moment tied to product benefit.",
      "Finish with a freeze-like hold and aggressive CTA lockup.",
    ],
  },
  hyper_product: {
    label: "Hyper-Real Product",
    dna: "premium commercial polish, material realism, luxury product storytelling",
    pacing: "controlled, elegant reveal pacing with deliberate detail progression",
    cameraFlavor: "macro-first composition with hero reveal movement",
    sceneBeats: [
      "open on tactile detail and premium material cues",
      "show product context and visual desire setup",
      "reveal complete package and identity with precision",
      "prove quality through texture, label, and finish detail",
      "close with clean luxury CTA lockup",
    ],
    sceneInnovation: [
      "Start with an abstract macro that only resolves into product identity after a beat.",
      "Introduce atmosphere-driven refraction or reflection for a richer reveal setup.",
      "Pivot to a clean hero shot where logo and product line become perfectly legible.",
      "Feature micro-detail proof (edges, label print, seal, condensation, texture).",
      "Resolve into a minimal premium end-card with spatial breathing room.",
    ],
  },
  pixar_3d: {
    label: "Pixar-Style 3D Animation",
    dna: "stylized character-driven 3D storytelling with emotional clarity",
    pacing: "smooth arc-based motion with cinematic progression",
    cameraFlavor: "tracking and depth-rich staging with animated character intent",
    sceneBeats: [
      "create an expressive character-led opening",
      "establish world rules and context quickly",
      "deliver transformation or product-driven reveal",
      "show emotional/functional payoff in motion",
      "close with warm branded CTA moment",
    ],
    sceneInnovation: [
      "Use a strong character silhouette pose as visual anchor.",
      "Expand to a deeper world layout with clear foreground/midground/background separation.",
      "Trigger a visual transformation event tied to product value.",
      "Use dynamic object interaction for proof of benefit.",
      "End with a polished story-complete brand lockup.",
    ],
  },
  app_brand: {
    label: "Cinematic App/Brand Ad",
    dna: "clean persuasive narrative with modern commercial clarity",
    pacing: "message-first sequencing with clear escalations",
    cameraFlavor: "readable framing and intentional focus hierarchy",
    sceneBeats: [
      "open with a problem or desire hook",
      "set context and emotional relevance",
      "reveal solution value with clarity",
      "prove trust and utility quickly",
      "finish with decisive conversion CTA",
    ],
    sceneInnovation: [
      "Use a visual tension cue that signals stakes in under a second.",
      "Shift from situational realism into cleaner brand framing.",
      "Stage a controlled reveal where core value becomes explicit.",
      "Use one strong proof artifact (before-after, feature response, trusted cue).",
      "Lock the final shot to message and action with high legibility.",
    ],
  },
  gallery_showcase: {
    label: "Gallery-Style Showcase",
    dna: "elegant art-direction, premium composition, high-perception visual storytelling",
    pacing: "slow prestige pacing with intentional shot breathing room",
    cameraFlavor: "tracking + pan compositions with detail admiration language",
    sceneBeats: [
      "open with prestige visual framing",
      "establish admiration context and mood",
      "present hero reveal as centerpiece",
      "validate value through detail and reaction",
      "close with refined CTA lockup",
    ],
    sceneInnovation: [
      "Use gallery-grade composition geometry for instant premium feel.",
      "Introduce controlled movement around product as if it is a featured exhibit.",
      "Reveal the hero object with environment choreography and reflected light.",
      "Shift to intimate detail proving craftsmanship and quality.",
      "Close with a restrained but confident call-to-action.",
    ],
  },
  social_shortform: {
    label: "Social Short-Form Optimized",
    dna: "vertical-first retention system with high-clarity value pacing",
    pacing: "fast readable cuts and pattern interrupts for watch-through",
    cameraFlavor: "dynamic social framing with instant focal hierarchy",
    sceneBeats: [
      "hit a pattern interrupt in first second",
      "build immediate situational context",
      "reveal value quickly and clearly",
      "stack concise visual proof",
      "close with high-contrast CTA",
    ],
    sceneInnovation: [
      "Use a disruptive opening movement or unexpected framing cue.",
      "Shift into immediate scenario clarity with concise visual storytelling.",
      "Introduce product as a direct answer to the setup tension.",
      "Rapidly stack one to two proof visuals without clutter.",
      "End with strong text-safe CTA and clean brand confirmation.",
    ],
  },
  custom: {
    label: "Custom / Hybrid",
    dna: "custom blend from client direction and attachment references",
    pacing: "balanced pacing tuned to objective and platform",
    cameraFlavor: "camera language derived from selected direction",
    sceneBeats: [
      "open with a clear visual hook",
      "set context with minimal friction",
      "reveal core value in a distinct visual beat",
      "prove quality and usefulness",
      "close with clear action prompt",
    ],
    sceneInnovation: [
      "Use a non-obvious opening composition that still reads instantly.",
      "Widen context before returning to focused subject isolation.",
      "Switch composition style at reveal moment to signal story shift.",
      "Show one authentic proof detail tied to benefit.",
      "Land a strong final frame optimized for action.",
    ],
  },
};

const SCENES = [
  {
    id: "S1",
    name: "HOOK",
    startRatio: 0,
    endRatio: 0.18,
    composition: "asymmetric foreground-weighted composition with strong subject isolation",
    cameraVariation: "extreme close or punch-in visual language",
    lightingVariation: "highest contrast teaser lighting with strong edge separation",
    motionVariation: "attention-jolt movement in first second",
    transition: "hard momentum transition into setup",
  },
  {
    id: "S2",
    name: "SETUP",
    startRatio: 0.18,
    endRatio: 0.38,
    composition: "context-establishing frame with cleaner spatial storytelling",
    cameraVariation: "medium contextual framing that clarifies scene logic",
    lightingVariation: "balanced key/fill to reveal environment and product context",
    motionVariation: "controlled movement to establish narrative direction",
    transition: "ramp into reveal with clear visual handoff",
  },
  {
    id: "S3",
    name: "REVEAL",
    startRatio: 0.38,
    endRatio: 0.63,
    composition: "hero-centered reveal composition with legible brand identity",
    cameraVariation: "hero reveal path with orbit/dolly emphasis",
    lightingVariation: "hero highlight lighting focused on logo and product line readability",
    motionVariation: "clear reveal choreography and satisfying camera settle",
    transition: "flow into proof through detail emphasis",
  },
  {
    id: "S4",
    name: "PROOF",
    startRatio: 0.63,
    endRatio: 0.85,
    composition: "detail-first proof framing with functional/tactile clarity",
    cameraVariation: "insert and detail-focused camera passes",
    lightingVariation: "texture-priority lighting that reveals material fidelity",
    motionVariation: "purposeful micro-motion and benefit demonstration",
    transition: "resolve into CTA lockup setup",
  },
  {
    id: "S5",
    name: "CTA",
    startRatio: 0.85,
    endRatio: 1,
    composition: "clean brand lockup composition with text-safe balance",
    cameraVariation: "stable hero frame with minimal motion drift",
    lightingVariation: "clean premium close with clear brand readability",
    motionVariation: "final confidence hold for conversion",
    transition: "final frame hold",
  },
];

const FILE_NAME_STOP_WORDS = new Set([
  "img",
  "image",
  "photo",
  "pic",
  "screenshot",
  "final",
  "new",
  "copy",
  "version",
  "draft",
  "untitled",
  "small",
  "large",
  "edited",
  "edit",
  "export",
  "logo",
  "brand",
  "file",
  "ref",
  "reference",
]);

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

  if (preset && !presetIsCustom && custom) return `${preset}; ${custom}`;
  if (preset && !presetIsCustom) return preset;
  if (custom) return custom;
  return fallback;
}

function cleanMulti(text) {
  return text.replace(/\s+/g, " ").trim();
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

function currentAttachmentNames() {
  const input = byId("mustIncludeAttachments");
  if (!input || !input.files) return [];
  return [...input.files].map((file) => file.name).filter(Boolean);
}

function currentImageAttachmentNames() {
  const input = byId("mustIncludeImages");
  if (!input || !input.files) return [];
  return [...input.files].map((file) => file.name).filter(Boolean);
}

function attachmentSummary() {
  return selectedAttachmentNames.length
    ? selectedAttachmentNames.join(", ")
    : "None provided";
}

function imageAttachmentSummary() {
  return selectedImageAttachmentNames.length
    ? selectedImageAttachmentNames.join(", ")
    : "None provided";
}

function updateAttachmentList() {
  selectedAttachmentNames = currentAttachmentNames();
  const list = byId("attachmentList");
  if (!list) return;
  list.textContent = selectedAttachmentNames.length
    ? `Attached files: ${selectedAttachmentNames.join(", ")}`
    : "No attachment files selected.";
}

function updateImageAttachmentList() {
  selectedImageAttachmentNames = currentImageAttachmentNames();
  const list = byId("imageAttachmentList");
  if (!list) return;
  list.textContent = selectedImageAttachmentNames.length
    ? `Images selected from Downloads: ${selectedImageAttachmentNames.join(", ")}`
    : "No image files selected from Downloads.";
}

function splitNameTokens(fileName) {
  const base = fileName.replace(/\.[^/.]+$/, "").toLowerCase();
  return base
    .split(/[^a-z0-9]+/g)
    .map((token) => token.trim())
    .filter((token) => token.length > 2 && !FILE_NAME_STOP_WORDS.has(token) && !/^\d+$/.test(token));
}

function rgbToHex(r, g, b) {
  return `#${[r, g, b]
    .map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0"))
    .join("")}`;
}

function rgbToHsv(r, g, b) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;
  let hue = 0;

  if (delta !== 0) {
    if (max === rn) {
      hue = ((gn - bn) / delta) % 6;
    } else if (max === gn) {
      hue = (bn - rn) / delta + 2;
    } else {
      hue = (rn - gn) / delta + 4;
    }
    hue *= 60;
    if (hue < 0) hue += 360;
  }

  const saturation = max === 0 ? 0 : delta / max;
  const value = max;
  return { hue, saturation, value };
}

function hueNameFromDegrees(hue) {
  if (hue < 20 || hue >= 340) return "red";
  if (hue < 45) return "orange";
  if (hue < 70) return "yellow";
  if (hue < 160) return "green";
  if (hue < 210) return "cyan";
  if (hue < 260) return "blue";
  if (hue < 290) return "violet";
  if (hue < 340) return "magenta";
  return "neutral";
}

function extractDominantPalette(imageData) {
  const histogram = new Map();
  const pixels = imageData.data;

  for (let i = 0; i < pixels.length; i += 16) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const a = pixels[i + 3];
    if (a < 30) continue;

    const rq = Math.round(r / 32) * 32;
    const gq = Math.round(g / 32) * 32;
    const bq = Math.round(b / 32) * 32;
    const key = `${rq},${gq},${bq}`;
    histogram.set(key, (histogram.get(key) || 0) + 1);
  }

  const top = [...histogram.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key]) => key.split(",").map((n) => Number.parseInt(n, 10)));

  if (!top.length) {
    return ["#808080"];
  }
  return top.map(([r, g, b]) => rgbToHex(r, g, b));
}

function extractImageStats(imageData) {
  const { data, width, height } = imageData;
  const luminanceGrid = new Float32Array(width * height);
  const hueBins = new Array(12).fill(0);
  let validCount = 0;
  let luminanceSum = 0;
  let luminanceSqSum = 0;
  let saturationSum = 0;
  let warmBiasSum = 0;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const idx = y * width + x;
      const px = idx * 4;
      const r = data[px];
      const g = data[px + 1];
      const b = data[px + 2];
      const a = data[px + 3];

      if (a < 20) {
        luminanceGrid[idx] = 0;
        continue;
      }

      const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      const hsv = rgbToHsv(r, g, b);

      luminanceGrid[idx] = luminance;
      luminanceSum += luminance;
      luminanceSqSum += luminance * luminance;
      saturationSum += hsv.saturation;
      warmBiasSum += r - b;
      validCount += 1;

      if (hsv.saturation > 0.18) {
        const hueBin = Math.floor(hsv.hue / 30) % 12;
        hueBins[hueBin] += 1;
      }
    }
  }

  if (!validCount) {
    return {
      avgLuminance: 128,
      luminanceStd: 35,
      avgSaturation: 0.3,
      warmBias: 0,
      edgeDensity: 0.15,
      dominantHues: ["neutral"],
    };
  }

  let edgeHits = 0;
  let edgeChecks = 0;
  for (let y = 1; y < height; y += 1) {
    for (let x = 1; x < width; x += 1) {
      const idx = y * width + x;
      const current = luminanceGrid[idx];
      const left = luminanceGrid[idx - 1];
      const up = luminanceGrid[idx - width];
      if (current === 0 && left === 0 && up === 0) {
        continue;
      }
      const gradient = Math.abs(current - left) + Math.abs(current - up);
      edgeChecks += 1;
      if (gradient > 34) edgeHits += 1;
    }
  }

  const avgLuminance = luminanceSum / validCount;
  const luminanceVariance = Math.max(0, luminanceSqSum / validCount - avgLuminance * avgLuminance);
  const luminanceStd = Math.sqrt(luminanceVariance);
  const avgSaturation = saturationSum / validCount;
  const warmBias = warmBiasSum / validCount;
  const edgeDensity = edgeChecks ? edgeHits / edgeChecks : 0;

  const dominantHues = hueBins
    .map((count, index) => ({ count, index }))
    .filter((entry) => entry.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 3)
    .map((entry) => hueNameFromDegrees(entry.index * 30));

  return {
    avgLuminance,
    luminanceStd,
    avgSaturation,
    warmBias,
    edgeDensity,
    dominantHues: dominantHues.length ? dominantHues : ["neutral"],
  };
}

function describeImageProfile(width, height, orientation, palette, stats) {
  const brightness =
    stats.avgLuminance < 85 ? "dark" : stats.avgLuminance < 170 ? "balanced" : "bright";
  const contrast =
    stats.luminanceStd < 35 ? "soft contrast" : stats.luminanceStd < 65 ? "medium contrast" : "high contrast";
  const saturation =
    stats.avgSaturation < 0.2
      ? "muted saturation"
      : stats.avgSaturation < 0.5
        ? "balanced saturation"
        : "vivid saturation";
  const temperature =
    stats.warmBias > 12 ? "warm color temperature" : stats.warmBias < -12 ? "cool color temperature" : "neutral color temperature";
  const detailDensity =
    stats.edgeDensity < 0.12
      ? "clean/minimal detail density"
      : stats.edgeDensity < 0.24
        ? "moderate detail density"
        : "high texture/detail density";
  const aspectRatio = width > 0 && height > 0 ? (width / height).toFixed(2) : "unknown";
  const hues = stats.dominantHues.join(", ");

  return `${orientation} composition (aspect ratio ${aspectRatio}), ${brightness} exposure, ${contrast}, ${saturation}, ${temperature}, ${detailDensity}, dominant hue families ${hues}, sampled palette ${palette.join(", ")}`;
}

async function analyzeImageFile(file) {
  const url = URL.createObjectURL(file);

  try {
    const image = await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Could not decode ${file.name}`));
      img.src = url;
    });

    const width = image.naturalWidth || image.width || 0;
    const height = image.naturalHeight || image.height || 0;
    const orientation =
      width > height ? "landscape" : height > width ? "portrait" : "square";

    const canvas = document.createElement("canvas");
    const sampleW = 80;
    const sampleH = 80;
    canvas.width = sampleW;
    canvas.height = sampleH;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, sampleW, sampleH);
    const data = ctx.getImageData(0, 0, sampleW, sampleH);
    const palette = extractDominantPalette(data);
    const stats = extractImageStats(data);
    const description = describeImageProfile(width, height, orientation, palette, stats);

    return {
      name: file.name,
      width,
      height,
      orientation,
      palette,
      keywords: splitNameTokens(file.name),
      description,
      stats,
    };
  } catch (_error) {
    return {
      name: file.name,
      width: 0,
      height: 0,
      orientation: "unknown",
      palette: ["#808080"],
      keywords: splitNameTokens(file.name),
      description: "reference image could not be decoded; use filename and brand context only",
      stats: {
        avgLuminance: 128,
        luminanceStd: 35,
        avgSaturation: 0.3,
        warmBias: 0,
        edgeDensity: 0.15,
        dominantHues: ["neutral"],
      },
    };
  } finally {
    URL.revokeObjectURL(url);
  }
}

function collectInputs() {
  const categoryKey = pick(readRaw("category"), "custom");
  const preset = CATEGORY_PRESETS[categoryKey] || CATEGORY_PRESETS.custom;
  const durationSeconds = clampDuration(readRaw("durationSeconds"));

  return {
    clientName: pick(readRaw("clientName"), "Client"),
    projectName: pick(readRaw("projectName"), "Campaign"),
    productName: pick(readRaw("productName"), "featured product"),
    brandLogoText: pick(readRaw("brandLogoText"), pick(readRaw("clientName"), "Client")),
    productLineName: pick(readRaw("productLineName"), "Core product line"),
    variantName: pick(readRaw("variantName"), "Hero variant"),
    productType: pick(readRaw("productType"), "Not specified"),
    packageFormat: pick(readRaw("packageFormat"), "Not specified"),
    packageMaterial: pick(readRaw("packageMaterial"), "Not specified"),
    brandPalette: pick(readRaw("brandPalette"), "Not specified"),
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
    sceneInnovation: preset.sceneInnovation,
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
      "controlled premium environment with strong visual depth",
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
    referenceImageNotes: pick(readRaw("referenceImageNotes"), "None provided"),
  };
}

async function buildReferenceIntelligence(data) {
  const imageFiles = [...(byId("mustIncludeImages")?.files || [])];
  const otherFiles = [...(byId("mustIncludeAttachments")?.files || [])];
  const limitedImages = imageFiles.slice(0, 8);
  const imageAnalysis = await Promise.all(limitedImages.map((file) => analyzeImageFile(file)));

  const keywordSet = new Set();
  imageAnalysis.forEach((item) => item.keywords.forEach((k) => keywordSet.add(k)));
  otherFiles.forEach((file) => splitNameTokens(file.name).forEach((k) => keywordSet.add(k)));

  const imageLines = imageAnalysis.length
    ? imageAnalysis.map((item, index) => {
        const cues = item.keywords.length ? item.keywords.join(", ") : "none";
        return `REF_IMG_${index + 1}: ${item.name} (${item.width}x${item.height}, ${item.orientation}), filename cues ${cues}`;
      })
    : ["No image downloads analyzed."];

  const imageDescriptionLines = imageAnalysis.length
    ? imageAnalysis.map((item, index) => {
        return `REF_IMG_${index + 1} description: ${item.description}`;
      })
    : ["No auto-generated image descriptions available."];

  const paletteHint =
    imageAnalysis.length > 0
      ? [...new Set(imageAnalysis.flatMap((item) => item.palette))].slice(0, 5).join(", ")
      : "No palette derived from images";

  const keywordHint = [...keywordSet].slice(0, 12);

  const descriptorThought = cleanMulti(
    `Brand identity should lock to ${data.clientName} with exact logo text "${data.brandLogoText}".
    Product line should read as "${data.productLineName}" and variant should read as "${data.variantName}" when visible.
    Product type is ${data.productType}, package format is ${data.packageFormat}, and material/finish is ${data.packageMaterial}.
    Visual palette should align with ${data.brandPalette}, plus inferred download palette ${paletteHint}.
    Attachment cue keywords to incorporate where relevant: ${keywordHint.length ? keywordHint.join(", ") : "none"}.
    Auto reference image descriptions to use as style anchors: ${imageDescriptionLines.join(" | ")}.
    Manual image notes from user: ${data.referenceImageNotes}.
    Keep all must-include instructions active: ${data.mustInclude}.`
  );

  const perSceneRefs = SCENES.map((scene, index) => {
    if (!imageAnalysis.length) {
      return "No attached image reference available; derive look from brand/product fields only.";
    }
    const ref = imageAnalysis[index % imageAnalysis.length];
    return `Primary reference for ${scene.id}: ${ref.name} - ${ref.description}`;
  });

  return {
    imageLines,
    imageDescriptionLines,
    paletteHint,
    keywordHint: keywordHint.length ? keywordHint.join(", ") : "none",
    descriptorThought,
    perSceneRefs,
  };
}

function buildSceneIdentityAnchor(data, references) {
  return cleanMulti(
    `Identity anchor: brand "${data.clientName}", exact logo text "${data.brandLogoText}", product line "${data.productLineName}", variant "${data.variantName}".
    Product packaging details: ${data.packageFormat}, ${data.packageMaterial}.
    Palette target: ${data.brandPalette} (reference-derived colors: ${references.paletteHint}).`
  );
}

function buildImagePrompt(
  data,
  references,
  scene,
  sceneIndex,
  beatText,
  innovationText,
  primaryRefDescription,
) {
  return cleanMulti(
    `Create a new, original cinematic keyframe for Scene ${scene.id} (${scene.name}) covering ${scene.start}s-${scene.end}s of a ${data.durationSeconds}s ad.
    Client/Brand: ${data.clientName}. Project: ${data.projectName}.
    Scene objective: ${beatText}.
    Innovation directive: ${innovationText}
    Composition directive: ${scene.composition}; this shot must look visually different from every other scene.
    Scene-specific reference image description: ${primaryRefDescription}
    Camera directive for this scene: ${scene.cameraVariation}, while honoring global camera style "${data.camera}" and category flavor "${data.categoryCameraFlavor}".
    Lighting directive for this scene: ${scene.lightingVariation}, while honoring global lighting mood "${data.lighting}".
    Environment directive for this scene: ${data.environment}; introduce a fresh framing angle or depth arrangement versus previous scene.
    Subject priority: ${data.productName} for ${data.audience} on ${data.platforms}.
    ${buildSceneIdentityAnchor(data, references)}
    Detailed product descriptor block: ${references.descriptorThought}
    Download image references to follow: ${data.mustIncludeImages}.
    Additional attachments to follow: ${data.mustIncludeAttachments}.
    Attachment links: ${data.attachmentLinks}.
    Must include: ${data.mustInclude}.
    Must avoid: ${data.mustAvoid}.
    Customer vision to preserve: ${data.vision}.`
  );
}

function buildVideoPrompt(
  data,
  references,
  scene,
  sceneIndex,
  beatText,
  innovationText,
  primaryRefDescription,
  nextScene,
) {
  const transition = nextScene
    ? `Transition into ${nextScene.id} (${nextScene.name}) via ${scene.transition}, preserving brand continuity and object identity.`
    : "Resolve into a clean final CTA hold with stable brand lockup and high readability.";

  return cleanMulti(
    `Generate Scene ${scene.id} (${scene.name}) video segment from ${scene.start}s-${scene.end}s using Scene ${scene.id} keyframe as primary visual anchor.
    Client/Brand: ${data.clientName}. Project: ${data.projectName}.
    Narrative beat: ${beatText}.
    Scene innovation to execute: ${innovationText}
    Scene-specific reference image description: ${primaryRefDescription}
    Motion directive for this scene: ${scene.motionVariation}, aligned with global motion style "${data.motion}" and category pacing "${data.categoryPacing}".
    Camera movement for this scene should prioritize ${scene.cameraVariation} while staying coherent with global camera direction "${data.camera}".
    Lighting behavior should preserve ${data.lighting} but introduce scene-specific variation "${scene.lightingVariation}".
    Ensure this scene adds new visual information and does not repeat the previous scene's composition.
    ${buildSceneIdentityAnchor(data, references)}
    Keep logo and product line text legible where visible.
    Must include: ${data.mustInclude}.
    Must avoid: ${data.mustAvoid}.
    Downloads and attachment references to maintain consistency: ${data.mustIncludeImages}; ${data.mustIncludeAttachments}; links ${data.attachmentLinks}.
    Campaign objective: ${data.goal}; audience: ${data.audience}.
    ${transition}`
  );
}

function buildFinalMasterPrompt(data, references) {
  return cleanMulti(
    `Using Scene S1-S5 image keyframes and video segments, generate one final ${data.durationSeconds}s master video.
    Client/Brand: ${data.clientName}. Project: ${data.projectName}.
    Strict sequence: HOOK -> SETUP -> REVEAL -> PROOF -> CTA.
    Each scene must remain distinct in composition and visual storytelling (no repeated framing templates).
    Keep category style lock: ${data.categoryLabel} (${data.categoryDna}).
    Preserve global creative direction: tone ${data.tone}, style ${data.style}, camera ${data.camera}, lighting ${data.lighting}, environment ${data.environment}, motion ${data.motion}.
    Brand lock: ${buildSceneIdentityAnchor(data, references)}
    Detailed product rendering guidance: ${references.descriptorThought}
    Reference image description brief: ${references.imageDescriptionLines.join(" | ")}
    Manual reference notes: ${data.referenceImageNotes}
    Respect all reference assets from downloads and attachments.
    Must include: ${data.mustInclude} (preset: ${data.mustIncludePreset}).
    Must avoid: ${data.mustAvoid} (preset: ${data.mustAvoidPreset}).
    Objective: ${data.goal}. Audience: ${data.audience}. Platform optimization: ${data.platforms}.
    End with CTA: ${data.cta}.`
  );
}

function buildNegativePrompt() {
  return cleanMulti(
    `blurry subject, warped logo text, wrong product line text, incorrect packaging proportions, low-resolution label detail,
    muddy textures, oversaturation, flicker, jitter, temporal ghosting, noisy gradients, unreadable CTA text, cluttered layout,
    duplicated objects, malformed anatomy, off-brand color palette, inconsistent lighting direction`
  );
}

function buildFinalPromptStack(data, references) {
  const scenes = toSceneTimes(data.durationSeconds);
  const sceneBlocks = scenes.map((scene, index) => {
    const beatText = data.sceneBeats[index] || "deliver the intended narrative beat";
    const innovationText =
      data.sceneInnovation[index] || "introduce a new visual thought specific to this scene";
    const primaryRefDescription =
      references.perSceneRefs[index] || "No attached image reference available for this scene.";
    const nextScene = scenes[index + 1] || null;
    const imagePrompt = buildImagePrompt(
      data,
      references,
      scene,
      index,
      beatText,
      innovationText,
      primaryRefDescription,
    );
    const videoPrompt = buildVideoPrompt(
      data,
      references,
      scene,
      index,
      beatText,
      innovationText,
      primaryRefDescription,
      nextScene,
    );

    return `SCENE ${scene.id} - ${scene.name} (${scene.start}s-${scene.end}s)
Trace ID: IMG_${scene.id} -> VID_${scene.id}
Scene Thought: ${innovationText}

Image Prompt:
"${imagePrompt}"

Video Prompt:
"${videoPrompt}"`;
  });

  return `RENDERMINT FINAL SCENE PROMPT STACK

PROJECT
${data.clientName} - ${data.projectName}

BRAND + PRODUCT INTELLIGENCE
- Product: ${data.productName}
- Product type: ${data.productType}
- Product line: ${data.productLineName}
- Variant / strain / flavor: ${data.variantName}
- Exact logo text to preserve: ${data.brandLogoText}
- Package format: ${data.packageFormat}
- Package material/finish: ${data.packageMaterial}
- Palette target: ${data.brandPalette}
- Audience: ${data.audience}
- Goal: ${data.goal}
- Platforms: ${data.platforms}

REFERENCE ANALYSIS FROM DOWNLOADS
${references.imageLines.join("\n")}
${references.imageDescriptionLines.join("\n")}
- Inferred keyword cues: ${references.keywordHint}
- Manual reference notes: ${data.referenceImageNotes}
- Additional attachment files: ${data.mustIncludeAttachments}
- Attachment links: ${data.attachmentLinks}

PRODUCTION ORDER (FOLLOW EXACTLY)
1) Generate all image keyframes first (IMG_S1 to IMG_S5).
2) Generate each matching video segment second (VID_S1 to VID_S5).
3) Assemble final master video last (VID_MASTER).

${sceneBlocks.join("\n\n")}

FINAL MASTER VIDEO PROMPT
Trace ID: VID_MASTER
"${buildFinalMasterPrompt(data, references)}"

GLOBAL NEGATIVE PROMPT
"${buildNegativePrompt()}"`;
}

function saveDraft() {
  const form = byId("intakeForm");
  const fields = form.querySelectorAll("input, textarea, select");
  const draft = {};
  fields.forEach((field) => {
    if (!field.id || field.type === "file") return;
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
    // Ignore invalid cache and keep defaults.
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

async function generateAndRenderOutput() {
  updateAttachmentList();
  updateImageAttachmentList();
  const output = byId("finalPromptOutput");
  output.textContent = "Analyzing downloads and generating detailed scene prompts...";
  const data = collectInputs();
  const references = await buildReferenceIntelligence(data);
  output.textContent = buildFinalPromptStack(data, references);
  saveDraft();
}

async function loadDemo() {
  const demo = {
    clientName: "Rendermint Demo Brand",
    projectName: "8s Premium Launch Spot",
    productName: "Emerald Reserve Live Resin Vape",
    brandLogoText: "EMERALD RESERVE",
    productLineName: "Signature Solventless Series",
    variantName: "Blue Dream",
    productType: "Vape",
    packageFormat: "Vape cartridge + box",
    packageMaterial: "Anodized metal finish",
    brandPalette: "Green + black premium cannabis palette",
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
    mustInclude:
      "Exact logo lockup, highly readable label typography, product line text, and premium package reflections",
    attachmentLinks: "https://drive.google.com/example-brand-assets",
    mustAvoidPreset: "No medical cure claims",
    mustAvoid: "warped logo, unreadable labels, noisy texture, and cluttered text",
    vision:
      "This should feel premium and high-end, with rich material detail, unique scene progression, and a final frame that clearly drives purchase intent.",
    referenceImageNotes:
      "Reference image 1 is the preferred hero logo orientation, reference image 2 is the preferred material finish, reference image 3 is the preferred macro texture style.",
  };

  Object.entries(demo).forEach(([id, value]) => {
    const field = byId(id);
    if (field) field.value = value;
  });

  await generateAndRenderOutput();
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

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    await generateAndRenderOutput();
  });

  form.addEventListener("input", saveDraft);
  form.addEventListener("change", saveDraft);

  byId("loadDemoBtn").addEventListener("click", async () => {
    await loadDemo();
  });
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
