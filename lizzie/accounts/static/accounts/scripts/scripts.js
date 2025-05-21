document.addEventListener("DOMContentLoaded", function() {
    // Через 1 секунду встановлюємо фокус на першому input у формі
    setTimeout(function() {
      var firstInput = document.querySelector("#signupFormElement input");
      if (firstInput) {
        firstInput.focus();
      }
    }, 1000);
  });