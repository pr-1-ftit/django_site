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
        emailValidationError: "Please enter a valid email.",
        passwordValidationError: "Password cannot be empty.",
        emailRequired: "Please fill out this field.",
        passwordRequired: "This password field cannot be empty.",
        focusLabelText: "Username",
        defaultLabelText: "Example, LadiesMan217"
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
        emailValidationError: "Введіть дійсну електронну адресу.",
        passwordValidationError: "Пароль не може бути порожнім.",
        emailRequired: "Будь ласка, заповніть це поле.",
        passwordRequired: "Поле для пароля не може бути порожнім.",
        focusLabelText: "Ім'я користувача",
        defaultLabelText: "Наприклад, LadiesMan217"
    }
};

// Detect the browser's language and select the appropriate translations. Fallback to English if unsupported.
const userLanguage = navigator.language.substring(0, 2) || "en";
const selectedLanguage = translations[userLanguage] || translations.en;

// Function to apply translations to elements with the `data-lang` attribute
function applyTranslations() {
    document.querySelectorAll("[data-lang]").forEach(element => {
        const translationKey = element.getAttribute("data-lang");
        if (selectedLanguage[translationKey]) {
            element.textContent = selectedLanguage[translationKey];
        }
    });
}

applyTranslations(); // Apply translations initially

// ========== MAIN FUNCTIONALITY: DYNAMIC FORM LOADING, ROUTING, LOCALIZATION & VALIDATION ==========
document.addEventListener("DOMContentLoaded", () => {
    const formContainer = document.getElementById("form-container");

    /**
     * loadForm() dynamically fetches a form via AJAX and inserts it into the container.
     * After inserting, it applies translations, attaches event listeners, and sets up validation.
     *
     * @param {string} url - URL for fetching the form HTML fragment.
     * @param {string|null} newPath - New browser URL (if applicable) for History API.
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
            formContainer.innerHTML = html; // Insert the HTML fragment into the container
            formContainer.classList.add("active");

            // Apply translations to dynamically loaded content
            applyTranslations();

            // Attach event listeners for elements (e.g., focus/blur events for username)
            attachDynamicEvents();

            // Attach form validation logic (e.g., email validation and password matching)
            attachValidationEvents();

            // Update the browser's URL using History API (if a new path is provided)
            if (newPath) {
                window.history.pushState(null, null, newPath);
            }
        })
        .catch(error => {
            console.error(`Error loading form from ${url}:`, error);
            formContainer.innerHTML = `<p>An error occurred. Please try again later.</p>`;
        });
    };

    /**
     * attachDynamicEvents() adds event listeners to dynamically loaded form elements.
     * Specifically targets the input with id "username" and its corresponding label.
     */
    function attachDynamicEvents() {
        const usernameInput = document.getElementById("username");
        const usernameLabel = document.getElementById("username-label");

        // Use values from selectedLanguage for translations
        const focusLabelText = selectedLanguage.focusLabelText;
        const defaultLabelText = selectedLanguage.defaultLabelText;

        if (usernameInput && usernameLabel) {
            usernameInput.addEventListener("focus", () => {
                usernameLabel.textContent = focusLabelText;
            });
            usernameInput.addEventListener("blur", () => {
                if (!usernameInput.value) {
                    usernameLabel.textContent = defaultLabelText;
                }
            });
        } else {
            console.error("Elements with id 'username' or 'username-label' not found");
        }
    }

    /**
     * attachValidationEvents() adds form validation logic.
     * Checks email validity and ensures passwords (password and confirmPassword) match.
     */
    function attachValidationEvents() {
        const signupFormElement = document.getElementById('signupFormElement');
        const errorMessage = document.getElementById('errorMessage');
        const emailField = document.getElementById('email');
        const passwordField = document.getElementById('password');
        const confirmPasswordField = document.getElementById('confirmPassword');

        if (signupFormElement) {
            // Clear any previous error messages when the form loads
            if (errorMessage) errorMessage.textContent = "";

            // Validate the email field dynamically during input
            if (emailField) {
                emailField.addEventListener("input", () => {
                    if (emailField.validity.valid) {
                        if (errorMessage) errorMessage.textContent = "";
                    } else {
                        if (errorMessage) errorMessage.textContent = selectedLanguage.emailValidationError;
                    }
                });
            }

            // Validate passwords on form submission
            signupFormElement.addEventListener("submit", (e) => {
                let formValid = true;

                // Check email validity
                if (emailField && !emailField.validity.valid) {
                    formValid = false;
                    if (errorMessage) errorMessage.textContent = selectedLanguage.emailValidationError;
                }

                // Ensure passwords match
                if (passwordField && confirmPasswordField) {
                    if (passwordField.value !== confirmPasswordField.value) {
                        formValid = false;
                        if (errorMessage) {
                            errorMessage.textContent = selectedLanguage.passwordMismatch;
                        }
                    } else if (formValid && errorMessage) {
                        // Clear the error message if passwords match
                        errorMessage.textContent = "";
                    }
                }

                // Prevent form submission if validation fails
                if (!formValid) {
                    e.preventDefault();
                }
            });
        }
    }

    /**
     * changeTitle() updates the document's title based on the provided translation key.
     * @param {string} type - Translation key (e.g., "signupTitle" or "loginTitle").
     */
    function changeTitle(type) {
        document.title = selectedLanguage[type];
    }

    // Automatically load a form based on the current URL
    const currentPath = location.pathname;
    console.log(`Current path: ${currentPath}`);
    if (currentPath === '/account/signup/' || currentPath === '/account/signup') {
        loadForm('/account/signup/', null);
    } else if (currentPath === '/account/login/' || currentPath === '/account/login') {
        loadForm('/account/login/', null);
    }
});
