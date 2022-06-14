const quary = require('../../generalfunc/sqlfanc/query');
const spotify = require("../../generalfunc/spotifyfacn/spotify");
const store = require("../../generalfunc/store");
window.jQuery = window.$ = require('jquery');

module.exports = async () =>{
    const spotifyAPI = await spotify();
    let i=0;
    let q = 'select s1.songid,songname,singer,spotifyid from songlist s1';
    if(store.get('privatefilter')){
        q += ' join songs s2 on s1.songid = s2.songid join videodetail v on s2.videoid = v.videoid where v.private = \'0\''
    }
    q += ' order by RAND() LIMIT 50;';
    const res = await quary(q);
    Array.prototype.forEach.call(res,async (item)=>{
        let error = false;
        const res = await spotifyAPI.getTrack(item.spotifyid).catch((e)=>{
            console.log(e+"\ntracid:"+item.spotifyid);
            error = true;
        });
        if(error)
            return;
        const rowname = ".songrow."+(i++%2);
        const a = $('<a>',{
            href:"songplayer.html?s="+item.songid
        });
        const div = $('<div>',{
            "class":"items song",
            css:{
                "background-image": "URL(" + res.body.album.images[0].url + ")"
            },
            text:item.songname+item.singer
        });
        a.append(div);
        $(rowname).append(a);
    })
}