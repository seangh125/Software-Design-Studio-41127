document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionIdentifier = urlParams.get('sessionIdentifier');

  const resultsContainer = document.querySelector('.results');
  const difficultyElement = document.getElementById('difficulty');
  const dateElement = document.getElementById('date');
  const timeElement = document.getElementById('time');

  function displayResults(resultsData) {
      difficultyElement.innerHTML = `<strong>Difficulty:</strong> ${resultsData[0].difficulty}`;
      dateElement.innerHTML = `<strong>Date:</strong> ${formatDate(resultsData[0].date)}`;
      timeElement.innerHTML = `<strong>Time:</strong> ${formatTime(resultsData[0].date)}`;

      const table = document.createElement('table');
      table.classList.add('result-table');

      const tableHeader = document.createElement('tr');
      tableHeader.innerHTML = `
          <th>Year 10 - Right Answers</th>
          <th>Year 10 - Wrong Answers</th>
          <th>Year 11 - Right Answers</th>
          <th>Year 11 - Wrong Answers</th>
          <th>Year 12 - Right Answers</th>
          <th>Year 12 - Wrong Answers</th>
      `;
      table.appendChild(tableHeader);

      resultsData.forEach(result => {
          const resultRow = document.createElement('tr');
          resultRow.innerHTML = `
              <td>${result.totalAnswers["Year 10"].rightAnswers}</td>
              <td>${result.totalAnswers["Year 10"].wrongAnswers}</td>
              <td>${result.totalAnswers["Year 11"].rightAnswers}</td>
              <td>${result.totalAnswers["Year 11"].wrongAnswers}</td>
              <td>${result.totalAnswers["Year 12"].rightAnswers}</td>
              <td>${result.totalAnswers["Year 12"].wrongAnswers}</td>
          `;
          table.appendChild(resultRow);
      });

      resultsContainer.appendChild(table);
  }

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


  fetch(`/getResults?sessionIdentifier=${sessionIdentifier}`)
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              const resultsData = data.results;
              displayResults(resultsData); 
          } else {
              console.error('Failed to fetch results:', data.message);
          }
      })
      .catch(error => {
          console.error('Error fetching results:', error);
      });
});
