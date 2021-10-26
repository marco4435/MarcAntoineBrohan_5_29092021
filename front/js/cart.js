main();

async function main(){
    if(kanapsInLocalStorage){
        displayCarts();
        const TotalQuantity = await getTotalQuantity();
        displayTotalQuantity(TotalQuantity);
        const TotalPrice = await getTotalPrice();
        displayTotalPrice(TotalPrice);
        deleteKanap();
        changeQuantity();
        sendOrder();
    }
}