window.jQuery = window.$ = require('jquery');
const uuid = require('node-uuid');
const quary = require("../../generalfunc/sqlfanc/query");
const setplaylist = require("../../GUIfunc/songplayerfunc/playlistseter");
const check_playlist = require("../../GUIfunc/playlistfunc/check_playlist");

module.exports = () => {
    $('#close_playlisteditor').on('click',()=>{
        $('#playlisteditor').addClass('none');
    });
    $('#playlist_add').on('click',()=>{
        $('#playlist_add').addClass('none');
        $('#newlistform').removeClass('none');
    });
    $('#send_newplaylist').on('click',async ()=>{
        const newid = uuid.v4();
        const newname = $('#newname').val();
        await quary('insert into playlist_name values (?,?);',[newid,newname]);
        await quary('insert into playlist values (?,?);',[newid,nowid]);
        await setplaylist();
        await check_playlist();
        $('#playlisteditor').addClass('none');
    });
}