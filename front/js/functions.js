// Constants importation. - Importation des constantes.
import {url, idKanap, urlKanap, kanapsInLocalStorage} from "./const.js";

// 1 - API loading and json format conversion. - Chargement de l'API et conversion au format json.
// 2 - Display of an alert if the API loading didn't worked. - Affichage d'une alerte si le chargement de l'API n'a pas fonctionné.
export function getArticles(){
    return fetch(url)
        .then(function(response){
            return response.json();
        })
        .catch(function(error) {
            console.log("Le chargement de l'API n'a pas fonctionné.");
        });
}

// 1 - Creation of a loop allowing to display as many articles as there are in the API via html tags insertion. - Création d'une boucle permettant d'afficher autant d'articles qu'il y en a dans l'API via l'insertion d'éléments html.
// 2 - For each article, integration of its own datas. - Pour chaque article, intégration de ses propres données.
export function displayArticles(article){
    for(let i = 0; i < article.length; i++){
        let productCard = document.querySelector(".items");
                
        let productLink = document.createElement("a");
        productCard.appendChild(productLink);
        productLink.href = "front/product.html?id="+article[i]._id;
        productLink.title = article[i].description;
            
        let productArticle = document.createElement("article");
        productLink.appendChild(productArticle);
            
        let productImg = document.createElement("img");
        productArticle.appendChild(productImg);
        productImg.src = article[i].imageUrl;
        productImg.alt = article[i].altTxt;
            
        let productH3 = document.createElement("h3");
        productArticle.appendChild(productH3);
        productH3.classList.add("productName");
        productH3.innerHTML = article[i].name;
            
        let productP = document.createElement("p");
        productArticle.appendChild(productP);
        productP.classList.add("productDescription");
        productP.innerHTML = article[i].description;
    }
}

// 1 - API loading and json format conversion. - Chargement de l'API et conversion au format json.
// 2 - Display of an alert if the API loading didn't worked. - Affichage d'une alerte si le chargement de l'API n'a pas fonctionné.
export function getKanapData(){
    return fetch(urlKanap)
        .then(function(response){
            return response.json()
        })
        .catch(function() {
            console.log("Le chargement de l'API n'a pas fonctionné.");
        });
}

// 1 - Creation of a loop allowing to display as many articles as there are in the API's ID via html tags insertion. - Création d'une boucle permettant d'afficher autant d'articles qu'il y en a dans l'ID de l'API via l'insertion d'éléments html.
// 2 - For each article, integration of its own datas. - Pour chaque article, intégration de ses propres données.
export function displayKanap(kanapData){
    let ItemImg = document.querySelector(".item__img");
    let Img = document.createElement("img");
    ItemImg.appendChild(Img);
    Img.src = kanapData.imageUrl;
    Img.alt = kanapData.altTxt;
    
    let Title = document.querySelector("#title");
    Title.innerHTML = kanapData.name;

    let Price = document.querySelector("#price");
    Price.innerHTML = kanapData.price;

    let Description = document.querySelector("#description");
    Description.innerHTML = kanapData.description;

    let Color = document.querySelector("#colors");
    for (let i = 0; i < kanapData.colors.length; i++){
        let Option = document.createElement("option");
        Option.innerText = kanapData.colors[i];
        Option.value = kanapData.colors[i];
        Color.appendChild(Option);
    }
}

export function addToCart(kanapData){
    let addToCart = document.querySelector("#addToCart");  
    let kanapsInStorage = [];
    addToCart.addEventListener("click", (event) => {
        let color = document.querySelector("#colors");
        let kanapColor = color.value;
        let a = 0;
        let kanapAdded = {              
            id: idKanap,
            quantity: parseFloat(document.querySelector("#quantity").value),
            color: kanapColor,
            image: kanapData.imageUrl,
            name: kanapData.name,
            price: kanapData.price,
        }
        if(kanapsInLocalStorage !== null){
            kanapsInStorage = kanapsInLocalStorage;
        }
        if(kanapAdded.quantity > 0 && kanapAdded.quantity < 101){
            if(kanapsInStorage){
                for(let i = 0; i < kanapsInStorage.length; i++) {
                    if(kanapAdded.id === kanapsInStorage[i].id && kanapAdded.color === kanapsInStorage[i].color){
                        let addedQuantity = parseInt(kanapsInStorage[i].quantity) + parseInt(kanapAdded.quantity);
                        a = a + 1;
                        kanapsInStorage[i].quantity = addedQuantity;
                    }
                };
                if (a === 0){
                    kanapsInStorage.push(kanapAdded);
                }
            }
            else{
                kanapsInStorage.push(kanapAdded);
            }
        }
        else{
            alert("Veuillez saisir une valeur entre 1 et 100.");
        }
        localStorage.setItem("kanapsToOrder", JSON.stringify(kanapsInStorage));
    })
}

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
        productP_Div2_2_1.innerHTML = "Quantité : " + kanapsInLocalStorage[i].quantity;

        let productInput = document.createElement("input");
        productDiv2_2_1.appendChild(productInput);
        productInput.classList.add("itemQuantity");
        productInput.type = "number";
        productInput.name = "itemQuantity";
        productInput.min = "1";
        productInput.max = "100";

        let productDiv2_2_2 = document.createElement("div");
        productDiv2_2.appendChild(productDiv2_2_2);
        productDiv2_2_2.classList.add("cart__item__content__settings__delete");
            
        let productP_Div2_2_2 = document.createElement("p");
        productDiv2_2_2.appendChild(productP_Div2_2_2);
        productP_Div2_2_2.classList.add("deleteItem");
        productP_Div2_2_2.innerHTML = "Supprimer";  
    }
}

export function getTotalQuantity(){
    let TotalQuantity = 0;
    for(let i = 0; i < kanapsInLocalStorage.length; i++){
        TotalQuantity = TotalQuantity + parseInt(kanapsInLocalStorage[i].quantity);
    }
    return TotalQuantity;
}

export function displayTotalQuantity(TotalQuantity){
    let TotalQuantity2 = document.querySelector("#totalQuantity");
    TotalQuantity2.innerHTML = TotalQuantity;
}

export function getTotalPrice(){
    let TotalPrice = 0;
    for(let i = 0; i < kanapsInLocalStorage.length; i++){
        TotalPrice = TotalPrice + parseInt(kanapsInLocalStorage[i].price) * parseInt(kanapsInLocalStorage[i].quantity);
    }
    return TotalPrice;
}

export function displayTotalPrice(TotalPrice){
    let TotalPrice2 = document.querySelector("#totalPrice");
    TotalPrice2.innerHTML = TotalPrice;
}

export function deleteKanap(){
    let deleteKanap = document.querySelectorAll(".deleteItem");
    for (let i = 0; i < deleteKanap.length; i++) {
        deleteKanap[i].addEventListener('click', (event) => {
            let newkanapsInLocalStorage = kanapsInLocalStorage;
            newkanapsInLocalStorage.splice(i, 1);
            localStorage.setItem("kanapsToOrder", JSON.stringify(newkanapsInLocalStorage));
            location.reload();
        })
    }
}

export function changeQuantity(){
    let changeQuantity = document.querySelectorAll(".itemQuantity");
    for(let i = 0; i < changeQuantity.length; i++){
        changeQuantity[i].addEventListener('change', (event) => {
            let newkanapsInLocalStorage = kanapsInLocalStorage;
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
            location.reload();
        })
    }
}

export function sendOrder(){
    const order = document.getElementById('order');
    order.addEventListener('click', (event) => {
        let contact = {
            firstName: document.querySelector("#firstName").value,
            lastName: document.querySelector("#lastName").value,
            address: document.querySelector("#address").value,
            city: document.querySelector("#city").value,
            email: document.querySelector("#email").value,
        }
        if(validation(contact)){
            let kanaps = [];
            kanaps.push(kanapsInLocalStorage);
        }
    })
}

export function validation(contact){
    test(contact);
    if(test(contact)){
        return true;
    } 
    else{
        alert('Le formulaire contient des erreurs.');
        return false;
    }
}

export function test(contact){
    let firstNameRegex = contact.firstName;
    let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
    let lastNameRegex = contact.lastName;
    let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    let addressRegex = contact.address;
    let addressErrorMsg = document.getElementById("addressErrorMsg");
    let cityRegex = contact.city;
    let cityErrorMsg = document.getElementById("cityErrorMsg");
    const emailRegex = contact.email;
    const emailErrorMsg = document.getElementById("emailErrorMsg");
    
    if(/^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s]{3,}$/.test(firstNameRegex)){
        if(/^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s]{3,}$/.test(lastNameRegex)){
            if(/^[-'a-zA-Z0-9À-ÖØ-öø-ÿ\s]{3,}$/.test(addressRegex)){
                if(/^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s]{3,}$/.test(cityRegex)){
                    if(/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(emailRegex)){
                        return true;
                    }
                }
            }
        }
    } 
    else {
        return false;
    }
}