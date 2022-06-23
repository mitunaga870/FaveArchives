const add_timetableevent = require('../GUIfunc/edittimetable/events');
const getstdata = require('../generalfunc/sqlfanc/getalldata');
const abb = require('../generalfunc/abbreviation');
const settime = require('../GUIfunc/setprayertime');
const getsonglist = require('../generalfunc/sqlfanc/getsonglist');
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
const newtagtxbox = document.getElementById('newtag');
const songselect = document.getElementById('songlist');
const addsonlist = document.getElementById('addsong');
const songlist = document.getElementById('songlist0');
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
    add_songsevent();
    add_tag_events();
    add_timetableevent();
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
    const songdata = await getsonglist(id);
    songdata.allsong.forEach((song)=>{
        let option = document.createElement('option');
        option.value = song.songid;
        option.innerText = song.songname+"/"+song.singer;
        songselect.appendChild(option);
    });
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
    chatmaneger(id,player);
    settime(id);
    //既存曲リストを記載
    let songs = await getsongs(id);
    setsongs(songs);
    //コメント読み込み
    senddetail.addEventListener('click',async function (){
        await setdetail(id,titlebox.value,detailbox2.value,ctypeselect.value,priselect.value,typeselect.value,userselect.value);
        document.getElementById('edetailbox').classList.toggle('closed');
    })
})();

async function delchild(main){
    while (main.lastChild){
        main.removeChild(main.lastChild);
    }
}

async function dts(time){
    let temp = time.split(':');
    let result =  parseInt(temp[0])*60*60;
    result += parseInt(temp[1])*60;
    result += parseInt(temp[2]);
    return result;
}

function del(id){
    console.log(id);
    const target = document.getElementById(id);
    target.remove();
}

async function setsongs(songs){
    await delchild(addsonlist);
    await delchild(songlist);
    for (var value of songs){
        let temprow = addsonlist.insertRow();
        let tempid = rowid++;
        temprow.id = String(tempid);
        let tempcell = temprow.insertCell();
        let songid = value.songid;
        tempcell.appendChild(document.createTextNode(songid));
        tempcell = temprow.insertCell();
        tempcell.appendChild(document.createTextNode(value.songname));
        tempcell = temprow.insertCell();
        tempcell.appendChild(document.createTextNode(value.timestump));
        tempcell = temprow.insertCell();
        let delbutton = document.createElement('button');
        delbutton.id = "del" + String(tempid);
        delbutton.class = "del"
        delbutton.innerText = "X"
        delbutton.onclick = null;
        delbutton.addEventListener('click',function (){del(String(tempid))});
        tempcell.appendChild(delbutton);

    }
    for (var value of songs){
        let temprow = songlist.insertRow();
        let tempid = rowid++;
        temprow.id = String(tempid);
        let tempcell = temprow.insertCell();
        tempcell = temprow.insertCell();
        tempcell.appendChild(document.createTextNode(value.songname));
        tempcell = temprow.insertCell();
        let time = value.timestump;
        tempcell.appendChild(document.createTextNode(time));
        tempcell = temprow.insertCell();
        let button = document.createElement('button');
        button.innerText = "再生"
        button.onclick = null;
        button.addEventListener('click',function (){set(time)});
        tempcell.appendChild(button);
    }
}

async function set(time){
    console.log(time);
    let prayer = document.getElementById('video');
    if(prayer.nodeName.match('VIDEO')) {
        prayer.currentTime = await dts(time);
    }else {
        let t = await dts(time)
        let temp = prayer.src;
        temp = temp.split(/&/)
        temp = temp[0];
        prayer.src = temp + "&start=" +t;
    }
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