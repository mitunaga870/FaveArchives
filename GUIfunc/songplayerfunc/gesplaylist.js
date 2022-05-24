const quary = require('../../generalfunc/sqlfanc/query');
const store = require('../../generalfunc/store');

module.exports = async (firstid,listid) =>{
    let res;
    let x;
    if(listid){
        res = await quary('select songid,duration,songname,singer from songlist s join playlist p on s.songid = p.songid where playlistid = ?;',[listid]);
    }else {
        if (store.get('privatefilter')) {
            let temp = await quary('select songs.songid from songs join videodetail on songs.videoid = videodetail.videoid where videodetail.private = 0;');
            let ids = '(';
            for (var i of temp)
                ids += '\'' + i.songid + '\',';
            ids = ids.slice(0, -1);
            ids += ');';
            console.log(ids);
            res = await quary('select songid,duration,songname,singer from songlist where duration!=\'null\' and songid in' + ids);
            x = res.length;
        } else {
            res = await quary('select songid,duration,songname,singer from songlist where duration!=\'null\';');
            x = res.length;
        }
    }
    let results = [];
    for(var i = res.length;i>0;i--){
        let rand = Math.floor(Math.random()*(x));
        let pushid = res[rand];
        if(firstid==pushid.songid)
            results.unshift(pushid);
        else
            results.push(pushid);
        res.splice(rand,1);
        x--;
    }
    return results;
}