const setborderless_event = require("../GUIfunc/borderlessfunc/borderless_event_withchat");
const event = require('../GUIfunc/StreamWatchEvent/event');
const loaddata = require('../GUIfunc/StreamandArchive/load');
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
const url = new URL(window.location.href);
const params = url.searchParams;
const id = params.get('id');
const video = document.getElementById('videodiv');
let CurrentTime,player;

(async ()=>{
    setborderless_event(id);
    event(id);
    loaddata(id);
    ipcRenderer.invoke('openchat',[id]);
})();

function onYouTubeIframeAPIReady() {
    let iframe = document.createElement('div');
    iframe.id = 'video'
    video.appendChild(iframe);
    player = new YT.Player('video', {
        videoId: id,
        playerVars: {
            autoplay:1,
            rel:0,
            enablejsapi:1,
            modestbranding:1,
            html5: 1
        }
    });
}