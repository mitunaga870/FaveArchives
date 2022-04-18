const quary = require('../../generalfunc/sqlfanc/query');
const store = require('../../generalfunc/store');
const fs = require('fs');

module.exports = async (id) => {
    let archivelist = document.getElementById('archives');
    let q = 'select videodetail.private,videodetail.title,songs.videoid,songs.timestump from songs join videodetail on songs.videoid=videodetail.videoid where songs.songid = ? and videodetail.private != -1';
    if(store.get('privatefilter'))
        q+= ' and videodetail.private = 0'
    q+=';';
    let archives = await quary(q,[id]);
    for(let archive of archives){
        let i=0;
        let detail = document.createElement('details');
        let summary = document.createElement('summary');
        summary.innerText = archive.title;
        detail.appendChild(summary);
        let iframe;
        let div = document.createElement('div');
        div.className = "preview";
        detail.appendChild(div);
        archivelist.appendChild(detail);
        if(parseInt(archive.private)==0){//公開動画のとき
            console.log('公開');
            iframe = document.createElement('div');
            iframe.id = 'video'+i;
            iframe.className = 'player';
            div.appendChild(iframe);
            let player = new YT.Player('video'+i, {
                videoId: archive.videoid,
                events: {
                    'onReady': onPlayerReady
                },
                playerVars: {
                    autoplay:0,
                    rel:0,
                    enablejsapi:1,
                    start: await dts(archive.timestump),
                    modestbranding:1,
                    html5: 1
                }
            });
            await wait();
        }else {//非公開のとき
            console.log("非公開");
            iframe = document.createElement('video');
            var src =store.get('archivespath')+'\\'+archive.videoid+".mp4";
            if (fs.existsSync(src)) {
                iframe.src = "file:///" + src;
                iframe.controls = true;
                iframe.autoplay = false;
                iframe.id = "video";
                iframe.currentTime = await dts(archive.timestump);
            }
            div.appendChild(iframe);
        }
        console.log("追加したよ")
        i++;
    }
}

async function dts(time){
    let temp = time.split(':');
    let result =  parseInt(temp[0])*60*60;
    result += parseInt(temp[1])*60;
    result += parseInt(temp[2]);
    return result;
}
function onPlayerReady(event){
    console.log('ready')
    waitkey = true;
}