"use strict";
const getRandomIndex = async (length) => Math.floor(Math.random() * length);
const shuffleCharacters = async (data) => {
    const shuffledCharacters = [...data];
    for (let i = shuffledCharacters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledCharacters[i], shuffledCharacters[j]] = [shuffledCharacters[j], shuffledCharacters[i]];
    }
    return shuffledCharacters;
};
const generatePassword = async () => {
    const ALPHABETS = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
    ];
    const INTEGERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const SPECIAL_CHARACTERS = [
        ".", ",", "/", "<", ">", "?", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", "\\", "|"
    ];
    let password = [];
    let i = 0;
    for (; i < 8; i++) {
        password.push(ALPHABETS[await getRandomIndex(ALPHABETS.length)]);
    }
    for (; i < 13; i++) {
        password.push(INTEGERS[await getRandomIndex(INTEGERS.length)]);
    }
    for (; i < 16; i++) {
        password.push(SPECIAL_CHARACTERS[await getRandomIndex(SPECIAL_CHARACTERS.length)]);
    }
    return (await shuffleCharacters(password)).join("");
};
const generatePasswordButton = document.getElementById("generate-password-button");
const passwordBlock = document.getElementById("password-block");
const generatedPasswordText = document.getElementById("generated-password");
const notificationText = document.getElementById("notification");
const toggleThemeButton = document.getElementById("toggle-theme-button");
const currentTheme = localStorage.getItem("theme") || "dark";
if (generatePasswordButton) {
    generatePasswordButton.addEventListener("click", async () => {
        if (generatedPasswordText) {
            generatedPasswordText.textContent = await generatePassword();
            if (passwordBlock) {
                passwordBlock.style.visibility = "visible";
            }
        }
    });
}
if (generatedPasswordText) {
    generatedPasswordText.addEventListener("click", (event) => {
        const password = event.target.textContent ?? "";
        navigator.clipboard.writeText(password).then(() => {
            if (notificationText) {
                notificationText.style.opacity = "1";
                setTimeout(() => notificationText.style.opacity = "0", 2000);
            }
        }).catch(() => alert("Something went wrong!"));
    });
}
if (toggleThemeButton) {
    toggleThemeButton.addEventListener("click", () => {
        const theme = document.documentElement.getAttribute("data-theme");
        if (theme === "light") {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
        }
        else {
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
        }
    });
}
document.documentElement.setAttribute("data-theme", currentTheme);
