/* =====================================
   ELEMENTOS
===================================== */

const loginForm = document.getElementById("loginForm");

const usernameInput = document.getElementById("username");

const passwordInput = document.getElementById("password");

const rememberInput = document.getElementById("remember");

const message = document.getElementById("message");

const togglePassword =
    document.getElementById("togglePassword");

const forgotPassword =
    document.getElementById("forgotPassword");


/* =====================================
   USUÁRIO DEMONSTRAÇÃO
===================================== */

const USER = {

    username: "admin",

    password: "123456"

};


/* =====================================
   MOSTRAR / OCULTAR SENHA
===================================== */

togglePassword.addEventListener("click", () => {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        togglePassword.textContent = "🙈";

    } else {

        passwordInput.type = "password";

        togglePassword.textContent = "👁";

    }

});


/* =====================================
   FUNÇÃO DE MENSAGEM
===================================== */

function showMessage(text, type) {

    message.textContent = text;

    message.className = "message " + type;

}


/* =====================================
   LOGIN
===================================== */

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const username =
        usernameInput.value.trim();

    const password =
        passwordInput.value;


    /* VALIDAR CAMPOS */

    if (!username || !password) {

        showMessage(
            "Preencha usuário e senha.",
            "error"
        );

        return;

    }


    /* VALIDAR LOGIN */

    if (
        username === USER.username &&
        password === USER.password
    ) {

        showMessage(
            "Login realizado com sucesso!",
            "success"
        );


        /* SALVAR LOGIN */

        if (rememberInput.checked) {

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

        }


        /*
            REDIRECIONAMENTO

            Troque "calculadora.html"
            pelo nome da sua página.
        */

        setTimeout(() => {

            window.location.href =
                "calculadora.html";

        }, 1000);

    } else {

        showMessage(
            "Usuário ou senha incorretos.",
            "error"
        );

    }

});


/* =====================================
   ESQUECI A SENHA
===================================== */

forgotPassword.addEventListener("click", function(event) {

    event.preventDefault();

    showMessage(
        "Entre em contato com o administrador para redefinir sua senha.",
        "error"
    );

});


/* =====================================
   VERIFICAR LOGIN SALVO
===================================== */

window.addEventListener("load", () => {

    const loggedLocal =
        localStorage.getItem("craftLogged");

    const loggedSession =
        sessionStorage.getItem("craftLogged");


    if (loggedLocal === "true") {

        usernameInput.value =
            localStorage.getItem("craftUser") || "";

        rememberInput.checked = true;

    }

});