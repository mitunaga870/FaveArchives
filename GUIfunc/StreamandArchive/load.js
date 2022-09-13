const add_songsevent = require("../../GUIfunc/editsongsfunc/events");
const add_tag_events = require("../../GUIfunc/edittagfunc/events");
const add_timetableevent = require("../../GUIfunc/edittimetable/events");
const getstdata = require("../../generalfunc/sqlfanc/getalldata");
const tag_refresh = require("../../GUIfunc/edittagfunc/refresh");
const getsonglist = require("../../generalfunc/sqlfanc/getsonglist");
const getsongs = require("../../GUIfunc/editsongsfunc/getsongs");

const newtagtxbox = document.getElementById('newtag');
const songselect = document.getElementById('songlist');
const addsonlist = document.getElementById('addsong');
const songlist = document.getElementById('songlist0');

module.exports = async (id) =>{
    const stdata = await getstdata(id)
    tag_refresh(stdata.tags);
    $('#title').text(stdata.title);
    $('#description').text(stdata.description);
    $('#description').append($('<summary>').text(stdata.description));
    add_songsevent();
    add_tag_events();
    add_timetableevent();
    const songdata = await getsonglist(id);
    songdata.allsong.forEach((song)=>{
        let option = $('<option>');
        option.val(song.songid);
        option.text(song.songname+"/"+song.singer);
        $('#songlist').append(option);
    });
    //既存曲リストを記載
    let songs = await getsongs(id);
    setsongs(songs);
}
async function delchild(main){
    while (main.lastChild){
        main.removeChild(main.lastChild);
    }
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