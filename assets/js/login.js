/* =====================================
   ELEMENTOS
===================================== */

const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const rememberInput = document.getElementById("remember");
const message = document.getElementById("message");
const togglePassword = document.getElementById("togglePassword");
const forgotPassword = document.getElementById("forgotPassword");


/* =====================================
   USUÁRIO
===================================== */

const USER = {
    username: "admin",
    password: "vdtt123"
};


/* =====================================
   MOSTRAR / OCULTAR SENHA
===================================== */

if (togglePassword) {

    togglePassword.addEventListener("click", () => {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";
            togglePassword.textContent = "🙈";

        } else {

            passwordInput.type = "password";
            togglePassword.textContent = "👁";

        }

    });

}


/* =====================================
   FUNÇÃO DE MENSAGEM
===================================== */

function showMessage(text, type) {

    if (!message) return;

    message.textContent = text;
    message.className = "message " + type;

}


/* =====================================
   LOGIN
===================================== */

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value;


        /* -----------------------------
           VALIDAR CAMPOS
        ----------------------------- */

        if (!username || !password) {

            showMessage(
                "Preencha usuário e senha.",
                "error"
            );

            return;
        }


        /* -----------------------------
           VALIDAR USUÁRIO
        ----------------------------- */

        if (
            username === USER.username &&
            password === USER.password
        ) {

            showMessage(
                "Login realizado com sucesso!",
                "success"
            );


            /* -----------------------------
               LIMPAR LOGIN ANTERIOR
            ----------------------------- */

            localStorage.removeItem("craftLogged");
            localStorage.removeItem("craftUser");

            sessionStorage.removeItem("craftLogged");


            /* -----------------------------
               SALVAR LOGIN
            ----------------------------- */

            if (rememberInput && rememberInput.checked) {

                localStorage.setItem(
                    "craftLogged",
                    "true"
                );

                localStorage.setItem(
                    "craftUser",
                    username
                );

            } else {

                sessionStorage.setItem(
                    "craftLogged",
                    "true"
                );

                sessionStorage.setItem(
                    "craftUser",
                    username
                );

            }


            /* -----------------------------
               REDIRECIONAR
            ----------------------------- */

            setTimeout(() => {

                window.location.replace("calculadora.html");

            }, 500);

        } else {

            showMessage(
                "Usuário ou senha incorretos.",
                "error"
            );

        }

    });

}


/* =====================================
   ESQUECI A SENHA
===================================== */

if (forgotPassword) {

    forgotPassword.addEventListener("click", function (event) {

        event.preventDefault();

        showMessage(
            "Entre em contato com o administrador para redefinir sua senha.",
            "error"
        );

    });

}


/* =====================================
   VERIFICAR LOGIN SALVO
===================================== */

window.addEventListener("load", () => {

    const loggedLocal =
        localStorage.getItem("craftLogged");

    const loggedSession =
        sessionStorage.getItem("craftLogged");


    if (loggedLocal === "true") {

        if (usernameInput) {

            usernameInput.value =
                localStorage.getItem("craftUser") || "";

        }

        if (rememberInput) {

            rememberInput.checked = true;

        }

    } else if (loggedSession === "true") {

        if (usernameInput) {

            usernameInput.value =
                sessionStorage.getItem("craftUser") || "";

        }

    }

});