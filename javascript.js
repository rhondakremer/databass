$(document).ready(function() {

var queryURL = "https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_matcher.lyrics.get?q_track=sexy%20and%20i%20know%20it&q_artist=lmfao&page_size=1&page=1&s_track_rating=desc&apikey=4361e89398d1b525228c0f37e4566dc1";


$.ajax({
    url: queryURL,
    dataType: "json",
    method: "GET"

}).then(function (response) {
    console.log(response);
    
   
    

    });

});