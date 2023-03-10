//creation fonction POST login
function postLogin() {
    const loginForm = document.querySelector(".loginForm");
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); //bloque le comportement par défault du navigateur

        const stockLogin = {
            email: event.target.querySelector("[name=email").value,
            password: event.target.querySelector("[name=password").value,
        };

        const postLogin = JSON.stringify(stockLogin);

        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: postLogin
        });
    })
    .then((reponse) => {
        if (!reponse.ok) {
            if (reponse.status === 404) {
                alert((reponse.message = "Non trouvé"));
            } else if (reponse.status === 401) {
                alert((reponse.message = "Utilisateur non autorisé"))
            }
        } else {
            return reponse.json();

        }
    })
    .then((data) => {
        console.log(data);
        window.localStorage.setItem("user", JSON.stringify(data));
    })
    catch ((error) => console.log(error));

}