$(document).ready(function () {

var queryURL = "https://twinword-emotion-analysis-v1.p.rapidapi.com/analyze/";


    $.ajax({
        url: queryURL,
        dataType: "json",
        headers: {"x-rapidapi-host" : "twinword-emotion-analysis-v1.p.rapidapi.com",
        "x-rapidapi-key": "019d9911ccmsh87bdd63e27af5c7p1fb859jsn4a1152c06ebe"},
        data: {
            "text": "I heard that you're settled down That you found a girl and you're married now I heard that your dreams came tru Guess she gave you things I didn't give to you Old friend, why are you so shy? Ain't like you to hold back or hide from the light This Lyrics is NOT for Commercial use ******"
        },
        method: "GET"


    }).then(function (response) {
        console.log(response);
        console.log(response.emotion_scores);
        var emotionText = JSON.stringify(response.emotion_scores)
        $("#analyzeThis").html("<p>" + emotionText + "</p>")
            
      
    

        
        });
});