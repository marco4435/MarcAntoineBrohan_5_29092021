// EN -- 1 - Functions importation. 2 - Constants importation.
// FR -- 1 - Importation des fonctions. 2 - Importation des constantes.
// IT -- 1 - Importazione di funzioni. 2 - Importazione di costanti.
import {getAPIdata, displayKanaps} from "./functions.js";
import {url} from "./const.js";

main();
// EN -- 1 - Import of API data and conversion to Json format.              2 - Insertion into the DOM as many articles as there are in the API with the associated imported data.
// FR -- 1 - Importation des données de l'API et conversion au format Json. 2 - Insertion dans le DOM d'autant d'articles qu'il y en a dans l'API avec les données importées associées.
// IT -- 1 - Importazione dati API e conversione in formato Json.           2 - Inserimento nel DOM di tanti articoli quanti sono nell'API con i relativi dati importati.
async function main(){
    const kanapsData = await getAPIdata(url);
    // console.log("Test 1");
    // console.log(articles);
    displayKanaps(kanapsData);
}