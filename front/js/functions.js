// EN -- Constants importation. 
// FR -- Importation des constantes.
// IT -- Importazione di costanti.
import {idKanap, kanapsInLocalStorage, urlOrder} from "./const.js";


// GENERAL FUNCTIONS / FONCTIONS GÉNÉRALES / FUNZIONI GENERALI.


// EN -- 1 - API's data importation.           2 - Json format data conversion.           3 - Display of an alert in case of import failure.
// FR -- 1 - Importation des données de l'API. 2 - Conversion des données au format Json. 3 - Affichage d'une alerte en cas d'échec de l'importation.
// IT -- 1 - Importazione di dati API.         2 - Conversione dati in formato Json.      3 - Visualizza un avviso se l'importazione non riesce.
export function getAPIdata(APIdata){
    return fetch(APIdata)
    .then(function(response){
        return response.json();
    })
    .catch(function(error) {
        console.log("Le chargement de l'API n'a pas fonctionné.");
    });
}


// INDEX.


// EN -- 1 - FOR loop displaying as many articles as there are in the API.  2 - Associated data insertion into the DOM.
// FR -- 1 - Boucle FOR affichant autant d'articles qu'il y en a dans l'API. 2 - Insertion des données associées dans le DOM.
// IT -- 1 - Ciclo FOR che monstra tanti articoli quanti nell'API.           2 - Inserimento dei dati associati nel DOM.
export function displayKanaps(kanap){
    for(let i = 0; i < kanap.length; i++){
        let productCard = document.querySelector(".items");
                
        let productLink = document.createElement("a");
        productCard.appendChild(productLink);
        productLink.href = "front/product.html?id="+kanap[i]._id;
        productLink.title = kanap[i].description;
            
        let productArticle = document.createElement("article");
        productLink.appendChild(productArticle);
            
        let productImg = document.createElement("img");
        productArticle.appendChild(productImg);
        productImg.src = kanap[i].imageUrl;
        productImg.alt = kanap[i].altTxt;
            
        let productH3 = document.createElement("h3");
        productArticle.appendChild(productH3);
        productH3.classList.add("productName");
        productH3.innerHTML = kanap[i].name;
            
        let productP = document.createElement("p");
        productArticle.appendChild(productP);
        productP.classList.add("productDescription");
        productP.innerHTML = kanap[i].description;
    }
}


// PRODUCT.

// EN -- Selected article data insertion in the DOM.
// FR -- Insertion des données de l'article sélectionné dans le DOM.
// IT -- Inserimento dei dati dell'articolo selezionato nel DOM.
export function displayKanap(kanap){
    let ItemImg = document.querySelector(".item__img");
    let Img = document.createElement("img");
    ItemImg.appendChild(Img);
    Img.src = kanap.imageUrl;
    Img.alt = kanap.altTxt;
    
    let Title = document.querySelector("#title");
    Title.innerHTML = kanap.name;

    let Price = document.querySelector("#price");
    Price.innerHTML = kanap.price;

    let Description = document.querySelector("#description");
    Description.innerHTML = kanap.description;

    let Color = document.querySelector("#colors");
    for (let i = 0; i < kanap.colors.length; i++){
        let Option = document.createElement("option");
        Option.innerText = kanap.colors[i];
        Option.value = kanap.colors[i];
        Color.appendChild(Option);
    }
}

// EN -- 1 - By clicking on "Add to basket", temporary recording of the data entered. 2 - Copy of the localstorage locally if it is not empty.
// EN -- 3 - Adding the item to the cart. If it is already in the basket, only the quantity is incremented. 4 - Update of localstorage.
// FR -- 1 - Au clic sur "Ajouter au panier", enregistrement temporaire des données saisies. 2 - Copie du localstorage localement si celui-ci n'est pas vide.
// FR -- 3 - Ajout de l'article au panier. S'il est déjà présent dans le panier, seule la quantité est incrémentée. 4 - Mise à jour du localstorage.
// IT -- 1 - Cliccando su "Aggiungi al carrello", registrazione temporanea dei dati inseriti. 2 - Copia localstorage localmente se non è vuoto.
// IT -- 3 - Aggiunta dell'articolo al carrello. Se è già nel carrello, viene incrementata solo la quantità. 4 - Aggiornamento del localstorage.
export function addToCart(kanap){
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
            image: kanap.imageUrl,
            name: kanap.name,
            price: kanap.price.toString(),
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

// CART.

// 1 - Creation of a loop allowing to display as many articles as there are in the cart. - Création d'une boucle permettant d'afficher autant d'articles qu'il y en a dans le panier.
// 2 - For each article, integration of its own datas. - Pour chaque article, intégration de ses propres données.
export function displayCarts(){
    for(let i = 0; i < kanapsInLocalStorage.length; i++){
        let CartItems = document.querySelector("#cart__items");
            
        let productArticle = document.createElement("article");
        CartItems.appendChild(productArticle);
        productArticle.classList.add("cart__item");
    
        let productDiv1 = document.createElement("div");
        productArticle.appendChild(productDiv1);
        productDiv1.classList.add("cart__item__img");
    
        let productImg = document.createElement("img");
        productDiv1.appendChild(productImg);
        productImg.src = kanapsInLocalStorage[i].image;
        productImg.alt = "Photographie d'un canapé";

        let productDiv2 = document.createElement("div");
        productArticle.appendChild(productDiv2);
        productDiv2.classList.add("cart__item__content");

        let productDiv2_1 = document.createElement("div");
        productDiv2.appendChild(productDiv2_1);
        productDiv2_1.classList.add("cart__item__content__titlePrice");

        let productH2 = document.createElement("h2");
        productDiv2_1.appendChild(productH2);
        productH2.innerHTML = kanapsInLocalStorage[i].name + " - " + kanapsInLocalStorage[i].color;

        let productP_Div2_1 = document.createElement("p");
        productDiv2_1.appendChild(productP_Div2_1);
        productP_Div2_1.innerHTML = kanapsInLocalStorage[i].price + " €";

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
        productInput.value = kanapsInLocalStorage[i].quantity;

        let productDiv2_2_2 = document.createElement("div");
        productDiv2_2.appendChild(productDiv2_2_2);
        productDiv2_2_2.classList.add("cart__item__content__settings__delete");
            
        let productP_Div2_2_2 = document.createElement("p");
        productDiv2_2_2.appendChild(productP_Div2_2_2);
        productP_Div2_2_2.classList.add("deleteItem");
        productP_Div2_2_2.innerHTML = "Supprimer";  
    }
}

// Creation of a loop summing the quantities of each row of the localstorage. - Création d'une boucle effectuant la somme des quantités de chaque ligne du localstorage.
export function getTotalQuantity(){
    let TotalQuantity = 0;
    for(let i = 0; i < kanapsInLocalStorage.length; i++){
        TotalQuantity = TotalQuantity + parseInt(kanapsInLocalStorage[i].quantity);
    }
    return TotalQuantity;
}

// Display of the articles's quantity in the cart. - Affichage de la quantité d'articles présents dans le panier.
export function displayTotalQuantity(TotalQuantity){
    let TotalQuantity2 = document.querySelector("#totalQuantity");
    TotalQuantity2.innerHTML = TotalQuantity;
}

// Creation of a loop summing the prices of each row of the localstorage. - Création d'une boucle effectuant la somme des prix de chaque ligne du localstorage.
export function getTotalPrice(){
    let TotalPrice = 0;
    for(let i = 0; i < kanapsInLocalStorage.length; i++){
        TotalPrice = TotalPrice + parseInt(kanapsInLocalStorage[i].price) * parseInt(kanapsInLocalStorage[i].quantity);
    }
    return TotalPrice;
}

// Display of the all items price in the cart. - Affichage du prix de l'ensemble des articles du panier.
export function displayTotalPrice(TotalPrice){
    let TotalPrice2 = document.querySelector("#totalPrice");
    TotalPrice2.innerHTML = TotalPrice;
}

// 1 - Localstorage integration into newkanapsInLocalStorage array. - Intégration du localstorage au tableau newkanapsInLocalStorage.
// 2 - For each click on "Supprimer" button, the newkanapsInLocalStorage line getting the concerned article id deleted and display is update. - Pour chaque clic sur le bouton "Supprimer", la ligne dans newkanapsInLocalStorage comprenant l'article concercé est supprimée et l'affichage est mis à jour.
// 3 - For each input "Quantité" quantity modified, the newkanapsInLocalStorage line getting the concerned article id modified. - Pour chaque quantité modifiée dans l'input "Quantité", la ligne dans newkanapsInLocalStorage comprenant l'article concercé est modifiée.
// 4 - newkanapsInLocalStorage integration into localstorage. - Intégration de newkanapsInLocalStorage au localstorage.
export function modifyCart(){
    let deleteKanap = document.querySelectorAll(".deleteItem");
    let newkanapsInLocalStorage = kanapsInLocalStorage;
    for (let i = 0; i < deleteKanap.length; i++) {
        deleteKanap[i].addEventListener('click', (event) => {
            event.preventDefault();
            newkanapsInLocalStorage.splice(i, 1);
            localStorage.setItem("kanapsToOrder", JSON.stringify(newkanapsInLocalStorage));
            let articles = document.querySelectorAll(".cart__item");
            let child = articles[i];
            child.parentNode.removeChild(child);
            let TotalQuantity = getTotalQuantity();
            displayTotalQuantity(TotalQuantity);
            let TotalPrice = getTotalPrice();
            displayTotalPrice(TotalPrice);
        })
    }
    let changeQuantity = document.querySelectorAll(".itemQuantity");
    for(let i = 0; i < changeQuantity.length; i++){
        changeQuantity[i].addEventListener('change', (event) => {
            event.preventDefault();
            let NewQuantity = event.target.value;
            let newkanapAdded = {
                id: kanapsInLocalStorage[i].id,
                quantity: parseFloat(NewQuantity),
                color: kanapsInLocalStorage[i].color,
                image: kanapsInLocalStorage[i].image,
                name: kanapsInLocalStorage[i].name,
                price: kanapsInLocalStorage[i].price,
            };
            newkanapsInLocalStorage[i] = newkanapAdded;
            localStorage.setItem("kanapsToOrder", JSON.stringify(newkanapsInLocalStorage));
        })
    }
}

export function sendOrder(){
    const order = document.getElementById('order');
    order.addEventListener('click', (event) => {
        event.preventDefault();
        let contact = {
            firstName: document.querySelector("#firstName").value,
            lastName: document.querySelector("#lastName").value,
            address: document.querySelector("#address").value,
            city: document.querySelector("#city").value,
            email: document.querySelector("#email").value,
        }
        let products = kanapsInLocalStorage;
        let contactProducts = {
            contact,
            products,
        }
        if(validation(contact)){
            fetch(urlOrder, {
                method: "POST",
                // mode: 'cors',
                // credentials: 'same-origin',
                headers: { Accept: 'application/json', 'Content-Type': 'application/json',},
                body: JSON.stringify(contactProducts),
            })
            .then((response) =>{
                console.log("response", response);
            })
            // .then((data) => {
            //     console.log(data);
            //     // document.location.href = `confirmation.html?id=${data.orderId}`;
            // })
        }
    })
}

export function validation(contact){
    let firstName = contact.firstName;
    let lastName = contact.lastName;
    let address = contact.address;
    let city = contact.city;
    let email = contact.email;
    let name_cityRegex = /^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s]{3,}$/;
    let adressRegex = /^[-'a-zA-Z0-9À-ÖØ-öø-ÿ\s]{3,}$/;
    let emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    if(
       firstName.length > 1
    && name_cityRegex.test(firstName)
    && lastName.length > 1
    && name_cityRegex.test(lastName)
    && address.length > 1
    && adressRegex.test(address)
    && city.length > 1
    && name_cityRegex.test(city)
    && email.length > 1
    && emailRegex.test(email)
    ){
        return true;
    } 
    else {
        return false;
    }
}