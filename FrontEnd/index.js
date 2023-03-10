showFigures();
initEventListeners();

// Récupération des pièces depuis le fichier JSON et lance l'affichage
function showFigures() {
    fetch('http://localhost:5678/api/works')
        .then(reponse => reponse.json())
        .then(value => genererFigures(value));
}

function genererFigures(articles) {
    for (let i = 0; i < articles.length; i++) {

        const article = articles[i];
        // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionGallery = document.getElementsByClassName("gallery");
        // Création d’une balise dédiée à une pièce automobile
        const figureElement = document.createElement("figure");
        // Création des balises 
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        imageElement.alt = article.title;
        const nomElement = document.createElement("figcaption");
        nomElement.innerText = article.title;

        // // On rattache la balise article a la section Fiches
        sectionGallery.appendChild(figureElement);
        // // On rattache l’image à pieceElement (la balise article)
        figureElement.appendChild(imageElement);
        figureElement.appendChild(nomElement);
    }
}


function onBoutonAllClicked() {
    const figureAll = value.filter(function (figvalue) {
        return figvalue.categoryId == 1, 2, 3;
    });
    console.log(figureAll);
    document.querySelector(".gallery").innerHTML = "";
    genererFigures(figureAll);

}

function onBoutonItemClicked() {
    const figureItem = value.filter(function (figvalue) {
        return figvalue.categoryId == 1;
    });
    console.log(figureItem);
    document.querySelector(".gallery").innerHTML = "";
    genererFigures(figureItem);
}

function onBoutonAptClicked() {
    const figureApt = value.filter(function (figvalue) {
        return figvalue.categoryId == 2;
    });
    console.log(figureApt);
    document.querySelector(".gallery").innerHTML = "";
    genererFigures(figureApt);
}

function onBoutonHotelCliked() {
    const figureHotel = value.filter(function (figvalue) {
        return figvalue.categoryId == 3;
    });
    console.log(figureHotel);
    document.querySelector(".gallery").innerHTML = "";
    genererFigures(figureHotel);
}

function initEventListeners() {
    //gestion des filtres
    const boutonAll = document.getElementsByClassName("galleryFilterAll");
    boutonAll.addEventListener("click", onBoutonAllClicked);

    const boutonItem = document.getElementsByClassName("galleryFilterItem");
    boutonItem.addEventListener("click", onBoutonItemClicked);

    const boutonApt = document.getElementsByClassName("galleryFilterApt");
    boutonApt.addEventListener("click", onBoutonAptClicked);

    const boutonHotel = document.getElementsByClassName("galleryFilterHotel");
    boutonHotel.addEventListener("click", onBoutonHotelCliked);
}
