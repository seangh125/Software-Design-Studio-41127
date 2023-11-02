document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionIdentifier = urlParams.get('sessionIdentifier');

  const difficultyElement = document.getElementById('difficulty');
  const timeElement = document.getElementById('time');
  const resultTable = document.querySelector('.result-table tbody');

  function displayResults(resultsData) {
      difficultyElement.textContent = `Difficulty: ${resultsData[0].difficulty}`;
      timeElement.textContent = `Time: ${formatDateTime(resultsData[0].date)}`;

      const yearLevels = ['Year 10', 'Year 11', 'Year 12'];

      yearLevels.forEach(level => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${resultsData[0].difficulty}</td>
              <td>${resultsData[0].totalAnswers[level].wrongAnswers}</td>
              <td>${resultsData[0].totalAnswers[level].rightAnswers}</td>
          `;
          resultTable.appendChild(row);
      });
  }

  function formatDateTime(dateString) {
      const date = new Date(dateString);
      const formattedDate = date.toLocaleDateString();
      const formattedTime = date.toLocaleTimeString();
      return `${formattedDate} ${formattedTime}`;
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

