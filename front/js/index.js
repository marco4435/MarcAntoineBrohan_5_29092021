// EN -- 1 - Functions importation. 2 - Constants importation.
// FR -- 1 - Importation des fonctions. 2 - Importation des constantes.
import {cartEmpty, getAPIdata} from "./functions.js";
import {url} from "./const.js";

main();
// EN -- 1 - Import of API data and conversion to Json format.              2 - Insertion into the DOM as many articles as there are in the API with the associated imported data.
// FR -- 1 - Importation des données de l'API et conversion au format Json. 2 - Insertion dans le DOM d'autant d'articles qu'il y en a dans l'API avec les données importées associées.
async function main(){
    const kanapsData = await getAPIdata(url);
    displayKanaps(kanapsData);
    cartEmpty();
}

// EN -- 1 - FOR loop displaying as many articles as there are in the API.  2 - Associated data insertion into the DOM.
// FR -- 1 - Boucle FOR affichant autant d'articles qu'il y en a dans l'API. 2 - Insertion des données associées dans le DOM.
function displayKanaps(data){
    for(let i = 0; i < data.length; i++){
        let productCard = document.querySelector(".items");
                
        let productLink = document.createElement("a");
        productCard.appendChild(productLink);
        productLink.href = "front/product.html?id="+data[i]._id;
        productLink.title = data[i].description;
            
        let productArticle = document.createElement("article");
        productLink.appendChild(productArticle);
            
        let productImg = document.createElement("img");
        productArticle.appendChild(productImg);
        productImg.src = data[i].imageUrl;
        productImg.alt = data[i].altTxt;
            
        let productH3 = document.createElement("h3");
        productArticle.appendChild(productH3);
        productH3.classList.add("productName");
        productH3.innerHTML = data[i].name;
            
        let productP = document.createElement("p");
        productArticle.appendChild(productP);
        productP.classList.add("productDescription");
        productP.innerHTML = data[i].description;
    }
}