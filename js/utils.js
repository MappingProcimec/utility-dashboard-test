/**
 * Utilidades compartidas para validación y renderizado de mensajes.
 */

export function showError(inputEl, errorEl, message) {
  if (inputEl) inputEl.classList.add('input--error');
  if (errorEl) errorEl.textContent = message;
}

export function clearError(inputEl, errorEl) {
  if (inputEl) inputEl.classList.remove('input--error');
  if (errorEl) errorEl.textContent = '';
}

export function renderResult(container, html) {
  if (!container) return;
  container.innerHTML = html;
}

export function renderErrorResult(container, message) {
  renderResult(container, `<p class="result__error" role="alert">${message}</p>`);
}

export function validateNumber(value, { min, max, fieldName }) {
  if (value === '' || value === null || value === undefined) {
    return `El campo "${fieldName}" es obligatorio.`;
  }
  const num = Number(value);
  if (Number.isNaN(num)) {
    return `"${fieldName}" debe ser un número válido.`;
  }
  if (min !== undefined && num < min) {
    return `"${fieldName}" debe ser al menos ${min}.`;
  }
  if (max !== undefined && num > max) {
    return `"${fieldName}" no puede superar ${max}.`;
  }
  return null;
}

export function formatNumber(num, decimals = 2) {
  return new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}
