document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#reviewForm");
    const usernameError = document.querySelector("#username-error");
    const feedbackError = document.querySelector("#feedback-error");
    const ratingError = document.querySelector("#rating-error");
    const ratingInput = document.getElementById("rating");

    form.addEventListener("submit", (event) => {
        const username = document.querySelector("#username").value.trim();
        const feedback = document.querySelector("#feedback").value.trim();
        const rating = ratingInput.value;

        let hasError = false;

        if (!username) {
            usernameError.innerHTML = "Ім'я не заповнене";
            hasError = true;
        } else {
            usernameError.innerHTML = "";
        }

        if (!feedback) {
            feedbackError.innerHTML = "Відгук не заповнений";
            hasError = true;
        } else {
            feedbackError.innerHTML = "";
        }

        if (!rating) {
            ratingError.innerHTML = "Рейтинг не вибрано";
            hasError = true;
        } else {
            ratingError.innerHTML = "";
        }

        if (hasError) {
            event.preventDefault(); // Зупиняє відправку форми
        }
    });
});
