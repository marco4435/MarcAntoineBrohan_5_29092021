// EN -- 1 - Functions importation. 2 - Constants importation.
// FR -- 1 - Importation des fonctions. 2 - Importation des constantes.
import {getAPIdata} from "./functions.js";
import {idPage, kanapsInLocalStorage, urlKanap} from "./const.js";

main();
// EN -- 1 - Import of API data and conversion to Json format.              2 - Selected article data insertion in the DOM.
// FR -- 1 - Importation des données de l'API et conversion au format Json. 2 - Insertion des données de l'article sélectionné dans le DOM.
async function main(){
    const kanapData = await getAPIdata(urlKanap);
    // console.log("Test 1");
    // console.log(kanapData);
    displayKanap(kanapData);
    addToCart(kanapData);
}

// EN -- Selected article data insertion in the DOM.
// FR -- Insertion des données de l'article sélectionné dans le DOM.
export function displayKanap(data){
    let ItemImg = document.querySelector(".item__img");
    let Img = document.createElement("img");
    ItemImg.appendChild(Img);
    Img.src = data.imageUrl;
    Img.alt = data.altTxt;
    
    let Title = document.querySelector("#title");
    Title.innerHTML = data.name;

    let Price = document.querySelector("#price");
    Price.innerHTML = data.price;

    let Description = document.querySelector("#description");
    Description.innerHTML = data.description;

    let Color = document.querySelector("#colors");
    for (let i = 0; i < data.colors.length; i++){
        let Option = document.createElement("option");
        Option.innerText = data.colors[i];
        Option.value = data.colors[i];
        Color.appendChild(Option);
    }
}

// EN -- 1 - By clicking on "Add to basket", temporary recording of the data entered. 2 - Copy of the localstorage locally if it is not empty.
// EN -- 3 - Adding the item to the cart. If it is already in the basket, only the quantity is incremented. 4 - Update of localstorage.
// FR -- 1 - Au clic sur "Ajouter au panier", enregistrement temporaire des données saisies. 2 - Copie du localstorage localement si celui-ci n'est pas vide.
// FR -- 3 - Ajout de l'article au panier. S'il est déjà présent dans le panier, seule la quantité est incrémentée. 4 - Mise à jour du localstorage.
export function addToCart(data){
    let addToCart = document.querySelector("#addToCart");  
    let kanapsInStorage = [];

    addToCart.addEventListener("click", (event) => {
        event.preventDefault();
        let color = document.querySelector("#colors");
        let kanapColor = color.value;
        let a = 0;
        let kanapAdded = {              
            id: idPage,
            quantity: parseFloat(document.querySelector("#quantity").value).toString(),
            color: kanapColor,
            image: data.imageUrl,
            name: data.name,
            price: data.price.toString(),
        }
        if(kanapsInLocalStorage !== null){
            kanapsInStorage = kanapsInLocalStorage;
        }
        if(kanapsInStorage){
            for(let i = 0; i < kanapsInStorage.length; i++) {
                if(kanapAdded.id === kanapsInStorage[i].id && kanapAdded.color === kanapsInStorage[i].color){
                    let addedQuantity = parseInt(kanapsInStorage[i].quantity) + parseInt(kanapAdded.quantity);
                    a = a + 1;
                    kanapsInStorage[i].quantity = addedQuantity.toString();
                }
            };
            if (a === 0){
                kanapsInStorage.push(kanapAdded);
            }
        }
        else{
            kanapsInStorage.push(kanapAdded);
        }
        localStorage.setItem("kanapsToOrder", JSON.stringify(kanapsInStorage));
    })
}