const loaddata = require('../GUIfunc/StreamandArchive/load');
const add_timetableevent = require('../GUIfunc/edittimetable/events');
const dts = require('../generalfunc/DatetoString');
const getstdata = require('../generalfunc/sqlfanc/getalldata');
const abb = require('../generalfunc/abbreviation');
const settime = require('../GUIfunc/setprayertime');
const getsongs = require('../GUIfunc/editsongsfunc/getsongs');
const createuserselection = require('../GUIfunc/setuserselect');
const setdetail = require('../generalfunc/sqlfanc/setvideodetail');
const addhistory = require('../generalfunc/sqlfanc/addhistory');
const delay = require('../generalfunc/delay');
const chatmaneger = require('../GUIfunc/chatfanc_var2/chatmaneger');
const setborderless_event = require('../GUIfunc/borderlessfunc/borderless_event');
const add_songsevent = require('../GUIfunc/editsongsfunc/events');
const ui = require('../GUIfunc/UI/stdetail');
const add_tag_events = require('../GUIfunc/edittagfunc/events');
const tag_refresh = require('../GUIfunc/edittagfunc/refresh');
const store = require('../generalfunc/store');
const url = new URL(window.location.href);
const params = url.searchParams;
const id = params.get('v');
const titletag = document.getElementById('title');
const detailbox = document.getElementById('description');
const video = document.getElementById('videodiv');
const titlebox = document.getElementById('titlebox');
const detailbox2 = document.getElementById('descriptionbox');
const userselect = document.getElementById('userselect');
const ctypeselect = document.getElementById('ctypeselect');
const typeselect = document.getElementById('typeselect');
const priselect = document.getElementById('priselect');
const senddetail = document.querySelector('#senddetail');
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
let rowid = 0;
let timechange = false;
let player;
const fs = require("fs");
let log;
let chatdata;

(async ()=>{
    ui();
    loaddata(id);
    addhistory(id);
    setborderless_event();
    const reses = await Promise.all([wait(),getstdata(id)]);
    //初期データ取得処理
    const stdata = reses[1];
    tag_refresh(stdata.tags);
    titletag.textContent = stdata.title;
    detailbox.textContent = stdata.description;
    const desc = document.createElement('summary');
    desc.textContent = await abb(stdata.description);
    detailbox.appendChild(desc);
    //詳細情報セット
    await createuserselection(userselect);
    titlebox.value = stdata.title;
    detailbox2.value = stdata.description;
    ctypeselect.value = stdata.contenttype;
    typeselect.value = stdata.type;
    userselect.value = stdata.userid;
    priselect.value = stdata.private;
    //曲リスト編集ページ系の情報セット
    //プレイヤーセット
    if(stdata.private==0) {
        let iframe = document.createElement('div');
        iframe.id = 'video'
        video.appendChild(iframe);
        player = new YT.Player('video', {
            videoId: id,
            events: {
                'onReady': onPlayerReady
            },
            playerVars: {
                autoplay:1,
                rel:0,
                enablejsapi:1,
                modestbranding:1,
                html5: 1
            }
        });
        await wait();
    }else {
        if (true) {//設定の存在に左右させる
            player = document.createElement('video');
            var src = "file:///"+store.get('archivespath')+"\\"+id+".mp4";
            console.log(src)
            player.src= src;
            player.controls=true;
            player.autoplay=true;
            player.id = "video";
            player.addEventListener('seeked',async function () {
                timechange = true;
            });
            player.currentTime = await dts(stdata.time);
            video.appendChild(player);
        }
    }
    chatmaneger(id,player,stdata.livestate);
    settime(id);
    //コメント読み込み
    senddetail.addEventListener('click',async function (){
        await setdetail(id,titlebox.value,detailbox2.value,ctypeselect.value,priselect.value,typeselect.value,userselect.value);
        document.getElementById('edetailbox').classList.toggle('closed');
    })
})();



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