// EN -- Constants importation.
// FR -- Importation des constantes.
import {idPage} from "./const.js";

main();
// EN -- Order number display.
// FR -- Affichage du numéro de commande.
async function main(){
    displayOrderId(idPage);
}

// EN -- Order ID display.
// FR -- Affichage de l'ID de la commande.
export function displayOrderId(data){
    let orderId = document.getElementById("orderId");
    orderId.innerText = data;
}