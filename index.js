
var index = 0;


// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '300',
        width: '450',
        videoId: datas[index].vid,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    // event.target.playVideo();
    render();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}
function stopVideo() {
    player.stopVideo();
}




function right() {
    index += 1;
    index %= datas.length;
    render();
}
function left() {
    index -= 1;
    if (index < 0)
        index = datas.length - 1;
    render();
}
// var gt = document.getElementsByClassName("caption")[0].getElementsByTagName("li")[0]
// var pred = document.getElementsByClassName("caption")[0].getElementsByTagName("li")[1]
var time = document.getElementsByClassName("time")[0]
var sep = document.getElementsByClassName("sep")[0]
var sep_right = document.getElementsByClassName("sep_right")[0]
var total_time = document.getElementsByClassName("time")[1]
var video_count = document.getElementsByClassName("video_count")[0]
//var abstract_div = document.getElementsByClassName("abstract")[0]
//var observations_div = document.getElementsByClassName("observations")[0]

var trs = document.getElementsByTagName("table")[0].getElementsByTagName("tr")
// var ablation_trs = document.getElementsByTagName("table")[1].getElementsByTagName("tr")

//abstract_div.innerHTML = "<b>Abstract: </b><em>"  + abstract + "</em>";
//observations_div.innerHTML = "<b>Observations: </b>" + observations;


function render() {
    data = datas[index];
    data = datas[index];
    player.loadVideoById(
        {
            'videoId': data.vid,
            'startSeconds': 5,
            'endSeconds': 60,
            'suggestedQuality': 'large'
        }
    );

    var sec = data.timestamp % 60;
    if (sec < 10)
        sec = '0' + sec;
    time.innerHTML = Math.floor(data.timestamp / 60) + ':' + Math.floor(sec);

    var sec = data.duration % 60;
    if (sec < 10)
        sec = '0' + sec;

    total_time.innerHTML = Math.floor(data.duration / 60) + ':' + Math.floor(sec);

    video_count.innerHTML = index + 1 + '/' + 2000//datas.length;

    sep_left = Math.floor(450 / data.duration * data.timestamp);
    console.log(sep_left);
    sep.style.left = sep_left + "px";
    // sep.style.left = 0;
    sep_right.style.left = sep_left + "px";
    sep_right.style.width = (450 - sep_left) + "px";

    // sep_right.width = 0;


    //           
    for(var i = 0; i < trs.length; i++){
        tr = trs[i];
        tds = tr.getElementsByTagName('td');
//        console.log(tds[0].innerHTML);
        tds[1].innerHTML = '';
        for(var l in data[tds[0].innerHTML]){
            line = data[tds[0].innerHTML][l];
            console.log(line.slice(0, 4))
            if(line.length >= 3 && line.slice(0, 4) == 'HIG-'){
                tds[1].innerHTML += '<em>' + line.slice(4) + '</em>' + '<br >';
            }
            else{
                tds[1].innerHTML += line + '<br >';
            }

        }
        
    }





}