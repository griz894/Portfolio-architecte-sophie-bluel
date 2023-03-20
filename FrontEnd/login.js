//récupération des infos du form
const form = {
    email: document.getElementById("signinEmail"),
    password: document.getElementById("signinPassword"),
    submit: document.getElementById("signinSubmit"),
};
let button = form.submit.addEventListener("click", (event) => {
    event.preventDefault();
    const loginAPI = 'http://localhost:5678/api/users/login';
    // const loginMessage = document.getElementById("loginMessage");
    fetch(loginAPI, {
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

        // .then((response) => response.json())

        .then( async(response) => {
            // console.log(data);
            
            if (response.ok) {
                const dataContent = await response.json();
                window.localStorage.setItem('token', dataContent.token);
                console.log(dataContent);
                location.href = "index.html";
            } else if (!response.ok) {
                if (response.status === 404) {
                    // console.log(data);
                    alert((response.message = "Non trouvé"));
                } else if (response.status === 401) {
                    // console.log(data);
                    alert((response.message = "Utilisateur non autorisé"));
                } else {
                    // console.log(data);
                    alert("Erreur dans l’identifiant ou le mot de passe");
                }
            }
        })

})