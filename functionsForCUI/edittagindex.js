const addtag= require('./edittagfunc/addtag');
const quary = require("../generalfunc/sqlfanc/query");
const scan = require('../generalfunc/scan');
const deltag = require('./edittagfunc/deltag');

module.exports = async (id) =>{
    var sctemp;
    var addedtag = [];
    console.log("既存タグ");
    const basetag = await quary("select tag from tags where videoid = \'"+id+"\';");
    if (basetag.length==0){
        console.log("既存タグなし");
    }
    for (var i in basetag){
        console.log(basetag[i].tag)
        addedtag.push(basetag[i].tag);
    }
    console.log("タグを追加をする場合は１削除をする場合２を入力してください");

    await scan().then(res=>{sctemp=parseInt(res);});
    switch (sctemp) {
        case 1:
            await addtag(id,addedtag);
            break;
        case 2:
            await deltag(id,addedtag);
            break;
    }
}