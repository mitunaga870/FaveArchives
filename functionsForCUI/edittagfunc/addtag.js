const quary = require('../../generalfunc/sqlfanc/query');
const scan = require('../../generalfunc/scan');

module.exports = async (id,addedtag)=>{
    var newtags =[];
    console.log("タグを入力してください");
    var i=true;
    while (i) {
        await scan().then(res => {
            if (res.length == 0) {
                i = false;
                return;
            }
            if (addedtag.indexOf(res) == -1) {
                addedtag.push(res);
                newtags.push([res]);
            } else {
                console.log("タグが重複しています。");
            }
        });
    }
    console.log("以下のタグを追加します。\n"+newtags);
    if (newtags == [])
        return;
    quary('insert into tags (videoid, tag) VALUES (\''+id+'\',?);',newtags);
}