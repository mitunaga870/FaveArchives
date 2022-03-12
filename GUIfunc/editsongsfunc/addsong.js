const quary = require('../../generalfunc/sqlfanc/query');

module.exports=async (id,songs)=>{
    await quary('DELETE  from songs where videoid = \''+id+'\';');
    let temp = [];
    for(var value of songs){
        let songid = parseInt(value[0]);
        let songname = value[1];
        let time = value[2];
        if (songid==0) {
            await quary('insert into songlist (songname) values (?);', [songname]);
            songid = await quary('SELECT LAST_INSERT_ID();');
            songid = songid[0]['LAST_INSERT_ID()'];
        }
        await quary('insert into songs (videoid,songid,timestump) values (?,?,?);',[id,songid,time]);
    }
}