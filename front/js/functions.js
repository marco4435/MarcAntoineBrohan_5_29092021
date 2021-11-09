// EN -- 1 - API's data importation.           2 - Json format data conversion.           3 - Display of an alert in case of import failure.
// FR -- 1 - Importation des données de l'API. 2 - Conversion des données au format Json. 3 - Affichage d'une alerte en cas d'échec de l'importation.
export function getAPIdata(data){
    return fetch(data)
    .then((response) => response.json())
    .catch(function(error) {
        console.log("Le chargement de l'API n'a pas fonctionné.");
    });
}