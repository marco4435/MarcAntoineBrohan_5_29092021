// Constants importation. - Importation des constantes.
import {url, idKanap, urlKanap, kanapsInLocalStorage, urlOrder} from "./const.js";


// PAGE INDEX.


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


// PAGE PRODUCT.


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

// 1 - Creation of kanapsInStorage array witch will include products to add to cart. - Création du tableau kanapsInStorage qui inclura les produits à ajouter au panier.
// 2 - For each click on "Add to cart" button : - À chaque clic sur le bouton "Ajouter au panier" :
// 2.1 - Verification that selected quantity is between 1 and 100. - Vérification que la quantité sélectionnée soit comprise entre 1 et 100.
// 2.2 - Localstorage integration into kanapsInStorage array. - Intégration du localstorage au tableau kanapsInStorage.
// 2.3 - Recording in the kanapAdded variable of products to add to the basket of the being viewed page. - Enregistrement dans la variable kanapAdded des produits à ajouter au panier de la page en cours de consultation.
// 2.4 - kanapAdded integration into kanapsInStorage. - Intégration de kanapAdded à kanapsInStorage. Si un produit est déjà présent, seule la quantité est incrémentée.
// 2.5 - kanapsInStorage integration into localstorage. - Intégration de kanapsInStorage au localstorage.
export function addToCart(kanapData){
    let addToCart = document.querySelector("#addToCart");  
    let kanapsInStorage = [];
    addToCart.addEventListener("click", (event) => {
        let color = document.querySelector("#colors");
        let kanapColor = color.value;
        let a = 0;
        let kanapAdded = {              
            id: idKanap,
            quantity: parseFloat(document.querySelector("#quantity").value).toString(),
            color: kanapColor,
            image: kanapData.imageUrl,
            name: kanapData.name,
            price: kanapData.price.toString(),
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
                        kanapsInStorage[i].quantity = addedQuantity.toString();
                        alert("Le(s) produit(s) ont bien été ajouté(s) au panier.");
                    }
                };
                if (a === 0){
                    kanapsInStorage.push(kanapAdded);
                    alert("Le(s) produit(s) ont bien été ajouté(s) au panier.");
                }
            }
            else{
                kanapsInStorage.push(kanapAdded);
                alert("Le(s) produit(s) ont bien été ajouté(s) au panier.");
            }
        }
        else{
            alert("Veuillez saisir une valeur entre 1 et 100.");
        }
        localStorage.setItem("kanapsToOrder", JSON.stringify(kanapsInStorage));
    })
}

// PAGE CART.

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