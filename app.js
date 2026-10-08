'use strict';

const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const previewFrame = document.getElementById('preview-frame');
const preview = document.getElementById('preview');
const languageSelect = document.getElementById('language');
const statusText = document.getElementById('status');
const output = document.getElementById('output');
const copyButton = document.getElementById('copy-button');

let worker = null;
let workerLanguage = null;
let currentImage = null;
let busy = false;

// ---------- OCR ----------

// Reuses one Tesseract worker and only recreates it when the language changes.
async function getWorker(language) {
  if (worker && workerLanguage === language) {
    return worker;
  }

  await resetWorker();

  // errorHandler makes sure a failed download rejects instead of hanging.
  worker = await new Promise((resolve, reject) => {
    Tesseract.createWorker(language, 1, {
      logger: showProgress,
      errorHandler: reject,
    }).then(resolve, reject);
  });
  workerLanguage = language;
  return worker;
}

async function resetWorker() {
  if (worker) {
    await worker.terminate();
  }
  worker = null;
  workerLanguage = null;
}

async function readImage(file) {
  if (busy) {
    return;
  }

  busy = true;
  currentImage = file;
  output.value = '';
  showPreview(file);
  setBusyUi(true);
  setStatus('Starting…');

  try {
    let ocr;
    try {
      ocr = await getWorker(languageSelect.value);
    } catch (error) {
      console.error(error);
      await resetWorker();
      setStatus('Could not load the OCR engine. Check your internet connection and try again.', true);
      return;
    }

    try {
      const { data } = await ocr.recognize(file);
      const text = data.text.trim();
      output.value = text;
      setStatus(text ? 'Done. Review the text, then copy it.' : 'No text found in this image.');
    } catch (error) {
      console.error(error);
      await resetWorker();
      setStatus('Could not read this image. Try a PNG or JPG screenshot.', true);
    }
  } finally {
    busy = false;
    setBusyUi(false);
  }
}

// ---------- UI helpers ----------

function showProgress({ status, progress }) {
  if (!busy) {
    return;
  }
  if (status === 'recognizing text') {
    setStatus(`Reading text… ${Math.round(progress * 100)}%`);
  } else {
    setStatus('Loading OCR engine…');
  }
}

function showPreview(file) {
  if (preview.src) {
    URL.revokeObjectURL(preview.src);
  }
  preview.src = URL.createObjectURL(file);
  previewFrame.hidden = false;
}

function setBusyUi(isBusy) {
  dropZone.classList.toggle('is-scanning', isBusy);
  languageSelect.disabled = isBusy;
  copyButton.disabled = isBusy || output.value.length === 0;
}

function setStatus(message, isError = false) {
  statusText.textContent = message;
  statusText.classList.toggle('is-error', isError);
}

function isImage(file) {
  return Boolean(file) && file.type.startsWith('image/');
}

// ---------- Input: paste, drop, file picker ----------

document.addEventListener('paste', (event) => {
  const items = event.clipboardData ? [...event.clipboardData.items] : [];
  const item = items.find((entry) => entry.kind === 'file' && entry.type.startsWith('image/'));
  const file = item ? item.getAsFile() : null;
  if (!isImage(file)) {
    return; // Normal text paste (for example into the text box) keeps working.
  }
  event.preventDefault();
  readImage(file);
});

// Accept drops anywhere, so a missed drop does not open the image in the tab.
document.addEventListener('dragover', (event) => {
  if (event.dataTransfer.types.includes('Files')) {
    event.preventDefault();
  }
});

document.addEventListener('drop', (event) => {
  if (!event.dataTransfer.types.includes('Files')) {
    return;
  }
  event.preventDefault();
  const file = [...event.dataTransfer.files].find(isImage);
  if (file) {
    readImage(file);
  } else {
    setStatus('That file is not an image. Drop a PNG or JPG.', true);
  }
});

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  fileInput.value = ''; // Allows choosing the same file again.
  if (isImage(file)) {
    readImage(file);
  } else if (file) {
    setStatus('That file is not an image. Choose a PNG or JPG.', true);
  }
});

// Re-read the current image when the language changes.
languageSelect.addEventListener('change', () => {
  if (currentImage) {
    readImage(currentImage);
  }
});

// ---------- Output ----------

output.addEventListener('input', () => {
  copyButton.disabled = busy || output.value.length === 0;
});

copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(output.value);
    setStatus('Copied to clipboard.');
  } catch {
    output.focus();
    output.select();
    setStatus('Copy was blocked. The text is selected, so press Ctrl+C.', true);
  }
});
