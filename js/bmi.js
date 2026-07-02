import {
  showError,
  clearError,
  renderResult,
  validateNumber,
  formatNumber,
} from './utils.js';

const BMI_CATEGORIES = [
  { max: 18.5, label: 'Bajo peso', class: 'info' },
  { max: 24.9, label: 'Peso normal', class: 'success' },
  { max: 29.9, label: 'Sobrepeso', class: 'warning' },
  { max: Infinity, label: 'Obesidad', class: 'danger' },
];

function getCategory(bmi) {
  return BMI_CATEGORIES.find((cat) => bmi <= cat.max);
}

export function initBmi() {
  const form = document.getElementById('bmi-form');
  const weightInput = document.getElementById('bmi-weight');
  const heightInput = document.getElementById('bmi-height');
  const weightError = document.getElementById('bmi-weight-error');
  const heightError = document.getElementById('bmi-height-error');
  const resultEl = document.getElementById('bmi-result');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearError(weightInput, weightError);
    clearError(heightInput, heightError);
    resultEl.innerHTML = '';

    const weightErr = validateNumber(weightInput.value, {
      min: 1,
      max: 500,
      fieldName: 'Peso',
    });
    const heightErr = validateNumber(heightInput.value, {
      min: 50,
      max: 300,
      fieldName: 'Altura',
    });

    if (weightErr) showError(weightInput, weightError, weightErr);
    if (heightErr) showError(heightInput, heightError, heightErr);
    if (weightErr || heightErr) return;

    const weight = Number(weightInput.value);
    const heightM = Number(heightInput.value) / 100;
    const bmi = weight / (heightM * heightM);
    const category = getCategory(bmi);

    renderResult(
      resultEl,
      `<div class="result__card result__card--${category.class}">
        <p class="result__value">${formatNumber(bmi, 1)}</p>
        <p class="result__label">Tu IMC indica: <strong>${category.label}</strong></p>
        <p class="result__label">Peso: ${formatNumber(weight, 1)} kg · Altura: ${formatNumber(Number(heightInput.value), 0)} cm</p>
      </div>`
    );
  });
}
