// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('http://localhost:5678/api/works');
const value = await reponse.json();
console.log(value);

function genererFigure(value) {
    for (let i = 0; i < value.length; i++) {

        const article = value[i];
        // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionGallery = document.querySelector(".gallery");
        // Création d’une balise dédiée à une pièce automobile
        const figureElement = document.createElement("figure");
        // Création des balises 
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        const nomElement = document.createElement("figcaption");
        nomElement.innerText = article.title;

        // // On rattache la balise article a la section Fiches
        sectionGallery.appendChild(figureElement);
        // // On rattache l’image à pieceElement (la balise article)
        figureElement.appendChild(imageElement);
        figureElement.appendChild(nomElement);
    }
};

genererFigure(value);
//gestion des filtres
const boutonAll = document.querySelector(".galleryFilterAll");

boutonAll.addEventListener("click", function () {
    const figureAll = value.filter(function (figvalue) {
        return figvalue.categoryId == 1, 2, 3;
    });
    console.log(figureAll);
    document.querySelector(".gallery").innerHTML = "";
    genererFigure(figureAll);

});

const boutonItem = document.querySelector(".galleryFilterItem");

boutonItem.addEventListener("click", function () {
    const figureItem = value.filter(function (figvalue) {
        return figvalue.categoryId == 1;
    });
    console.log(figureItem);
    document.querySelector(".gallery").innerHTML = "";
    genererFigure(figureItem);
});

const boutonApt = document.querySelector(".galleryFilterApt");

boutonApt.addEventListener("click", function () {
    const figureApt = value.filter(function (figvalue) {
        return figvalue.categoryId == 2;
    });
    console.log(figureApt);
    document.querySelector(".gallery").innerHTML = "";
    genererFigure(figureApt);
});

const boutonHotel = document.querySelector(".galleryFilterHotel");

boutonHotel.addEventListener("click", function () {
    const figureHotel = value.filter(function (figvalue) {
        return figvalue.categoryId == 3;
    });
    console.log(figureHotel);
    document.querySelector(".gallery").innerHTML = "";
    genererFigure(figureHotel);
});