const url = "http://localhost:3000/api/products/";
const idKanap = new URL(location.href).searchParams.get('id');
const urlKanap = url + idKanap;
const kanapsInLocalStorage = JSON.parse(localStorage.getItem("kanapsToOrder"));