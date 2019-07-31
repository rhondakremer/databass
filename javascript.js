$(document).ready(function () {

    anime({
        targets: '.happy',
        translateX: 250,
        rotate: '2turn',
        duration: 1000,
        easing: 'linear',
        direction: "alternate",

      });

      anime({
        targets: '.hmm',
        translateX: -25,
        translateY:-100,
        rotate: '1turn',
        duration: 1000,
        easing: 'linear',
        direction: "alternate",
      });

      anime({
        targets: '.sad',
        translateX: -25,
        rotate: '2turn',
        duration: 4000,
        easing: 'linear',
        direction: "alternate",
      });


      anime({
        targets: '.mad',
        translateX: 250,
        translateY:-100,
        rotate: '2turn',
        duration: 2000,
        easing: 'linear',
        direction: "alternate",
      });


      anime({
        targets: '.calm',
        translateX: -250,
        translateY:-100,
        rotate: '2turn',
        duration: 2000,
        easing: 'linear',
        direction: "alternate",
      });


      anime({
        targets: '.fade-in',
        translateX: 200,
      });


      anime({
        targets: '.imageDiv',
        translateX: 200,
      });

      anime.timeline({loop: false})
  .add({
    targets: '.headText .word',
    scale: [14,1],
    opacity: [0,1],
    easing: "easeOutCirc",
    duration: 8000,
    translateX:250,
    delay: function(el, i) {
      return 800 * i;
    }

  });

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
            var emotionText = JSON.stringify(response.emotion_scores)
            var joy = (parseFloat((JSON.stringify(response.emotion_scores.joy))).toFixed(2))*100
            var surprise = (parseFloat((JSON.stringify(response.emotion_scores.surprise))).toFixed(2))*100
            var sadness = (parseFloat((JSON.stringify(response.emotion_scores.sadness))).toFixed(2))*100
            var anger = (parseFloat((JSON.stringify(response.emotion_scores.anger))).toFixed(2))*100
            var fear =(parseFloat((JSON.stringify(response.emotion_scores.fear))).toFixed(2))*100
            var disgust = (parseFloat((JSON.stringify(response.emotion_scores.disgust))).toFixed(2))*100
            $("#emotionsScore").html("<p>" + "joy:" + joy + "%" + "</p>")
            $("#emotionsScore").append("<p>" + "surpise:" + surprise + "%" + "</p>")
            $("#emotionsScore").append("<p>" + "sadness:" + sadness + "%" +  "</p>")
            $("#emotionsScore").append("<p>" + "anger:" + anger + "%" +  "</p>")
            $("#emotionsScore").append("<p>" + "fear:" + fear + "%" +  "</p>")
            $("#emotionsScore").append("<p>" + "disgust:" + disgust + "%" +  "</p>")

            
            });
    
    



    
    });
    

});