const getplaylist = require('../GUIfunc/songplayerfunc/gesplaylist');
const getid = require('../GUIfunc/songplayerfunc/getst');
const fs = require('fs');
const video = document.getElementById('videodiv');
const title = document.getElementById('title');
require('dotenv').config();

(async ()=>{
    while (true){
        let playlist = await getplaylist();
        for(let item of playlist){
            title.innerText = item.songname + "/" + item.singer;
            let stdata = await getid(item.songid);
            if(stdata==0){
                continue;
            }
            if(stdata.private==0) {
                const prayer = document.createElement('iframe');
                prayer.frameBorder =0;
                prayer.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                prayer.allowFullscreen=true;
                prayer.src = "https://www.youtube.com/embed/" + stdata.videoid+"?autoplay=1&start="+await dts(stdata.timestump);
                prayer.id = "video";
                prayer.enablejsapi = true;
                video.appendChild(prayer);
            }else {
                if (process.env.ArchivesDirectory!=undefined) {
                    const prayer = document.createElement('video');
                    var src = process.env.ArchivesDirectory +"/"+stdata.videoid+".mp4";
                    if (fs.existsSync(src)){
                        prayer.src= "file:///"+src;
                        prayer.controls=true;
                        prayer.autoplay=true;
                        prayer.id = "video";
                        prayer.currentTime = await dts(stdata.timestump);
                        video.appendChild(prayer);
                    }else {
                        console.log("動画が存在しません");
                        continue;
                    }
                }
            }
            await delay(item.duration);
            del('video');
        }
    }
})();

async function dts(time){
    let temp = time.split(':');
    let result =  parseInt(temp[0])*60*60;
    result += parseInt(temp[1])*60;
    result += parseInt(temp[2]);
    return result;
}

function delay(n){
    return new Promise(async function(resolve){
        setTimeout(resolve,n);
        document.querySelector('#skip').addEventListener('click',resolve);
    });
}

function del(id){
    console.log(id);
    const target = document.getElementById(id);
    target.remove();
}