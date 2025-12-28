import { loadUser, saveUser } from '../storage.js';
import { isValidLettersOnly } from '../validators.js';
import { postPhaseOne } from '../api.js';

const input = document.getElementById('city-input');
const display = document.getElementById('city-display');
const text = document.getElementById('city-text');
const caret = document.getElementById('city-caret');
const errorDiv = document.getElementById('error-message');
const proceedBtn = document.getElementById('proceed-btn');

// Load saved city
const user = loadUser();
if (user?.location) {
  input.value = user.location;
  text.textContent = user.location;
  display.classList.add('has-value');
  caret.classList.add('hidden');
}

input.addEventListener('input', (e) => {
  const value = e.target.value;
  text.textContent = value || 'your city name';
  if (value) {
    display.classList.add('has-value');
    caret.classList.add('hidden');
  } else {
    display.classList.remove('has-value');
    caret.classList.remove('hidden');
  }
  if (!errorDiv.classList.contains('hidden')) {
    errorDiv.classList.add('hidden');
  }
});

// Focus on load
setTimeout(() => input.focus(), 100);

proceedBtn.addEventListener('click', async () => {
  const city = input.value.trim();
  if (!isValidLettersOnly(city)) {
    errorDiv.textContent = 'Enter a valid city (letters only).';
    errorDiv.classList.remove('hidden');
    return;
  }

  const u = loadUser();
  const name = (u?.name ?? '').trim();
  const location = city.trim();

  if (!isValidLettersOnly(name)) {
    errorDiv.textContent = 'Name is missing/invalid. Go back and enter your name.';
    errorDiv.classList.remove('hidden');
    return;
  }

  errorDiv.classList.add('hidden');
  proceedBtn.disabled = true;
  proceedBtn.querySelector('span').textContent = '...';

  try {
    saveUser({ name, location });
    await postPhaseOne({ name, location });
    window.location.href = 'permissions.html';
  } catch (e) {
    errorDiv.textContent = e?.message ?? 'Failed to submit Phase 1 API.';
    errorDiv.classList.remove('hidden');
    proceedBtn.disabled = false;
    proceedBtn.querySelector('span').textContent = 'PROCEED';
  }
});

