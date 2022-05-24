const changetype = require('../GUIfunc/songdetailfanc/changetype');
const makeoptional = require('../GUIfunc/songdetailfanc/makeoptional');
const sendoptional = require('../GUIfunc/songdetailfanc/sendoptional');
const delsong = require('../GUIfunc/songdetailfanc/delsong');
const go_RANDsong = require('../GUIfunc/songdetailfanc/go_RANDsong');
const spotify = require('../generalfunc/spotify');
const getsongdata = require('../GUIfunc/songlistfanc/getsondata');
const setsongdata = require('../generalfunc/spfunc');
const conection = require('../GUIfunc/songdetailfanc/conection');
const setarchives = require('../GUIfunc/songdetailfanc/setarchives');
const delay = require("../generalfunc/delay");
const titlebox = document.getElementById('title');
const singerbox = document.getElementById('singer');
const durationbox = document.getElementById('duration');
const archivelist = document.getElementById('archives');
const now = document.getElementById('now');
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
const url = new URL(window.location.href);
const params = url.searchParams;
const songid = params.get('id');
let detail,waitkey;

(async ()=>{
    await wait();
    detail = await getsongdata(songid);
    console.log(detail);
    titlebox.innerText = detail.songname;
    singerbox.innerText = detail.singer;
    durationbox.innerText = await gettime(detail.duration);
    setarchives(songid);
    if(detail.optional_ID){
        document.getElementById('idtype').value = 'optional';
        changetype('optional');
        document.getElementById('form').classList.remove('none');
        document.getElementById('makeoptional').classList.add('none');
        document.getElementById('songname').value = detail.songname;
        document.getElementById('singer').value = detail.singer;
        document.getElementById('duration').value = await gettime(detail.duration);
    }else {
        //spodivに検索結果及び現在の情報を設置
        const spotifyapi = await spotify();
        if (detail.spotifyid) {
            now.innerText = "id:" + detail.spotifyid;
            let nowdata = await spotifyapi.getTrack(detail.spotifyid, {"Accept-Language": "ja"});
            console.log(nowdata);
            setsongdata(nowdata.body, now);
        } else {
            let noitem = document.createElement('h2');
            noitem.innerText = "連帯情報は登録されていません。";
            now.appendChild(noitem);
        }
        const sres = await spotifyapi.searchTracks(detail.songname, {"Accept-Language": "ja"});
        console.log(sres)
        for (var res of sres.body.tracks.items) {
            let t = res;
            let button = document.createElement('button');
            button.innerText = '登録';
            button.addEventListener('click', function () {
                conection(songid, t)
            });
            let div = document.createElement('div');
            div.appendChild(button);
            setsongdata(res, div);
            div.className = "item heihgt_auto";
            document.getElementById('srecult').appendChild(div);
        }
    }
})();

async function gettime(ms){
    let sec = Math.floor(ms/1000);
    let min = Math.floor(sec/60);
    if(min<10){
        min = "0"+min;
    }
    sec = sec % 60;
    return min + ":" + sec;
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