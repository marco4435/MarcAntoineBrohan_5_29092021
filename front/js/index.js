// Functions importation. - Importation des fonctions.
import {getArticles, displayArticles} from "./functions.js";

main();
// 1 - API's data import - Importation des données de l'API.
// 2 - Articles's display with API's data. - Affichage des articles avec les données de l'API.
async function main(){
    const articles = await getArticles();  
    displayArticles(articles);
}