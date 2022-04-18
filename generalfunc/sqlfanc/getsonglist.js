const quary = require('./query');

module.exports = async (id) =>{
    const all = await quary('select songid,songname,singer from songlist;');
    if(all.match(/ERROR/))
        return all;
    const added = await quary('select * from songs join songlist on songs.songid = songlist.songid where songs.videoid=\''+id+'\';');
    if(added.match(/ERROR/))
        return added;
    return {
        allsong:all,
        addedsong:added
    };
}