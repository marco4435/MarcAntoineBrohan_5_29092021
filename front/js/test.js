export function sendOrder(){
    const order = document.getElementById('order');
    order.addEventListener('click', (event) => {
        let contact = {
            firstName: document.querySelector("#firstName").value,
            lastName: document.querySelector("#lastName").value,
            address: document.querySelector("#address").value,
            city: document.querySelector("#city").value,
            email: document.querySelector("#email").value,
        }
        if(validation(contact)){
            let kanaps = [];
            kanaps.push(kanapsInLocalStorage);
            let contactKanapsArray = {
                contact,
                kanaps,
            }
            fetch(urlOrder, {
                body: JSON.stringify(contactKanapsArray),
                method: "POST",
                headers: { "Content-Type": "application/json" },
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.orderId);
            })
        }
    })
}