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
            //dataType: "json",
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
            var emotionText = JSON.stringify(response.emotion_scores)
            for (let i = 0; i < emotionText.length; i++) {
                $("#emotionsScore").html("<li>" + emotionText + "</li>")
                
            }
           
                
          
        
    
            
            });
    
    
    
    });
    

});