// EN -- Functions importation. 
// FR -- Importation des fonctions.
// IT -- Importazione di funzioni.
import {getArticles, displayArticles} from "./functions.js";

main();
// EN -- 1 - Import of API data and conversion to Json format.              2 - Insertion into the DOM as many articles as there are in the API with the associated imported data.
// FR -- 1 - Importation des données de l'API et conversion au format Json. 2 - Insertion dans le DOM d'autant d'articles qu'il y en a dans l'API avec les données importées associées.
// IT -- 1 - Importazione dati API e conversione in formato Json.           2 - Inserimento nel DOM di tanti articoli quanti sono nell'API con i relativi dati importati.
async function main(){
    const articles = await getArticles();
    // console.log("Test 1");
    // console.log(articles);
    displayArticles(articles);
}