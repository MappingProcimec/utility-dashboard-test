document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bmi-form');
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateBMI();
    });
    
    function calculateBMI() {
        clearError('weight-error');
        clearError('height-error');
        clearResult('bmi-result');
        
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value);
        
        if (isNaN(weight) || weight <= 0 || weight > 600) {
            showError('weight-error', 'Por favor ingrese un peso válido (1-600 kg)');
            return;
        }
        
        if (isNaN(height) || height <= 0 || height > 300) {
            showError('height-error', 'Por favor ingrese una altura válida (1-300 cm)');
            return;
        }
        
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);
        const bmiRounded = bmi.toFixed(1);
        
        let category = '';
        let color = '';
        
        if (bmi < 18.5) {
            category = 'Bajo peso';
            color = '#3498db';
        } else if (bmi >= 18.5 && bmi < 25) {
            category = 'Peso normal';
            color = '#2ecc71';
        } else if (bmi >= 25 && bmi < 30) {
            category = 'Sobrepeso';
            color = '#f39c12';
        } else {
            category = 'Obesidad';
            color = '#e74c3c';
        }
        
        showResult('bmi-result', `
            <div style="text-align: center;">
                <p style="font-size: 2rem; font-weight: bold; color: ${color};">${bmiRounded}</p>
                <p style="font-size: 1.2rem; font-weight: 500;">${category}</p>
                <div style="margin-top: 15px; padding: 10px; background: rgba(0,0,0,0.05); border-radius: 8px;">
                    <small>
                        <strong>Clasificación OMS:</strong><br>
                        &lt;18.5: Bajo peso<br>
                        18.5-24.9: Peso normal<br>
                        25-29.9: Sobrepeso<br>
                        ≥30: Obesidad
                    </small>
                </div>
            </div>
        `);
    }
});
