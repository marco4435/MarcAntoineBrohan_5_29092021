// EN -- Constants importation.
// FR -- Importation des constantes.
import {kanapsInLocalStorage, urlOrder} from "./const.js";

main();
// EN -- 1 - Localstorage importation into an array. 2 - If the basket includes at least one item, display it. 3 - Calculation and display of the quantity of items in the cart and the cart price.
// FR -- 1 - Importation du localstorage dans un tableau. 2 - Si le panier comprend au moins un élément, affichage de celui-ci. 3 - Calcul et affichage de la quantité d'articles présents dans le panier et du prix du panier.
// EN -- 4 - Functions for deleting an article and modifying the quantity of an article. 5 - Function for checking the content of the form, requesting an order number from the API and transferring to the confirmation page.
// FR -- 4 - Fonctions de suppression d'un article et de modification de la quantité d'un article. 5 - Fonction de vérification du contenu du formulaire, de demande d'un numéro de commande aurpès de l'API et de transfert vers la page confirmation.
async function main(){
    let newkanapsInLocalStorage = kanapsInLocalStorage;
    if(newkanapsInLocalStorage){
        displayCarts(newkanapsInLocalStorage);
        let TotalQuantity = await getTotalQuantity(newkanapsInLocalStorage);
        let TotalPrice = await getTotalPrice(newkanapsInLocalStorage);
        displayQuantityPrice(TotalQuantity, TotalPrice);
        deleteKanap();
        changeQuantity();
        sendOrder();
    }
}

// EN -- Cart data insertion in the DOM.
// FR -- Insertion des données du pannier dans le DOM.
export function displayCarts(data){
    for(let i = 0; i < data.length; i++){
        let CartItems = document.querySelector("#cart__items");
            
        let productArticle = document.createElement("article");
        CartItems.appendChild(productArticle);
        productArticle.classList.add("cart__item");
    
        let productDiv1 = document.createElement("div");
        productArticle.appendChild(productDiv1);
        productDiv1.classList.add("cart__item__img");
    
        let productImg = document.createElement("img");
        productDiv1.appendChild(productImg);
        productImg.src = data[i].image;
        productImg.alt = "Photographie d'un canapé";

        let productDiv2 = document.createElement("div");
        productArticle.appendChild(productDiv2);
        productDiv2.classList.add("cart__item__content");

        let productDiv2_1 = document.createElement("div");
        productDiv2.appendChild(productDiv2_1);
        productDiv2_1.classList.add("cart__item__content__titlePrice");

        let productH2 = document.createElement("h2");
        productDiv2_1.appendChild(productH2);
        productH2.innerHTML = data[i].name + " - " + data[i].color;

        let productP_Div2_1 = document.createElement("p");
        productDiv2_1.appendChild(productP_Div2_1);
        productP_Div2_1.innerHTML = data[i].price + " €";

        let productDiv2_2 = document.createElement("div");
        productDiv2.appendChild(productDiv2_2);
        productDiv2_2.classList.add("cart__item__content__settings");

        let productDiv2_2_1 = document.createElement("div");
        productDiv2.appendChild(productDiv2_2_1);
        productDiv2_2_1.classList.add("cart__item__content__settings__quantity");

        let productP_Div2_2_1 = document.createElement("p");
        productDiv2_2_1.appendChild(productP_Div2_2_1);
        productP_Div2_2_1.innerHTML = "Quantité : ";

        let productInput = document.createElement("input");
        productDiv2_2_1.appendChild(productInput);
        productInput.classList.add("itemQuantity");
        productInput.type = "number";
        productInput.name = "itemQuantity";
        productInput.min = "1";
        productInput.max = "100";
        productInput.value = data[i].quantity;

        let productDiv2_2_2 = document.createElement("div");
        productDiv2_2.appendChild(productDiv2_2_2);
        productDiv2_2_2.classList.add("cart__item__content__settings__delete");
            
        let productP_Div2_2_2 = document.createElement("p");
        productDiv2_2_2.appendChild(productP_Div2_2_2);
        productP_Div2_2_2.classList.add("deleteItem");
        productP_Div2_2_2.innerHTML = "Supprimer";  
    }
}

// EN -- Item quantity calculation in the cart.
// FR -- Calcul de la quantité d'articles présente dans le panier.
export function getTotalQuantity(data){
    let TotalQuantity = 0;
    for(let i = 0; i < data.length; i++){
        TotalQuantity = TotalQuantity + parseInt(data[i].quantity);
    }
    return TotalQuantity;
}

// EN -- Cart price calculation.
// FR -- Calcul du prix du panier.
export function getTotalPrice(data){
    let TotalPrice = 0;
    for(let i = 0; i < data.length; i++){
        TotalPrice = TotalPrice + parseInt(data[i].price) * parseInt(data[i].quantity);
    }
    return TotalPrice;
}

// EN -- Display of the items quantity in the cart and the cart price.
// FR -- Affichage de la quantité d‘articles présents dans le panier et du prix du panier.
export function displayQuantityPrice(data1, data2){
    let TotalQuantity = document.querySelector("#totalQuantity");
    TotalQuantity.innerHTML = data1;
    let TotalPrice = document.querySelector("#totalPrice");
    TotalPrice.innerHTML = data2;
}

// EN -- By clicking on the "Delete" button, the item is removed from the cart.
// FR -- Au clic sur le boutton "Supprimer", retrait de l'article du panier.
export function deleteKanap(){
    let deleteKanap = document.querySelectorAll(".deleteItem");
    let newkanapsInLocalStorage = kanapsInLocalStorage;
    for (let i = 0; i < deleteKanap.length; i++) {
        deleteKanap[i].addEventListener('click', (event) => {
            newkanapsInLocalStorage.splice(i, 1);
            let articles = document.querySelectorAll(".cart__item");
            let child = articles[i];
            child.parentNode.removeChild(child);
            let TotalQuantity = getTotalQuantity(newkanapsInLocalStorage);
            let TotalPrice = getTotalPrice(newkanapsInLocalStorage);
            displayQuantityPrice(TotalQuantity, TotalPrice);
            localStorage.setItem("kanapsToOrder", JSON.stringify(newkanapsInLocalStorage));
        })
    }
}

// EN -- At each quantity change, modification of the cart quantity.
// FR -- À chaque changement de quantité, modification de la quantité dans le panier.
export function changeQuantity(){
    let changeQuantity = document.querySelectorAll(".itemQuantity");
    let newkanapsInLocalStorage = kanapsInLocalStorage;
    for(let i = 0; i < changeQuantity.length; i++){
        changeQuantity[i].addEventListener('change', (event) => {
            let NewQuantity = event.target.value;
            let newkanapAdded = {
                id: newkanapsInLocalStorage[i].id,
                quantity: parseFloat(NewQuantity).toString(),
                color: newkanapsInLocalStorage[i].color,
                image: newkanapsInLocalStorage[i].image,
                name: newkanapsInLocalStorage[i].name,
                price: newkanapsInLocalStorage[i].price,
            };
            newkanapsInLocalStorage[i] = newkanapAdded;
            let TotalQuantity = getTotalQuantity(newkanapsInLocalStorage);
            let TotalPrice = getTotalPrice(newkanapsInLocalStorage);
            displayQuantityPrice(TotalQuantity, TotalPrice);
            localStorage.setItem("kanapsToOrder", JSON.stringify(newkanapsInLocalStorage));
        })
    }
}

// EN -- By Clicking on the "Order" button, check that the form has been correctly completed, retrieve an order ID from the API and transfer to the confirmation page.
// FR -- Au clic sur le boutton "Commander", vérification du bon remplissage du formulaire, récupération d'un ID de commande auprès de l'API et transfert vers la page confirmation.
export function sendOrder(){
    let order = document.getElementById("order");
    order.addEventListener('click', (event) => {
        let contact = {
            firstName: document.querySelector("#firstName").value,
            lastName: document.querySelector("#lastName").value,
            address: document.querySelector("#address").value,
            city: document.querySelector("#city").value,
            email: document.querySelector("#email").value,
        }
        let products = kanapsInLocalStorage.map(obj => obj.id);
        if(validation(contact)){
            fetch(urlOrder, {
                method: "POST",
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({contact, products}),
            })
            .then((response) => response.json())
            .then((id) => {
                localStorage.clear();
                document.location.href = `confirmation.html?id=${id.orderId}`;
            })
        }
    })
}

// EN -- Check that the form has been correctly completed.
// FR -- Vérification du bon remplissage du formulaire.
function validation(data){
    let firstNameTest;
    let lastNameTest;
    let addressTest;
    let cityTest;
    let emailTest;
    let firstName = data.firstName;
    let lastName = data.lastName;
    let address = data.address;
    let city = data.city;
    let email = data.email;
    let name_cityRegex = /^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s]{3,}$/;
    let adressRegex = /^[-'a-zA-Z0-9À-ÖØ-öø-ÿ\s]{3,}$/;
    let emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    if(firstName.length > 1 && name_cityRegex.test(firstName)){
        firstNameTest = true;
    }
    else{
        firstNameTest = false;
        let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
        firstNameErrorMsg.innerText = "Votre prénom doit contenir au moins 2 caractères.";
        firstNameErrorMsg.style.color = "red";
    }
    if(lastName.length > 1 && name_cityRegex.test(lastName)){
        lastNameTest = true;
    }
    else{
        lastNameTest = false;
        let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
        lastNameErrorMsg.innerText = "Votre nom de famille doit contenir au moins 2 caractères.";
        lastNameErrorMsg.style.color = "red";
    }
    if(address.length > 1 && adressRegex.test(address)){
        addressTest = true;
    }
    else{
        addressTest = false;
        let addressErrorMsg = document.getElementById("addressErrorMsg");
        addressErrorMsg.innerText = "Votre adresse doit contenir au moins 2 caractères.";
        addressErrorMsg.style.color = "red";
    }
    if(city.length > 1 && name_cityRegex.test(city)){
        cityTest = true;
    }
    else{
        cityTest = false;
        let cityErrorMsg = document.getElementById("cityErrorMsg");
        cityErrorMsg.innerText = "Votre ville doit contenir au moins 2 caractères.";
        cityErrorMsg.style.color = "red";
    }
    if(email.length > 1 && emailRegex.test(email)){
        emailTest = true;
    }
    else{
        emailTest = false;
        let emailErrorMsg = document.getElementById("emailErrorMsg");
        emailErrorMsg.innerText = "Votre email doit contenir au moins 2 caractères et un @.";
        emailErrorMsg.style.color = "red";
    }
    if(firstNameTest === true && lastNameTest === true && addressTest === true && cityTest === true && emailTest === true){
        return true;
    }
    else{
        return false;
    }
}