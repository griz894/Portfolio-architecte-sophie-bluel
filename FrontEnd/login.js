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

        .then((response) => response.json())

        .then((data) => {
            console.log(data);
            window.localStorage.setItem('token', data.token);
            if (data.ok) {
                location.href = "index.html";
            } else if (!data.ok) {
                if (data.status === 404) {
                    alert((data.message = "Non trouvé"));
                } else if (data.status === 401) {
                    alert((data.message = "Utilisateur non autorisé"));
                } else {
                    alert("Erreur dans l’identifiant ou le mot de passe");
                }
            }
        })



    // .then((data) => {
    //     console.log(data);
    //     window.localStorage.setItem('token', data.token);
    //     // if token == maintoken {
    //     //     location.href = "index.html";
    //     // }

    // })
    // .then ((tokenCheck) => {
    //     let token = window.localStorage.getItem('token');
    //     if (token == maintoken){
    //         location.href = "index.html";
    //     }
    // })
    // .catch((err) => {
    //     console.log(err);
    //     alert("Erreur dans l’identifiant ou le mot de passe");
    // })
})