const quary = require('../../generalfunc/sqlfanc/query');
const scan = require('../../generalfunc/scan');

module.exports = async (id,newtagstr)=>{
    var temp = async quary("select tag from tags where videoid=\'"+id+'\';');
    for (var i in temp){

    }
    var newtags =[];
    var temp = newtagstr.split(/\s/);
    for (var i in temp){
        if(addedtag.indexOf(temp[i])==-1){
            newtags.push([temp[i]]);
            addedtag.push(temp[i]);
        }
    }
    console.log("以下のタグを追加します。\n"+newtags);
    if (newtags == [])
        return;
    quary('insert into tags (videoid, tag) VALUES (\''+id+'\',?);',newtags);
    return addedtag;
}