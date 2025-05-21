// clearForm.js

/**
 * Очищує повідомлення про помилки на формі.
 */
export function clearErrorMessages() {
  const errorIds = ["name-error", "text-error", "rating-error"];
  errorIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = "";
    }
  });
}

/**
 * Скидає форму відгуку та очищає вибір рейтингових зірок.
 */
export function resetFormAndStars() {
  const reviewForm = document.getElementById("reviewForm");
  if (reviewForm) {
    reviewForm.reset();
  }

  const ratingStarsContainer = document.getElementById("add-rating");
  if (ratingStarsContainer) {
    const stars = ratingStarsContainer.querySelectorAll(".star");
    stars.forEach(star => {
      star.classList.remove("active", "hovered");
    });
  }
}
