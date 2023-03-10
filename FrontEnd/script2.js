//defini var pour urlapi
const urlAPIWorks = "http://localhost:5678/api/works";
const urlAPICat = "http://localhost:5678/api/categories";


fetch(urlAPIWorks)
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    //  creation des balises
    .then(function (value) {
        console.log(value);
        for (let i = o; i < value.lenght; i++) {

            const article = value[i]
            const gallery = document.querySelector(".gallery");
            let figure = document.createElement("figure");
            let img = document.createElement("img");
            let figcaption = document.createElement("figcaption");
            let categoryId = document.createElement("article");

            img.setAttribute("src", value[i].imageUrl);
            img.setAttribute("alt", value[i].title);

            figcaption.innerHTML = value[i].title;

            figure.appendChild(img);
            figure.appendChild(figcaption);
            gallery.appendChild(figure);
        }
    })
    .catch(function (err) {
        console.log("y a une erreur ?");
    });

window.addEventListener('DOMContentLoaded', (value) => {
    const boutonFilterAll = document.querySelector(".galleryFilterAll");
    console.log("TRACE", boutonFilterAll);
    boutonFilterAll.addEventListener("click", function () {
            const objetFiltre = value.filter(function (value) {
            return value.categoryId == "1";
        });
    });
    const boutonFilterItem = document.querySelector(".galleryFilterItem");
    console.log("TRACE", boutonFilterItem);
    boutonFilterItem.addEventListener("click", function () {
            const objetFiltre = value.filter(function (value) {
            return value.categoryId == "1";
        });
    });
    const boutonFilterApt = document.querySelector(".galleryFilterApt");
    console.log("TRACE", boutonFilterApt);
    boutonFilterApt.addEventListener("click", function () {
            const objetFiltre = value.filter(function (value) {
            return value.categoryId == "2";
        });
    });const boutonFilterHotel = document.querySelector(".galleryFilterHotel");
    console.log("TRACE", boutonFilterHotel);
    boutonFilterHotel.addEventListener("click", function () {
            const objetFiltre = value.filter(function (value) {
            return value.categoryId == "3";
        });
    });
});