function showRegistrationForm() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registrationForm").style.display = "block";
  }

  function showLoginForm() {
    document.getElementById("registrationForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
  }

  // Пример функций для обработки входа и регистрации
  function login() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    if (!username || !password) {
      document.getElementById("loginError").textContent = "Введите логин и пароль.";
      return;
    }

    // Логика проверки данных пользователя
    alert(`Вход выполнен как ${username}`);
  }

  function register() {
    const username = document.getElementById("regUsername").value;
    const fullName = document.getElementById("regFullName").value;
    const password = document.getElementById("regPassword").value;
    const confirmPassword = document.getElementById("regConfirmPassword").value;

    if (!username || !fullName || !password || !confirmPassword) {
      document.getElementById("regError").textContent = "Заполните все поля.";
      return;
    }

    if (password !== confirmPassword) {
      document.getElementById("regError").textContent = "Пароли не совпадают.";
      return;
    }

    // Логика регистрации пользователя
    alert(`Регистрация успешна для ${username}`);

    // Перенаправление на модуль "Полезная информация"
    window.location.href = "./mod3.html"; // Укажите путь к файлу "Полезная информация"
  }
  