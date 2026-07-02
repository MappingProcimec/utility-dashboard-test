import {
  showError,
  clearError,
  renderResult,
  renderErrorResult,
  validateNumber,
  formatNumber,
} from './utils.js';

const UNIT_DEFINITIONS = {
  length: {
    label: 'Longitud',
    units: {
      m:  { name: 'Metro', factor: 1 },
      km: { name: 'Kilómetro', factor: 1000 },
      cm: { name: 'Centímetro', factor: 0.01 },
      mm: { name: 'Milímetro', factor: 0.001 },
      mi: { name: 'Milla', factor: 1609.344 },
      ft: { name: 'Pie', factor: 0.3048 },
      in: { name: 'Pulgada', factor: 0.0254 },
    },
  },
  weight: {
    label: 'Peso',
    units: {
      kg:  { name: 'Kilogramo', factor: 1 },
      g:   { name: 'Gramo', factor: 0.001 },
      mg:  { name: 'Miligramo', factor: 0.000001 },
      lb:  { name: 'Libra', factor: 0.453592 },
      oz:  { name: 'Onza', factor: 0.0283495 },
      t:   { name: 'Tonelada', factor: 1000 },
    },
  },
  temperature: {
    label: 'Temperatura',
    units: {
      c: { name: 'Celsius (°C)' },
      f: { name: 'Fahrenheit (°F)' },
      k: { name: 'Kelvin (K)' },
    },
  },
};

function toBase(value, unit, category) {
  if (category === 'temperature') {
    if (unit === 'c') return value;
    if (unit === 'f') return (value - 32) * (5 / 9);
    if (unit === 'k') return value - 273.15;
  }
  const def = UNIT_DEFINITIONS[category].units[unit];
  return value * def.factor;
}

function fromBase(baseValue, unit, category) {
  if (category === 'temperature') {
    if (unit === 'c') return baseValue;
    if (unit === 'f') return baseValue * (9 / 5) + 32;
    if (unit === 'k') return baseValue + 273.15;
  }
  const def = UNIT_DEFINITIONS[category].units[unit];
  return baseValue / def.factor;
}

function populateUnitSelects(category, fromSelect, toSelect) {
  const units = UNIT_DEFINITIONS[category].units;
  const options = Object.entries(units)
    .map(([code, { name }]) => `<option value="${code}">${name}</option>`)
    .join('');

  fromSelect.innerHTML = options;
  toSelect.innerHTML = options;

  const keys = Object.keys(units);
  fromSelect.value = keys[0];
  toSelect.value = keys[1] || keys[0];
}

export function initUnits() {
  const form = document.getElementById('units-form');
  const categorySelect = document.getElementById('units-category');
  const valueInput = document.getElementById('units-value');
  const fromSelect = document.getElementById('units-from');
  const toSelect = document.getElementById('units-to');
  const valueError = document.getElementById('units-value-error');
  const resultEl = document.getElementById('units-result');
  const swapBtn = document.getElementById('units-swap');

  function updateSelects() {
    populateUnitSelects(categorySelect.value, fromSelect, toSelect);
    resultEl.innerHTML = '';
  }

  categorySelect.addEventListener('change', updateSelects);
  updateSelects();

  swapBtn.addEventListener('click', () => {
    const temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearError(valueInput, valueError);
    resultEl.innerHTML = '';

    const valueErr = validateNumber(valueInput.value, { fieldName: 'Valor' });
    if (valueErr) {
      showError(valueInput, valueError, valueErr);
      return;
    }

    const category = categorySelect.value;
    const from = fromSelect.value;
    const to = toSelect.value;
    const value = Number(valueInput.value);

    if (from === to) {
      renderErrorResult(resultEl, 'Selecciona unidades diferentes para convertir.');
      return;
    }

    const base = toBase(value, from, category);
    const result = fromBase(base, to, category);
    const fromName = UNIT_DEFINITIONS[category].units[from].name;
    const toName = UNIT_DEFINITIONS[category].units[to].name;

    renderResult(
      resultEl,
      `<div class="result__card result__card--success">
        <p class="result__value">${formatNumber(result, 4)}</p>
        <p class="result__label">
          ${formatNumber(value, 4)} ${fromName} = ${formatNumber(result, 4)} ${toName}
        </p>
        <p class="result__label">Categoría: ${UNIT_DEFINITIONS[category].label}</p>
      </div>`
    );
  });
}
