// EN -- Constants importation.
// FR -- Importation des constantes.
import {kanapsInLocalStorage, urlPage} from "./const.js";

// EN -- 1 - API's data importation.           2 - Json format data conversion.           3 - Display of an alert in case of import failure.
// FR -- 1 - Importation des données de l'API. 2 - Conversion des données au format Json. 3 - Affichage d'une alerte en cas d'échec de l'importation.
export function getAPIdata(data){
    return fetch(data)
    .then((response) => response.json())
    .catch(function(error) {
        console.log("Le chargement de l'API n'a pas fonctionné.");
    });
}

// EN -- Function preventing access to the cart if it's empty.
// FR -- Fonction empêchant d'accéder au panier si celui-ci est vide.
export function cartEmpty(){
    let cartEmpty = document.querySelector("#cart");
    cartEmpty.addEventListener("click", (event) => {
        if(kanapsInLocalStorage === null){
            alert("Votre panier est vide.");
        }
        else{
            if(urlPage === "/index.html"){
                document.location.href = "./front/cart.html";
            }
            else{
                document.location.href = "./cart.html";
            }
        }
    })
}