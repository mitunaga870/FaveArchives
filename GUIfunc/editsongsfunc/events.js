const addsong = require("../../GUIfunc/editsongsfunc/addsong");
const getsongs = require("../../GUIfunc/editsongsfunc/getsongs");

const {ipcRenderer} = require("electron");

const songtitlebox = document.getElementById('songlist')
const newsongtitle = document.getElementById('songname');
const songtime = document.getElementById('timestump_start');
const songtime_end = document.getElementById('timestump_end');
const editsongsbox = document.querySelector('#editsongsbox');
const editsongsbutton = document.querySelector('#editsongs');
const sendsonglist = document.querySelector('#sendsong');
const setsongbutton = document.getElementById('setsong');

module.exports = async () =>{

    //お歌リスト編集ページ
    editsongsbutton.addEventListener('click',async function (){
        editsongsbox.classList.toggle('closed');
    });
    //曲をテーブルに追加
    setsongbutton.addEventListener('click',async function () {
        if (await dts(songtime_end.value) < await dts(songtime.value)){
            await ipcRenderer.invoke('notice',["終了時刻が開始時刻よりも早い時間に登録されています。"]);
            return
            }
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
        tempcell.appendChild(document.createTextNode(songtime.value))
        let endtime = songtime_end.value;
        console.log(endtime)
        if (endtime){
            tempcell = temprow.insertCell();
            tempcell.appendChild(document.createTextNode(endtime));
            songtime_end.value = null;
        }
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
        ipcRenderer.invoke('notice',["書き込みを開始します。"]);
        let senddata = [];
        for(var row of addsonlist.rows){
            let temp = [];
            for (var cell of row.cells){
                if(parseInt(cell.cellIndex)==4)
                    continue;
                temp.push(cell.textContent);
            }
            senddata.push(temp);
        }
        console.log(senddata);
        await addsong(id,senddata);
        let songs = await getsongs(id);
        await setsongs(songs);
        editsongsbox.classList.toggle('closed');
        ipcRenderer.invoke('notice',["書き込みを完了しました。"]);
    });
}