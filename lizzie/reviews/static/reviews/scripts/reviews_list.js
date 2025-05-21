// reviews.js

import { updateQueryStringParameter, removeQueryStringParameter } from './utils.js';
import { deleteReview } from './review_delete.js';
import './reviews_create.js';
import {updateReview} from './reviews_update.js';
import { generatePaginationLinks } from './pagination.js'




/**
 * Завантажує список відгуків через API, генерує HTML для кожного відгуку,
 * оновлює URL і (якщо PAGINATION_ENABLED === true) генерує пагінацію.
 * @param {number|string} page - номер сторінки для завантаження
 */
window.loadReviews = function(page) {
  window.currentPage = page;
  
  const reviewsContainer = document.getElementById('reviews-content');
  if (!reviewsContainer) {
    console.error("Контейнер з id 'reviews-content' не знайдено.");
    return;
  }
  
  const apiUrl = `/api/v1/reviews/?page=${page}&page_size=${PAGE_SIZE}`;
  console.log('Завантаження відгуків для сторінки:', page, 'PAGE_SIZE:', PAGE_SIZE);

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      reviewsContainer.innerHTML = '';

      if (data.results && data.results.length > 0) {
        data.results.forEach(review => {
          const reviewItem = document.createElement('div');
          reviewItem.className = 'review-item';

          // Інформація користувача
          const userInfo = document.createElement('div');
          userInfo.className = 'user-info';
          const nameHeader = document.createElement('h5');
          nameHeader.textContent = review.name;
          userInfo.appendChild(nameHeader);
          reviewItem.appendChild(userInfo);

          // Аватар (перший символ імені)
          const avatar = document.createElement('div');
          avatar.className = 'avatar';
          avatar.style.backgroundColor = review.avatar_color || '#999';
          avatar.textContent = review.name.charAt(0).toUpperCase();
          reviewItem.appendChild(avatar);

          // Текст відгуку
          const feedbackContainer = document.createElement('div');
          feedbackContainer.className = 'feedback-container';
          const para = document.createElement('p');
          para.textContent = review.text;
          feedbackContainer.appendChild(para);
          reviewItem.appendChild(feedbackContainer);

          // Рейтинг відгуку (зірки)
          const ratingContainer = document.createElement('div');
          ratingContainer.className = 'rating-container-view';
          const rating = parseInt(review.rating);
          for (let i = 0; i < rating; i++) {
            const star = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            star.setAttribute('class', 'star star_list active');
            star.setAttribute('width', '24');
            star.setAttribute('height', '24');
            star.setAttribute('viewBox', '0 0 24 24');
            const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            polygon.setAttribute('points', '12,17.27 18.18,21 16.54,13.97 22,9.24 14.81,8.63 12,2 9.19,8.63 2,9.24 7.46,13.97 5.82,21');
            star.appendChild(polygon);
            ratingContainer.appendChild(star);
          }
          for (let i = rating; i < 5; i++) {
            const star = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            star.setAttribute('class', 'star star_list');
            star.setAttribute('width', '24');
            star.setAttribute('height', '24');
            star.setAttribute('viewBox', '0 0 24 24');
            const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            polygon.setAttribute('points', '12,17.27 18.18,21 16.54,13.97 22,9.24 14.81,8.63 12,2 9.19,8.63 2,9.24 7.46,13.97 5.82,21');
            star.appendChild(polygon);
            ratingContainer.appendChild(star);
          }
          reviewItem.appendChild(ratingContainer);

const createdAtContainer = document.createElement('div');
createdAtContainer.className = 'updated';

// Визначаємо текст статусу відгуку
const statusText = review.was_updated ? '(оновлено)' : '';

// Отримуємо дату (для прикладу використовуємо review.updated)
// Якщо потрібно виводити дату створення в непомінь даного статусу, можна змінити на review.created_at
const date = new Date(review.updated);
const day = ("0" + date.getDate()).slice(-2);
const month = ("0" + (date.getMonth() + 1)).slice(-2);
const hours = ("0" + date.getHours()).slice(-2);
const minutes = ("0" + date.getMinutes()).slice(-2);

// Формуємо фінальний текст
createdAtContainer.textContent = `${day}.${month}, ${hours}:${minutes} ${statusText}`;

reviewItem.appendChild(createdAtContainer);




          // Якщо користувачу дозволено, додаємо кнопки видалення та оновлення
// Якщо користувачу дозволено, додаємо кнопки видалення та оновлення
if (review.can_delete) {
  // Створюємо контейнер для кнопок
  const buttonContainer = document.createElement('div');
  buttonContainer.className = "button-container";
  // Створюємо кнопку оновлення
  const updateButton = document.createElement('button');
  updateButton.className = "update-review-btn";
  updateButton.addEventListener('click', () => {
    console.log("Натиснута кнопка оновлення для відгуку id:", review.id);
    updateReview(review);
  });
  buttonContainer.appendChild(updateButton);

  // Створюємо кнопку видалення
  const deleteButton = document.createElement('button');
  deleteButton.className = "delete-review-btn";
  deleteButton.addEventListener('click', () => {
    console.log("Натиснута кнопка видалення для відгуку id:", review.id);
    deleteReview(review.id, reviewItem);
  });
  buttonContainer.appendChild(deleteButton);


  // Додаємо контейнер з кнопками до елемента відгуку
  reviewItem.appendChild(buttonContainer);
}

reviewsContainer.appendChild(reviewItem);

        });
      } else {
        reviewsContainer.innerHTML = '<p class="no-reviews">Відгуків поки що немає.</p>';
      }
      
      // Оновлюємо URL залежно від налаштувань PAGINATION_ENABLED
      if (typeof PAGINATION_ENABLED === 'undefined' || PAGINATION_ENABLED) {
        history.pushState({ page: page }, null, updateQueryStringParameter(window.location.href, 'page', page));
      } else {
        history.replaceState({ page: page }, null, removeQueryStringParameter(window.location.href, 'page'));
      }
      
      // Генеруємо пагінацію, якщо PAGINATION_ENABLED === true
      if (PAGINATION_ENABLED) {
        generatePaginationLinks(data, page);
      }
    })
    .catch(error => {
      console.error('Помилка завантаження відгуків:', error);
      reviewsContainer.innerHTML = '<p class="no-reviews">Помилка завантаження відгуків.</p>';
    });
};






window.addEventListener('popstate', (e) => {
  if (e.state && e.state.page) {
    window.loadReviews(e.state.page);
  }
});
