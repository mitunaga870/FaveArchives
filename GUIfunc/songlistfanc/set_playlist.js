window.jQuery = window.$ = require('jquery');
const quary = require('../../generalfunc/sqlfanc/query');
const del = require('../../generalfunc/delchildren');

module.exports = async () =>{
    del(document.getElementById('playlist_box'));
    const res = await quary('select * from playlist_name');
    res.forEach((playlist)=>{
        //編集ページに追加
        const div = document.createElement('div');
        div.className = "playlist_div"
        const inner_label = document.createElement('div');
        inner_label.innerText = playlist.title;
        inner_label.className = "inner_label"
        const label = document.createElement('label');
        label.appendChild(inner_label);
        const input = document.createElement('input');
        input.type="checkbox";
        input.className="playlists";
        input.id=playlist.playlistid;
        input.addEventListener('change',()=>{
            if(input.checked)
                quary('insert into playlist values (?,?);',[playlist.playlistid,nowid]);
            else
                quary('delete from playlist where playlistid = ? and songid = ?;',[playlist.playlistid,nowid]);
        });
        label.appendChild(input);
        div.appendChild(label);
        const button = document.createElement('button');
        button.innerText = "削除"
        button.addEventListener('click',async ()=>{
            await quary('delete from playlist where playlistid = ?;',[playlist.playlistid]);
            await quary('delete from playlist_name where playlistid = ?;',[playlist.playlistid]);
            await setplaylist();
            await check_playlist();
        })
        div.appendChild(button);
        document.getElementById('playlist_box').appendChild(div);
    })
}