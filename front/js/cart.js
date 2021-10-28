// Functions importation. - Importation des fonctions.
import {displayCarts, getTotalQuantity, displayTotalQuantity, getTotalPrice, displayTotalPrice, deleteKanap, changeQuantity, sendOrder} from "./functions.js";

main();

async function main(){
    // Execution of the following functions if the localstorage contains at least 1 item. - Éxecution des fonctions suivantes si le localstorage contient au moins 1 élément.
    if(kanapsInLocalStorage){
        // Shopping cart display. - Affichage du panier.
        displayCarts();
        // Shopping cart articles total quantity calculation and display. - Calcul et affichage de la quantité d'articles présents dans le panier.
        const TotalQuantity = await getTotalQuantity();
        displayTotalQuantity(TotalQuantity);
        // Shopping cart articles total price calculation and display. - Calcul et affichage du prix total des articles présents dans le panier.
        const TotalPrice = await getTotalPrice();
        displayTotalPrice(TotalPrice);
        // Delete article function. - Fonction de retrait d'un article.
        deleteKanap();
        // Quantity per article modification function. - Fonction de modification de la quantité d'un article.
        changeQuantity();
        // Command validation function. - Fonction de validation de la commande.
        sendOrder();
    }
}