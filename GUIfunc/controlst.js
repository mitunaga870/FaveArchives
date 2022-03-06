require('dotenv').config();
const getstdata = require('../generalfunc/sqlfanc/getalldata');
const abb = require('../generalfunc/abbreviation');
const addtag = require('../GUIfunc/edittagfunc/addtag');
const url = new URL(window.location.href);
const params = url.searchParams;
const id = params.get('v');
const titletag = document.getElementById('title');
const detailbox = document.getElementById('description');
const tagbox = document.getElementsByClassName('tags');
const video = document.getElementById('videodiv');
const prayer = document.createElement('iframe');
const newtagtxbox = document.getElementById('newtag');
var edit = document.querySelector("#edit");
var editOverlay = document.querySelector("#edit-overlay");
var closeButton = document.querySelector("#close-edit");
var openButton = document.querySelector("#open-edit");
var settagsButton = document.querySelector("#sendnewtag");

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
        tagbox.appendChild(tag);
    }
    prayer.frameBorder =0;
    prayer.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    prayer.allowFullscreen;
    if(stdata.private==0) {
        prayer.src = "https://www.youtube.com/embed/" + id;
        video.appendChild(prayer);
    }else {
        if (process.env.ArchivesDirectory!=undefined) {
            prayer.src = process.env.ArchivesDirectory +"/"+stdata.title+".mp4";
        }
    }
    //閉じるボタン
    closeButton.addEventListener("click", function () {
        edit.classList.toggle("closed");
        editOverlay.classList.toggle("closed");
    });

    //開くボタン
    openButton.addEventListener("click", function () {
        edit.classList.toggle("closed");
        editOverlay.classList.toggle("closed");
    });
    
    //タグ追加処理
    openButton.addEventListener("click", async function () {
        var newtag =  await addtag(id,newtagtxbox.value);
        tagbox.removeChild(child);
        for(var i in newtag){
            var tag = document.createElement('div');
            tag.textContent = stdata.tags[i].tag;
            tagbox.appendChild(tag);
        }
    })
})();