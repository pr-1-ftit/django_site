document.addEventListener("DOMContentLoaded", function() {
    const langBtn = document.querySelector("#lang-btn");
    const langMenu = document.querySelector(".lang-menu");
    const langForm = document.getElementById("langForm");
    const langInput = document.getElementById("langInput");
    const langOptions = document.querySelectorAll(".lang-option");
  
    // Перемикаємо відображення меню при кліку на посилання-активатор
    langBtn.addEventListener("click", function(event) {
      event.preventDefault();
      event.stopPropagation();
      langMenu.style.display = (langMenu.style.display === "block" ? "none" : "block");
    });
  
    // Для кожного варіанту мови: встановлюємо прихований інпут і відправляємо форму
    langOptions.forEach(function(option) {
      option.addEventListener("click", function(event) {
        event.preventDefault();
        const selectedLang = option.getAttribute("data-lang");
        langInput.value = selectedLang;
        langForm.submit();
      });
    });
  
    // Закриваємо меню, якщо клікаємо поза межами контейнера
    document.addEventListener("click", function(event) {
      if (!document.querySelector(".lang-dropdown").contains(event.target)) {
        langMenu.style.display = "none";
      }
    });
  });