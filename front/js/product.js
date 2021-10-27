import {getKanapData, displayKanap, addToCart} from "./functions.js";

main();

async function main(){
    const kanapData = await getKanapData();
    displayKanap(kanapData);
    addToCart(kanapData);
}