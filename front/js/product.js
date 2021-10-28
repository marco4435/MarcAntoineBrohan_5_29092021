// Functions importation. - Importation des fonctions.
import {getKanapData, displayKanap, addToCart} from "./functions.js";

main();

async function main(){
    // Article's data import from API. - Importation des données de l'article concerné depuis l'API.
    const kanapData = await getKanapData();
    // Article's data display. - Affichage des données de l'article.
    displayKanap(kanapData);
    // Selected items saved in the shopping cart. - Enregistrement dans le panier des articles sélectionnés.
    addToCart(kanapData);
}