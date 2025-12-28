const USER_KEY = "skinstric_user";
const AI_KEY = "skinstric_ai";
const IMAGE_KEY = "skinstric_image_base64";

export function loadUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function loadAI() {
  try {
    const raw = localStorage.getItem(AI_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveAI(data) {
  localStorage.setItem(AI_KEY, JSON.stringify(data));
}

export function saveImageBase64(b64) {
  localStorage.setItem(IMAGE_KEY, b64);
}

export function loadImageBase64() {
  return localStorage.getItem(IMAGE_KEY);
}

