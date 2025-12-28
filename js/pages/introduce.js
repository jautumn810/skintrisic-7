import { loadUser, saveUser } from '../storage.js';
import { isValidLettersOnly } from '../validators.js';

const input = document.getElementById('name-input');
const display = document.getElementById('name-display');
const text = document.getElementById('name-text');
const caret = document.getElementById('name-caret');
const errorDiv = document.getElementById('error-message');
const proceedBtn = document.getElementById('proceed-btn');

// Load saved name
const user = loadUser();
if (user?.name) {
  input.value = user.name;
  text.textContent = user.name;
  display.classList.add('has-value');
  caret.classList.add('hidden');
}

input.addEventListener('input', (e) => {
  const value = e.target.value;
  text.textContent = value || 'Introduce Yourself';
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

input.addEventListener('focus', () => {
  input.focus();
});

// Focus on load
setTimeout(() => input.focus(), 100);

proceedBtn.addEventListener('click', () => {
  const name = input.value.trim();
  if (!isValidLettersOnly(name)) {
    errorDiv.textContent = 'Enter a valid name (letters only).';
    errorDiv.classList.remove('hidden');
    return;
  }

  errorDiv.classList.add('hidden');
  const prev = loadUser();
  saveUser({ name: name, location: prev?.location ?? '' });
  window.location.href = 'city.html';
});

