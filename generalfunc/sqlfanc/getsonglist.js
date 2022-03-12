const quary = require('./query');

module.exports = async (id) =>{
    const all = await quary('select songid,songname from songlist;');
    const added = await quary('select * from songs join songlist on songs.songid = songlist.songid where songs.videoid=\''+id+'\';');
    return {
        allsong:all,
        addedsong:added
    };
}