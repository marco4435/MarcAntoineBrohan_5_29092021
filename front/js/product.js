// EN -- 1 - Functions importation. 2 - Constants importation.
// FR -- 1 - Importation des fonctions. 2 - Importation des constantes.
// IT -- 1 - Importazione di funzioni. 2 - Importazione di costanti.
import {getAPIdata, displayKanap, addToCart} from "./functions.js";
import {urlKanap} from "./const.js";

main();
// EN -- 1 - Import of API data and conversion to Json format.              2 - Selected article data insertion in the DOM.
// FR -- 1 - Importation des données de l'API et conversion au format Json. 2 - Insertion des données de l'article sélectionné dans le DOM.
// IT -- 1 - Importazione dati API e conversione in formato Json.           2 - Inserimento dei dati dell'articolo selezionato nel DOM.
async function main(){
    const kanapData = await getAPIdata(urlKanap);
    displayKanap(kanapData);
    addToCart(kanapData);
}