const INTAKE_STORAGE_KEY = "renderment_customer_intake_v1";

function byId(id) {
  return document.getElementById(id);
}

function readValue(id, fallback = "Not provided") {
  const el = byId(id);
  if (!el) return fallback;
  const value = (el.value || "").trim();
  return value || fallback;
}

function fileNamesFromInput(id) {
  const input = byId(id);
  if (!input || !input.files) {
    return [];
  }
  return [...input.files].map((file) => file.name).filter(Boolean);
}

function buildListText(items, emptyText) {
  return items.length ? items.join(", ") : emptyText;
}

function updateAttachmentLists() {
  const imageNames = fileNamesFromInput("mustIncludeImages");
  const otherNames = fileNamesFromInput("mustIncludeAttachments");

  const imageList = byId("imageAttachmentList");
  const fileList = byId("attachmentList");

  if (imageList) {
    imageList.textContent = imageNames.length
      ? `Reference images: ${imageNames.join(", ")}`
      : "No reference images selected.";
  }

  if (fileList) {
    fileList.textContent = otherNames.length
      ? `Additional files: ${otherNames.join(", ")}`
      : "No additional files selected.";
  }
}

function buildSubmissionText() {
  const imageNames = fileNamesFromInput("mustIncludeImages");
  const attachmentNames = fileNamesFromInput("mustIncludeAttachments");

  return `RENDERMINT CUSTOMER INTAKE SUBMISSION

Submitted At: ${new Date().toISOString()}

CLIENT DETAILS
- Brand / Company Name: ${readValue("clientName")}
- Project Name: ${readValue("projectName")}
- Product / Service / Subject: ${readValue("productName")}
- Main Goal: ${readValue("goal")}
- Target Audience: ${readValue("audience")}
- Platform(s): ${readValue("platforms")}
- Creative Category: ${readValue("category")}
- Desired Video Length (seconds): ${readValue("durationSeconds")}

CREATIVE DIRECTION
- Tone: ${readValue("tone")}
- Visual Style: ${readValue("style")}
- Camera Direction: ${readValue("camera")}
- Lighting Direction: ${readValue("lighting")}
- Environment Direction: ${readValue("environment")}
- Motion / Pacing: ${readValue("motion")}
- CTA: ${readValue("cta")}

CUSTOM ELEMENTS
- Must Include: ${readValue("mustInclude")}
- Reference Images: ${buildListText(imageNames, "None provided")}
- Additional Files: ${buildListText(attachmentNames, "None provided")}
- Attachment Links: ${readValue("attachmentLinks")}
- Must Avoid: ${readValue("mustAvoid")}
- Vision Summary: ${readValue("vision")}`;
}

function renderPreview() {
  const preview = byId("submissionPreview");
  if (!preview) return;
  preview.textContent = buildSubmissionText();
}

function saveDraft() {
  const form = byId("customerIntakeForm");
  if (!form) return;
  const fields = form.querySelectorAll("input, textarea, select");
  const draft = {};

  fields.forEach((field) => {
    if (!field.id || field.type === "file") {
      return;
    }
    draft[field.id] = field.value;
  });

  localStorage.setItem(INTAKE_STORAGE_KEY, JSON.stringify(draft));
}

function loadDraft() {
  const raw = localStorage.getItem(INTAKE_STORAGE_KEY);
  if (!raw) return;

  try {
    const draft = JSON.parse(raw);
    Object.entries(draft).forEach(([id, value]) => {
      const field = byId(id);
      if (!field) return;
      field.value = value;
    });
  } catch (_error) {
    // Ignore invalid saved draft.
  }
}

async function copySubmission() {
  const button = byId("copySubmissionBtn");
  const text = buildSubmissionText();

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
    button.textContent = "Copy Submission";
  }, 1200);
}

function downloadSubmission() {
  const projectName = readValue("projectName", "customer_intake")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_");
  const fileName = `${projectName || "customer_intake"}_submission.txt`;
  const text = buildSubmissionText();

  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

function clearForm() {
  if (!window.confirm("Clear this form?")) return;
  const form = byId("customerIntakeForm");
  if (form) form.reset();
  localStorage.removeItem(INTAKE_STORAGE_KEY);
  updateAttachmentLists();
  renderPreview();
}

function init() {
  const form = byId("customerIntakeForm");
  if (!form) return;

  form.addEventListener("input", () => {
    saveDraft();
    renderPreview();
  });
  form.addEventListener("change", () => {
    saveDraft();
    updateAttachmentLists();
    renderPreview();
  });

  byId("copySubmissionBtn").addEventListener("click", copySubmission);
  byId("downloadSubmissionBtn").addEventListener("click", downloadSubmission);
  byId("clearFormBtn").addEventListener("click", clearForm);

  loadDraft();
  updateAttachmentLists();
  renderPreview();
}

init();
