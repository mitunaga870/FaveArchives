const quary = require('../../generalfunc/sqlfanc/query');
const scan = require('../../generalfunc/scan');

module.exports = async (id,addedtag) =>{
    var deltag = [],i;
    console.log("削除するタグを入力してください。");
    while (i) {
        await scan().then(res => {
            if (res.length == 0) {
                i = false;
                return;
            }
            if (addedtag.indexOf(res) == -1) {
                console.log("タグが存在していません。");
            } else {
                deltag.push(res);
                addedtag.splice(addedtag.indexOf(res));
            }
        });
    };
    console.log("以下のタグを削除"+deltag);
    if (deltag == [])
        return;
    var query = "delete from tags where videoid = \'"+id+'\' and tag in ('
    for(i in deltag){
        query += deltag+'\'';
        if (deltag[parseInt(i)+1]==undefined){
            query += ');';
        }else {
            query += ',\'';
        }
    }
    await quary(query);
}