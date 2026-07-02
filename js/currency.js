import {
  showError,
  clearError,
  renderResult,
  renderErrorResult,
  validateNumber,
  formatNumber,
} from './utils.js';

let ratesData = null;

async function loadRates() {
  if (ratesData) return ratesData;
  try {
    const response = await fetch('data/exchange-rates.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    ratesData = await response.json();
    return ratesData;
  } catch {
    throw new Error('No se pudieron cargar las tasas de cambio. Verifica tu conexión e intenta de nuevo.');
  }
}

function populateSelects(data) {
  const fromSelect = document.getElementById('currency-from');
  const toSelect = document.getElementById('currency-to');
  const codes = Object.keys(data.rates);

  [fromSelect, toSelect].forEach((select) => {
    select.innerHTML = codes
      .map((code) => `<option value="${code}">${code} — ${data.names[code]}</option>`)
      .join('');
  });

  fromSelect.value = 'USD';
  toSelect.value = 'EUR';
}

function convert(amount, from, to, rates) {
  const inUsd = amount / rates[from];
  return inUsd * rates[to];
}

export function initCurrency() {
  const form = document.getElementById('currency-form');
  const amountInput = document.getElementById('currency-amount');
  const fromSelect = document.getElementById('currency-from');
  const toSelect = document.getElementById('currency-to');
  const amountError = document.getElementById('currency-amount-error');
  const resultEl = document.getElementById('currency-result');
  const swapBtn = document.getElementById('currency-swap');

  loadRates()
    .then(populateSelects)
    .catch((err) => renderErrorResult(resultEl, err.message));

  swapBtn.addEventListener('click', () => {
    const temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearError(amountInput, amountError);
    resultEl.innerHTML = '';

    const amountErr = validateNumber(amountInput.value, {
      min: 0,
      fieldName: 'Cantidad',
    });

    if (amountErr) {
      showError(amountInput, amountError, amountErr);
      return;
    }

    if (fromSelect.value === toSelect.value) {
      renderErrorResult(resultEl, 'Selecciona monedas diferentes para convertir.');
      return;
    }

    try {
      const data = await loadRates();
      const amount = Number(amountInput.value);
      const result = convert(amount, fromSelect.value, toSelect.value, data.rates);

      renderResult(
        resultEl,
        `<div class="result__card result__card--success">
          <p class="result__value">${formatNumber(result)} ${toSelect.value}</p>
          <p class="result__label">
            ${formatNumber(amount)} ${fromSelect.value} = ${formatNumber(result)} ${toSelect.value}
          </p>
          <p class="result__label">Tasas simuladas · Actualizado: ${data.lastUpdated}</p>
        </div>`
      );
    } catch (err) {
      renderErrorResult(resultEl, err.message);
    }
  });
}
