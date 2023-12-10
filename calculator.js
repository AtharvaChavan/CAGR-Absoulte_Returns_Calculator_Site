document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('calculatorForm');
    const table = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];

    // Load previous results from local storage
    const previousResults = JSON.parse(localStorage.getItem('results')) || [];
    previousResults.forEach(result => {
        addRowToTable(result);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const absoluteReturn = parseFloat(form.absoluteReturn.value) || null;
        const cagr = parseFloat(form.cagr.value) || null;
        const years = parseFloat(form.years.value) || null;

        if (absoluteReturn === null && cagr !== null && years !== null) {
            const absoluteReturnDecimal = cagr / 100;
            const fv = 1 + absoluteReturnDecimal;
            form.absoluteReturn.value = ((fv ** years) - 1) * 100;
        } else if (cagr === null && absoluteReturn !== null && years !== null) {
            const absoluteReturnDecimal = absoluteReturn / 100;
            const fv = 1 + absoluteReturnDecimal;
            form.cagr.value = ((fv ** (1/years)) - 1) * 100;
        }

        const result = {
            absoluteReturn: form.absoluteReturn.value,
            cagr: form.cagr.value,
            years: form.years.value
        };

        // Add result to table
        addRowToTable(result);

        // Save result to local storage
        previousResults.push(result);
        localStorage.setItem('results', JSON.stringify(previousResults));
    });

    function addRowToTable(result) {
        const row = table.insertRow();
        row.insertCell().innerText = result.absoluteReturn;
        row.insertCell().innerText = result.cagr;
        row.insertCell().innerText = result.years;
    }
});
