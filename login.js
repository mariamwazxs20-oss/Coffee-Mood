const container = document.querySelector('.container');
const registerBtn = document.querySelector ('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
});
loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});

/* Login*/
const loginForm = document.getElementById("login");
if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault(); 
        window.location.href = "index.html";
    });
}

/* Register*/
const registerForm = document.getElementById("register");
if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        window.location.href = "index.html";
    });
}


const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

if (togglePassword) {
    togglePassword.addEventListener("click", () => {
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);

        togglePassword.classList.toggle("fa-eye");
        togglePassword.classList.toggle("fa-eye-slash");
    });
}