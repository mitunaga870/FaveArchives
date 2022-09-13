const quary = require('../../generalfunc/sqlfanc/query');

module.exports = async (id,detail) => {
    if (await ipcRenderer.invoke('comfirm',["任意情報を作成します（spotifyの連携は解除されます）"])) {
        quary('update songlist set optional_ID = \'1\' where songid = ?;', [id]);
        document.getElementById('form').classList.remove('none');
        document.getElementById('makeoptional').classList.add('none');
        document.getElementById('songname').value = detail.songname;
        document.getElementById('singer').value = detail.singer;
        document.getElementById('duration').value = await gettime(detail.duration);
    }else {
        return;
    }
}

async function gettime(ms){
    let sec = Math.floor(ms/1000);
    let min = Math.floor(sec/60);
    if(min<10){
        min = "0"+min;
    }
    sec = sec % 60;
    return min + ":" + sec;
}