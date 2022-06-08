const open = require('../generalfunc/openurl');
const setborderless_event = require("../GUIfunc/borderlessfunc/borderless_event");
const url = new URL(window.location.href);
const params = url.searchParams;
const id = params.get('id');
const video = document.getElementById('videodiv');

(async ()=>{
    setborderless_event();
    const prayer = document.createElement('iframe');
    prayer.frameBorder =0;
    prayer.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    prayer.allowFullscreen=true;
    prayer.src = "https://www.youtube.com/embed/" + id+"?autoplay=1";
    prayer.id = "video";
    prayer.enablejsapi = true;
    video.appendChild(prayer);
    open(["https://www.youtube.com/live_chat?is_popout=1&v=" + id]);
})();