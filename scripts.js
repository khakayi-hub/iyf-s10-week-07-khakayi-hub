const form = document.getElementById("contact-form");
const inputs = form.querySelectorAll("input, textarea");
const successMessage = document.getElementById("success-message");

// Load saved values when page loads
inputs.forEach(input => {
    const savedValue = sessionStorage.getItem(`form_${input.name}`);
    
    if (savedValue) {
        input.value = savedValue;
    }

    // Save data while typing
    input.addEventListener("input", () => {
        sessionStorage.setItem(`form_${input.name}`, input.value);
    });
});

// Handle form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Clear saved session data
    inputs.forEach(input => {
        sessionStorage.removeItem(`form_${input.name}`);
    });

    // Reset form
    form.reset();

    successMessage.textContent = "Form submitted successfully!";
});