const USER_KEY = "skinstric_user";
const AI_KEY = "skinstric_ai";
const IMAGE_KEY = "skinstric_image_base64";

export function loadUser() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveUser(user) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function loadAI() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(AI_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveAI(data) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(AI_KEY, JSON.stringify(data));
}

export function saveImageBase64(b64) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(IMAGE_KEY, b64);
}

export function loadImageBase64() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(IMAGE_KEY);
}

