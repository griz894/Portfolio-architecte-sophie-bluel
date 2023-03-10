//defini var
const urlAPIWorks = "http://localhost:5678/api/works";
const urlAPICat = "http://localhost:5678/api/categories";


// const value = 0;


// // recup des infos depuis l'API
async function fetchInfos() {
    const reponse = await fetch(urlAPIWorks);
    const value = await reponse.json();
    console.log(value);
    return value;
}
fetchInfos();


function genererFigure(value) {
    // console.log(value);

    for (let i = 0; i < value.length; i++) {
        const article = value[i];

        // let sectionGallery = document.querySelector(".gallery");
        const sectionGallery = document.querySelector(".gallery");
        // balise dédié aux élements
        let figure = document.createElement(".figure");

        //creation des balises
        let img = document.createElement("img");
        img.src = article[i].image;

        let figcaption = document.createElement("figcaption");
        figcaption.innerText = article[i].figcaption;


        //rattachement des balises au parent
        figure.appendChild(img);
        figure.appendChild(figcaption);
        sectionGallery.appendChild(figure);
    }

}

// genererFigure();
// gestion boutons filtres
const boutonFilterAll = document.querySelector(".galleryFilterAll");

// boutonFilterAll.addEventListener("click", function () {
//     const figureAll = Array.from();
// });