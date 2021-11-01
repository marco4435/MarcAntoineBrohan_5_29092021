// Functions importation. - Importation des fonctions.
import {displayCarts, getTotalQuantity, displayTotalQuantity, getTotalPrice, displayTotalPrice, modifyOrder, sendOrder} from "./functions.js";

// Constants importation. - Importation des constantes.
import {kanapsInLocalStorage} from "./const.js";

main();
// Following functions's execution if the localstorage contains at least 1 item. - Éxecution des fonctions suivantes si le localstorage contient au moins 1 élément.
// 1 - Shopping cart display. - Affichage du panier.
// 2 - Shopping cart articles total quantity calculation and display. - Calcul et affichage de la quantité d'articles présents dans le panier.
// 3 - Shopping cart articles total price calculation and display. - Calcul et affichage du prix total des articles présents dans le panier.
// 4 - Delete article function. - Fonction de retrait d'un article.
// 5 - Quantity per article modification function. - Fonction de modification de la quantité d'un article.
// 6 - Command validation function. - Fonction de validation de la commande.
async function main(){
    if(kanapsInLocalStorage){
        const TotalQuantity = await getTotalQuantity();
        displayTotalQuantity(TotalQuantity);
        const TotalPrice = await getTotalPrice();
        displayTotalPrice(TotalPrice);
        modifyOrder();
        sendOrder();
    }
}