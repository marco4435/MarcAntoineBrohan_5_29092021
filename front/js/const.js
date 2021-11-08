export const url = "http://localhost:3000/api/products/";
export const urlOrder = "http://localhost:3000/api/products/order";
export const idPage = new URL(location.href).searchParams.get('id');
export const urlKanap = url + idPage;
export const kanapsInLocalStorage = JSON.parse(localStorage.getItem("kanapsToOrder"));