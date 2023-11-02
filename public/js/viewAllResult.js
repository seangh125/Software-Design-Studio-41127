document.addEventListener('DOMContentLoaded', () => {
    // Fetch the results data from the server
    fetch('/viewAllResult')
        .then(response => response.json())
        .then(data => {
            const results = data.results;
            const resultsContainer = document.querySelector('.results-container');

            results.forEach((result, index) => {
                // Create a result entry
                const resultEntry = document.createElement('div');
                resultEntry.classList.add('result-entry');

                // Populate the HTML page with the result data
                resultEntry.innerHTML += `
                    <div class="result-info">
                        <p class="result-info-text"><strong>Difficulty:</strong> ${result.difficulty}</p>
                        <p class="result-info-text"><strong>Date:</strong> ${formatDate(result.date)}</p>
                        <p class="result-info-text"><strong>Time:</strong> ${formatTime(result.date)}</p>
                    </div>
                    <table class="result-table">
                        <thead>
                            <tr>
                                <th>Year</th>
                                <th>Right Answers</th>
                                <th>Wrong Answers</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Year 10</td>
                                <td>${result.totalAnswers["Year 10"].rightAnswers}</td>
                                <td>${result.totalAnswers["Year 10"].wrongAnswers}</td>
                            </tr>
                            <tr>
                                <td>Year 11</td>
                                <td>${result.totalAnswers["Year 11"].rightAnswers}</td>
                                <td>${result.totalAnswers["Year 11"].wrongAnswers}</td>
                            </tr>
                            <tr>
                                <td>Year 12</td>
                                <td>${result.totalAnswers["Year 12"].rightAnswers}</td>
                                <td>${result.totalAnswers["Year 12"].wrongAnswers}</td>
                            </tr>
                        </tbody>
                    </table>
                `;

                // Create a horizontal line (separator)
                const separator = document.createElement('hr');
                separator.classList.add('result-separator');

                // Append the separator and result entry to the results container
                resultsContainer.appendChild(separator);
                resultsContainer.appendChild(resultEntry);
            });
        })
        .catch(error => {
            console.error(error);
        });
});

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function formatTime(dateString) {
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    return new Date(dateString).toLocaleTimeString(undefined, options);
}
