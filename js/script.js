// Sample results data
const resultsData = [
    {
      id: 1,
      Subject: 'Algebra',
      Date: getCurrentDate(),
      Time: getCurrentTime(), 
      Name: 'John Doe',
      Mark: '85',
      Description: 'Pull Generic Description based on students marks',
    },
    {
      id: 2,
      Subject: 'Geometry',
      Date: getCurrentDate(),
      Time: getCurrentTime(),
      Name: 'Jane Smith',
      Mark: '68',
      Description: 'Pull Generic Description based on students marks',
    },
    {
      id: 3,
      Subject: 'Calculus',
      Date: getCurrentDate(),
      Time: getCurrentTime(),
      Name: 'Bob Johnson',
      Mark: '59',
      Description: 'Pull Generic Description based on students marks',
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
        <h2>${result.Subject}</h2>
        <p><strong>Date:</strong> ${result.Date}</p>
        <p><strong>Time:</strong> ${result.Time}</p>
        <p><strong>Presenter:</strong> ${result.Name}</p>
        <p><strong>Mark:</strong> ${result.Mark}</p>
        <p><strong>Description:</strong> ${result.Description}</p>
      `;
  
      resultsContainer.appendChild(resultElement);
    });
  }
  // Function to display current time.
  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  // Function to get the current date.
  function getCurrentDate(){
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1);
    const day = now.getDate().toString();
    return `${day}-${month}-${year}`;
  }

  //function to get the users mark.
  function getMark(){

  }

  function redirectToFeedbackPage(){
    window.location.href = 'feedbackPage.html';
  }
  
  // Call the displayResults function to populate the page with data
  displayResults();
  
