import { openModalWithForm, closeModal } from './modal.js';
import { getCookie } from './utils.js';

import { initializeRating } from './rating_interaction.js';
import { clearErrorMessages, resetFormAndStars } from './clearForm.js';

/**
 * Визначає режим відображення форми.
 * Якщо знайдено елемент з id "review-form-container" або "inline-form" – inline режим.
 * Інакше – повертається modal режим.
 *
 * @returns {{ type: string, container?: HTMLElement }}
 */
function determineReviewFormType() {
  const inlineContainer = document.getElementById("review-form-container") ||
                          document.getElementById("inline-form");
  if (inlineContainer) {
    return { type: "inline", container: inlineContainer };
  }
  return { type: "modal" };
}

/**
 * Допоміжна функція для скидання форми:
 * очищає значення полів та переводить її в режим "create".
 */
function clearReviewForm() {
  const reviewForm = document.getElementById("reviewForm");
  if (reviewForm) {
    reviewForm.reset();
    reviewForm.dataset.mode = "create"; // після оновлення повертаємо режим створення
  }
}



/**
 * Функція оновлення відгуку.
 * Завантажуємо форму в залежності від того, чи використовується inline- чи modal режим.
 *
 * @param {Object} review - Об'єкт відгуку з полями id, name, text, rating.
 */
export function updateReview(review) {
  const formType = determineReviewFormType();

  if (formType.type === "inline") {
    // Inline режим: перевіряємо, чи вже існує форма в контейнері.
    let form = formType.container.querySelector("form");
    if (!form) {
      // Якщо форми немає, завантажуємо її HTML-код inline (без модальних класів)
      fetch('/reviews_add/')
        .then(response => response.text())
        .then(html => {
          // Використовуємо openModalWithForm з прапорцем false для inline режиму
          openModalWithForm(html, false);
          form = formType.container.querySelector("form");
          if (form) {
            configureForm(form, review);
          }
        })
        .catch(error => console.error('Помилка завантаження форми:', error));
    } else {
      configureForm(form, review);
    }
    formType.container.scrollIntoView({ behavior: "smooth" });
  } else {
    // Modal режим: завантажуємо HTML-код форми та відкриваємо модальне вікно
    fetch('/reviews_add/')
      .then(response => response.text())
      .then(html => {
        const modalContainer = openModalWithForm(html, true);
        const form = modalContainer.querySelector("form");
        if (form) {
          configureForm(form, review);
        }
      })
      .catch(error => console.error('Помилка завантаження форми:', error));
  }
}

/**
 * Налаштовує форму: заповнює поля, очищує повідомлення про помилки,
 * встановлює обробник сабміту та інші потрібні налаштування.
 *
 * @param {HTMLFormElement} form - Елемент форми.
 * @param {Object} review - Об'єкт відгуку з полями id, name, text, rating.
 */
function configureForm(form, review) {
  form.dataset.mode = "update";

  // Заповнюємо поля форми.
  if (form.elements['id']) form.elements['id'].value = review.id;
  if (form.elements['name']) form.elements['name'].value = review.name;
  if (form.elements['text']) form.elements['text'].value = review.text;
  if (form.elements['rating']) form.elements['rating'].value = review.rating;

  // Очищуємо повідомлення про помилки.
  const nameError = form.querySelector("#name-error");
  const textError = form.querySelector("#text-error");
  const ratingError = form.querySelector("#rating-error");
  if (nameError) nameError.textContent = "";
  if (textError) textError.textContent = "";
  if (ratingError) ratingError.textContent = "";

  // Оновлюємо відображення зірок рейтингу.
  const stars = form.querySelectorAll('.stars-container .star');
  stars.forEach(star => {
    const starValue = parseInt(star.getAttribute('data-value'));
    if (starValue <= review.rating) {
      star.classList.add('active');
    } else {
      star.classList.remove('active');
    }
  });

  // Якщо є потреба, ініціалізуємо логіку рейтингу
  if (typeof initializeRating === "function") {
    initializeRating();
  }

  // Встановлюємо action для PUT запиту.
  form.action = `/reviews/update/${review.id}/`;

  // Призначаємо оновлюючий обробник сабміту.
  form.onsubmit = function(e) {
    e.preventDefault();

    // Оновлюємо повідомлення про помилки перед відправкою.
    if (nameError) nameError.textContent = "";
    if (textError) textError.textContent = "";
    if (ratingError) ratingError.textContent = "";

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => { data[key] = value; });

    fetch(`/api/v1/reviews/${review.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken')
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errData => {
            if (errData.name && nameError) {
              nameError.innerHTML = errData.name.join("<br>");
            }
            if (errData.text && textError) {
              textError.innerHTML = errData.text.join("<br>");
            }
            if (errData.rating && ratingError) {
              ratingError.innerHTML = errData.rating.join("<br>");
            }
            throw new Error("Validation errors");
          });
        }
        return response.json();
      })
      .then(updatedReview => {
        console.log('Оновлено відгук:', updatedReview);
        // Якщо використовується модальний режим — закриваємо модальне вікно
        if (document.getElementById('modal')) {
          closeModal();
        }
        // Оновлюємо список відгуків (функція loadReviews має бути глобальною)
        window.loadReviews(window.currentPage);

        // Видаляємо (скидаємо) оновлюючий обробник сабміту, щоб наступного разу використовувався create‑логіка
        form.onsubmit = null;
        // Очищуємо форму та переводимо її в режим "create"
        clearReviewForm();
        resetFormAndStars();
        clearErrorMessages();
      })
      .catch(error => {
        console.error(error);
      });
  }
}
