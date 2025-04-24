document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.slider').forEach(function(card) {
        let isDragging = false;
        let startX;
        let initialScroll;
        const scrollContainer = card.closest('.sliders-scroll-container');

        // Обробка натискання миші
        card.addEventListener('mousedown', function(e) {
            e.preventDefault(); // Відміна стандартного виділення
            isDragging = true;
            card.classList.add('active'); // Додаємо клас активного стану
            startX = e.pageX; // Початкова координата миші
            initialScroll = scrollContainer.scrollLeft; // Початкова позиція скролу

            // Прив'язка обробників до документу
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        function onMouseMove(e) {
            if (!isDragging) return;
            const dx = e.pageX - startX; // Відхилення по горизонталі
            scrollContainer.scrollLeft = initialScroll - dx; // Оновлення скролу
        }

        function onMouseUp() {
            isDragging = false;
            card.classList.remove('active'); // Видалення класу активного стану
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        // Додатковий обробник наведення миші
        card.addEventListener('mouseover', () => {
            card.classList.add('hovered'); // Додаємо клас підсвітки
        });

        card.addEventListener('mouseout', () => {
            card.classList.remove('hovered'); // Видалення класу підсвітки
        });
    });
});
