// EN -- 1 - Functions importation. 2 - Constants importation.
// FR -- 1 - Importation des fonctions. 2 - Importation des constantes.
import {getAPIdata, displayKanap, addToCart} from "./functions.js";
import {urlKanap} from "./const.js";

main();
// EN -- 1 - Import of API data and conversion to Json format.              2 - Selected article data insertion in the DOM.
// FR -- 1 - Importation des données de l'API et conversion au format Json. 2 - Insertion des données de l'article sélectionné dans le DOM.
async function main(){
    const kanapData = await getAPIdata(urlKanap);
    // console.log("Test 1");
    // console.log(kanapData);
    displayKanap(kanapData);
    addToCart(kanapData);
}