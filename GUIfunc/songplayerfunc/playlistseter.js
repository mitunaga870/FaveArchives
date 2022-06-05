const quary = require('../../generalfunc/sqlfanc/query');

module.exports = async () =>{
    const res = await quary('select * from playlist_name');
    res.forEach((playlist)=>{
        const option = document.createElement('option');
        option.value = playlist.playlistid;
        option.innerText = playlist.title;
        document.getElementById('playlistselector').appendChild(option);
    })
}