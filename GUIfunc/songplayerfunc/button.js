const uuid = require('node-uuid');
const quary = require('../../generalfunc/sqlfanc/query');
const setplaylist = require('../../GUIfunc/songplayerfunc/playlistseter');
const check_playlist = require('../../GUIfunc/songplayerfunc/check_playlist');

module.exports = () =>{
    const addbt = document.getElementById('playlist_add');
    const newform = document.getElementById('newlistform');
    document.getElementById('go_archive').addEventListener('click',()=>{
        document.location = achiveurl;
    })
    document.getElementById('addtoplaylist').addEventListener('click',()=>{
        document.getElementById('playlisteditor').classList.toggle('none');
        addbt.classList.remove('none');
        newform.classList.add('none');
    })
    document.getElementById('close_playlisteditor').addEventListener('click',()=>{
        document.getElementById('playlisteditor').classList.toggle('none');
    })
    addbt.addEventListener('click',async ()=> {
        addbt.classList.add('none');
        newform.classList.remove('none');
    })
    document.getElementById('send_newplaylist').addEventListener('click',async ()=>{
        const newid = uuid.v4();
        const newname = document.getElementById('newname').value;
        await quary('insert into playlist_name values (?,?);',[newid,newname]);
        await quary('insert into playlist values (?,?);',[newid,nowid]);
        await setplaylist();
        await check_playlist();
        document.getElementById('playlisteditor').classList.toggle('none');
    })
    document.getElementById('list_selector').addEventListener('change',()=>{
        document.location = "songplayer.html?li="+document.getElementById('list_selector').value;
    })
}