const quary = require('../../generalfunc/sqlfanc/query');

module.exports=async (id,songs)=>{
    await quary('DELETE  from songs where videoid = \''+id+'\';');
    let temp = [];
    for(var value of songs){
        let songid = parseInt(value[0]);
        let songname = value[1];
        let time = value[2];
        if (songid==0){
            await quary('insert into songlist (songname) values (?);', [songname]);
            let id = await quary('SELECT songid from songlist where songname = \''+songname+'\' order by songid desc;');
            console.log(id)
            songid = id[0].songid;
        }
        await quary('insert into songs (videoid,songid,timestump) values (?,?,?);', [id, songid, time]);
    }
}