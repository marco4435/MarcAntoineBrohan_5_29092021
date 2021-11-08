// EN -- Constants importation. 
// FR -- Importation des constantes.
import {idKanap, kanapsInLocalStorage, urlOrder} from "./const.js";


// GENERAL FUNCTIONS / FONCTIONS GÉNÉRALES / FUNZIONI GENERALI.


// EN -- 1 - API's data importation.           2 - Json format data conversion.           3 - Display of an alert in case of import failure.
// FR -- 1 - Importation des données de l'API. 2 - Conversion des données au format Json. 3 - Affichage d'une alerte en cas d'échec de l'importation.
export function getAPIdata(data){
    return fetch(data)
    .then((response) => response.json())
    .catch(function(error) {
        console.log("Le chargement de l'API n'a pas fonctionné.");
    });
}


// INDEX


// EN -- 1 - FOR loop displaying as many articles as there are in the API.  2 - Associated data insertion into the DOM.
// FR -- 1 - Boucle FOR affichant autant d'articles qu'il y en a dans l'API. 2 - Insertion des données associées dans le DOM.
export function displayKanaps(data){
    for(let i = 0; i < data.length; i++){
        let productCard = document.querySelector(".items");
                
        let productLink = document.createElement("a");
        productCard.appendChild(productLink);
        productLink.href = "front/product.html?id="+data[i]._id;
        productLink.title = data[i].description;
            
        let productArticle = document.createElement("article");
        productLink.appendChild(productArticle);
            
        let productImg = document.createElement("img");
        productArticle.appendChild(productImg);
        productImg.src = data[i].imageUrl;
        productImg.alt = data[i].altTxt;
            
        let productH3 = document.createElement("h3");
        productArticle.appendChild(productH3);
        productH3.classList.add("productName");
        productH3.innerHTML = data[i].name;
            
        let productP = document.createElement("p");
        productArticle.appendChild(productP);
        productP.classList.add("productDescription");
        productP.innerHTML = data[i].description;
    }
}


// PRODUCT


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
            id: idKanap,
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

// CART

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

export function getTotalQuantity(data){
    let TotalQuantity = 0;
    for(let i = 0; i < data.length; i++){
        TotalQuantity = TotalQuantity + parseInt(data[i].quantity);
    }
    return TotalQuantity;
}

export function getTotalPrice(data){
    let TotalPrice = 0;
    for(let i = 0; i < data.length; i++){
        TotalPrice = TotalPrice + parseInt(data[i].price) * parseInt(data[i].quantity);
    }
    return TotalPrice;
}

export function displayQuantityPrice(data1, data2){
    let TotalQuantity = document.querySelector("#totalQuantity");
    TotalQuantity.innerHTML = data1;
    let TotalPrice = document.querySelector("#totalPrice");
    TotalPrice.innerHTML = data2;
}

export function deleteKanap(){
    let deleteKanap = document.querySelectorAll(".deleteItem");
    let newkanapsInLocalStorage = kanapsInLocalStorage;
    for (let i = 0; i < deleteKanap.length; i++) {
        deleteKanap[i].addEventListener('click', (event) => {
            event.preventDefault();
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

export function changeQuantity(){
    let changeQuantity = document.querySelectorAll(".itemQuantity");
    let newkanapsInLocalStorage = kanapsInLocalStorage;
    for(let i = 0; i < changeQuantity.length; i++){
        changeQuantity[i].addEventListener('change', (event) => {
            event.preventDefault();
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

export function sendOrder(){
    let order = document.getElementById('order');
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
            alert("if");
            fetch(urlOrder, {
                method: "POST",
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({contact, products}),
            })
            .then((response) => response.json())
            .then((id) => {
                document.location.href = `confirmation.html?id=${id.orderId}`;
            })
        }
    })
}

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

// CONFIRMATION

export function displayOrderId(data){
    let orderId = document.getElementById("orderId");
    orderId.innerText = data;
}