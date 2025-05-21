import { updateQueryStringParameter } from './utils.js'

// Функція генерує пагінацію у вигляді елементів <li> всередині <ul class="pagination">
// При кліку по посиланню викликається loadReviews(targetPage)
export function generatePaginationLinks(data, currentPage) {
  var paginationUl = document.querySelector('ul.pagination');
  paginationUl.innerHTML = '';

  // Обчислюємо останню сторінку виходячи з загальної кількості записів і розміру сторінки
  var lastPage = Math.ceil(data.count / PAGE_SIZE);

  // Отримуємо поточний номер сторінки та перевіряємо його валідність
  var currentPageInt = parseInt(currentPage, 10);
  if (isNaN(currentPageInt) || currentPageInt < 1) {
      currentPageInt = 1;
  }
  if (currentPageInt > lastPage) {
      currentPageInt = lastPage;
  }

  // Оновлюємо URL, якщо параметр page не відповідає скоректованому номеру
  var newUrl = updateQueryStringParameter(window.location.href, 'page', currentPageInt);
  if (window.location.href !== newUrl) {
      window.history.replaceState({}, '', newUrl);
  }

  // Допоміжна функція для створення елемента пагінації
  function createPageItem(label, targetPage, additionalClasses = '') {
      var li = document.createElement('li');
      li.className = 'page-item ' + additionalClasses;
      var a = document.createElement('a');
      a.className = 'page-link';
      a.textContent = label;
      // Формуємо посилання зі скоректованим параметром page
      a.href = updateQueryStringParameter(window.location.href, 'page', targetPage);
      // Записуємо цільову сторінку в data-атрибут
      a.dataset.page = targetPage;
      // Обробник кліка: перехоплюємо дію і викликаємо loadReviews
      a.addEventListener('click', function(e) {
          e.preventDefault();
          console.log('Натиснуто кнопку для сторінки:', targetPage);
          window.loadReviews(targetPage);
      });
      li.appendChild(a);
      return li;
  }

  // Посилання на першу сторінку додається, якщо поточна сторінка більше 1
  if (currentPageInt > 1) {
      paginationUl.appendChild(createPageItem('1', 1));
  }

  // Кнопка "Попередня" – додається, якщо існує посилання на попередню сторінку
  if (data.previous) {
      paginationUl.appendChild(createPageItem('Попередня', currentPageInt - 1));
  }

  // Активне посилання на поточну сторінку
  var liCurrent = document.createElement('li');
  liCurrent.className = 'page-item active';
  var aCurrent = document.createElement('a');
  aCurrent.className = 'page-link';
  aCurrent.textContent = currentPageInt;
  aCurrent.href = updateQueryStringParameter(window.location.href, 'page', currentPageInt);
  aCurrent.dataset.page = currentPageInt;
  aCurrent.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Натиснуто активну сторінку:', currentPageInt);
      window.loadReviews(currentPageInt);
  });
  liCurrent.appendChild(aCurrent);
  paginationUl.appendChild(liCurrent);

  // Кнопка "Наступна" – додається, якщо існує посилання на наступну сторінку
  if (data.next) {
      paginationUl.appendChild(createPageItem('Наступна', currentPageInt + 1));
  }

  // Посилання на останню сторінку додається, якщо поточна сторінка менша за останню
  if (currentPageInt < lastPage) {
      paginationUl.appendChild(createPageItem(lastPage, lastPage));
  }
}
