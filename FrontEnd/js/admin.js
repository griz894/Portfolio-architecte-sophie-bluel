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

    // Ajout d'un événement click sur le bouton "Modifier"
    const figEditBtn = document.querySelector("#portfolio h2 button");
    figEditBtn.addEventListener("click", function () {
        // Appel de la fonction createModal quand le bouton "Modifier" est cliqué
        let modal = document.getElementsByClassName('modal')[0];
        if (!modal) {
            createModal();
            modal = document.querySelector('.modal');
            clearModalBody();
        } else {
            clearModal();
            createModal();
        }
        modal.style.display = "block";
        displayArticlesInModal();
    });
}
//mode edition OFF
function removeFigEdit() {
    const projets = document.querySelector("#portfolio h2");
    const figEditBtn = projets.getElementsByTagName("button")[0];
    if (figEditBtn !== null) {
        projets.removeChild(figEditBtn);
    }
}

//fonction qui post les data du form sur mon API
async function postAPI(title, imageUrl, categoryId) {
    const worksApiUrl = 'http://localhost:5678/api/works';
    const formData = new FormData();
    const token = localStorage.getItem('token');

    formData.append('image', imageUrl);
    formData.append('title', title);
    formData.append('category', categoryId);

    const response = await fetch(worksApiUrl, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: formData
    });

    if (!response.ok) {
        alert(`Erreur de la mise à jour de l'API : ${response.statusText}`);
    }
    return await response.json();
}

//fonction qui suppr les data du form sur mon API
async function deleteWorkById(workId) {
    const worksApiUrl = `http://localhost:5678/api/works/${workId}`;
    const token = localStorage.getItem('token');

    const response = await fetch(worksApiUrl, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        alert(`Erreur de la mise à jour de l'API : ${response.statusText}`);
    }

    const result = await response.text();
    if (result) {
        return JSON.parse(result);
    }
    return {};
}

//fonction permettant de créer la modal
function createModal() {
    let modal = document.querySelector('.modal');
    if (modal === null) {
        modal = document.createElement("div");
        modal.classList.add("modal");
    }

    // Ajout du contenu à la modal
    let modalContent = document.querySelector('.modalContent');
    if (modalContent === null) {
        modalContent = document.createElement("div");
        modalContent.classList.add("modalContent");
    }

    modal.appendChild(modalContent);
    //ajout du body a la modal
    let modalBody = document.querySelector('.modalBody');
    if (modalBody === null) {
        modalBody = document.createElement("div");
        modalBody.classList.add("modalBody");
    }

    modalContent.appendChild(modalBody);

    // Ajout du titre "Galerie photo"
    let modalHeader = document.querySelector('.modalHeader');
    if (modalHeader === null) {
        modalHeader = document.createElement("div");
        modalHeader.classList.add("modalHeader");
    }

    let title = document.querySelector('.title');
    if (title === null) {
        title = document.createElement("h3");
        title.textContent = "Galerie photo";
    }

    modalHeader.appendChild(title);
    modalContent.insertBefore(modalHeader, modalBody);

    // Ajout d'une croix pour fermer la modal
    let closeButton = document.querySelector('.closeButton');
    if (closeButton === null) {
        closeButton = document.createElement("button");
        closeButton.classList.add("closeButton");
        closeButton.innerHTML = "&times;";
    }
    modalContent.insertBefore(closeButton, modalHeader);

    // Ajout du footer et des deux boutons
    let modalFooter = document.querySelector('.modalFooter');
    if (modalFooter === null) {
        modalFooter = document.createElement('div');
        modalFooter.classList.add('modalFooter');
    }
    modalContent.appendChild(modalFooter);

    let addPhotoButton = document.querySelector('.addPhotoButton');
    if (addPhotoButton === null) {
        addPhotoButton = document.createElement('button');
        addPhotoButton.classList.add('addPhotoButton');
        addPhotoButton.innerHTML = "Ajouter une photo";
    }
    modalFooter.appendChild(addPhotoButton);

    let removeGalleryButton = document.querySelector('.removeGalleryButton');
    if (removeGalleryButton === null) {
        removeGalleryButton = document.createElement('button');
        removeGalleryButton.classList.add('removeGalleryButton');
        removeGalleryButton.innerHTML = "Supprimer la galerie";
    }
    modalFooter.appendChild(removeGalleryButton);

    addPhotoButton.addEventListener("click", function () {
        clearModal();
        displayEditModal();
    });

    // Ajout d'un événement click sur le bouton "Fermer"
    closeButton.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Ajout de la modal au body
    document.body.appendChild(modal);
}

//fonction qui permet de vider le body de la modal 
function clearModalBody() {
    const modalBody = document.querySelector('.modalBody');
    while (modalBody.firstChild) {
        modalBody.removeChild(modalBody.firstChild);
    }
}

//fonction qui permet de vider la modal entière
function clearModal() {
    const modalContent = document.querySelector('.modalContent');
    while (modalContent.firstChild) {
        modalContent.removeChild(modalContent.firstChild);
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
                const deleteWorkBtn = document.createElement('button');
                deleteWorkBtn.classList.add("deleteWorkBtn");
                const editWorkBtn = document.createElement('button');
                editWorkBtn.classList.add("editWorkBtn");

                image.src = work.imageUrl;
                // figcaption.textContent = work.title;
                deleteWorkBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
                deleteWorkBtn.addEventListener('click', (event) => {
                    event.preventDefault();
                    deleteWorkById(work.id);
                    article.remove();
                });

                editWorkBtn.textContent = 'éditer';
                editWorkBtn.addEventListener('click', () => {
                    clearModal();
                    displayEditModal();
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
            console.error('Une erreur est survenue lors de la récupération des articles :', error);
        });
}

function displayEditModal() {
    // Création de la modal

    const modalEdit = document.querySelector('.modal');
    modalEdit.style.display = 'block';
    // Ajout du contenu à la modal
    let modalContent = document.querySelector('.modalContent');
    if (modalContent === null) {
        modalContent = document.createElement("div");
        modalContent.classList.add("modalContent");
    }
    modalEdit.appendChild(modalContent);

    let modalButton = document.querySelector('.modalButton');
    if (modalButton === null) {
        modalButton = document.createElement("div");
        modalButton.classList.add("modalButton");
    }

    //ajout du body a la modal
    let modalBody = document.querySelector('.modalBody');
    if (modalBody === null) {
        modalBody = document.createElement("div");
        modalBody.classList.add("modalBody");
    }
    modalContent.appendChild(modalBody);


    let modalEditHeader = document.querySelector('.modalEditHeader');
    if (modalEditHeader === null) {
        modalEditHeader = document.createElement("div");
        modalEditHeader.classList.add("modalEditHeader");
    }

    let title = document.querySelector('modalEditHeader', 'h3');
    if (title === null) {
        title = document.createElement("h3");
        title.textContent = "Ajout photo";
    }

    modalEditHeader.appendChild(title);
    modalContent.insertBefore(modalEditHeader, modalContent.firstChild);

    modalContent.insertBefore(modalButton, modalEditHeader);



    let returnButton = document.querySelector('.returnButton');
    if (returnButton === null) {
        returnButton = document.createElement("button");
        returnButton.classList.add("returnButton");
        returnButton.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
    }


    // Ajout d'une croix pour fermer la modal
    let closeButton = document.querySelector('.closeButton');
    if (closeButton === null) {
        closeButton = document.createElement("button");
        closeButton.classList.add("closeButton");
        closeButton.innerHTML = '&times;';
    }
    modalButton.appendChild(returnButton);
    modalButton.appendChild(closeButton);


    // Ajout du footer et du boutons valider
    let modalEditFooter = document.querySelector('modalEditFooter');
    if (modalEditFooter === null) {
        modalEditFooter = document.createElement('div');
        modalEditFooter.classList.add('modalEditFooter')
    }
    modalContent.appendChild(modalEditFooter);


    // ajout d'un événement click sur le bouton retour, pour recharger la modal précédente.
    returnButton.addEventListener("click", function () {
        // Appel de la fonction createModal quand le bouton "Modifier" est cliqué
        let modal = document.querySelector('.modal');
        if (!modal) {
            createModal();
            clearModalBody();
        } else {
            clearModal();
            createModal();
        }
        modal = document.getElementsByClassName('modal')[0];
        modal.style.display = "block";
        displayArticlesInModal();
    });
    // Ajout d'un événement click sur le bouton "Fermer"
    closeButton.addEventListener("click", function () {
        modalEdit.style.display = "none";
    });


    let addPhotoForm = document.querySelector('addPhotoForm');
    if (addPhotoForm === null) {
        addPhotoForm = document.createElement("form");
        addPhotoForm.classList.add("addPhotoForm");
    }

    modalBody.appendChild(addPhotoForm)

    let validerButton = document.querySelector('.validerButton');
    if (validerButton === null) {
        validerButton = document.createElement("button");
        validerButton.classList.add("validerButton");
        validerButton.innerHTML = "Valider";
    }

    modalEditFooter.appendChild(validerButton);
    const addPhotoDiv = document.createElement('div');
    addPhotoDiv.classList.add("addPhotoDiv")
    addPhotoForm.appendChild(addPhotoDiv);

    // Ajout de l'icone font awesome
    const addPhotoIcon = document.createElement('i');
    addPhotoIcon.innerHTML = '<i class="fa-sharp fa-regular fa-image"></i>';
    addPhotoDiv.appendChild(addPhotoIcon);
    // Ajout du bouton pour ajouter une photo
    const addPhotoButton = document.createElement('button');
    addPhotoButton.type = 'button';
    addPhotoButton.textContent = '+ Ajouter une photo';
    addPhotoDiv.appendChild(addPhotoButton);

    // Ajout de l'input pour la photo
    const photoInput = document.createElement('input');
    photoInput.type = 'file';
    photoInput.name = 'photo';
    photoInput.style.display = 'none';
    addPhotoForm.appendChild(photoInput);

    // Ajout du text sous le bouton ajouter
    const addPhotoInfo = document.createElement('p');
    addPhotoInfo.classList.add('addPhotoInfo');
    addPhotoInfo.textContent = "jpg, png : 4mo max";
    addPhotoDiv.appendChild(addPhotoInfo);

    // Ajout de l'input pour le titre
    const titreDiv = document.createElement('div');
    addPhotoForm.appendChild(titreDiv);

    const titreLabel = document.createElement('label');
    titreLabel.textContent = 'Titre :';
    titreDiv.appendChild(titreLabel);

    const titreInput = document.createElement('input');
    titreInput.type = 'text';
    titreInput.name = 'titre';
    // titreInput.value = 'toto'; 
    titreDiv.appendChild(titreInput);

    // Ajout de l'input pour la catégorie
    const categorieDiv = document.createElement('div');
    addPhotoForm.appendChild(categorieDiv);

    const categorieLabel = document.createElement('label');
    categorieLabel.textContent = 'Catégorie :';
    categorieDiv.appendChild(categorieLabel);

    const categorieSelect = document.createElement('select');
    categorieSelect.name = 'categorie';
    categorieDiv.appendChild(categorieSelect);

    // Ajout des options de la catégorie
    const categorieOption1 = document.createElement('option');
    categorieOption1.value = '1';
    categorieOption1.textContent = '1 - Objets';
    categorieSelect.appendChild(categorieOption1);

    const categorieOption2 = document.createElement('option');
    categorieOption2.value = '2';
    categorieOption2.textContent = '2 - Appartements';
    categorieSelect.appendChild(categorieOption2);

    const categorieOption3 = document.createElement('option');
    categorieOption3.value = '3';
    categorieOption3.textContent = '3 - Hotels & restaurants';
    categorieSelect.appendChild(categorieOption3);

    // Ajout de l'écouteur d'événement pour le bouton de la photo
    addPhotoButton.addEventListener('click', function () {
        photoInput.click();
    });


    validerButton.addEventListener("click", function (event) {
        // Empêcher le comportement par défaut du clic sur un bouton dans un formulaire
        event.preventDefault();
        event.stopPropagation();

        // Appel de la méthode submit du formulaire addPhotoForm pour déclencher l'événement "submit"
        submitForm();
    });
}

//fonction qui récup les données des champs pour les envoyé a la function postAPI
async function submitForm() {

    const photoInput = document.querySelector('input[name="photo"]');
    const titreInput = document.querySelector('input[name="titre"]');
    const categorieSelect = document.querySelector('select[name="categorie"]');

    const formData = new FormData();
    formData.append('imageUrl', photoInput.files[0]);
    formData.append('title', titreInput.value);
    formData.append('categoryId', categorieSelect.value);

    try {

        await postAPI(formData.get('title'), formData.get('imageUrl'), formData.get('categoryId'));
    } catch (error) {
        alert(error);
        // Gérer l'erreur, par exemple afficher un message d'erreur
    }
};