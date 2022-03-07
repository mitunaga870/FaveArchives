require('dotenv').config();
const getstdata = require('../generalfunc/sqlfanc/getalldata');
const abb = require('../generalfunc/abbreviation');
const addtag = require('../GUIfunc/edittagfunc/addtag');
const url = new URL(window.location.href);
const params = url.searchParams;
const id = params.get('v');
const titletag = document.getElementById('title');
const detailbox = document.getElementById('description');
const tagbox = document.getElementById('taglist');
const edittagbox = document.getElementById('edittag');
const video = document.getElementById('videodiv');
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
        tag.className = "tag";
        tagbox.appendChild(tag);
        var tag2 = document.createElement('div');
        tag2.textContent = stdata.tags[i].tag;
        tag2.className = "edittag";
        edittagbox.appendChild(tag2);
    }
    if(stdata.private==0) {
        const prayer = document.createElement('iframe');
        prayer.frameBorder =0;
        prayer.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        prayer.allowFullscreen=true;
        prayer.autoplay=true;
        prayer.src = "https://www.youtube.com/embed/" + id;
        video.appendChild(prayer);
    }else {
        if (process.env.ArchivesDirectory!=undefined) {
            const prayer = document.createElement('video');
            var src = "file:///"+process.env.ArchivesDirectory +"/"+id+".mp4";
            console.log(src)
            prayer.src= src;
            prayer.controls=true;
            prayer.autoplay=true;
            video.appendChild(prayer);
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
    })
})();

async function deltag(main){
    while (main.lastChild){
        console.log(main.lastChild);
        main.removeChild(main.lastChild);

    }
}