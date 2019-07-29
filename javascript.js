$(document).ready(function() {


$("#submit").click(function() {
        var track = $("#track").val().trim();
        var artist = $("#artist").val().trim();
        console.log(track);
        $("#trackInfo").empty();
if (track == "") {
    alert("please enter a value!")
} else{

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

        $.ajax ({
        url: queryURL2,
        dataType: "json",
        method: "GET" 

        }).then(function (response) {
        console.log(response);
        var lyrics = response.message.body.lyrics.lyrics_body;
        $("#lyrics").prepend(lyrics);
    });
}
});
}
});
});