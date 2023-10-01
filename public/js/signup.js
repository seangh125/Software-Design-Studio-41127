document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signupForm");
    const submitButton = document.getElementById("submitButton");

    submitButton.addEventListener("click", function () {
        const formData = new FormData(form);

        fetch("http://localhost:3000/registerUser", {
            method: "POST",
            body: formData,
        })
        .then(response => response.json())
        .catch(error => {
            console.error("Error:", error);
        });
    });
});