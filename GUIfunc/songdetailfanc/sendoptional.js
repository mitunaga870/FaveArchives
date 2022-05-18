const quary = require('../../generalfunc/sqlfanc/query');
const {ipcRenderer} = require("electron");

module.exports = async (id) => {
    const name = document.getElementById('songname').value;
    const singer = document.getElementById('insinger').value;
    const duration = document.getElementById('induration').value;
    if (await ipcRenderer.invoke('comfirm',[
        name+"/"+singer+"を連帯させます。"
    ])){
        await quary('update songlist set songname = ?,singer = ?,duration = ? where songid =\'' + id + '\';', [name, singer, await getms(duration)]);
        window.location.href = './songdetail.html?id=' + id;
    }else {
        return;
    }
}

async function getms(duration){
    let temp = duration.split(/:/);
    return (parseInt(temp[0])*60+parseInt(temp[1]))*1000;
}