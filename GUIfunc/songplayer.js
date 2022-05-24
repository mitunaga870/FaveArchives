const getplaylist = require('../GUIfunc/songplayerfunc/gesplaylist');
const getid = require('../GUIfunc/songplayerfunc/getst');
const timeconttoler = require('../GUIfunc/songplayerfunc/TimeControler');
const delay = require('../generalfunc/delay');
const songlist = require('../GUIfunc/songplayerfunc/makesonglist');
const seekbar = require('../GUIfunc/songplayerfunc/setSeekBar');
const volmnage = require('../GUIfunc/songplayerfunc/songvol');
const OniframestateChange = require('../GUIfunc/songplayerfunc/OniframestateChange');
const OnvideostateChange = require('../GUIfunc/songplayerfunc/OnvideostateChange');
const setctbutton = require('../GUIfunc/songplayerfunc/button');
const store = require('../generalfunc/store');
const fs = require('fs');
const video = document.getElementById('videodiv');
const title = document.getElementById('title');
const playlistpupup = document.getElementById('playlisteditor');
require('dotenv').config();
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
document.getElementById('vol').value = String(store.get('songvol'));
const url = new URL(window.location.href);
const params = url.searchParams;
let firstsong = params.get('s');
let listid = params.get('li');
let changed,target,stdata,player,achiveurl,nowid;
let waitkey = false,seekdel=false,ended=false;
let repeat_sw = document.getElementById('repeat')
let i = 0;

(async ()=>{
    await wait();
    while (true){
        let playlist = await getplaylist(firstsong,listid);
        firstsong = null;
        console.log(playlist);
        songlist(playlist);
        while(i < playlist.length){
            ended=false
            let btname = 'item:'+i;
            document.getElementById(btname).classList.add('selected');
            let item = playlist[i];
            title.innerText = item.songname + "/" + item.singer;
            stdata = await getid(item.songid);
            nowid = item.songid;
            achiveurl = "stdetail.html?v=" + stdata.videoid;
            setctbutton();
            if(stdata==0){
                i++;
                document.getElementById(btname).classList.remove('selected');
                console.log("アーカイブなし");
                continue;
            }
            console.log(stdata)
            if(stdata.private==0) {
                let iframe = document.createElement('div');
                iframe.id = 'video'
                video.appendChild(iframe);
                player = new YT.Player('video', {
                    videoId: stdata.videoid,
                    events: {
                        'onReady': onPlayerReady,
                        'onStateChange':OniframestateChange
                    },
                    playerVars: {
                        autoplay:1,
                        rel:0,
                        enablejsapi:1,
                        start: await dts(stdata.timestump),
                        modestbranding:1,
                        html5: 1
                    }
                });
                await wait();
            }else {
                player = document.createElement('video');
                var src =store.get('archivespath')+'\\'+stdata.videoid+".mp4";
                console.log(src);
                if (fs.existsSync(src)){
                    player.src= "file:///"+src;
                    player.controls=true;
                    player.autoplay=true;
                    player.id = "video";
                    player.currentTime = await dts(stdata.timestump);
                    video.appendChild(player);
                    OnvideostateChange();
                }else {
                    i++;
                    document.getElementById(btname).classList.remove('selected');
                    continue;
                }

            }
            seekbar(stdata.private,player,await dts(stdata.timestump),item.duration/1000);
            volmnage();
            await timeconttoler(stdata.private,player,await dts(stdata.timestump),item.duration/1000).then(res=>{i=parseInt(res)});
            del('video');
            console.log(i);
            changed = false;
            seekdel = true;
            document.getElementById(btname).classList.remove('selected');
        }
        console.log('一周しました')
        i = 0;
    }
})();

async function dts(time){
    let temp = time.split(':');
    let result =  parseInt(temp[0])*60*60;
    result += parseInt(temp[1])*60;
    result += parseInt(temp[2]);
    return result;
}

function del(id){
    const target = document.getElementById(id);
    target.remove();
}

async function wait(){
    waitkey = false;
    while (true){
        if (waitkey)
            break;
        await delay(1);
    }
    console.log("待機終了")
    waitkey = false;
    return;
}
function onYouTubeIframeAPIReady() {
    waitkey = true;
}
function onPlayerReady(event){
    console.log('ready')
    waitkey = true;
}