// EN -- 1 - Functions importation. 2 - Constants importation.
// FR -- 1 - Importation des fonctions. 2 - Importation des constantes.
// IT -- 1 - Importazione di funzioni. 2 - Importazione di costanti.
import {getAPIdata, displayKanap, addToCart} from "./functions.js";
import {urlKanap} from "./const.js";

main();
// EN -- 1 - . 2 - . 3 - .
// FR -- 1 - . 2 - . 3 - .
// IT -- 1 - . 2 - . 3 - .
async function main(){
    const kanapData = await getAPIdata(urlKanap);
    displayKanap(kanapData);
    addToCart(kanapData);
}