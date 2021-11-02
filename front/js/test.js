// 1 - API loading and json format conversion. - Chargement de l'API et conversion au format json.
// 2 - Display of an alert if the API loading didn't worked. - Affichage d'une alerte si le chargement de l'API n'a pas fonctionné.
export function getKanapData(){
    return fetch(urlKanap)
        .then(function(response){
            return response.json()
        })
        .catch(function() {
            console.log("Le chargement de l'API n'a pas fonctionné.");
        });
}