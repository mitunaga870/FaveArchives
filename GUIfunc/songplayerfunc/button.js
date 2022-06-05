const uuid = require('node-uuid');
const quary = require('../../generalfunc/sqlfanc/query');
module.exports = () =>{
    document.getElementById('go_archive').addEventListener('click',()=>{
        document.location = achiveurl;
    })
    document.getElementById('addtoplaylist').addEventListener('click',()=>{
        document.getElementById('playlisteditor').classList.toggle('none');
    })
    document.getElementById('close_playlisteditor').addEventListener('click',()=>{
        document.getElementById('playlisteditor').classList.toggle('none');
    })
    document.getElementById('playlist_update').addEventListener('click',async ()=> {
        console.log('a')
        let target = document.getElementById('playlistselector').value;
        if(target.match(/new/)) {
            target = uuid.v4();
            let title = document.getElementById('newplaylistname').value;
            await quary('insert into playlist_name (playlistid,title) values (?,?);',[target,title]);
        }
        await quary('Insert into playlist (playlistid,songid) values (?,?);',[target,nowid]);
        document.getElementById('playlisteditor').classList.add('none');
    })
}