module.exports = async (spres,target) =>{
    let title = document.createElement('p');
    title.innerText = spres.name + "/" +await getartists(spres.artists);
    target.appendChild(title);
    let txt = document.createElement('div');
    txt.innerText+="尺："+await gettime(spres.duration_ms);
    target.appendChild(txt)
}

async function getartists(artists){
    let res = "";
    for(var artist of artists){
        res+=artist.name+"・";
    }
    const result = res.slice(0,-1);
    return res;
}

async function gettime(ms){
    let sec = Math.floor(ms/1000);
    const min = Math.floor(sec/60);
    sec = sec % 60;
    return min + ":" + sec;
}