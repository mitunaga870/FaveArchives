const make = require('../generalfunc/mekeiframe');

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
let waitkey = false;

(async ()=>{
    await wait();
    player = await make();
})()
async function wait(){
    while (true){
        if (waitkey)
            break;
        await delay();
    }
    return;
}
function onYouTubeIframeAPIReady() {
    waitkey = true;
}
function delay(){
    return new Promise(async function(resolve){
        setTimeout(resolve,1000);
    });
}