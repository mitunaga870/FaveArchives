const query = require('../../generalfunc/sqlfanc/query');

module.exports = async (basetxt) =>{
    var ids = [];
    const searchtxts = basetxt.split(/\s/);
    //タイトルに検索
    let querytx = "select videoid from videodetail where title like "
    for (var i in searchtxts){
        querytx += "\'%"+searchtxts[i]+"%\'";
        if (searchtxts[parseInt(i)+1]!=undefined){
            querytx += " or title like ";
        }else{
            querytx +=";"
        }
    }
    var temp;
    await query(querytx).then(res=>{temp =res;});
    for (var i in temp){
        ids.push(temp[i].videoid);
    }
    //タグに検索
    querytx = "select videoid from tags where tag like "
    for (var i in searchtxts){
        querytx += "\'%"+searchtxts[i]+"%\'";
        if (searchtxts[parseInt(i)+1]!=undefined){
            querytx += " or tag like ";
        }else{
            querytx +=";"
        }
    }
    await query(querytx).then(res=>{temp =res;});
    for (var i in temp){
        ids.push(temp[i].videoid);
    }
    //曲リストに検索
    querytx = "select videoid from songs where songname like "
    for (var i in searchtxts){
        querytx += "\'%"+searchtxts[i]+"%\'";
        if (searchtxts[parseInt(i)+1]!=undefined){
            querytx += " or songname like ";
        }else{
            querytx +=";"
        }
    }
    await query(querytx).then(res=>{temp =res;});
    for (var i in temp){
        ids.push(temp[i].videoid);
    }
    //ゲームリストに検索
    querytx = "select videoid from games where title like "
    for (var i in searchtxts){
        querytx += "\'%"+searchtxts[i]+"%\'";
        if (searchtxts[parseInt(i)+1]!=undefined){
            querytx += " or title like ";
        }else{
            querytx +=";"
        }
    }
    //重複を削除
    const fillteredids = Array.from(new Set(ids));
    return fillteredids;
}