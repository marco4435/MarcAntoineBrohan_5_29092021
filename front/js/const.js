export const idPage = new URL(location.href).searchParams.get('id');
export const kanapsInLocalStorage = JSON.parse(localStorage.getItem("kanapsToOrder"));
export const url = "http://localhost:3000/api/products/";
export const urlKanap = url + idPage;
export const urlOrder = url + "order";