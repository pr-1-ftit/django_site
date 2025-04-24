document.addEventListener("DOMContentLoaded", () => {
    // Вибираємо лише зірки всередині div з id "add-rating"
    const ratingStarsContainer = document.getElementById("add-rating");
    const interactiveStars = ratingStarsContainer.querySelectorAll(".star");
    const ratingInput = document.getElementById("rating");

    interactiveStars.forEach((star, index) => {
        star.addEventListener("click", () => {
            const value = star.getAttribute("data-value");
            ratingInput.value = value;

            // При кліку знімаємо клас active для всіх зірок та встановлюємо для вибраних
            interactiveStars.forEach(s => s.classList.remove("active"));
            for (let i = 0; i <= index; i++) {
                interactiveStars[i].classList.add("active");
            }
        });

        star.addEventListener("mouseover", () => {
            // При наведенні спочатку видаляємо клас hovered з усіх
            interactiveStars.forEach(s => s.classList.remove("hovered"));
            for (let i = 0; i <= index; i++) {
                interactiveStars[i].classList.add("hovered");
            }
        });

        star.addEventListener("mouseout", () => {
            interactiveStars.forEach(s => s.classList.remove("hovered"));
        });
    });
});
