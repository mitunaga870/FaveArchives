const quary = require('../../generalfunc/sqlfanc/query');

module.exports = async () => {
    const listid = await quary('select playlistid from playlist where songid = ?;',[nowid]);
    const checkboxes = document.getElementsByClassName('playlists');
    Array.prototype.forEach.call(checkboxes,(checkbox)=> {checkbox.checked=false});
    if(!listid.length) {
        console.log("プレイリストに入ってないよ")
        return;
    }
    console.log(checkboxes);
    Array.prototype.forEach.call(checkboxes,(checkbox)=>{
        const id_1 = checkbox.id;
            listid.forEach((list)=>{
            const id_2 = list.playlistid;
            console.log("id_1:"+id_1+"id_2"+id_2);
            if(id_1==id_2) {
                checkbox.checked = true;
            }
        })
    })
}