  // Отримуємо всі елементи, за які відповідає інтерактивне перетягування
  document.querySelectorAll('.slider').forEach(function(card) {
    let isDragging = false;
    let startX;
    let initialScroll;
    // Знаходимо батьківський контейнер зі скролом
    const scrollContainer = card.closest('.sliders-scroll-container');

    card.addEventListener('mousedown', function(e) {
      e.preventDefault(); // відміняємо стандартне виділення тексту або інших елементів
      isDragging = true;
      // Додаємо клас, що збільшує елемент (scale 1.2)
      card.classList.add('active');
      // Записуємо початкову координату миші
      startX = e.pageX;
      // Запам'ятовуємо початкову позицію скролу батьківського контейнера
      initialScroll = scrollContainer.scrollLeft;

      // Прив'язуємо обробники руху та відпускання миші до документу
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
      if (!isDragging) return;
      // Обчислюємо відхилення по горизонталі
      const dx = e.pageX - startX;
      // Оновлюємо горизонтальне прокручування контейнера
      scrollContainer.scrollLeft = initialScroll - dx;
    }

    function onMouseUp() {
      isDragging = false;
      // Видаляємо клас активного стану
      card.classList.remove('active');
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
  });