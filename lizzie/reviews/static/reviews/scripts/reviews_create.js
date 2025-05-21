import { getCookie } from './utils.js';
import { clearErrorMessages, resetFormAndStars } from './clearForm.js';

document.addEventListener('DOMContentLoaded', () => {
  // Обробка форми створення відгуку
  const reviewForm = document.getElementById("reviewForm");
  if (reviewForm) {
    // За замовчуванням встановлюємо режим створення
    reviewForm.dataset.mode = "create";
    reviewForm.addEventListener("submit", function (event) {
      event.preventDefault();
      // Якщо форма знаходиться у режимі оновлення, не виконуємо логіку створення
      if (reviewForm.dataset.mode === "update") return;
      
      // Очищення повідомлень про помилки через окрему функцію
      clearErrorMessages();
      
      const formData = new FormData(reviewForm);
      
      // AJAX-запит для створення відгуку (POST)
      fetch("/api/v1/reviews/", {
        method: "POST",
        body: formData,
        headers: {
          "X-CSRFToken": getCookie("csrftoken")
        }
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(data => {
            if (data.name) {
              document.getElementById("name-error").innerHTML = data.name.join("<br>");
            }
            if (data.text) {
              document.getElementById("text-error").innerHTML = data.text.join("<br>");
            }
            if (data.rating) {
              document.getElementById("rating-error").innerHTML = data.rating.join("<br>");
            }
            throw new Error("Validation errors");
          });
        }
        return response.json();
      })
      .then(data => {
        // Успішне створення: скидання форми та очищення елементів рейтингу
        resetFormAndStars();
        
        if (typeof window.loadReviews === "function") {
          window.loadReviews(1);
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
    });
  }

  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get('page') || 1;
  window.loadReviews(page);
});
