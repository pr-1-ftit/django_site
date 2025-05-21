/**
 * Функція для видалення відгуку без перезавантаження сторінки.
 * Після успішного видалення перезавантажується список відгуків,
 * використовуючи window.currentPage, який встановлюється при завантаженні.
 *
 * @param {number|string} reviewId - Ідентифікатор відгуку.
 * @param {HTMLElement} reviewElement - DOM-елемент відгуку (опціонально – якщо хочемо
 *                                      спочатку видалити елемент із браузера).
 */
export function deleteReview(reviewId, reviewElement) {
    const url = `/api/v1/reviews/${reviewId}/`;
    console.log("Видалення відгуку за URL:", url);
  
    fetch(url, {
      method: 'DELETE',
      credentials: 'same-origin'  // Куки автоматично передаються
    })
    .then(response => {
      if (response.status === 204) {
        console.log("Відгук успішно видалено.");
        // Оновлюємо список відгуків, використовуючи збережену поточну сторінку
        if (typeof window.loadReviews === 'function' && window.currentPage) {
          window.loadReviews(window.currentPage);
        }
      } else {
        return response.json();
      }
    })
    .then(data => {
      if (data && data.error) {
        alert(data.error);
      }
    })
    .catch(err => {
      console.error('Помилка при видаленні відгуку:', err);
      alert('Виникла помилка при видаленні відгуку.');
    });
  }
  