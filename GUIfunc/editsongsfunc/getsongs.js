const quary = require('../../generalfunc/sqlfanc/query');

module.exports = async (id) => {
    return await quary('select songs.songid,songlist.songname,songs.timestump from songs join songlist on songs.songid = songlist.songid where songs.videoid = \''+id+'\' order by songs.timestump;');
}