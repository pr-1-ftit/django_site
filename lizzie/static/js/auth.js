const translations = {
    en: {
        signupTitle: "Sign Up",
        loginTitle: "Log In",
        username: "Username",
        email: "Email",
        password: "Password",
        confirmPassword: "Confirm Password",
        signupButton: "Sign Up",
        loginButton: "Log In",
        switchToLogin: "Already signed up? Log in",
        switchToSignup: "Don't have an account? Sign Up",
        privacyPolicy: "Privacy Policy",
        terms: "Terms & Conditions",
        passwordMismatch: "Passwords do not match!",
        emailPlaceholder: "Enter your email",
        passwordPlaceholder: "Enter your password",
        confirmPasswordPlaceholder: "Confirm your password",
        emailValidationError: "Please enter a valid email.",
        passwordValidationError: "Password cannot be empty.",
        emailLoginPlaceholder: "Enter your email",
        passwordLoginPlaceholder: "Enter your password",
        emailRequired: "Please fill out this field.",
        passwordRequired: "This password field cannot be empty.",
    },
    uk: {
        signupTitle: "Реєстрація",
        loginTitle: "Авторизація",
        username: "Ім'я користувача",
        email: "Електронна пошта",
        password: "Пароль",
        confirmPassword: "Підтвердження пароля",
        signupButton: "Зареєструватися",
        loginButton: "Увійти",
        switchToLogin: "Вже зареєстровані? Авторизуйтесь",
        switchToSignup: "Ще не маєте акаунту? Зареєструйтесь",
        privacyPolicy: "Політика конфіденційності",
        terms: "Умови використання",
        passwordMismatch: "Паролі не співпадають!",
        emailPlaceholder: "Введіть вашу електронну пошту",
        passwordPlaceholder: "Введіть ваш пароль",
        confirmPasswordPlaceholder: "Підтвердьте ваш пароль",
        emailValidationError: "Введіть дійсну електронну адресу.",
        passwordValidationError: "Пароль не може бути порожнім.",
        emailLoginPlaceholder: "Введіть вашу електронну пошту",
        passwordLoginPlaceholder: "Введіть ваш пароль",
        emailRequired: "Будь ласка, заповніть це поле.",
        passwordRequired: "Поле для пароля не може бути порожнім.",
    }
};

const userLanguage = navigator.language.substring(0, 2) || "en"; // Detect browser language
const selectedLanguage = translations[userLanguage] || translations.en; // Fallback to English if language unsupported

// Apply translations to elements with data-lang attribute
function applyTranslations() {
    document.querySelectorAll("[data-lang]").forEach(element => {
        const translationKey = element.getAttribute("data-lang");
        if (selectedLanguage[translationKey]) {
            element.textContent = selectedLanguage[translationKey];
        }
    });

    // Set placeholders dynamically based on language
    document.getElementById('email').placeholder = selectedLanguage.emailPlaceholder;
    document.getElementById('password').placeholder = selectedLanguage.passwordPlaceholder;
    document.getElementById('confirmPassword').placeholder = selectedLanguage.confirmPasswordPlaceholder;
    document.getElementById('emailLogin').placeholder = selectedLanguage.emailLoginPlaceholder;
    document.getElementById('passwordLogin').placeholder = selectedLanguage.passwordLoginPlaceholder;
}

applyTranslations(); // Execute translation logic

const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');
const switchToLogin = document.getElementById('switchToLogin');
const switchToSignup = document.getElementById('switchToSignup');
const signupFormElement = document.getElementById('signupFormElement');
const passwordField = document.getElementById('password');
const confirmPasswordField = document.getElementById('confirmPassword');
const emailField = document.getElementById('email');
const errorMessage = document.getElementById('errorMessage');

// Clear the error message on page load
document.addEventListener("DOMContentLoaded", () => {
    errorMessage.textContent = ""; // Ensure error message is empty initially
});

// Change the page title based on active form type
function changeTitle(type) {
    document.title = selectedLanguage[type];
}

signupForm.classList.add("active"); // Display Sign Up form by default
changeTitle("signupTitle");

// Switch to Login Form
switchToLogin.addEventListener("click", () => {
    signupForm.classList.remove("active");
    loginForm.classList.add("active");
    changeTitle("loginTitle");
});

// Switch to Sign Up Form
switchToSignup.addEventListener("click", () => {
    loginForm.classList.remove("active");
    signupForm.classList.add("active");
    changeTitle("signupTitle");
});

// Validate email field input dynamically
emailField.addEventListener("input", () => {
    if (emailField.validity.valid) {
        errorMessage.textContent = ""; // Clear error message if valid
    } else {
        errorMessage.textContent = selectedLanguage.emailValidationError;
    }
});

// Validate password confirmation during form submission
signupFormElement.addEventListener("submit", (e) => {
    let formValid = true;

    if (!emailField.validity.valid) {
        formValid = false;
        errorMessage.textContent = selectedLanguage.emailValidationError;
    }

    if (passwordField.value !== confirmPasswordField.value) {
        formValid = false;
        errorMessage.textContent = selectedLanguage.passwordMismatch;
    }

    if (!formValid) {
        e.preventDefault(); // Prevent submission if validation fails
    } else {
        errorMessage.textContent = ""; // Clear error messages on successful validation
    }
});
