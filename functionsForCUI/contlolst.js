const getstdata = require('./searchfunc/gettitleandtime');
const scan = require('../generalfunc/scan');
const open = require('../generalfunc/openurl');
const geturl = require('../generalfunc/makeurl');
const edittag = require('./edittagindex');
const Public = require('../generalfunc/sqlfanc/publictest');
const update = require('.//ubdateindex');
const editsongs = require('./editsongsindex');

module.exports = async (id) =>{
    var sctemp;
    const basedata = await getstdata(id);
    console.log(basedata[0].title+"について操作を開始します。");
    console.log("操作を選択：1再生\n" +
                "            2タグを編集\n" +
                "            3歌唱曲リストを編集\n" +
                "            4プレイゲームリストを編集\n" +
                "            5目次を編集\n" +
                "            6既存情報を編集\n" +
                "            7戻る");
    await scan().then(res=>{sctemp=parseInt(res)});
    switch (sctemp) {
        case 1:
            if(await Public(id)) {
                open(["E:\\deta\\マール氏\\動画と放送録音\\一覧\\"+basedata[0].title+".mp4"]);
            }else {
                open([await geturl(id)]);
            }
            break;
        case 2:
            await edittag(id);
            break;
        case 3:
            await editsongs(id);
            break
        case 6:
            await update(id);
            break;
        case 7:
            return true;
    }
    return false;
}