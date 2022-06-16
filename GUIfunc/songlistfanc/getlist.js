const quary = require('../../generalfunc/sqlfanc/query');

module.exports = async () => {
    let q = 'select songid,songname,singer,spotifyid,optional_ID from songlist'
    q += ';';
    let res = await quary(q);
    for (let t in res){
        res[t].idtype = "undefined";
        if(res[t].spotifyid) {
            res[t].idtype = "spotify";
        }
        if (res[t].optional_ID)
            res[t].idtype = "optional";
    }
    return res;
}