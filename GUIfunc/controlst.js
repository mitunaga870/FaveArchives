require('dotenv').config();
const getstdata = require('../generalfunc/sqlfanc/getalldata');
const abb = require('../generalfunc/abbreviation');
const addtag = require('../GUIfunc/edittagfunc/addtag');
const addsong = require('../GUIfunc/editsongsfunc/addsong');
const settime = require('../GUIfunc/setprayertime');
const getsonglist = require('../generalfunc/sqlfanc/getsonglist');
const getsongs = require('../GUIfunc/editsongsfunc/getsongs');
const createuserselection = require('../GUIfunc/setuserselect');
const setdetail = require('../generalfunc/sqlfanc/setvideodetail');
const url = new URL(window.location.href);
const params = url.searchParams;
const id = params.get('v');
const titletag = document.getElementById('title');
const detailbox = document.getElementById('description');
const tagbox = document.getElementById('taglist');
const edittagbox = document.getElementById('edittag');
const video = document.getElementById('videodiv');
const newtagtxbox = document.getElementById('newtag');
const setsongbutton = document.getElementById('setsong');
const songselect = document.getElementById('songlist');
const songtitlebox = document.getElementById('songlist')
const newsongtitle = document.getElementById('songname');
const songtime = document.getElementById('timestump');
const addsonlist = document.getElementById('addsong');
const songlist = document.getElementById('songlist0');
const titlebox = document.getElementById('titlebox');
const detailbox2 = document.getElementById('descriptionbox');
const userselect = document.getElementById('userselect');
const ctypeselect = document.getElementById('ctypeselect');
const typeselect = document.getElementById('typeselect');
const priselect = document.getElementById('priselect');
const edit = document.querySelector("#edit");
const editOverlay = document.querySelector("#overlay");
const closeButton = document.querySelector("#close-edit");
const openButton = document.querySelector("#open-edit");
const settagsButton = document.querySelector("#sendnewtag");
const editsongsbox = document.querySelector('#editsongsbox');
const editsongsbutton = document.querySelector('#editsongs');
const sendsonglist = document.querySelector('#sendsong');
const senddetail = document.querySelector('#senddetail');
let rowid = 0;

(async () => {
    //初期データ取得処理
    const stdata = await getstdata(id);
    titletag.textContent = stdata.title;
    detailbox.textContent = stdata.description;
    const desc = document.createElement('summary');
    desc.textContent = await abb(stdata.description);
    detailbox.appendChild(desc);
    for(var i in stdata.tags){
        var tag = document.createElement('div');
        tag.textContent = stdata.tags[i].tag;
        tag.className = "tag";
        tagbox.appendChild(tag);
        var tag2 = document.createElement('div');
        tag2.textContent = stdata.tags[i].tag;
        tag2.className = "edittag";
        edittagbox.appendChild(tag2);
    }
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
        const prayer = document.createElement('iframe');
        prayer.frameBorder =0;
        prayer.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        prayer.allowFullscreen=true;
        prayer.src = "https://www.youtube.com/embed/" + id+"?autoplay=1";
        prayer.id = "video";
        prayer.enablejsapi = true;
        video.appendChild(prayer);
    }else {
        if (process.env.ArchivesDirectory!=undefined) {
            const prayer = document.createElement('video');
            var src = "file:///"+process.env.ArchivesDirectory +"/"+id+".mp4";
            console.log(src)
            prayer.src= src;
            prayer.controls=true;
            prayer.autoplay=true;
            prayer.id = "video";
            prayer.currentTime = await dts(stdata.time);
            video.appendChild(prayer);
        }
    }
    settime(id);
    //既存曲リストを記載
    let songs = await getsongs(id);
    setsongs(songs);
    //タグ編集ポップあうと閉じるボタン
    closeButton.addEventListener("click", function () {
        edit.classList.toggle("closed");
        editOverlay.classList.toggle("closed");
    });

    //タグ編集ポップあうと開くボタン
    openButton.addEventListener("click", function () {
        edit.classList.toggle("closed");
        editOverlay.classList.toggle("closed");
    });
    
    //タグ追加処理
    settagsButton.addEventListener("click", async function () {
        await deltag(tagbox);
        await deltag(edittagbox);
        var newtag =  await addtag(id,newtagtxbox.value);
        for(var i in newtag){
            var tag = document.createElement('div');
            tag.textContent = newtag[i];
            tag.className = "tag";
            tagbox.appendChild(tag);
            var tag2 = document.createElement('div');
            tag2.textContent = newtag[i];
            tag2.className = "tag";
            edittagbox.appendChild(tag2);
        }
        newtagtxbox.value = "";
        edit.classList.toggle("closed");
        editOverlay.classList.toggle("closed");
    });
    //お歌リスト編集ページ
    editsongsbutton.addEventListener('click',async function (){
        editsongsbox.classList.toggle('closed');
    });
    //曲をテーブルに追加
    setsongbutton.addEventListener('click',async function (){
        let temprow = addsonlist.insertRow();
        let tempid = rowid++;
        temprow.id = String(tempid);
        let tempcell = temprow.insertCell();
        let songid = songtitlebox.value;
        tempcell.appendChild(document.createTextNode(songid));
        tempcell = temprow.insertCell();
        if(parseInt(songid)==0){
            tempcell.appendChild(document.createTextNode(newsongtitle.value));
        }else {
            tempcell.appendChild(document.createTextNode(songtitlebox.options[songtitlebox.selectedIndex].innerText));
        }
        tempcell = temprow.insertCell();
        tempcell.appendChild(document.createTextNode(songtime.value));
        tempcell = temprow.insertCell();
        let delbutton = document.createElement('button');
        delbutton.id = "del" + String(tempid);
        delbutton.class = "del"
        delbutton.innerText = "X"
        delbutton.onclick = null;
        delbutton.addEventListener('click',function (){del(String(tempid))});
        tempcell.appendChild(delbutton);
    });
    //テーブル上の曲をDBに追加
    sendsonglist.addEventListener('click',async function (){
        console.log("送信します。");
        let senddata = [];
        for(var row of addsonlist.rows){
            let temp = [];
            if(parseInt(row.rowIndex)==0)
                continue;
            for (var cell of row.cells){
                if(parseInt(cell.cellIndex)==3)
                    continue;
                temp.push(cell.textContent);
            }
            senddata.push(temp);
        }
        console.log(senddata);
        addsong(id,senddata);
    });
    senddetail.addEventListener('click',async function (){
        await setdetail(id,titlebox.value,detailbox2.value,ctypeselect.value,priselect.value,typeselect.value,userselect.value);
        document.getElementById('edetailbox').classList.toggle('closed');
    })
})();

async function deltag(main){
    while (main.lastChild){
        console.log(main.lastChild);
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

function setsongs(songs){
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