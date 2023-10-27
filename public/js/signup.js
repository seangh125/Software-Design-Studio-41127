document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signupForm");
  const submitButton = document.getElementById("submitButton");
  const emailError = document.getElementById("email-error");
  const generalError = document.getElementById("general-error");

  submitButton.addEventListener("click", function () {
      emailError.textContent = "";
      generalError.textContent = "";

      const formData = new FormData(form);
      const formDataObject = {};
      formData.forEach((value, key) => {
          formDataObject[key] = value;
      });

      fetch("/registerUser", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataObject),
      })
      .then((response) => response.json())
      .then((data) => {
          if (data.error) {
              if (data.error === 'Email is already in use') {
                  emailError.textContent = data.error;
              } else if (data.error === 'All fields are required') {
                  generalError.textContent = data.error;
              }
          } else {
              window.location.href = '/';
          }
      })
      .catch((error) => {
          console.error("Error:", error);
      });
  });
});
