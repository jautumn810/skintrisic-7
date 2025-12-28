import { fileToBase64, postPhaseTwo } from '../api.js';
import { saveAI, saveImageBase64 } from '../storage.js';

const fileInput = document.getElementById('file-input');
const cameraBtn = document.getElementById('camera-btn');
const errorDiv = document.getElementById('error-message');
let loading = false;

fileInput.disabled = false;

fileInput.addEventListener('change', async (e) => {
  const file = e.target.files?.[0];
  if (!file || loading) return;

  loading = true;
  errorDiv.classList.add('hidden');
  fileInput.disabled = true;
  cameraBtn.disabled = true;

  try {
    const b64 = await fileToBase64(file);
    saveImageBase64(b64);
    const json = await postPhaseTwo({ Image: b64 });
    saveAI(json);
    window.location.href = 'demographics.html';
  } catch (e) {
    errorDiv.textContent = e?.message ?? 'Failed to upload image.';
    errorDiv.classList.remove('hidden');
    fileInput.disabled = false;
    cameraBtn.disabled = false;
    loading = false;
  }
});

cameraBtn.addEventListener('click', () => {
  if (!loading) {
    window.location.href = 'selfie.html';
  }
});

