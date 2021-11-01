export function validation(contact){
    firstNameIsValid(contact);
    lastNameIsValid(contact);
    addressIsValid(contact);
    cityIsValid(contact);
    emailIsValid(contact);

    if (firstNameIsValid(contact) && lastNameIsValid(contact) && addressIsValid(contact) && cityIsValid(contact) && emailIsValid(contact)){
        return true;
    } 
    else {
        alert('Le formulaire contient des erreurs.');
        return false;
    }
}

export function firstNameIsValid(contact){
    let firstNameRegex = contact.firstName;
    let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
    if (/^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s]{3,}$/.test(firstNameRegex)){
        return true;
    } 
    else {
        return false;
    }
}

export function lastNameIsValid(contact){
    let lastNameRegex = contact.lastName;
    let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    if(/^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s]{3,}$/.test(lastNameRegex)){
        return true;
    } 
    else{
        return false;
    }
}

export function addressIsValid(contact){
    let addressRegex = contact.address;
    let addressErrorMsg = document.getElementById("addressErrorMsg");
    if(/^[-'a-zA-Z0-9À-ÖØ-öø-ÿ\s]{3,}$/.test(addressRegex)){
        return true;
    } 
    else{
        return false;
    }
}

export function cityIsValid(contact){
    let cityRegex = contact.city;
    let cityErrorMsg = document.getElementById("cityErrorMsg");
    if(/^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s]{3,}$/.test(cityRegex)){
        return true;
    } 
    else{
        return false;
    }
}

export function emailIsValid(contact){
    const emailRegex = contact.email;
    const emailErrorMsg = document.getElementById("emailErrorMsg");
    if(/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(emailRegex)){
        return true;
    } 
    else{
        return false;
    }
}