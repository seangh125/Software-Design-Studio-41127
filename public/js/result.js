document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionIdentifier = urlParams.get('sessionIdentifier');

  const resultsContainer = document.querySelector('.results');

  // Function to display results based on the data fetched from the server
  function displayResults(resultsData) {
    resultsContainer.innerHTML = ''; // Clear existing content
    resultsData.forEach(result => {
      const resultElement = document.createElement('div');
      resultElement.classList.add('result');

      resultElement.innerHTML = `
        <p><strong>Date:</strong> ${result.date}</p>
        <p><strong>Difficulty:</strong> ${result.difficulty}</p>
      `;
      resultsContainer.appendChild(resultElement);
    });
  }

  // Make an API request to fetch results based on the session identifier
  fetch(`/getResults?sessionIdentifier=${sessionIdentifier}`)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        const resultsData = data.results;
        displayResults(resultsData); // Populate the page with fetched data
      } else {
        console.error('Failed to fetch results:', data.message);
        // Handle the error case
      }
    })
    .catch(error => {
      console.error('Error fetching results:', error);
      // Handle the error case
    });
});
