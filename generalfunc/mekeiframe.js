module.exports = async (id,start=0) =>{
    return  new YT.Player('video', {
        videoId: id,
        events: {
            'onReady': onPlayerReady
        },
        playerVars: {
            autoplay:1,
            rel:0,
            enablejsapi:1,
            start: start,
            modestbranding:1,
            html5: 1
        }
    });
}

