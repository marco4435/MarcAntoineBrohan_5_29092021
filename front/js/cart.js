// EN -- 1 - Functions importation. 2 - Constants importation.
// FR -- 1 - Importation des fonctions. 2 - Importation des constantes.
import {displayCarts, getTotalQuantity, getTotalPrice, displayQuantityPrice, deleteKanap, changeQuantity, sendOrder} from "./functions.js";
import {kanapsInLocalStorage} from "./const.js";

main();

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