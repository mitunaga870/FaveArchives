const quary = require('./query');

module.exports = async (id) =>{
    const all = await quary('select songid,songname,singer from songlist;');
    if(typeof all === 'string')
        return all;
    const added = await quary('select * from songs join songlist on songs.songid = songlist.songid where songs.videoid=\''+id+'\';');
    if(typeof added === 'string')
        return added;
    return {
        allsong:all,
        addedsong:added
    };
}