// Sample results data
const resultsData = [
    {
      id: 1,
      name: 'jack',
      surname: 'smith',
      date: '2023-09-15',
      level: 'Highschool graduate',
      point: '20',
    }
  ];
  
  // Function to display results
  function displayResults() {
    const resultsContainer = document.querySelector('.results');
  
    // Clear any existing content
    resultsContainer.innerHTML = '';
  
    // Loop through the results data and create HTML elements to display each result
    resultsData.forEach(result => {
      const resultElement = document.createElement('div');
      resultElement.classList.add('result');
  
      resultElement.innerHTML = `
        <p><strong>Date:</strong> ${result.date}</p>
        <p><strong>Name:</strong> ${result.name} ${result.surname}</p>
        <p><strong>Level:</strong> ${result.level}</p>
        <p><strong>Points:</strong> ${result.point}</p>
      `;
      resultsContainer.appendChild(resultElement);

    });
  }
  
  // Call the displayResults function to populate the page with data
  displayResults();
  