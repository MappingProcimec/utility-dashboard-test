document.addEventListener('DOMContentLoaded', function() {
    const unitType = document.getElementById('unit-type');
    const fromUnit = document.getElementById('from-unit');
    const toUnit = document.getElementById('to-unit');
    const form = document.getElementById('units-form');
    
    const unitOptions = {
        length: {
            units: {
                'm': 'Metros (m)',
                'km': 'Kilómetros (km)',
                'cm': 'Centímetros (cm)',
                'mm': 'Milímetros (mm)',
                'mi': 'Millas (mi)',
                'yd': 'Yardas (yd)',
                'ft': 'Pies (ft)',
                'in': 'Pulgadas (in)'
            },
            conversions: {
                'm': 1,
                'km': 1000,
                'cm': 0.01,
                'mm': 0.001,
                'mi': 1609.344,
                'yd': 0.9144,
                'ft': 0.3048,
                'in': 0.0254
            }
        },
        weight: {
            units: {
                'kg': 'Kilogramos (kg)',
                'g': 'Gramos (g)',
                'mg': 'Miligramos (mg)',
                'lb': 'Libras (lb)',
                'oz': 'Onzas (oz)',
                't': 'Toneladas métricas (t)'
            },
            conversions: {
                'kg': 1,
                'g': 0.001,
                'mg': 0.000001,
                'lb': 0.453592,
                'oz': 0.0283495,
                't': 1000
            }
        },
        temperature: {
            units: {
                'c': 'Celsius (°C)',
                'f': 'Fahrenheit (°F)',
                'k': 'Kelvin (K)'
            },
            conversions: null
        }
    };
    
    unitType.addEventListener('change', updateUnitOptions);
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        convertUnits();
    });
    
    updateUnitOptions();
    
    function updateUnitOptions() {
        const type = unitType.value;
        const options = unitOptions[type];
        
        fromUnit.innerHTML = '';
        toUnit.innerHTML = '';
        
        Object.entries(options.units).forEach(([key, label]) => {
            const option1 = document.createElement('option');
            option1.value = key;
            option1.textContent = label;
            fromUnit.appendChild(option1);
            
            const option2 = document.createElement('option');
            option2.value = key;
            option2.textContent = label;
            toUnit.appendChild(option2);
        });
        
        if (Object.keys(options.units).length > 1) {
            toUnit.selectedIndex = 1;
        }
    }
    
    function convertUnits() {
        clearError('unit-value-error');
        clearResult('units-result');
        
        const type = unitType.value;
        const value = parseFloat(document.getElementById('unit-value').value);
        const from = fromUnit.value;
        const to = toUnit.value;
        
        if (isNaN(value)) {
            showError('unit-value-error', 'Por favor ingrese un valor válido');
            return;
        }
        
        let result;
        
        if (type === 'temperature') {
            result = convertTemperature(value, from, to);
        } else {
            const conversions = unitOptions[type].conversions;
            const fromFactor = conversions[from];
            const toFactor = conversions[to];
            
            const valueInBase = value * fromFactor;
            result = valueInBase / toFactor;
        }
        
        const formattedResult = formatResult(result);
        const formattedValue = formatResult(value);
        
        const fromLabel = unitOptions[type].units[from];
        const toLabel = unitOptions[type].units[to];
        
        showResult('units-result', `
            <strong>${formattedValue} ${fromLabel}</strong> = 
            <strong>${formattedResult} ${toLabel}</strong>
        `);
    }
    
    function convertTemperature(value, from, to) {
        let celsius;
        
        switch (from) {
            case 'c':
                celsius = value;
                break;
            case 'f':
                celsius = (value - 32) * 5 / 9;
                break;
            case 'k':
                celsius = value - 273.15;
                break;
        }
        
        switch (to) {
            case 'c':
                return celsius;
            case 'f':
                return (celsius * 9 / 5) + 32;
            case 'k':
                return celsius + 273.15;
        }
    }
    
    function formatResult(value) {
        if (Number.isInteger(value)) {
            return value.toString();
        }
        
        const absValue = Math.abs(value);
        if (absValue >= 1000000) {
            return value.toExponential(4);
        } else if (absValue >= 1000) {
            return value.toFixed(2);
        } else if (absValue >= 100) {
            return value.toFixed(3);
        } else if (absValue >= 10) {
            return value.toFixed(4);
        } else if (absValue >= 1) {
            return value.toFixed(5);
        } else if (absValue >= 0.01) {
            return value.toFixed(6);
        } else if (absValue >= 0.0001) {
            return value.toFixed(8);
        } else {
            return value.toExponential(4);
        }
    }
});
