
document.addEventListener("DOMContentLoaded", function () {
    // Елементи для лівого меню
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileMenuLeft = document.getElementById("mobileMenuLeft");
    const closeButtonLeft = document.querySelector('#mobileMenuLeft .close-btn');
  
    // Елементи для правого меню
    const ellipseButton = document.querySelector('.ellipse-1');
    const mobileMenuRight = document.getElementById("mobileMenuRight");
    const closeButtonRight = document.querySelector('#mobileMenuRight .close-btn');
  
    // Додаємо накладення для фону
    const pageOverlay = document.createElement('div');
    pageOverlay.className = 'page-overlay';
    document.body.appendChild(pageOverlay);
  
    // Клонуємо елементи для лівого мобільного меню
    const navItemsLeft = document.querySelector('.desktop-nav .nav-items-left');
    const navLeftClone = navItemsLeft.cloneNode(true);
    mobileMenuLeft.appendChild(navLeftClone);
  
    // Клонуємо елементи для правого мобільного меню
    const navItemsRight = document.querySelector('.desktop-nav .nav-items-right');
    const navRightClone = navItemsRight.cloneNode(true);
    mobileMenuRight.appendChild(navRightClone);
  
    // Видаляємо елемент "UA" з правого меню
    const langBtnElement = navRightClone.querySelector('#lang-btn');
    if (langBtnElement) {
      langBtnElement.remove();
    }
  
    // Видаляємо кнопку ellipse з правого меню
    const ellipseElement = navRightClone.querySelector('.ellipse-1');
    if (ellipseElement) {
      ellipseElement.remove();
    }
  
    // Відкриття лівого меню
    hamburgerMenu.addEventListener('click', function (event) {
      event.stopPropagation();
      mobileMenuLeft.classList.add("open");
      mobileMenuRight.classList.remove("open");
      pageOverlay.classList.add("active");
      document.body.classList.add("no-scroll");
    });
  
    // Відкриття правого меню
    ellipseButton.addEventListener('click', function (event) {
      event.stopPropagation();
      mobileMenuRight.classList.add("open");
      mobileMenuLeft.classList.remove("open");
      pageOverlay.classList.add("active");
      document.body.classList.add("no-scroll");
    });
  
    // Закриття лівого меню через кнопку "хрест"
    if (closeButtonLeft) {
      closeButtonLeft.addEventListener('click', function () {
        mobileMenuLeft.classList.remove("open");
        pageOverlay.classList.remove("active");
        document.body.classList.remove("no-scroll");
      });
    }
  
    // Закриття правого меню через кнопку "хрест"
    if (closeButtonRight) {
      closeButtonRight.addEventListener('click', function () {
        mobileMenuRight.classList.remove("open");
        pageOverlay.classList.remove("active");
        document.body.classList.remove("no-scroll");
      });
    }
  
    // Закриття меню при кліці поза ними
    pageOverlay.addEventListener('click', function () {
      mobileMenuLeft.classList.remove("open");
      mobileMenuRight.classList.remove("open");
      pageOverlay.classList.remove("active");
      document.body.classList.remove("no-scroll");
    });
  
    // Запобігання закриттю при кліці всередині меню
    mobileMenuLeft.addEventListener('click', function (event) {
      event.stopPropagation();
    });
  
    mobileMenuRight.addEventListener('click', function (event) {
      event.stopPropagation();
    });
  });