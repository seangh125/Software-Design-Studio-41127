// Sample results data
const resultsData = [
    {
      id: 1,
      title: 'Presentation 1',
      date: '2023-09-15',
      presenter: 'John Doe',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 2,
      title: 'Presentation 2',
      date: '2023-09-20',
      presenter: 'Jane Smith',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: 3,
      title: 'Presentation 3',
      date: '2023-09-25',
      presenter: 'Bob Johnson',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    // Add more result objects as needed
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
        <h2>${result.title}</h2>
        <p><strong>Date:</strong> ${result.date}</p>
        <p><strong>Presenter:</strong> ${result.presenter}</p>
        <p><strong>Description:</strong> ${result.description}</p>
      `;
  
      resultsContainer.appendChild(resultElement);

    });
  }
  
  // Call the displayResults function to populate the page with data
  displayResults();
  