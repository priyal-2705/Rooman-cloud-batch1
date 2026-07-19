/* ==========================================
        PASSWORD SHOW / HIDE
========================================== */

document.querySelectorAll(".toggle-password").forEach(icon => {

    icon.addEventListener("click", function () {

        const input = this.previousElementSibling;

        input.type = input.type === "password" ? "text" : "password";

        this.classList.toggle("fa-eye");
        this.classList.toggle("fa-eye-slash");

    });

});


/* ==========================================
            REGISTER
========================================== */

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const fullname = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value.trim();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {

            alert("Passwords do not match.");
            return;

        }

        const user = {
            fullname,
            email,
            username,
            password
        };

        localStorage.setItem("loggedInUser", JSON.stringify(user));
        localStorage.setItem("user", JSON.stringify(user));

        alert("Registration Successful!");

        window.location.href = "dashboard.html";

    });

}


/* ==========================================
                LOGIN
========================================== */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {

            alert("Please register first.");

            window.location.href = "register.html";

            return;

        }

        if (

            (username === user.username || username === user.email)

            &&

            password === user.password

        ) {

            localStorage.setItem("loggedInUser", JSON.stringify(user));

            window.location.href = "dashboard.html";

        }

        else {

            alert("Invalid Username or Password.");

        }

    });

}


/* ==========================================
            DASHBOARD
========================================== */

const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (window.location.pathname.includes("dashboard.html")) {

    if (!loggedUser) {

        window.location.href = "login.html";

    }

}

if (loggedUser) {

    const welcome = document.getElementById("welcomeText");
    const name = document.getElementById("studentName");
    const email = document.getElementById("studentEmail");

    if (welcome) welcome.textContent = loggedUser.fullname;

    if (name) name.textContent = loggedUser.fullname;

    if (email) email.textContent = loggedUser.email;

}


/* ==========================================
                LOGOUT
========================================== */

function logout() {

    localStorage.removeItem("loggedInUser");

    window.location.href = "login.html";

}

document.getElementById("logoutBtn")?.addEventListener("click", logout);

document.getElementById("logoutBtn2")?.addEventListener("click", logout);