module.exports = async (id,start=0) =>{
    function onYouTubeIframeAPIReady() {
        console.log('a')
        new YT.Player('video', {
            videoId: id,
            playerVars: {
                autoplay:1,
                enablejsapi:1,
                modestbranding:1,
                rel:0,
                start:start
            },
        })
    };
}