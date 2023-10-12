document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signupForm");
    const submitButton = document.getElementById("submitButton");
  
    submitButton.addEventListener("click", function () {
      console.log('Firstname:', firstname);
      // Convert the FormData object to a plain JavaScript object
      const formDataObject = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });
  
      // Send the data as JSON
      fetch("/registerUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(formDataObject), 
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response data
          console.log("Response:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  });
