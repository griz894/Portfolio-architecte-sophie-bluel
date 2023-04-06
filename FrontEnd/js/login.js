//récupération des infos du form
const form = {
    email: document.getElementById("signinEmail"),
    password: document.getElementById("signinPassword"),
    submit: document.getElementById("signinSubmit"),
};
form.submit.addEventListener("click", (event) => {
    event.preventDefault();
    const loginApiUrl = 'http://localhost:5678/api/users/login';
    fetch(loginApiUrl, {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: form.email.value,
            password: form.password.value,
        }),
    })
        .then(async (response) => {
            if (response.ok) {
                const dataContent = await response.json();
                window.localStorage.setItem('token', dataContent.token);
                location.href = "index.html";
                return;
            }
            if (response.status === 404 || response.status === 401) {
                alert((response.message = "Erreur dans l’identifiant ou le mot de passe"));
            } {
                alert("Une erreur est survenue, merci de réessayer plus tard.");
            }
        })
});