import {
  showError,
  clearError,
  renderResult,
  renderErrorResult,
} from './utils.js';

const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGITS = '0123456789';
const SYMBOLS = '!@#$%^&*()-_=+[]{}|;:,.<>?';

function buildCharset(includeNumbers, includeSymbols) {
  let charset = LOWER + UPPER;
  if (includeNumbers) charset += DIGITS;
  if (includeSymbols) charset += SYMBOLS;
  return charset;
}

function generatePassword(length, charset) {
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset[array[i] % charset.length];
  }
  return password;
}

function assessStrength(password, options) {
  let score = 0;
  if (password.length >= 12) score++;
  if (password.length >= 20) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (options.numbers && /\d/.test(password)) score++;
  if (options.symbols && /[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 2) return { label: 'Débil', class: 'weak' };
  if (score <= 4) return { label: 'Media', class: 'medium' };
  return { label: 'Fuerte', class: 'strong' };
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function initPassword() {
  const form = document.getElementById('password-form');
  const lengthInput = document.getElementById('password-length');
  const lengthValue = document.getElementById('password-length-value');
  const lengthError = document.getElementById('password-length-error');
  const numbersCheck = document.getElementById('password-numbers');
  const symbolsCheck = document.getElementById('password-symbols');
  const resultEl = document.getElementById('password-result');

  lengthInput.addEventListener('input', () => {
    lengthValue.textContent = lengthInput.value;
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearError(lengthInput, lengthError);
    resultEl.innerHTML = '';

    const length = Number(lengthInput.value);
    const includeNumbers = numbersCheck.checked;
    const includeSymbols = symbolsCheck.checked;

    if (length < 8 || length > 64) {
      showError(lengthInput, lengthError, 'La longitud debe estar entre 8 y 64 caracteres.');
      return;
    }

    const charset = buildCharset(includeNumbers, includeSymbols);
    if (!charset) {
      renderErrorResult(resultEl, 'Debes seleccionar al menos un tipo de carácter.');
      return;
    }

    const password = generatePassword(length, charset);
    const strength = assessStrength(password, { numbers: includeNumbers, symbols: includeSymbols });

    renderResult(
      resultEl,
      `<div class="result__card">
        <div class="password-output">
          <code class="password-output__text" id="generated-password">${password}</code>
          <button type="button" class="btn btn--secondary" id="copy-password">Copiar</button>
        </div>
        <p class="password-strength password-strength--${strength.class}">
          Fortaleza: ${strength.label}
        </p>
      </div>`
    );

    document.getElementById('copy-password').addEventListener('click', async () => {
      const copied = await copyToClipboard(password);
      const btn = document.getElementById('copy-password');
      btn.textContent = copied ? '¡Copiado!' : 'Error al copiar';
      setTimeout(() => { btn.textContent = 'Copiar'; }, 2000);
    });
  });
}
