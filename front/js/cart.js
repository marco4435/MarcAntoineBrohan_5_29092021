// Functions importation. - Importation des fonctions.
import {displayCarts, getTotalQuantity, displayTotalQuantity, getTotalPrice, displayTotalPrice, deleteKanap, changeQuantity, sendOrder} from "./functions.js";

main();

async function main(){
    // Execution of the following functions if the localstorage contains at least 1 item. - Execution des fonctions suivantes si le localstorage contient au moins 1 élément.
    if(kanapsInLocalStorage){
        // Cart display. - Affichage du panier.
        displayCarts();
        const TotalQuantity = await getTotalQuantity();
        displayTotalQuantity(TotalQuantity);
        const TotalPrice = await getTotalPrice();
        displayTotalPrice(TotalPrice);
        deleteKanap();
        changeQuantity();
        sendOrder();
    }
}