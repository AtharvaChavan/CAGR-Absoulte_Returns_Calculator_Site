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
            form.absoluteReturn.value = (((fv ** years) - 1) * 100).toFixed(2);

        } else if (cagr === null && absoluteReturn !== null && years !== null) {
            const absoluteReturnDecimal = absoluteReturn / 100;
            const fv = 1 + absoluteReturnDecimal;
            form.cagr.value = (((fv ** (1 / years)) - 1) * 100).toFixed(2);

        }

        const result = {
            absoluteReturn: form.absoluteReturn.value,
            cagr: form.cagr.value,
            years: form.years.value
        };

        //// Add result to table
        //addRowToTable(result);

        //// Save result to local storage
        //previousResults.push(result);
        //localStorage.setItem('results', JSON.stringify(previousResults));
    });

    function addRowToTable(result) {
        const row = table.insertRow();
        row.insertCell().innerText = parseFloat(result.absoluteReturn).toFixed(2);
        row.insertCell().innerText = parseFloat(result.cagr).toFixed(2);
        row.insertCell().innerText = parseFloat(result.years).toFixed(2);

        // Add a cell with the Delete button
        const deleteCell = row.insertCell();
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.className = 'btn btn-danger';
        deleteButton.addEventListener('click', () => {
            // Remove this result from the previousResults array
            const resultIndex = previousResults.indexOf(result);
            if (resultIndex !== -1) {
                previousResults.splice(resultIndex, 1);
            }

            // Remove this row from the table
            row.remove();

            // Update the results in local storage
            localStorage.setItem('results', JSON.stringify(previousResults));
        });
        deleteCell.appendChild(deleteButton);
    }

    const saveButton = document.getElementById('saveButton');
    saveButton.addEventListener('click', (event) => {
        event.preventDefault();

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

});
