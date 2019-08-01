

$(document).ready(function () {




    

    $("#submit").click(function () {
        var track = $("#track").val().trim();
        var artist = $("#artist").val().trim();
        console.log(track);
        $("#trackInfo").empty();
        if (track == "") {
            alert("please enter a value!")
        } else {

            var queryURL = "https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=" + track + "&q_artist=" + artist + "&page_size=1&page=1&s_track_rating=desc&apikey=4361e89398d1b525228c0f37e4566dc1";


            $.ajax({
                url: queryURL,
                dataType: "json",
                method: "GET"

            }).then(function (response) {
                console.log(response);
                //$("#trackInfo").prepend(trackName);
                if (response.message.body.track_list.length == 0) {
                    alert("please check your spelling!")
                } else {
                    var trackID = response.message.body.track_list[0].track.track_id;
                    console.log(trackID);



                    var queryURL2 = "https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=" + trackID + "&apikey=4361e89398d1b525228c0f37e4566dc1"

                    $.ajax({
                        url: queryURL2,
                        dataType: "json",
                        method: "GET"

                    }).then(function (response) {

                        console.log(response);
                        var lyrics = response.message.body.lyrics.lyrics_body;

                        //lyrics = JSON.stringify(lyrics);

                        //lyrics.replace(/(?:\r\n|\r|\n)/g, '<br />')

                        $("#lyricsDisplay").html(lyrics);
                    });
                }
            });
        }
    });


    $("#analyze").click(function () {
   
        var lyricsText = $("#lyricsDisplay").text();
        console.log(lyricsText);
        var queryURL = "https://twinword-emotion-analysis-v1.p.rapidapi.com/analyze/";
    
    
        $.ajax({
            url: queryURL,
            dataType: "json",
            headers: {"x-rapidapi-host" : "twinword-emotion-analysis-v1.p.rapidapi.com",
            "x-rapidapi-key": "019d9911ccmsh87bdd63e27af5c7p1fb859jsn4a1152c06ebe"},
            data: {
                "text": lyricsText
            },
    
            method: "GET"
    
    
        }).then(function (response) {
            console.log($("#lyricsDisplay").val());
            console.log(response);
            console.log(response.emotion_scores);
            var anger = (parseFloat((JSON.stringify(response.emotion_scores.anger))).toFixed(2))*100;
            var joy =  (parseFloat((JSON.stringify(response.emotion_scores.joy))).toFixed(2))*100;
            var fear =  (parseFloat((JSON.stringify(response.emotion_scores.fear))).toFixed(2))*100;
            var surprise = (parseFloat((JSON.stringify(response.emotion_scores.surprise))).toFixed(2))*100;
            var disgust =  (parseFloat((JSON.stringify(response.emotion_scores.disgust))).toFixed(2))*100;
            var sadness =  (parseFloat((JSON.stringify(response.emotion_scores.sadness))).toFixed(2))*100;
            
            console.log(anger);

        $("#emotionsScore").html( "Anger level: " + anger + "%" + "</br></br>") 
        $("#emotionsScore").append( "Joy level: " + joy +  "%" + "</br></br>") 
        $("#emotionsScore").append( "Fear level: " + fear + "%" + "</br></br>") 
        $("#emotionsScore").append( "Surprise level: " + surprise + "%" + "</br> </br>") 
        $("#emotionsScore").append( "Disgust level: " + disgust + "%" + "</br></br>") 
        $("#emotionsScore").append( "Sadness level: " + sadness + "%" + "</br></br>") 
           

        
    
            
            });
    
    
    
    });

});
