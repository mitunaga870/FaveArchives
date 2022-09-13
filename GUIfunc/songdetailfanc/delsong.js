const quary = require('../../generalfunc/sqlfanc/query');

module.exports = async (id) =>{
    let archives = await quary('select videodetail.title,songs.timestump from songs join videodetail on songs.videoid = videodetail.videoid where songs.songid = ?;',[id]);
    let confirm  = "\n";
    if (archives.length >0){
        confirm += "注意：この楽曲は以下のアーカイブに登録されています";
        for (let item of archives){
            confirm += "\n"+item.title + "/" + item.timestump;
        }
    }
    if (await ipcRenderer.invoke('comfirm',["楽曲情報を削除します。"+confirm])) {
        await quary('delete from songlist where songid = ?;',[id]);
        await quary('delete from songs where songid = ?;',[id]);
        await ipcRenderer.invoke('notice',["削除しました。曲リスト一覧へ戻ります。"]);
        document.location.href = "sonlist.html";
    }
}