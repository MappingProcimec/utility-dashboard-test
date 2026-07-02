document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('currency-form');
    const amountInput = document.getElementById('amount');
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        convertCurrency();
    });
    
    async function convertCurrency() {
        clearError('amount-error');
        clearResult('currency-result');
        
        const amount = parseFloat(amountInput.value);
        const from = fromCurrency.value;
        const to = toCurrency.value;
        
        if (isNaN(amount) || amount <= 0) {
            showError('amount-error', 'Por favor ingrese un monto válido mayor a 0');
            return;
        }
        
        try {
            const response = await fetch('data/rates.json');
            if (!response.ok) {
                throw new Error('No se pudieron cargar las tasas de cambio');
            }
            const data = await response.json();
            
            const rates = data.rates;
            const fromRate = rates[from];
            const toRate = rates[to];
            
            if (fromRate === undefined || toRate === undefined) {
                throw new Error('Moneda no encontrada');
            }
            
            const amountInUSD = amount / fromRate;
            const result = amountInUSD * toRate;
            
            const formattedResult = result.toLocaleString('es-ES', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            
            const formattedAmount = amount.toLocaleString('es-ES', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            
            showResult('currency-result', `
                <strong>${formattedAmount} ${from}</strong> = 
                <strong>${formattedResult} ${to}</strong>
                <br><small>Tasa: 1 ${from} = ${(toRate / fromRate).toFixed(4)} ${to}</small>
            `);
            
        } catch (error) {
            showResult('currency-result', `
                Error: ${error.message}. Por favor intenta nuevamente.
            `, 'error');
        }
    }
});
