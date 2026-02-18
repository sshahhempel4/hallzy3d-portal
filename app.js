const STORAGE_KEY = "renderment_prompt_blueprint_draft_v1";
const DEFAULT_TEXT = "Not provided";

const RENDERMENT_WORKFLOW_DATASET = {
  overview:
    "Renderment specializes in AI-driven visual content creation across cinematic ads, hyper-real product showcases, stylized 3D animation, and high-retention social formats. The workflow upgrades simple concepts into production-ready prompt blueprints for AI video, image, and 3D pipelines.",
  disciplines: [
    "Creative direction",
    "Prompt engineering",
    "Cinematic visualization",
    "Advertising psychology",
    "AI animation planning",
    "Product showcase storytelling",
    "Stylized 3D scene design",
    "Social media retention optimization",
  ],
  categories: {
    category1_viral_hook: {
      name: "Category 1: Funny AI Intro / Viral Hook Videos",
      corePurpose:
        "Create highly engaging, scroll-stopping intros for TikTok/Reels/Shorts that capture attention in 1-3 seconds and convert viewers into watchers or customers.",
      creativeStyle: [
        "Comedic but cinematic",
        "Relatable real-world scenarios",
        "Unexpected plot twists",
        "Fast emotional shifts (conflict to humor to promotion)",
        "Street-interview, POV, and vlog energy",
      ],
      commonFormats: [
        "POV iPhone-style recordings",
        "Skit-based advertisements",
        "Fake real-life situations that pivot into ads",
        "Handheld camera storytelling",
        "Viral hook narrative structures",
      ],
      specificConcepts: [
        "Angry intro that flips into a friendly promo reveal",
        "Crazy soccer mom sideline ad concept",
        "AI street interview promotional formats",
        "Snapchat-style parking lot confrontation ad",
        "Twist-based character interaction that becomes an app promotion",
      ],
      technicalDirection: [
        "Handheld camera shake simulation",
        "Natural lighting realism",
        "Eye-level perspective framing",
        "Vertical 9:16 framing",
        "Fast pacing with a dominant opening visual",
        "Dialogue-led storytelling",
        "Ambient real-world environments (fields, streets, parking lots)",
      ],
      structuralFormula: [
        "Strong visual hook",
        "Scenario setup",
        "Conflict or curiosity beat",
        "Twist into promotional reveal",
        "Clear value proposition",
        "Direct CTA",
      ],
      starterAngles: [
        {
          title: "Conflict-to-Promo Flip",
          hook:
            "Open with a tense, emotional street-level confrontation that instantly feels real.",
          angle:
            "Use humor and a sudden tonal flip to convert the conflict scene into a persuasive brand reveal.",
          execution:
            "Handheld POV, eye-level framing, natural ambient audio, hard cut into polished product/app close-up.",
          ctaDelivery: "End with a direct social CTA: \"[CTA]\".",
        },
        {
          title: "Sideline Chaos Skit",
          hook:
            "Begin mid-chaos in a sports sideline argument to trigger immediate curiosity.",
          angle:
            "Use relatable character exaggeration and punchline timing to create shareable attention retention.",
          execution:
            "Fast pacing, short dialogue beats, sudden product benefit drop tied to [GOAL].",
          ctaDelivery: "Overlay text + VO lockup with \"[CTA]\".",
        },
        {
          title: "Street Interview Twist",
          hook:
            "Frame as a candid interview with a surprising question in the first second.",
          angle:
            "Build authenticity with vlog energy, then reveal a polished ad message that still feels native.",
          execution:
            "Vertical framing, pattern interrupt transition, quick proof point sequence for [PRODUCT].",
          ctaDelivery: "Use mid-roll caption and final CTA: \"[CTA]\".",
        },
      ],
    },
    category2_hyper_product: {
      name: "Category 2: Hyper-Realistic Product Videos",
      corePurpose:
        "Create premium commercial-style product showcases with accurate logos, packaging, textures, and brand details for advertisements and promotional campaigns.",
      creativeStyle: [
        "Ultra-realistic rendering language",
        "Cinematic commercial quality",
        "Apple-style product presentation",
        "Luxury ad aesthetic",
        "Clean, high-end visual storytelling",
      ],
      commonFormats: [
        "Floating hero product reveals",
        "Macro close-up detail sequences",
        "Slow cinematic spin showcases",
        "Gallery-style admiration scenes",
        "Lid opening and hovering product shots",
      ],
      specificConcepts: [
        "Floating product inside smoke or nebula clouds",
        "Ultra macro packaging stacks inside containers",
        "Cinematic hero reveal with logo accuracy",
        "Slow rotation showcase loops",
        "Close-up texture emphasis (seals, glass, labels)",
      ],
      technicalDirection: [
        "8K cinematic rendering direction",
        "Controlled depth of field and lens blur",
        "Volumetric fog and light rays",
        "Studio key/rim/accent glow lighting setups",
        "Physically accurate reflections and shadows",
        "Hyper-detailed material and label realism",
        "Slow motion pacing and seamless loop planning",
      ],
      structuralFormula: [
        "Premium hero opening frame",
        "Macro texture proof",
        "Packaging/logo clarity sequence",
        "Motion choreography (spin/float/reveal)",
        "Benefit framing",
        "Luxury CTA ending",
      ],
      starterAngles: [
        {
          title: "Nebula Hero Reveal",
          hook:
            "Open on atmospheric volumetric clouds where [PRODUCT] emerges with a premium glow.",
          angle:
            "Treat the product like a cinematic protagonist with deliberate pacing and material fidelity.",
          execution:
            "Macro-to-wide reveal progression, physically accurate reflections, logo precision checks.",
          ctaDelivery: "Luxury end card + soft VO with \"[CTA]\".",
        },
        {
          title: "Macro Truth Sequence",
          hook:
            "Start with ultra-close texture detail before revealing full packaging in under 2 seconds.",
          angle:
            "Build desire through realism, tactility, and premium lighting contrast.",
          execution:
            "100mm macro language, shallow DOF, key-rim separation, controlled rotational choreography.",
          ctaDelivery: "On-screen claim + final CTA: \"[CTA]\".",
        },
        {
          title: "Gallery Admiration Loop",
          hook:
            "Frame [PRODUCT] in a gallery-like setting with curated cinematic camera movement.",
          angle:
            "Position product as collectible art to elevate brand perception and memorability.",
          execution:
            "Slow tracking moves, elegant environmental reflections, seamless loop transition planning.",
          ctaDelivery: "Final lockup with explicit action: \"[CTA]\".",
        },
      ],
    },
    category3_pixar_3d: {
      name: "Category 3: 3D Animated Pixar-Style Videos",
      corePurpose:
        "Create stylized 3D animated scenes that feel cinematic, polished, emotionally engaging, and brand-friendly.",
      creativeStyle: [
        "Pixar-inspired 3D animation language",
        "Expressive cartoon realism",
        "Bright cinematic lighting",
        "Smooth animation motion",
        "Story-driven mini-scenes",
      ],
      commonFormats: [
        "Character driving sequences",
        "Stylized environment interactions",
        "Package handoff storytelling scenes",
        "Portal and transformation sequences",
        "Character POV perspective shots",
      ],
      specificConcepts: [
        "Hood or street stylized cartoon environments",
        "Mid-air action cinematic poses",
        "Narrative mini-scenes with beginning-middle-end",
        "Character continuity across multiple shots",
        "Object interactions with products, phones, or vehicles",
      ],
      technicalDirection: [
        "Global illumination style lighting",
        "Soft shadows and stylized reflections",
        "Cinematic camera tracking",
        "Smooth animation arcs",
        "Foreground-midground-background depth staging",
        "Facial expression emphasis and pose choreography",
      ],
      structuralFormula: [
        "Character hook moment",
        "World establishment",
        "Action or transformation beat",
        "Product/app integration",
        "Emotional close",
        "Brand CTA",
      ],
      starterAngles: [
        {
          title: "Character Drive-to-Reveal",
          hook:
            "Open with a stylized character in motion, driving into a vivid cinematic 3D world.",
          angle:
            "Use personality-rich animation to make the brand narrative emotional and entertaining.",
          execution:
            "Tracking camera, expressive facial beats, controlled arcs, product reveal at action peak.",
          ctaDelivery: "Character-delivered CTA: \"[CTA]\".",
        },
        {
          title: "Portal Transformation Story",
          hook:
            "Start in an everyday stylized environment, then trigger a portal shift into a premium branded world.",
          angle:
            "Use transformation spectacle to encode brand value through visual contrast.",
          execution:
            "Layered depth staging, GI lighting shift, object interaction sequence for [PRODUCT].",
          ctaDelivery: "Portal close resolves into CTA end frame: \"[CTA]\".",
        },
        {
          title: "Package Handoff Narrative",
          hook:
            "Begin with anticipation as a character receives a mysterious branded package.",
          angle:
            "Build story tension, then reward with expressive reveal and playful brand payoff.",
          execution:
            "Cinematic close-ups, pose continuity, prop-based storytelling, rhythmic animation timing.",
          ctaDelivery: "Warm emotional ending + clear \"[CTA]\".",
        },
      ],
    },
    category4_app_brand_ads: {
      name: "Category 4: Cinematic App and Brand Advertisements",
      corePurpose:
        "Create professional promotional videos for apps, businesses, and brands that communicate value with cinematic polish and modern ad structure.",
      creativeStyle: [
        "Inspirational commercial tone",
        "Clean value messaging",
        "High-end ad structure",
        "Emotional storytelling with product integration",
      ],
      commonFormats: [
        "Feature showcase app ads",
        "Service business promotional edits",
        "Brand narrative mini-commercials",
        "Benefit-driven scenario ads",
      ],
      specificConcepts: [
        "App feature reveal campaign",
        "Dealership promotional flow",
        "Dental clinic trust-building ad",
        "Plumbing company reliability spot",
        "Non-profit cause-centered campaign",
      ],
      technicalDirection: [
        "Cinematic framing with clear subject hierarchy",
        "Message-led pacing with narrative transitions",
        "Visual proof beats tied to product value",
        "High-contrast opening and cinematic closing composition",
      ],
      structuralFormula: [
        "Strong visual hook",
        "Scenario setup",
        "Conflict or curiosity moment",
        "Product/app reveal",
        "Clear value proposition",
        "Cinematic ending shot",
      ],
      starterAngles: [
        {
          title: "Problem-to-Feature Lift",
          hook:
            "Open on a relatable problem scenario with immediate urgency and visual clarity.",
          angle:
            "Transition from tension to empowerment through a clean app/brand feature demonstration.",
          execution:
            "Scenario montage, feature UI/product inserts, social proof beat, emotional resolution.",
          ctaDelivery: "Final confidence frame + \"[CTA]\".",
        },
        {
          title: "Trust Builder Commercial",
          hook:
            "Lead with a premium cinematic moment that establishes credibility within 2 seconds.",
          angle:
            "Use authority visuals and concise value claims to accelerate trust and action.",
          execution:
            "Hero brand framing, testimonial-style inserts, high-legibility text pacing for [PLATFORMS].",
          ctaDelivery: "Persistent lower-third cue + end CTA: \"[CTA]\".",
        },
        {
          title: "Mission-Driven Brand Story",
          hook:
            "Start emotionally with a human-centered scene tied to the campaign mission.",
          angle:
            "Build narrative empathy and connect brand purpose to concrete audience value.",
          execution:
            "Story arc progression, clean VO cadence, premium ending tableau with logo lockup.",
          ctaDelivery: "Mission statement + direct response CTA: \"[CTA]\".",
        },
      ],
    },
    category5_gallery_showcase: {
      name: "Category 5: Cinematic Showcase / Gallery-Style Edit Videos",
      corePurpose:
        "Present products or visuals in a cinematic art-gallery style for premium brand perception and elevated visual prestige.",
      creativeStyle: [
        "Elegant luxury tone",
        "Smooth tracking and panning camera language",
        "Detail-centric close-up storytelling",
        "Ambient music-led pacing",
        "Artful, minimal composition",
      ],
      commonFormats: [
        "Gallery wall product showcases",
        "Crowd admiration cinematic scenes",
        "Slow reveal luxury edits",
        "Ambient score visual exhibitions",
      ],
      specificConcepts: [
        "Art gallery with products on walls",
        "Cinematic crowd admiration scenes",
        "Violin ambiance aesthetic sequence",
        "Curated spotlight reveal flows",
      ],
      technicalDirection: [
        "Fluid tracking shots and controlled pans",
        "Longer shot duration for premium pacing",
        "Elegant depth layering for museum-like composition",
        "Refined lighting for texture and silhouette emphasis",
      ],
      structuralFormula: [
        "Elegant establishing frame",
        "Detail admiration pass",
        "Audience reaction or prestige cue",
        "Hero showcase lock",
        "Luxury CTA",
      ],
      starterAngles: [
        {
          title: "Museum Hero Installation",
          hook:
            "Reveal [PRODUCT] as if it is a featured museum installation in a premium gallery space.",
          angle:
            "Drive prestige perception through deliberate camera choreography and curated lighting.",
          execution:
            "Slow tracking, architectural composition, high-detail close-ups, atmospheric score-led pacing.",
          ctaDelivery: "Soft luxury end frame with \"[CTA]\".",
        },
        {
          title: "Admiration Crowd Sequence",
          hook:
            "Open with subtle audience reactions before revealing the hero visual being admired.",
          angle:
            "Use social proof and visual awe to increase perceived value and desirability.",
          execution:
            "Reaction inserts, spotlight reveal, reflection-heavy hero pan, elegant typography.",
          ctaDelivery: "Final admiration pause + CTA: \"[CTA]\".",
        },
        {
          title: "Violin Ambience Reveal",
          hook:
            "Start with ambient, score-driven detail shots that feel like a luxury exhibition film.",
          angle:
            "Emphasize artistry and material richness for premium brand storytelling.",
          execution:
            "Close-up texture transitions, gentle motion, atmospheric lighting bloom, restrained text.",
          ctaDelivery: "End with minimal but clear action: \"[CTA]\".",
        },
      ],
    },
    category6_social_shortform: {
      name: "Category 6: Social Media Optimized Short-Form AI Videos",
      corePurpose:
        "Build short-form AI videos engineered for TikTok, Instagram Reels, YouTube Shorts, and Meta Ads with maximum retention and conversion potential.",
      creativeStyle: [
        "Fast, high-clarity pacing",
        "Pattern interrupt driven hooks",
        "Native vertical storytelling",
        "Immediate scenario immersion",
        "Dynamic camera behavior for retention",
      ],
      commonFormats: [
        "15-30 second vertical ad narratives",
        "Hook-first product or app reveal edits",
        "High-velocity social conversion spots",
        "A/B variant-ready short-form structures",
      ],
      specificConcepts: [
        "First-3-second impact hooks",
        "Scenario-led product reveal cuts",
        "Fast pacing with clear subject hierarchy",
        "Platform-native visual rhythm design",
      ],
      technicalDirection: [
        "Vertical 9:16 first composition",
        "First 3 seconds optimized for impact",
        "Rapid but readable cuts",
        "Immediate visual hierarchy on subject and value",
        "Built-in pattern interrupts and transitions",
        "High legibility CTA timing",
      ],
      structuralFormula: [
        "Pattern interrupt hook (0-3s)",
        "Immediate context setup",
        "Value proof sequence",
        "Momentum-building edits",
        "Clear CTA close",
      ],
      starterAngles: [
        {
          title: "3-Second Pattern Interrupt",
          hook:
            "Start with an unexpected visual or statement that forces a pause in scrolling.",
          angle:
            "Use high contrast opening and immediate relevance to maximize retention in the first seconds.",
          execution:
            "Vertical-first framing, strong subject lock, kinetic transition into value sequence for [PRODUCT].",
          ctaDelivery: "Early text nudge + final CTA: \"[CTA]\".",
        },
        {
          title: "Rapid Proof Stack",
          hook:
            "Open with the boldest benefit claim, then stack visual proof moments quickly.",
          angle:
            "Prioritize clarity and pacing to hold attention while communicating real utility.",
          execution:
            "Fast edit rhythm, macro inserts, before/after or use-case sequence optimized for [PLATFORMS].",
          ctaDelivery: "Mid and end CTA placements using \"[CTA]\".",
        },
        {
          title: "Instant Scenario Immersion",
          hook:
            "Drop viewer directly into an active scenario with no preamble.",
          angle:
            "Create immediate narrative context so the value reveal feels earned and memorable.",
          execution:
            "POV or over-shoulder setup, dynamic camera moves, clear solution reveal in under 12 seconds.",
          ctaDelivery: "Final full-screen action prompt: \"[CTA]\".",
        },
      ],
    },
  },
  coreProductionProcess: [
    {
      step: "Step 1: Idea Expansion",
      goal:
        "Transform simple rough ideas into cinematic scene-ready directions with environment, lighting, motion, and emotional tone.",
      actions: [
        "Expand the initial concept into a complete visual scenario",
        "Define cinematic atmosphere and intent",
        "Clarify product, character, or message role in the scene",
      ],
    },
    {
      step: "Step 2: Prompt Engineering",
      goal:
        "Write hyper-detailed prompts with precise visual and technical direction for AI generation systems.",
      actions: [
        "Specify camera angle and lens behavior",
        "Define lighting style and visual atmosphere",
        "Describe motion, pacing, and animation behavior",
        "Set environment detail and material realism language",
      ],
    },
    {
      step: "Step 3: Scene Cinematic Direction",
      goal:
        "Treat every output like a film scene with clear composition, storytelling flow, and depth choreography.",
      actions: [
        "Plan shot composition and subject focus",
        "Design foreground, midground, and background depth",
        "Map movement and visual progression beat by beat",
      ],
    },
    {
      step: "Step 4: Iteration and Refinement",
      goal:
        "Continuously refine prompts to increase realism, cinematic quality, engagement, and brand precision.",
      actions: [
        "Upgrade realism and texture quality",
        "Maintain logo and packaging accuracy",
        "Improve retention pacing and visual clarity",
        "Refine generator compatibility and output consistency",
      ],
    },
  ],
  specialization: [
    "Hyper-detailed cinematic prompt writing",
    "Mixing realism with stylized 3D animation",
    "Accurate branded product visuals with real logos",
    "Viral hook-focused ad structures",
    "AI-native storytelling design",
    "Multi-style capability across funny, cinematic, luxury, cartoon, and hyper-real",
  ],
};

const MASTER_TEMPLATE = `You are Renderment's Creative Director + Prompt Engineer.
Create [NUMBER_OF_CONCEPTS] premium concept blueprints from the brief below.

RENDERMENT WORKFLOW DATASET LOCK
- Selected Category: [WORKFLOW_CATEGORY]
- Category Core Purpose: [CATEGORY_PURPOSE]
- Category Creative Style DNA: [CATEGORY_CREATIVE_STYLE]
- Category Common Formats: [CATEGORY_FORMATS]
- Category Technical Direction: [CATEGORY_TECHNICAL_DIRECTION]
- Category Structural Formula: [CATEGORY_STRUCTURAL_FORMULA]
- Category Blend Notes: [CATEGORY_BLEND_NOTES]
- Category Override Notes: [CATEGORY_OVERRIDE_NOTES]

CORE PRODUCTION PROCESS (MANDATORY)
1) Idea Expansion
2) Prompt Engineering
3) Scene Cinematic Direction
4) Iteration and Refinement

UNIQUE SPECIALIZATION STANDARDS
- Hyper-detailed cinematic prompt writing
- Realism + stylized 3D blending capability
- Branded product/logo accuracy
- Viral hook-focused ad structure
- AI-native storytelling execution
- Multi-style adaptability

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

function selectValue(id, fallback = DEFAULT_TEXT) {
  const element = byId(id);
  if (!element) {
    return fallback;
  }
  const value = (element.value || "").trim();
  return value || fallback;
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

function bulletArray(items) {
  if (!Array.isArray(items) || !items.length) {
    return "- Not provided";
  }
  return items.map((item) => `- ${item}`).join("\n");
}

function inlineArray(items) {
  if (!Array.isArray(items) || !items.length) {
    return DEFAULT_TEXT;
  }
  return items.join(", ");
}

function getCategoryPreset(categoryKey) {
  return RENDERMENT_WORKFLOW_DATASET.categories[categoryKey] || null;
}

function getCategoryData(categoryKey) {
  const preset = getCategoryPreset(categoryKey);
  if (preset) {
    return preset;
  }
  return {
    name: "Custom / Hybrid Category",
    corePurpose:
      "Blend Renderment category playbooks as needed while staying faithful to the client brief and platform behavior.",
    creativeStyle: ["Hybrid style derived from intake inputs"],
    commonFormats: ["Custom deliverable mix"],
    specificConcepts: ["Bespoke concepts based on campaign goals"],
    technicalDirection: [
      "Use intake-defined camera, lighting, environment, and pacing",
      "Keep platform-native storytelling and retention structure",
    ],
    structuralFormula: [
      "Strong visual hook",
      "Scenario setup",
      "Curiosity or conflict beat",
      "Value reveal",
      "Clear CTA close",
    ],
    starterAngles: [
      {
        title: "Hybrid Hook Direction",
        hook: "Start with the highest-contrast visual signal relevant to [PRODUCT].",
        angle:
          "Blend realism and stylization based on campaign goals and audience behavior.",
        execution:
          "Use a brief conflict/curiosity setup, then pivot into polished value storytelling.",
        ctaDelivery: "Final direct CTA: \"[CTA]\".",
      },
      {
        title: "Narrative Value Reveal",
        hook:
          "Drop into an active scenario immediately, then reveal the product/app value in under 6 seconds.",
        angle:
          "Prioritize retention pacing while preserving premium visual quality and brand fit.",
        execution:
          "Use clear progression: hook -> proof -> payoff -> brand lockup.",
        ctaDelivery: "Use text + VO call to action: \"[CTA]\".",
      },
      {
        title: "Cinematic Conversion Story",
        hook:
          "Open with an emotionally charged micro-moment that aligns with [GOAL].",
        angle:
          "Evolve from emotional setup to practical value and polished cinematic close.",
        execution:
          "Design camera, lighting, and motion choreography to drive clarity and conversion.",
        ctaDelivery: "End with a clear, action-focused CTA: \"[CTA]\".",
      },
    ],
  };
}

function fillTokens(text, data) {
  return text
    .replace(/\[PRODUCT\]/g, data.productService)
    .replace(/\[PLATFORMS\]/g, data.platformList)
    .replace(/\[CTA\]/g, data.cta)
    .replace(/\[GOAL\]/g, data.goalObjective);
}

function buildCoreProcessShortList() {
  return RENDERMENT_WORKFLOW_DATASET.coreProductionProcess
    .map((step) => `- ${step.step}: ${step.goal}`)
    .join("\n");
}

function buildCoreProcessDetailedBlock() {
  return RENDERMENT_WORKFLOW_DATASET.coreProductionProcess
    .map((step) => {
      return `${step.step}
- Goal: ${step.goal}
- Actions:
${bulletArray(step.actions)}`;
    })
    .join("\n\n");
}

function buildSpecializationBlock() {
  return bulletArray(RENDERMENT_WORKFLOW_DATASET.specialization);
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

function collectData() {
  const conceptCount = Number.parseInt(byId("numberOfConcepts").value, 10);
  const numberOfConcepts =
    Number.isFinite(conceptCount) && conceptCount > 0 ? conceptCount : 3;
  const categoryKey = selectValue("creativeCategory", "category1_viral_hook");
  const categoryData = getCategoryData(categoryKey);

  return {
    categoryKey,
    categoryName: categoryData.name,
    categoryPurpose: categoryData.corePurpose,
    categoryCreativeStyle: categoryData.creativeStyle,
    categoryCommonFormats: categoryData.commonFormats,
    categorySpecificConcepts: categoryData.specificConcepts,
    categoryTechnicalDirection: categoryData.technicalDirection,
    categoryStructuralFormula: categoryData.structuralFormula,
    categoryStarterAngles: categoryData.starterAngles,
    categoryBlendNotes: textValue("categoryBlendNotes"),
    categoryOverrideNotes: textValue("categoryOverrideNotes"),
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

function buildCategoryPreviewText(categoryData, blendNotes, overrideNotes) {
  return `Preset: ${categoryData.name}
Core purpose: ${categoryData.corePurpose}

Creative style DNA:
${bulletArray(categoryData.creativeStyle)}

Common formats:
${bulletArray(categoryData.commonFormats)}

Technical direction:
${bulletArray(categoryData.technicalDirection)}

Structural formula:
${bulletArray(categoryData.structuralFormula)}

Blend notes: ${blendNotes}
Override notes: ${overrideNotes}`;
}

function updateCategoryDatasetPreview() {
  const categoryKey = selectValue("creativeCategory", "category1_viral_hook");
  const categoryData = getCategoryData(categoryKey);
  const blendNotes = textValue("categoryBlendNotes");
  const overrideNotes = textValue("categoryOverrideNotes");
  setOutput(
    "categoryDatasetPreview",
    buildCategoryPreviewText(categoryData, blendNotes, overrideNotes),
  );
}

function buildWorkflowDatasetNotes(data) {
  return `RENDERMENT WORKFLOW DATASET NOTES

OVERVIEW
${RENDERMENT_WORKFLOW_DATASET.overview}

CORE DISCIPLINES
${bulletArray(RENDERMENT_WORKFLOW_DATASET.disciplines)}

SELECTED CATEGORY PRESET
- Name: ${data.categoryName}
- Core Purpose: ${data.categoryPurpose}
- Blend Notes: ${data.categoryBlendNotes}
- Override Notes: ${data.categoryOverrideNotes}

CATEGORY CREATIVE STYLE
${bulletArray(data.categoryCreativeStyle)}

CATEGORY COMMON FORMATS
${bulletArray(data.categoryCommonFormats)}

CATEGORY CONCEPT REFERENCES
${bulletArray(data.categorySpecificConcepts)}

CATEGORY TECHNICAL DIRECTION
${bulletArray(data.categoryTechnicalDirection)}

CATEGORY STRUCTURAL FORMULA
${bulletArray(data.categoryStructuralFormula)}

CORE PRODUCTION PROCESS
${buildCoreProcessDetailedBlock()}

UNIQUE SPECIALIZATION STANDARDS
${buildSpecializationBlock()}`;
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

WORKFLOW DATASET ALIGNMENT
- Selected Category Preset: ${data.categoryName}
- Category Purpose: ${data.categoryPurpose}
- Category Blend Notes: ${data.categoryBlendNotes}
- Category Override Notes: ${data.categoryOverrideNotes}
- Category Creative Style:
${bulletArray(data.categoryCreativeStyle)}
- Category Common Formats:
${bulletArray(data.categoryCommonFormats)}
- Category Technical Direction:
${bulletArray(data.categoryTechnicalDirection)}
- Category Structural Formula:
${bulletArray(data.categoryStructuralFormula)}

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

RENDERMENT PROCESS LOCK
${buildCoreProcessShortList()}

SPECIALIZATION STANDARDS
${buildSpecializationBlock()}

VISION SUMMARY
${data.visionParagraph}`;
}

function buildReadyPrompt(data) {
  return `You are Renderment's Creative Director + Prompt Engineer.
Create ${data.numberOfConcepts} premium concept blueprints from the brief below.

RENDERMENT DATASET LOCK
- Workflow Category: ${data.categoryName}
- Category Core Purpose: ${data.categoryPurpose}
- Category Creative Style DNA: ${inlineArray(data.categoryCreativeStyle)}
- Category Common Formats: ${inlineArray(data.categoryCommonFormats)}
- Category Technical Direction: ${inlineArray(data.categoryTechnicalDirection)}
- Category Structural Formula: ${inlineArray(data.categoryStructuralFormula)}
- Category Blend Notes: ${data.categoryBlendNotes}
- Category Override Notes: ${data.categoryOverrideNotes}

CORE PRODUCTION PROCESS TO APPLY
${buildCoreProcessShortList()}

UNIQUE SPECIALIZATION STANDARDS
${buildSpecializationBlock()}

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
- Maintain category-consistent storytelling behavior.
- Output must be reusable as a production blueprint.

Additional context:
- Available Assets: ${data.assets}
- Asset Links: ${data.assetLinks}
- Compliance / Legal: ${data.legalConstraints}
- Decision Maker: ${data.decisionMaker}
- Vision Paragraph: ${data.visionParagraph}`;
}

function buildFullRefinedPrompt(data) {
  return `You are Renderment's Senior Prompt Architect.

Task:
Create exactly ONE fully refined, production-ready master prompt for this campaign.
Do not provide multiple concept options.
Do not provide alternate directions.
Return one high-quality final prompt that can be pasted into AI video/image/3D generators.

RENDERMENT DATASET LOCK
- Selected workflow category: ${data.categoryName}
- Category core purpose: ${data.categoryPurpose}
- Category creative style DNA: ${inlineArray(data.categoryCreativeStyle)}
- Category common formats: ${inlineArray(data.categoryCommonFormats)}
- Category technical direction: ${inlineArray(data.categoryTechnicalDirection)}
- Category structural formula: ${inlineArray(data.categoryStructuralFormula)}
- Category blend notes: ${data.categoryBlendNotes}
- Category override notes: ${data.categoryOverrideNotes}

MANDATORY RENDERMENT PROCESS
${buildCoreProcessShortList()}

SPECIALIZATION STANDARDS
${buildSpecializationBlock()}

CLIENT INPUTS
- Goal: ${data.goalObjective}
- KPI / success signal: ${data.kpis}
- Deliverables: ${data.deliverables}
- Deliverable quantity / duration plan: ${buildDurationPlan(data)}
- Platforms: ${data.platformList}
- Audience: ${data.targetAudience}
- Region / language: ${data.regionLanguage}
- Product / service: ${data.productService}
- Core value proposition: ${data.topValuePoints}
- Core message: ${data.coreMessage}
- CTA: ${data.cta}
- Brand tone: ${data.campaignTone}
- Emotional tone: ${data.viewerEmotions}
- Visual style family: ${data.styleFamily}
- References: ${data.referenceLinks}
- Camera direction: ${buildCameraDirection(data)}
- Lighting direction: ${buildLightingDirection(data)}
- Environment direction: ${buildEnvironmentDirection(data)}
- Texture realism: ${data.textureRealism}
- Story structure: ${data.storyStructure}
- Motion behavior: ${data.motionBehavior}
- Key moments: ${data.keyMoments}
- Ending beat: ${data.endingBeat}
- Audio direction: ${buildAudioDirection(data)}
- Technical specs: ${buildTechSpecs(data)}
- Must include: ${data.mustInclude}
- Must avoid: ${data.mustAvoid}
- Compliance / legal: ${data.legalConstraints}
- Available assets: ${data.assets}
- Asset links: ${data.assetLinks}
- Production constraints: ${buildConstraints(data)}
- Timeline / deadline: ${data.launchWindow}
- Vision paragraph: ${data.visionParagraph}

OUTPUT FORMAT (STRICT)
1) FINAL REFINED PROMPT:
   - Return as one single copy-ready prompt block.
   - Must include camera, lens, DOF, lighting, environment, motion, pacing, and emotional tone.
   - Must enforce brand/logo/packaging accuracy where relevant.
   - Must be platform-native for the listed channels.

2) NEGATIVE PROMPT:
   - Short list of elements to avoid that protect brand quality and realism.

3) EXECUTION NOTES:
   - 3 concise bullets for implementation (pacing, clarity, and conversion impact).`;
}

function buildConceptStarters(data) {
  const starterAngles = data.categoryStarterAngles.slice(0, 3);
  const rendered = starterAngles
    .map((starter, index) => {
      return `${index + 1}) ${starter.title}
- Hook: ${fillTokens(starter.hook, data)}
- Creative angle: ${fillTokens(starter.angle, data)}
- Execution notes: ${fillTokens(starter.execution, data)}
- CTA delivery: ${fillTokens(starter.ctaDelivery, data)}`;
    })
    .join("\n\n");

  return `CONCEPT DIRECTION STARTERS (${data.categoryName})

${rendered}`;
}

function setOutput(id, value) {
  byId(id).textContent = value;
}

function getOutput(id) {
  return byId(id).textContent || "";
}

function generateOutputs() {
  const data = collectData();
  setOutput("fullRefinedPromptOutput", buildFullRefinedPrompt(data));
  setOutput("cleanedBriefOutput", buildCleanedBrief(data));
  setOutput("readyPromptOutput", buildReadyPrompt(data));
  setOutput("templateOutput", MASTER_TEMPLATE);
  setOutput("conceptSeedsOutput", buildConceptStarters(data));
  setOutput("workflowDatasetOutput", buildWorkflowDatasetNotes(data));
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
  setOutput("fullRefinedPromptOutput", "");
  setOutput("cleanedBriefOutput", "");
  setOutput("readyPromptOutput", "");
  setOutput("templateOutput", "");
  setOutput("conceptSeedsOutput", "");
  setOutput("workflowDatasetOutput", "");
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
  updateCategoryDatasetPreview();
}

function loadDemoData() {
  const demo = {
    creativeCategory: "category2_hyper_product",
    categoryBlendNotes:
      "Blend Category 2 hyper-real product language with Category 6 short-form pacing for paid social.",
    categoryOverrideNotes:
      "Logo visibility and packaging accuracy are mandatory in every hero frame.",
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
  updateCategoryDatasetPreview();
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

## One-Click Full Refined Prompt
\`\`\`text
${getOutput("fullRefinedPromptOutput")}
\`\`\`

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

## Workflow Dataset Notes
\`\`\`text
${getOutput("workflowDatasetOutput")}
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

  byId("creativeCategory").addEventListener("change", updateCategoryDatasetPreview);
  byId("categoryBlendNotes").addEventListener("input", updateCategoryDatasetPreview);
  byId("categoryOverrideNotes").addEventListener("input", updateCategoryDatasetPreview);

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
  updateCategoryDatasetPreview();
  setOutput("templateOutput", MASTER_TEMPLATE);
}

init();
