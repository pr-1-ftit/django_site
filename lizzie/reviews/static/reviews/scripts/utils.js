// utils.js
/**
 * Функція для оновлення або додавання query-параметра в URL.
 *
 * @param {string} uri - поточний URL
 * @param {string} key - назва параметра
 * @param {string|number} value - значення параметра
 * @returns {string} - оновлений URL
 */
export function updateQueryStringParameter(uri, key, value) {
  const re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  const separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  } else {
    return uri + separator + key + "=" + value;
  }
}
  
  /**
   * Видаляє query-параметр з URL.
   * @param {string} uri - базовий URL
   * @param {string} key - ключ параметра для видалення
   * @returns {string} оновлений URL
   */
  export function removeQueryStringParameter(uri, key) {
    const re = new RegExp("([?&])" + key + "=[^&]*(&?)", "i");
    uri = uri.replace(re, (match, p1, p2) => p1 === '?' ? p1 : (p2 ? p1 : ''));
    uri = uri.replace(/[?&]$/, '');
    return uri;
  }
  
  /**
   * Отримує значення cookie по заданому імені. Корисно для CSRF у Django.
   * @param {string} name - ключ cookie
   * @returns {string} значення cookie
   */
  export function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  