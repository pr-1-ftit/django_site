// ========== TRANSLATIONS & LOCALIZATION ==========

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
        usernamePlaceholder: "Example, LadiesMan217"
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
        usernamePlaceholder: "Наприклад, LadiesMan217"
    }
};

// Detect browser's language (first two characters) and select translations; fallback to English
const userLanguage = navigator.language.substring(0, 2) || "en";
const selectedLanguage = translations[userLanguage] || translations.en;

// Function to apply translations to elements with a data-lang attribute and update placeholders
function applyTranslations() {
    document.querySelectorAll("[data-lang]").forEach(element => {
        const translationKey = element.getAttribute("data-lang");
        if (selectedLanguage[translationKey]) {
            element.textContent = selectedLanguage[translationKey];
        }
    });
    // Set input placeholders if elements exist
    const email = document.getElementById('email');
    if (email) email.placeholder = selectedLanguage.emailPlaceholder;
    const password = document.getElementById('password');
    if (password) password.placeholder = selectedLanguage.passwordPlaceholder;
    const confirmPassword = document.getElementById('confirmPassword');
    if (confirmPassword) confirmPassword.placeholder = selectedLanguage.confirmPasswordPlaceholder;
    const emailLogin = document.getElementById('emailLogin');
    if (emailLogin) emailLogin.placeholder = selectedLanguage.emailLoginPlaceholder;
    const passwordLogin = document.getElementById('passwordLogin');
    if (passwordLogin) passwordLogin.placeholder = selectedLanguage.passwordLoginPlaceholder;
    const username = document.getElementById('username');
    if (username) username.placeholder = selectedLanguage.usernamePlaceholder;
}

applyTranslations(); // Run translations initially

// ========== MAIN FUNCTIONALITY: DYNAMIC FORM LOADING, ROUTING, LOCALIZATION & VALIDATION ==========

document.addEventListener("DOMContentLoaded", () => {
    // Get the container where the dynamic form will be inserted.
    const formContainer = document.getElementById("form-container");

    /**
     * loadForm function sends an AJAX request to `url` and updates the container’s content.
     * If newPath is provided, the URL is updated using History API.
     * @param {string} url - The URL from which to load the form HTML fragment.
     * @param {string|null} newPath - The new URL to push to the browser (or null to keep current URL).
     */
    const loadForm = (url, newPath) => {
        console.log(`Sending request to ${url}...`);
        fetch(url, {
            headers: { "X-Requested-With": "XMLHttpRequest" }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load form from ${url}. Response status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                console.log(`Request to ${url} was successful. Received HTML fragment.`);
                formContainer.innerHTML = html;            // Insert the received HTML fragment into the container.
                formContainer.classList.add("active");       // Add the active class to display the container.

                // Apply translations to any dynamically inserted elements.
                applyTranslations();

                // Set up client-side validation if the sign-up form is loaded.
                const signupFormElement = document.getElementById('signupFormElement');
                const errorMessage = document.getElementById('errorMessage');
                const emailField = document.getElementById('email');
                const passwordField = document.getElementById('password');
                const confirmPasswordField = document.getElementById('confirmPassword');
                if (signupFormElement) {
                    // Clear any error messages on form load.
                    if (errorMessage) errorMessage.textContent = "";
                    
                    // Validate the email field dynamically.
                    if (emailField) {
                        emailField.addEventListener("input", () => {
                            if (emailField.validity.valid) {
                                if (errorMessage) errorMessage.textContent = "";
                            } else {
                                if (errorMessage) errorMessage.textContent = selectedLanguage.emailValidationError;
                            }
                        });
                    }
                    
                    // Validate form on submission to ensure passwords match.
                    signupFormElement.addEventListener("submit", (e) => {
                        let formValid = true;
                        if (emailField && !emailField.validity.valid) {
                            formValid = false;
                            if (errorMessage) errorMessage.textContent = selectedLanguage.emailValidationError;
                        }
                        if (passwordField && confirmPasswordField && (passwordField.value !== confirmPasswordField.value)) {
                            formValid = false;
                            if (errorMessage) errorMessage.textContent = selectedLanguage.passwordMismatch;
                        }
                        if (!formValid) {
                            e.preventDefault(); // Prevent form submission if validation fails.
                        } else {
                            if (errorMessage) errorMessage.textContent = "";
                        }
                    });
                }

                // Change page title based on the current active form type.
                if (newPath === '/account/signup/' || location.pathname === '/account/signup/' || location.pathname === '/account/signup') {
                    changeTitle("signupTitle");
                } else if (newPath === '/account/login/' || location.pathname === '/account/login/' || location.pathname === '/account/login') {
                    changeTitle("loginTitle");
                }
            })
            .catch(error => {
                console.error(`Error loading form from ${url}:`, error);
                formContainer.innerHTML = `<p>An error occurred. Please try again later.</p>`;
            });
        // If a newPath is provided, update the browser URL immediately.
        if (newPath) {
            window.history.pushState(null, null, newPath);
        }
    };

    /**
     * Changes the document title using a key from selectedLanguage.
     * @param {string} type - The key (e.g., "signupTitle" or "loginTitle") used to update the title.
     */
    function changeTitle(type) {
        document.title = selectedLanguage[type];
    }

    // Set up event listener for the "Sign Up" button.
    const signupBtn = document.getElementById("loadFormSignup");
    if (signupBtn) {
        signupBtn.addEventListener("click", () => {
            loadForm('/account/signup/', '/account/signup/');
        });
    } else {
        console.error("Sign Up button with ID 'loadFormSignup' not found.");
    }

    // Set up event listener for the "Log In" button.
    const loginBtn = document.getElementById("loadFormLogin");
    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            loadForm('/account/login/', '/account/login/');
        });
    } else {
        console.error("Log In button with ID 'loadFormLogin' not found.");
    }

    // On page load, check the current URL and automatically load the corresponding form if needed.
    const currentPath = location.pathname;
    console.log(`Current path: ${currentPath}`);
    if (currentPath === '/account/signup/' || currentPath === '/account/signup') {
        loadForm('/account/signup/', null);
    } else if (currentPath === '/account/login/' || currentPath === '/account/login') {
        loadForm('/account/login/', null);
    }

    // If there is an element for error messages, clear its content on page load.
    const errorMessage = document.getElementById("errorMessage");
    if (errorMessage) {
        errorMessage.textContent = "";
    }
});
