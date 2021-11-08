export function sendOrder(){
    let order = document.getElementById('order');
    order.addEventListener('click', (event) => {
        let contact = {
            firstName: document.querySelector("#firstName").value,
            lastName: document.querySelector("#lastName").value,
            address: document.querySelector("#address").value,
            city: document.querySelector("#city").value,
            email: document.querySelector("#email").value,
        }
        let products = kanapsInLocalStorage.map(obj => obj.id);
            fetch(urlOrder, {
                method: "POST",
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({contact, products}),
            })
            .then((response) => response.json())
            .then((id) => {
                document.location.href = `confirmation.html?id=${id.orderId}`;
            })
        
    })
}