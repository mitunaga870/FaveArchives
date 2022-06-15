const quary = require('../../generalfunc/sqlfanc/query');
const spotify = require('../../generalfunc/spotifyfacn/spotify');
const store = require('../../generalfunc/store');

module.exports = async (firstid,listid,splist) =>{

    let res;
    let x;
    if(listid){
        res = await quary('select s.spotifyid,songid,s.duration,s.songname,s.singer from songlist s join playlist p on s.songid = p.songid where p.playlistid = ?;',[listid]);
    }else if(splist) {
        const spotifyWebApi = await spotify();
        const list = await spotifyWebApi.getPlaylistTracks(splist);
        let items = list.body.items;
        console.log(items)
        let id = [];
        items.forEach((item)=>{
            if(item.track.id!=null)
                id.push(item.track.id);
        })
        console.log(id);
        let q = 'select s1.spotifyid,s1.songid,duration,songname,singer,spotifyid from songlist s1 join songs s2 on s1.songid = s2.songid join videodetail v on s2.videoid = v.videoid';
        if (store.get('privatefilter')) {
            q += ' where v.private = 0 '
        } else {
            q += ' where  v.private != -1'
        }
        q+= ' and s1.spotifyid in (?);'
        res = await quary(q,id);
    }else {
        if (store.get('privatefilter')) {
            let temp = await quary('select songs.songid from songs join videodetail on songs.videoid = videodetail.videoid where videodetail.private = 0;');
            let ids = '(';
            for (var i of temp)
                ids += '\'' + i.songid + '\',';
            ids = ids.slice(0, -1);
            ids += ');';
            console.log(ids);
            res = await quary('select spotifyid,songid,duration,songname,singer from songlist where duration!=\'null\' and songid in' + ids);
        } else {
            res = await quary('select songid,duration,songname,singer,spotifyid from songlist where duration!=\'null\';');
        }
    }
    x = res.length;
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
    console.log(results);
    return results;
}