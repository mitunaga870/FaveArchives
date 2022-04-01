const getplaylist = require('../GUIfunc/songplayerfunc/gesplaylist');
const getid = require('../GUIfunc/songplayerfunc/getst');
const makeiframe = require('../generalfunc/mekeiframe');
const fs = require('fs');
const video = document.getElementById('videodiv');
const title = document.getElementById('title');
require('dotenv').config();

(async ()=>{
    while (true){
        let playlist = await getplaylist();
        console.log(playlist);
        for(let item of playlist){
            title.innerText = item.songname + "/" + item.singer;
            let stdata = await getid(item.songid);
            if(stdata==0){
                console.log("アーカイブなし");
                continue;
            }
            console.log(stdata)
            if(stdata.private==0) {
                let iframe = document.createElement('div');
                iframe.id = 'video'
                video.appendChild(iframe);
                await makeiframe(stdata.videoid,stdata.timestump)
            }else {
                    const prayer = document.createElement('video');
                    var src ="E:/deta/OSHI/archives/list/"+stdata.videoid+".mp4";
                    if (fs.existsSync(src)){
                        prayer.src= "file:///"+src;
                        prayer.controls=true;
                        prayer.autoplay=true;
                        prayer.id = "video";
                        prayer.currentTime = await dts(stdata.timestump);
                        video.appendChild(prayer);
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
        setTimeout(resolve,n+1000);
        document.querySelector('#skip').addEventListener('click',resolve);
    });
}

function del(id){
    const target = document.getElementById(id);
    target.remove();
}

async function TimeManager(start,duration,type){

}