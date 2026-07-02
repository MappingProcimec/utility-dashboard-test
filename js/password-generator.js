document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('password-form');
    const lengthInput = document.getElementById('password-length');
    const includeUppercase = document.getElementById('include-uppercase');
    const includeLowercase = document.getElementById('include-lowercase');
    const includeNumbers = document.getElementById('include-numbers');
    const includeSymbols = document.getElementById('include-symbols');
    const generatedPassword = document.getElementById('generated-password');
    const copyButton = document.getElementById('copy-password');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        generatePassword();
    });
    
    copyButton.addEventListener('click', function() {
        copyToClipboard();
    });
    
    function generatePassword() {
        clearError('password-length-error');
        
        const length = parseInt(lengthInput.value);
        const useUppercase = includeUppercase.checked;
        const useLowercase = includeLowercase.checked;
        const useNumbers = includeNumbers.checked;
        const useSymbols = includeSymbols.checked;
        
        if (isNaN(length) || length < 8 || length > 64) {
            showError('password-length-error', 'La longitud debe estar entre 8 y 64 caracteres');
            return;
        }
        
        if (!useUppercase && !useLowercase && !useNumbers && !useSymbols) {
            showResult('password-result', '<div class="password-display"><input type="text" id="generated-password" readonly><button id="copy-password" class="btn-copy">Copiar</button></div>', 'error');
            showError('password-length-error', 'Selecciona al menos un tipo de carácter');
            return;
        }
        
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        let charset = '';
        if (useUppercase) charset += uppercase;
        if (useLowercase) charset += lowercase;
        if (useNumbers) charset += numbers;
        if (useSymbols) charset += symbols;
        
        let password = '';
        
        if (useUppercase) {
            password += uppercase[Math.floor(Math.random() * uppercase.length)];
        }
        if (useLowercase) {
            password += lowercase[Math.floor(Math.random() * lowercase.length)];
        }
        if (useNumbers) {
            password += numbers[Math.floor(Math.random() * numbers.length)];
        }
        if (useSymbols) {
            password += symbols[Math.floor(Math.random() * symbols.length)];
        }
        
        for (let i = password.length; i < length; i++) {
            password += charset[Math.floor(Math.random() * charset.length)];
        }
        
        password = shuffleString(password);
        
        const passwordInput = document.getElementById('generated-password');
        if (passwordInput) {
            passwordInput.value = password;
        }
        
        reattachCopyListener();
    }
    
    function shuffleString(str) {
        const arr = str.split('');
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr.join('');
    }
    
    function copyToClipboard() {
        const passwordInput = document.getElementById('generated-password');
        if (!passwordInput || !passwordInput.value) {
            return;
        }
        
        passwordInput.select();
        passwordInput.setSelectionRange(0, 99999);
        
        navigator.clipboard.writeText(passwordInput.value).then(function() {
            const originalText = copyButton.textContent;
            copyButton.textContent = '¡Copiado!';
            copyButton.style.background = '#28a745';
            
            setTimeout(function() {
                copyButton.textContent = originalText;
                copyButton.style.background = '';
            }, 2000);
        }).catch(function(err) {
            alert('Error al copiar: ' + err);
        });
    }
    
    function reattachCopyListener() {
        const newCopyButton = document.getElementById('copy-password');
        if (newCopyButton) {
            newCopyButton.addEventListener('click', function() {
                copyToClipboard();
            });
        }
    }
});
