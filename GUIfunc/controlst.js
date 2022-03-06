const getstdata = require('../generalfunc/sqlfanc/getalldata');
const abb = require('../generalfunc/abbreviation');
const url = new URL(window.location.href);
const params = url.searchParams;
const id = params.get('v');
const titletag = document.getElementById('title');
const detailbox = document.getElementById('description');
const tagbox = document.getElementById('tags');
const video = document.getElementById('videodiv');
const prayer = document.createElement('iframe');
var modal = document.querySelector("#modal");
var modalOverlay = document.querySelector("#modal-overlay");
var closeButton = document.querySelector("closeedit");
var openButton = document.querySelector("startedit");

(async () => {
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
    }
    //閉じるボタン
    closeButton.addEventListener("click", function () {
        modal.classList.toggle("closed");
        modalOverlay.classList.toggle("closed");
    });

    //開くボタン
    openButton.addEventListener("click", function () {
        modal.classList.toggle("closed");
        modalOverlay.classList.toggle("closed");
    });
})();