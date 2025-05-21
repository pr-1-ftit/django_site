/**
 * Підвантажує HTML-код форми у відповідний контейнер залежно від режиму відображення.
 *
 * @param {string} htmlContent - HTML-код форми, що повертається із серверу.
 * @param {boolean} [useModal=true] - Якщо true, вставляє контент у модальний контейнер (з модальними стилями).
 *                                    Якщо false – вставляє контент inline (без модальних класів).
 * @returns {HTMLElement} - Елемент, в який було вставлено форму.
 */
export function openModalWithForm(htmlContent, useModal = true) {
  if (useModal) {
    // Режим модального вікна: використовуємо контейнер з id "modal"
    let modal = document.getElementById('modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'modal';
      // Класи для модального overlay задаються через зовнішній CSS (наприклад, "modal-overlay" та "active")
      modal.classList.add('modal-overlay');
      document.body.appendChild(modal);
    }
    
    // Обгортка для контенту модального вікна
    modal.innerHTML = `<div class="modal-content">${htmlContent}</div>`;
    
    modal.style.display = 'flex';
    setTimeout(() => {
      modal.classList.add('active');
    }, 10);
    
    // Закриваємо модальне вікно при кліку поза межами контенту
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
    
    return modal;
  } else {
    // Inline режим: просто вставляємо контент в контейнер без модальних CSS‑стилів
    let inlineContainer = document.getElementById('inline-form');
    if (!inlineContainer) {
      inlineContainer = document.createElement('div');
      inlineContainer.id = 'inline-form';
      document.body.appendChild(inlineContainer);
    }
    
    inlineContainer.innerHTML = htmlContent;
    return inlineContainer;
  }
}

/**
 * Закриває модальне вікно, працюючи лише з контейнером із id "modal".
 */
export function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) {
    modal.classList.remove('active');
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  }
}
