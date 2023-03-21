// Import de index.js dans admin.js
// import { articles } from './index.js';

// Récupération du token depuis localStorage + variable qui stockera l'etat du mode edit
const token = localStorage.getItem("token");
let ifEditMode = false;

// check de mon token
if (token !== null) {
    addAdminBar();
} else {
    window.location.href = "login.html";
}

// fonction qui créer la barre d'admin
function addAdminBar() {
    const adminBar = document.createElement("div");
    const editModeBtn = document.createElement("button");
    const publishBtn = document.createElement("button");

    adminBar.classList.add("adminBar");
    editModeBtn.textContent = "Mode édition";
    publishBtn.textContent = "Publier les changements";

    adminBar.appendChild(editModeBtn);
    adminBar.appendChild(publishBtn);

    editModeBtn.addEventListener("click", function () {
        ifEditMode = !ifEditMode; // changer l'état du mode édition
        if (ifEditMode) {
            addFigEdit(); // afficher le bouton "Modifier"
        } else {
            removeFigEdit(); // masquer le bouton "Modifier"
        }
    });

    document.body.prepend(adminBar);
    return adminBar;
}

//mode edition ON
function addFigEdit() {
    const projets = document.querySelector("#portfolio h2");
    const FigEditBtn = document.createElement("button");
    FigEditBtn.textContent = "Modifier";
    projets.appendChild(FigEditBtn);

    // Appel de la fonction createModal quand le bouton "Modifier" est créé
    createModal();
}
//mode edition OFF
function removeFigEdit() {
    const projets = document.querySelector("#portfolio h2");
    const FigEditBtn = projets.querySelector("button");
    if (FigEditBtn !== null) {
        projets.removeChild(FigEditBtn);
    }
}

function createModal() {
    // Création de la modal
    const modal = document.createElement("div");
    modal.classList.add("modal");

    // Ajout du contenu à la modal
    const modalContent = document.createElement("div");
    modalContent.classList.add("modalContent");
    const modalBody = document.createElement('div');
    modalBody.classList.add('modalBody');

    modalContent.appendChild(modalBody);
    modal.appendChild(modalContent);


    // Ajout du titre "Galerie photo"
    const modalHeader = document.createElement("div");
    modalHeader.classList.add("modalHeader");
    const title = document.createElement("h3");
    title.textContent = "Galerie photo";
    modalHeader.appendChild(title);
    // modalContent.prepend(modalHeader);
    modalContent.insertBefore(modalHeader, modalBody);

    // Ajout d'une croix pour fermer la modal
    const closeButton = document.createElement("button");
    closeButton.classList.add("closeButton");
    closeButton.innerHTML = "&times;";
    // modalContent.appendChild(closeButton);
    // modalContent.insertBefore(closeButton, modalContent.firstChild);
    modalContent.insertBefore(closeButton, modalHeader);

    // Ajout du footer et des deux boutons
    const modalFooter = document.createElement('div');
    modalFooter.classList.add('modalFooter');
    modalContent.appendChild(modalFooter);
    const addPhotoButton = document.createElement("button");
    addPhotoButton.classList.add("addPhotoButton");
    addPhotoButton.innerHTML = "Ajouter une photo";
    const removeGalleryButton = document.createElement("button");
    removeGalleryButton.classList.add("removeGalleryButton");
    removeGalleryButton.innerHTML = "Supprimer la galerie";
    modalFooter.appendChild(addPhotoButton);
    modalFooter.appendChild(removeGalleryButton);


    // Ajout d'un événement click sur le bouton "Fermer"
    closeButton.addEventListener("click", function () {
        modal.style.display = "none";
    });






    // Ajout d'un événement click sur le bouton "Modifier"
    const figEditBtn = document.querySelector("#portfolio h2 button");
    figEditBtn.addEventListener("click", function () {
        clearModalContent(); 
        modal.style.display = "block";
        displayArticlesInModal();
    });

    // Ajout de la modal au body
    document.body.appendChild(modal);
}

//fonction qui permet de vider la modal 
function clearModalContent() {
    const modalBody = document.querySelector('.modalBody');
    while (modalBody.firstChild) {
        modalBody.removeChild(modalBody.firstChild);
    }
}

//fonction qui appel les acticles dans la modal
function displayArticlesInModal() {
    const modalBody = document.querySelector('.modalBody');

    fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .then(works => {
            works.forEach(work => {
                const article = document.createElement('article');
                const figure = document.createElement('figure');
                const image = document.createElement('img');
                // const figcaption = document.createElement('figcaption');
                const h3 = document.createElement('h3');
                const deleteWorkBtn = document.createElement('button');
                deleteWorkBtn.classList.add("deleteWorkBtn");
                const editWorkBtn = document.createElement('button');
                editWorkBtn.classList.add("editWorkBtn");

                image.src = work.imageUrl;
                // figcaption.textContent = work.title;
                deleteWorkBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
                deleteWorkBtn.addEventListener('click', () => {
                    deleteWorkBtn(work.id);
                    article.remove();
                });

                editWorkBtn.textContent = 'Éditer';
                editWorkBtn.addEventListener('click', () => {

                });


                figure.appendChild(image);
                // figure.appendChild(figcaption);
                article.appendChild(figure);
                article.appendChild(deleteWorkBtn);
                article.appendChild(editWorkBtn);

                modalBody.appendChild(article);
            });
        })
        .catch(error => {
            console.error('Une erreur est survenue lors de la récupération des articles:', error);
        });
}



