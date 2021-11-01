export const url = "http://localhost:3000/api/products/";
export const idKanap = new URL(location.href).searchParams.get('id');
export const urlKanap = url + idKanap;
export const kanapsInLocalStorage = JSON.parse(localStorage.getItem("kanapsToOrder"));
export const urlOrder = "http://localhost:3000/api/products/order/";