const quary = require('../../generalfunc/sqlfanc/query');
const { ipcRenderer } = require('electron');

module.exports = async (id,data) => {
    if (await ipcRenderer.invoke('comfirm',[
        data.name+"/"+await getartists(data.artists)+"を連帯させます。"
    ])){
        await quary('update songlist set spotifyid = ?,songname = ?,singer = ?,duration = ? where songid = \'' + id + '\';', [data.id, data.name, await getartists(data.artists), data.duration_ms]);
        window.location.href = './songdetail.html?id=' + id;
    }else {
        return;
    }
}

async function getartists(artists){
    let res = "";
    for(var artist of artists){
        res+=artist.name+"・";
    }
    console.log(res)
    const result = res.slice(-1,0);
    console.log(result)
    return res;
}