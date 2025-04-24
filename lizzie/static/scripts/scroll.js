document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".scrollButton").forEach(button => {
      button.addEventListener("click", function() {
        const target = document.getElementById("target");

          target.scrollIntoView({ behavior: 'smooth' });

      });
    });
  });
  