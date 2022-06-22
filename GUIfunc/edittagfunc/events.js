window.jQuery = window.$ = require('jquery');
const {ipcRenderer} = require('electron');

const query = require('../../generalfunc/sqlfanc/query');
const refresh = require('../../GUIfunc/edittagfunc/refresh');

module.exports = async () => {
    const edit = $('#edit');
    //一時テーブルに追加
    $('#sendnewtag').on('click',async ()=>{
        const input = $('#newtag');
        const news = input.val().split(/\s/);
        news.forEach((newitem)=> {
            const div = $('<div>', {
                text: newitem,
                class: "etag new"
            });
            const delbt = $('<button>', {
                text: "X",
                class: "delbt"
            }).on('click', () => {
                div.addClass("none");
                div.removeClass("new");
            });
            div.append(delbt);
            $('#edittag').append(div);
        });
    });
    //一時テーブルをDBに追加
    $('#tag_send').on('click',async ()=>{
        ipcRenderer.invoke('notice',["書き込みを開始します。"]);
        let newitem = false,newtags = [],delitem = false,deltags = [];
        $('.etag.new').each((i,ele)=>{
            const temp = [id,$(ele).text().slice(0,-1)];
            newtags.push(temp);
            newitem = true;
        });
        $('.etag.del').each((i,ele)=>{
            deltags.push($(ele).text().slice(0,-1));
            delitem = true;
        });
        if(delitem)
            await query('delete from tags where videoid = ? and tag in ?;',[id,[deltags]]);
        if(newitem)
            await query('insert into tags (videoid,tag) values ?;',[newtags]);
        await refresh();
        edit.toggleClass("closed");
        ipcRenderer.invoke('notice',["書き込みを完了しました。"]);
    })
    //タグ編集ポップあうと閉じるボタン
    const closeButton = $('#close-edit');
    closeButton.on("click", function () {
        edit.toggleClass("closed");
    });
    //タグ編集ポップあうと開くボタン
    const openButton = $("#open-edit");
    openButton.on("click", function () {
        edit.toggleClass("closed");
    });
    //
}