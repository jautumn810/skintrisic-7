import { loadAI } from '../storage.js';

function sortScores(scores) {
  return Object.entries(scores || {})
    .sort((a, b) => b[1] - a[1])
    .map(([label, val]) => ({ label, pct: (val * 100).toFixed(2), raw: val }));
}

function ArcMeter(value = 0.0) {
  const size = 720;
  const stroke = 18;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = c * value;
  const gap = c - dash;

  return `
    <div class="arc-meter-container">
      <svg class="arc-meter-svg" viewBox="0 0 ${size} ${size}">
        <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="#cfcfcf" stroke-width="${stroke}"></circle>
        <circle
          cx="${size / 2}"
          cy="${size / 2}"
          r="${r}"
          fill="none"
          stroke="#111"
          stroke-width="${stroke}"
          stroke-dasharray="${dash} ${gap}"
          stroke-linecap="butt"
          transform="rotate(-90 ${size / 2} ${size / 2})"
        ></circle>
      </svg>
    </div>
  `;
}

const ai = loadAI();

if (!ai?.data) {
  document.body.innerHTML = `
    <header class="site-header">
      <a href="../index.html" class="brand">SKINSTRIC</a>
      <div class="header-bracket-container">
        <img src="/public/Rectangle_2710.png" alt="[" class="header-bracket-img">
        <span class="section">INTRO</span>
        <img src="/public/Rectangle_2711.png" alt="]" class="header-bracket-img">
      </div>
      <button class="enter-code">ENTER CODE</button>
    </header>
    <div class="page-wrapper">
      <div class="no-data-container">
        <div class="no-data-title">A.I. ANALYSIS</div>
        <div class="no-data-text">
          No demographics data found yet. Upload an image or take a selfie first.
        </div>
        <button
          type="button"
          class="no-data-btn"
          id="no-data-btn"
        >
          GO TO IMAGE STEP
        </button>
      </div>
    </div>
  `;
  // Add event listener for the no-data button
  document.getElementById('no-data-btn').addEventListener('click', () => {
    window.location.href = 'image.html';
  });
} else {
  const race = ai.data.race || {};
  const age = ai.data.age || {};
  const gender = ai.data.gender || {};

  const raceList = sortScores(race);
  const ageList = sortScores(age);
  const genderList = sortScores(gender);

  let actualRace = raceList[0]?.label || '';
  let actualAge = ageList[0]?.label || '';
  let actualGender = genderList[0]?.label || '';

  const raceTop = raceList[0];
  const confidenceValue = raceTop ? raceTop.raw : 0.0;

  // Update cards
  document.getElementById('race-value').textContent = actualRace || '-';
  document.getElementById('age-value').textContent = actualAge || '-';
  document.getElementById('gender-value').textContent = (actualGender || '-').toUpperCase();

  // Render arc meter
  document.getElementById('arc-meter').innerHTML = ArcMeter(confidenceValue);

  function renderTable(list, selected, type, onSelect) {
    return list.map(opt => `
      <button
        type="button"
        class="dem-row ${selected === opt.label ? 'selected' : ''}"
        data-value="${opt.label}"
        data-type="${type}"
      >
        <div class="dem-left">
          <div class="dem-radio"></div>
          <div>${opt.label}</div>
        </div>
        <div class="dem-right">${opt.pct}%</div>
      </button>
    `).join('');
  }

  document.getElementById('race-table').innerHTML = renderTable(raceList, actualRace, 'race', (val) => {
    actualRace = val;
    document.getElementById('race-value').textContent = actualRace;
    updateRaceCard();
    updateRows();
  });

  document.getElementById('age-table').innerHTML = renderTable(ageList, actualAge, 'age', (val) => {
    actualAge = val;
    document.getElementById('age-value').textContent = actualAge;
    updateAgeCard();
    updateRows();
  });

  document.getElementById('gender-table').innerHTML = renderTable(genderList, actualGender, 'gender', (val) => {
    actualGender = val;
    document.getElementById('gender-value').textContent = (actualGender || '-').toUpperCase();
    updateGenderCard();
    updateRows();
  });

  function updateRaceCard() {
    const card = document.getElementById('race-card');
    card.classList.add('black');
    document.getElementById('age-card').classList.remove('black');
    document.getElementById('gender-card').classList.remove('black');
  }

  function updateAgeCard() {
    const card = document.getElementById('age-card');
    card.classList.remove('black');
  }

  function updateGenderCard() {
    const card = document.getElementById('gender-card');
    card.classList.remove('black');
  }

  function updateRows() {
    document.querySelectorAll('.dem-row[data-type="race"]').forEach(btn => {
      btn.classList.toggle('selected', btn.dataset.value === actualRace);
    });
    document.querySelectorAll('.dem-row[data-type="age"]').forEach(btn => {
      btn.classList.toggle('selected', btn.dataset.value === actualAge);
    });
    document.querySelectorAll('.dem-row[data-type="gender"]').forEach(btn => {
      btn.classList.toggle('selected', btn.dataset.value === actualGender);
    });
  }

  // Add event listeners
  document.addEventListener('click', (e) => {
    const row = e.target.closest('.dem-row');
    if (row) {
      const value = row.dataset.value;
      const type = row.dataset.type;
      
      if (type === 'race') {
        actualRace = value;
        document.getElementById('race-value').textContent = actualRace;
        updateRaceCard();
      } else if (type === 'age') {
        actualAge = value;
        document.getElementById('age-value').textContent = actualAge;
      } else if (type === 'gender') {
        actualGender = value;
        document.getElementById('gender-value').textContent = (actualGender || '-').toUpperCase();
      }
      
      updateRows();
    }
  });
}

