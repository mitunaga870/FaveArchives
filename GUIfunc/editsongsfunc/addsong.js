const quary = require('../../generalfunc/sqlfanc/query');
const delay = require('../../generalfunc/delay');

module.exports=async (id,songs)=>{
    await quary('DELETE  from songs where videoid = \''+id+'\';');
    let send_1 = [],send_2 = [];
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
        if(value[3].match(/X/))
            send_1.push([id, songid, time]);
        else
            send_2.push([id, songid, time, value[3]]);
    }
    console.log(send_1);
    if(send_1.length)
        await quary('insert into songs (videoid,songid,timestump) values ?; ',[send_1]);
    if(send_2.length)
        await quary('insert into songs (videoid,songid,timestump,endtime) values ?;',[send_2]);
}