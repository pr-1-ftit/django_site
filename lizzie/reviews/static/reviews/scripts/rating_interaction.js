// rating_interaction.js

/**
 * Ініціалізує інтерактивний рейтинг.
 * Додає обробники подій до зірок рейтингу у контейнері з id "add-rating"
 * та встановлює значення рейтингу у приховане поле з id "rating".
 */
export function initializeRating() {
    const ratingStarsContainer = document.getElementById("add-rating");
    if (!ratingStarsContainer) return; // Якщо контейнер не знайдено, виходимо
  
    const interactiveStars = ratingStarsContainer.querySelectorAll(".star");
    const ratingInput = document.getElementById("rating");
    if (!ratingInput) return;
  
    interactiveStars.forEach((star, index) => {
      star.addEventListener("click", () => {
        const value = star.getAttribute("data-value");
        ratingInput.value = value;
        interactiveStars.forEach(s => s.classList.remove("active"));
        for (let i = 0; i <= index; i++) {
          interactiveStars[i].classList.add("active");
        }
      });
  
      star.addEventListener("mouseover", () => {
        interactiveStars.forEach(s => s.classList.remove("hovered"));
        for (let i = 0; i <= index; i++) {
          interactiveStars[i].classList.add("hovered");
        }
      });
  
      star.addEventListener("mouseout", () => {
        interactiveStars.forEach(s => s.classList.remove("hovered"));
      });
    });
  }
  
  // Запускаємо ініціалізацію рейтингу одразу після завантаження сторінки,
  // щоб, якщо форма вже присутня inline, зірки отримали відповідні обробники.
  document.addEventListener("DOMContentLoaded", () => {
    initializeRating();
  });
  