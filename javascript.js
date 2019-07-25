$(document).ready(function() {

var queryURL = "https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random";


$.ajax({
    url: queryURL,
    headers: {"X-RapidAPI-Host" : "matchilling-chuck-norris-jokes-v1.p.rapidapi.com",
    "X-RapidAPI-Key" : "019d9911ccmsh87bdd63e27af5c7p1fb859jsn4a1152c06ebe"},
    method: "GET"

}).then(function (response) {
    console.log(response);
    var results = response.data;
       
    

    });

});