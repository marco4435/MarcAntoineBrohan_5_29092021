// EN -- 1 - Functions importation. 2 - Constants importation.
// FR -- 1 - Importation des fonctions. 2 - Importation des constantes.
import {displayCarts, getTotalQuantity, getTotalPrice, displayQuantityPrice, deleteKanap, changeQuantity, sendOrder} from "./functions.js";
import {kanapsInLocalStorage} from "./const.js";

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