// Simple client-side router for navigation
export function navigate(path) {
  window.location.href = path;
}

export function goBack() {
  window.history.back();
}

