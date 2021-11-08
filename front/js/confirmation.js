// EN -- 1 - Functions importation. 2 - Constants importation.
// FR -- 1 - Importation des fonctions. 2 - Importation des constantes.
import {displayOrderId} from "./functions.js";
import {idPage} from "./const.js";

main();
// EN -- 1 - Order number display.
// FR -- 1 - Affichage du numéro de commande.
async function main(){
    displayOrderId(idPage);
}