const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let scrollPosition = 0;
const cardWidth = carousel.offsetWidth / 3; // Ширина однієї картки (адаптується під екран)

// Функція для прокрутки
const updateScrollPosition = (direction) => {
    scrollPosition += direction === 'next' ? cardWidth : -cardWidth;

    // Обмеження прокрутки
    scrollPosition = Math.max(0, Math.min(scrollPosition, carousel.scrollWidth - carousel.offsetWidth));

    carousel.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
    });
};

// Кнопки прокрутки
prevBtn.addEventListener('click', () => {
    updateScrollPosition('prev');
});

nextBtn.addEventListener('click', () => {
    updateScrollPosition('next');
});

// Оновлення при зміні розміру екрану
window.addEventListener('resize', () => {
    scrollPosition = 0;
    carousel.scrollTo({
        left: scrollPosition,
        behavior: 'auto',
    });
});

// Автоматична прокрутка
const autoScroll = () => {
    const maxScroll = carousel.scrollWidth - carousel.offsetWidth;

    // Якщо досягнуто кінця, повертаємося на початок
    if (scrollPosition >= maxScroll) {
        scrollPosition = 0;
    } else {
        scrollPosition += cardWidth;
    }

    carousel.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
    });
};

// Запуск автоматичної прокрутки кожні 5 секунд
setInterval(autoScroll, 5000);

const menuToggle = document.getElementById('menu-toggle');
const menu = document.querySelector('.menu');

menuToggle.addEventListener('click', () => {
    // Перемикання класу 'active' для меню
    menu.classList.toggle('active');
});
function goToSite() {
    window.location.href = "//t.me/LizesBot";
    }