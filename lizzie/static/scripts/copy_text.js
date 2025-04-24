  // Функція для копіювання тексту
  function copyText() {
    const phoneNumber = document.getElementById('phone-number');
    navigator.clipboard.writeText(phoneNumber.textContent).then(() => {
      alert('Номер телефону скопійовано!');
    });
  }