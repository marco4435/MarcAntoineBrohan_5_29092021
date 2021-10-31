// Functions importation. - Importation des fonctions.
import {getKanapData, displayKanap, addToCart} from "./functions.js";

main();
// 1 - Article's data import from API. - Importation des données de l'article concerné depuis l'API.
// 2 - Article's data display. - Affichage des données de l'article.
// 3 - Selected items saved in the shopping cart. - Enregistrement dans le panier des articles sélectionnés.
async function main(){
    const kanapData = await getKanapData();
    displayKanap(kanapData);
    addToCart(kanapData);
}