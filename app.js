const STORAGE_KEY = "renderment_prompt_blueprint_draft_v1";
const DEFAULT_TEXT = "Not provided";

const MASTER_TEMPLATE = `You are Renderment's Creative Director + Prompt Engineer.
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
- Output must be reusable as a production blueprint.`;

function byId(id) {
  return document.getElementById(id);
}

function textValue(id) {
  const element = byId(id);
  if (!element) {
    return DEFAULT_TEXT;
  }
  const value = (element.value || "").trim();
  return value || DEFAULT_TEXT;
}

function checkedGroup(group) {
  const selected = [...document.querySelectorAll(`input[data-group="${group}"]`)]
    .filter((input) => input.checked)
    .map((input) => input.dataset.label || input.value);
  return selected.length ? selected.join(", ") : "None selected";
}

function splitList(text) {
  if (!text || text === DEFAULT_TEXT) {
    return ["Not provided"];
  }
  const parts = text
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
  return parts.length ? parts : [text];
}

function bulletList(text) {
  return splitList(text)
    .map((item) => `- ${item}`)
    .join("\n");
}

function collectData() {
  const conceptCount = Number.parseInt(byId("numberOfConcepts").value, 10);
  const numberOfConcepts = Number.isFinite(conceptCount) && conceptCount > 0 ? conceptCount : 3;

  return {
    brandName: textValue("brandName"),
    contactName: textValue("contactName"),
    contactEmail: textValue("contactEmail"),
    projectName: textValue("projectName"),
    launchWindow: textValue("launchWindow"),
    budgetRange: textValue("budgetRange"),
    deliverables: checkedGroup("deliverables"),
    deliverableQuantity: textValue("deliverableQuantity"),
    platformList: textValue("platformList"),
    goalObjective: textValue("goalObjective"),
    kpis: textValue("kpis"),
    cta: textValue("cta"),
    nextStep: textValue("nextStep"),
    targetAudience: textValue("targetAudience"),
    regionLanguage: textValue("regionLanguage"),
    brandPersonality: textValue("brandPersonality"),
    campaignTone: textValue("campaignTone"),
    viewerEmotions: textValue("viewerEmotions"),
    productService: textValue("productService"),
    coreMessage: textValue("coreMessage"),
    topValuePoints: textValue("topValuePoints"),
    claimsInclude: textValue("claimsInclude"),
    claimsAvoid: textValue("claimsAvoid"),
    styleFamily: checkedGroup("styleFamily"),
    referenceLinks: textValue("referenceLinks"),
    nonNegotiables: textValue("nonNegotiables"),
    shotStyles: textValue("shotStyles"),
    cameraMovement: textValue("cameraMovement"),
    lensFeel: textValue("lensFeel"),
    dofPreference: textValue("dofPreference"),
    pacingPreference: textValue("pacingPreference"),
    lightingMood: textValue("lightingMood"),
    colorTemperature: textValue("colorTemperature"),
    environmentLocation: textValue("environmentLocation"),
    atmosphere: textValue("atmosphere"),
    textureRealism: textValue("textureRealism"),
    storyStructure: textValue("storyStructure"),
    motionBehavior: textValue("motionBehavior"),
    keyMoments: textValue("keyMoments"),
    endingBeat: textValue("endingBeat"),
    musicStyle: textValue("musicStyle"),
    voiceoverNeeded: textValue("voiceoverNeeded"),
    voiceoverSpecs: textValue("voiceoverSpecs"),
    soundDesign: textValue("soundDesign"),
    musicConstraints: textValue("musicConstraints"),
    aspectRatios: textValue("aspectRatios"),
    resolutionTarget: textValue("resolutionTarget"),
    frameRate: textValue("frameRate"),
    maxRuntime: textValue("maxRuntime"),
    captionReqs: textValue("captionReqs"),
    safeZones: textValue("safeZones"),
    mustInclude: textValue("mustInclude"),
    mustAvoid: textValue("mustAvoid"),
    legalConstraints: textValue("legalConstraints"),
    assets: checkedGroup("assets"),
    assetLinks: textValue("assetLinks"),
    decisionMaker: textValue("decisionMaker"),
    reviewRounds: textValue("reviewRounds"),
    reviewTimeline: textValue("reviewTimeline"),
    finalSignoff: textValue("finalSignoff"),
    priorityLevel: textValue("priorityLevel"),
    visionParagraph: textValue("visionParagraph"),
    numberOfConcepts,
  };
}

function buildCameraDirection(data) {
  return `Shot styles: ${data.shotStyles}; Movement: ${data.cameraMovement}; Lens feel: ${data.lensFeel}; DOF: ${data.dofPreference}; Pacing: ${data.pacingPreference}`;
}

function buildLightingDirection(data) {
  return `Lighting mood: ${data.lightingMood}; Color temperature: ${data.colorTemperature}`;
}

function buildEnvironmentDirection(data) {
  return `Location: ${data.environmentLocation}; Atmosphere: ${data.atmosphere}; Non-negotiables: ${data.nonNegotiables}`;
}

function buildAudioDirection(data) {
  return `Music: ${data.musicStyle}; Voiceover needed: ${data.voiceoverNeeded}; Voiceover notes: ${data.voiceoverSpecs}; Sound design: ${data.soundDesign}; Music constraints: ${data.musicConstraints}`;
}

function buildTechSpecs(data) {
  return `Aspect ratios: ${data.aspectRatios}; Resolution: ${data.resolutionTarget}; FPS: ${data.frameRate}; Runtime: ${data.maxRuntime}; Captions: ${data.captionReqs}; Safe zones: ${data.safeZones}`;
}

function buildConstraints(data) {
  return `Budget range: ${data.budgetRange}; Priority: ${data.priorityLevel}; Legal/compliance: ${data.legalConstraints}; Review rounds: ${data.reviewRounds}; Review timeline: ${data.reviewTimeline}`;
}

function buildDurationPlan(data) {
  return data.deliverableQuantity;
}

function buildCleanedBrief(data) {
  return `RENDERMENT CLEANED CLIENT BRIEF

PROJECT BASICS
- Brand / Company: ${data.brandName}
- Contact: ${data.contactName}
- Contact Email: ${data.contactEmail}
- Project Name: ${data.projectName}
- Launch Window: ${data.launchWindow}
- Priority Level: ${data.priorityLevel}

CAMPAIGN GOALS
- Objective: ${data.goalObjective}
- KPI / Success Signal: ${data.kpis}
- Primary CTA: ${data.cta}
- Next Destination: ${data.nextStep}

AUDIENCE + BRAND VOICE
- Target Audience: ${data.targetAudience}
- Region / Language: ${data.regionLanguage}
- Brand Personality: ${data.brandPersonality}
- Campaign Tone: ${data.campaignTone}
- Emotional Tone: ${data.viewerEmotions}

PRODUCT + MESSAGE
- Product / Service: ${data.productService}
- Core Message: ${data.coreMessage}
- Value Points:
${bulletList(data.topValuePoints)}
- Claims to Include:
${bulletList(data.claimsInclude)}
- Claims to Avoid:
${bulletList(data.claimsAvoid)}

CREATIVE DIRECTION
- Deliverables: ${data.deliverables}
- Deliverable Quantity Plan: ${data.deliverableQuantity}
- Platforms: ${data.platformList}
- Style Family: ${data.styleFamily}
- References:
${bulletList(data.referenceLinks)}
- Camera Direction: ${buildCameraDirection(data)}
- Lighting Direction: ${buildLightingDirection(data)}
- Environment Direction: ${buildEnvironmentDirection(data)}
- Texture Realism: ${data.textureRealism}
- Story Structure: ${data.storyStructure}
- Motion Behavior: ${data.motionBehavior}
- Key Moments:
${bulletList(data.keyMoments)}
- Ending Beat: ${data.endingBeat}

AUDIO + TECHNICAL
- Audio Direction: ${buildAudioDirection(data)}
- Technical Specs: ${buildTechSpecs(data)}

CONSTRAINTS + PRODUCTION
- Must Include:
${bulletList(data.mustInclude)}
- Must Avoid:
${bulletList(data.mustAvoid)}
- Assets Available: ${data.assets}
- Asset Links: ${data.assetLinks}
- Constraints: ${buildConstraints(data)}
- Decision Maker: ${data.decisionMaker}
- Sign-off Date: ${data.finalSignoff}

VISION SUMMARY
${data.visionParagraph}`;
}

function buildReadyPrompt(data) {
  return `You are Renderment's Creative Director + Prompt Engineer.
Create ${data.numberOfConcepts} premium concept blueprints from the brief below.

CLIENT BRIEF
- Campaign Goal: ${data.goalObjective}
- KPI/Success Signal: ${data.kpis}
- Deliverables: ${data.deliverables}
- Platforms: ${data.platformList}
- Audience: ${data.targetAudience}
- Product/Service: ${data.productService}
- Core Value Proposition: ${data.topValuePoints}
- Core Message: ${data.coreMessage}
- CTA: ${data.cta}
- Brand Tone: ${data.campaignTone}
- Emotional Tone: ${data.viewerEmotions}
- Visual Style Family: ${data.styleFamily}
- Reference Links or Moods: ${data.referenceLinks}
- Duration/Cutdown Needs: ${buildDurationPlan(data)}
- Story Arc: ${data.storyStructure}
- Camera Direction: ${buildCameraDirection(data)}
- Lighting Direction: ${buildLightingDirection(data)}
- Environment Direction: ${buildEnvironmentDirection(data)}
- Texture/Material Realism: ${data.textureRealism}
- Motion Behavior: ${data.motionBehavior}
- Audio Direction: ${buildAudioDirection(data)}
- Must Include: ${data.mustInclude}
- Must Avoid: ${data.mustAvoid}
- Technical Specs: ${buildTechSpecs(data)}
- Production Constraints: ${buildConstraints(data)}
- Timeline/Deadline: ${data.launchWindow}

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

Additional context:
- Available Assets: ${data.assets}
- Asset Links: ${data.assetLinks}
- Compliance / Legal: ${data.legalConstraints}
- Decision Maker: ${data.decisionMaker}
- Vision Paragraph: ${data.visionParagraph}`;
}

function buildConceptStarters(data) {
  const style = data.styleFamily === "None selected" ? data.campaignTone : data.styleFamily;
  const product = data.productService;
  const cta = data.cta;
  const platform = data.platformList;

  return `CONCEPT DIRECTION STARTERS

1) Cinematic Hero Reveal
- Hook: Open on a premium macro detail of ${product}, then reveal the full hero frame in under 2 seconds.
- Creative angle: Build trust and desire through controlled camera movement, rich lighting contrast, and high-end material realism.
- Best for: Brand lift + conversion-oriented paid social on ${platform}.
- CTA delivery: End card + voice line with "${cta}".

2) Social POV Transformation
- Hook: Start in handheld POV, then transition from everyday context to stylized ad-grade visuals.
- Creative angle: Blend native social energy with polished production moments to improve hold rate.
- Style notes: ${style}
- CTA delivery: Mid-roll text cue and final hard CTA: "${cta}".

3) Stylized 3D Brand World
- Hook: Introduce a mini world where the product solves a visual problem in seconds.
- Creative angle: Use animation-friendly pacing, expressive environment design, and branded color story.
- Execution note: Ideal when 3D, cartoon-to-real, or Pixar-like stylization is desired.
- CTA delivery: Final branded lockup tied to "${cta}".`;
}

function setOutput(id, value) {
  byId(id).textContent = value;
}

function getOutput(id) {
  return byId(id).textContent || "";
}

function generateOutputs() {
  const data = collectData();
  setOutput("cleanedBriefOutput", buildCleanedBrief(data));
  setOutput("readyPromptOutput", buildReadyPrompt(data));
  setOutput("templateOutput", MASTER_TEMPLATE);
  setOutput("conceptSeedsOutput", buildConceptStarters(data));
}

function saveDraft() {
  const form = byId("intakeForm");
  const fields = form.querySelectorAll("input, textarea, select");
  const payload = {};
  fields.forEach((field) => {
    if (!field.id) {
      return;
    }
    if (field.type === "checkbox") {
      payload[field.id] = field.checked;
      return;
    }
    payload[field.id] = field.value;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function applyFormData(values) {
  Object.entries(values).forEach(([id, value]) => {
    const field = byId(id);
    if (!field) {
      return;
    }
    if (field.type === "checkbox") {
      field.checked = Boolean(value);
      return;
    }
    field.value = value;
  });
}

function loadDraft() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return;
  }
  try {
    const parsed = JSON.parse(raw);
    applyFormData(parsed);
  } catch (error) {
    console.warn("Could not parse saved draft.", error);
  }
}

function clearOutputs() {
  setOutput("cleanedBriefOutput", "");
  setOutput("readyPromptOutput", "");
  setOutput("templateOutput", "");
  setOutput("conceptSeedsOutput", "");
}

function clearForm() {
  const shouldClear = window.confirm("Clear all form fields and generated output?");
  if (!shouldClear) {
    return;
  }
  byId("intakeForm").reset();
  localStorage.removeItem(STORAGE_KEY);
  clearOutputs();
  setOutput("templateOutput", MASTER_TEMPLATE);
}

function loadDemoData() {
  const demo = {
    brandName: "Renderment Demo Client",
    contactName: "Alex Rivera, Creative Lead",
    contactEmail: "alex@example.com",
    projectName: "LumaSkin Serum Launch",
    launchWindow: "Q2 launch, first week of May",
    budgetRange: "$8k-$15k",
    dCinematicVideo: true,
    dUltraImage: true,
    dStylized3d: false,
    dMixedCampaign: true,
    dShortVertical: true,
    dHorizontalVideo: true,
    dSquareCut: true,
    dProductStills: true,
    d3dFrames: false,
    dAdVariations: true,
    deliverableQuantity: "3 hero videos (15-30s), 6 stills, 4 ad cutdowns",
    platformList: "TikTok, Instagram Reels, YouTube Shorts, paid social",
    goalObjective: "Drive product trial purchases during launch week",
    kpis: "CTR > 1.8%, watch time > 6s, conversion lift on landing page",
    cta: "Shop now",
    nextStep: "Product landing page",
    targetAudience: "Women 22-35 interested in premium skincare",
    regionLanguage: "US English",
    brandPersonality: "premium, clean, confident, modern",
    campaignTone: "cinematic, aspirational, clear",
    viewerEmotions: "desire, trust, excitement",
    productService: "LumaSkin Peptide Renewal Serum",
    coreMessage: "Clinical performance with luxury feel",
    topValuePoints: "Visible glow in 7 days\nLightweight texture\nDermatologist tested",
    claimsInclude: "Dermatologist tested, suitable for sensitive skin",
    claimsAvoid: "Medical cure claims",
    sCinematic8k: true,
    sHyperReal: true,
    sPixar3d: false,
    sCartoonReal: false,
    sPov: true,
    sVlog: false,
    sTech: false,
    sLuxury: true,
    referenceLinks: "Apple-style lighting polish, Aesop product macro moods",
    nonNegotiables: "Brand palette, frosted glass bottle hero angle, logo end card",
    shotStyles: "macro close-up, overhead pour, slow orbit reveal",
    cameraMovement: "slow dolly and controlled handheld transitions",
    lensFeel: "50mm and 100mm macro with occasional 24mm environment opener",
    dofPreference: "shallow bokeh for product hero, mixed for context shots",
    pacingPreference: "slow cinematic start, faster middle, premium lockup ending",
    lightingMood: "soft high-contrast studio with cool edge highlights",
    colorTemperature: "neutral to cool",
    environmentLocation: "minimal luxury bathroom and clean studio set",
    atmosphere: "clean air with subtle mist and specular particles",
    textureRealism: "hyper-real",
    storyStructure: "problem -> ritual -> reveal -> proof -> CTA",
    motionBehavior: "floating product spin, liquid swirl transitions",
    keyMoments: "Texture drop on skin\nBottle floating reveal\nBefore/after mood shift",
    endingBeat: "Brand lockup with clear buy-now CTA",
    musicStyle: "cinematic electronic with warm pulse",
    voiceoverNeeded: "Yes",
    voiceoverSpecs: "Female, calm premium tone, US accent",
    soundDesign: "clean foley + soft impacts for transitions",
    musicConstraints: "Royalty-free cleared for paid ads",
    aspectRatios: "9:16, 1:1, 16:9",
    resolutionTarget: "4K master with 1080 exports",
    frameRate: "24fps base, 60fps select macro inserts",
    maxRuntime: "30s hero, 15s cutdowns",
    captionReqs: "Burned-in captions for social edits",
    safeZones: "Leave lower 20% clear for platform UI",
    mustInclude: "Logo end card\nProduct bottle close-up\nShop now CTA",
    mustAvoid: "Overpromising claims\nBusy backgrounds\nHarsh saturation",
    legalConstraints: "Include approved claim language only",
    aPhotos: true,
    aVideos: true,
    aModels: false,
    aGuidelines: true,
    aLogos: true,
    aFonts: true,
    aExistingAds: true,
    aVoiceSamples: true,
    aMusicRefs: true,
    aScript: true,
    assetLinks: "Drive folder: /launch_q2/lumaskin_assets",
    decisionMaker: "Creative Director + Marketing Lead",
    reviewRounds: "2",
    reviewTimeline: "48h per review round",
    finalSignoff: "May 2",
    priorityLevel: "Rush",
    numberOfConcepts: 3,
    visionParagraph:
      "We want a premium skincare ad that feels cinematic but still social-first. The first seconds should stop the scroll using glossy macro texture shots and elegant motion. The product should feel luxurious, clinically credible, and clean. Visuals should progress from intimate ritual moments to hero-level product reveals. Keep transitions smooth and confident, with tasteful typography and minimal clutter. The final result should look expensive, memorable, and conversion-focused.",
  };
  applyFormData(demo);
  saveDraft();
  generateOutputs();
}

async function copyOutput(targetId, button) {
  const text = getOutput(targetId);
  if (!text.trim()) {
    return;
  }
  try {
    await navigator.clipboard.writeText(text);
    button.classList.add("copy-success");
    button.textContent = "Copied";
  } catch (error) {
    button.classList.add("copy-fail");
    button.textContent = "Copy failed";
  }
  window.setTimeout(() => {
    button.classList.remove("copy-success");
    button.classList.remove("copy-fail");
    button.textContent = "Copy";
  }, 1300);
}

function downloadMarkdownPackage() {
  if (!getOutput("cleanedBriefOutput").trim()) {
    generateOutputs();
  }
  const project = textValue("projectName").replace(/[^a-z0-9]+/gi, "_").toLowerCase();
  const fileName = `${project || "renderment_prompt_package"}.md`;
  const markdown = `# Renderment Prompt Package

## Cleaned Client Brief
\`\`\`text
${getOutput("cleanedBriefOutput")}
\`\`\`

## Ready-to-Run Filled Prompt
\`\`\`text
${getOutput("readyPromptOutput")}
\`\`\`

## Reusable Master Prompt Template
\`\`\`text
${getOutput("templateOutput")}
\`\`\`

## Concept Direction Starters
\`\`\`text
${getOutput("conceptSeedsOutput")}
\`\`\`
`;

  const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

function init() {
  const form = byId("intakeForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    generateOutputs();
    saveDraft();
  });

  form.addEventListener("input", saveDraft);
  form.addEventListener("change", saveDraft);

  byId("loadDemoBtn").addEventListener("click", loadDemoData);
  byId("clearFormBtn").addEventListener("click", clearForm);
  byId("downloadBtn").addEventListener("click", downloadMarkdownPackage);

  document.querySelectorAll(".copy-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.target;
      copyOutput(targetId, button);
    });
  });

  loadDraft();
  setOutput("templateOutput", MASTER_TEMPLATE);
}

init();
