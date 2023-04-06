let articles = [];
showFigures();
initEventListeners();


// Récupération des pièces depuis le fichier JSON et lance l'affichage
function showFigures() {
    fetch('http://localhost:5678/api/works')
        .then(reponse => reponse.json())
        .then(value => {
            articles = value;
            genererFigures(value);
        });
}

function genererFigures(articles) {
    for (let i = 0; i < articles.length; i++) {

        const article = articles[i];
        // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionGallery = document.getElementsByClassName("gallery")[0];
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

function onBoutonFilterClicked(categories) {
    const figureAll = articles.filter(article => categories.includes(article.categoryId))
    console.log(figureAll);
    document.getElementsByClassName("gallery")[0].innerHTML = "";
    genererFigures(figureAll);

}

function initEventListeners() {
    //gestion des filtres
    const boutonAll = document.getElementById("galleryFilterAll");
    boutonAll.addEventListener("click", () => onBoutonFilterClicked([1, 2, 3]));

    const boutonItem = document.getElementById("galleryFilterItem");
    boutonItem.addEventListener("click", () => onBoutonFilterClicked([1]));

    const boutonApt = document.getElementById("galleryFilterApt");
    boutonApt.addEventListener("click", () => onBoutonFilterClicked([2]));

    const boutonHotel = document.getElementById("galleryFilterHotel");
    boutonHotel.addEventListener("click", () => onBoutonFilterClicked([3]));
}
