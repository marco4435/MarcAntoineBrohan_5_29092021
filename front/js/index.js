// Functions importation. - Importation des fonctions.
import {getArticles, displayArticles} from "./functions.js";

main();

async function main() {
    // API data import - Importation des données de l'API.
    const articles = await getArticles();
    // Articles display with API's data. - Affichage des articles avec les données de l'API.
    displayArticles(articles);
}