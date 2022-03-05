const scan = require('./generalfunc/scan');
const sarch = require('./functionsForCUI/search');
const quary = require('./generalfunc/sqlfanc/query');
const controlst = require('./functionsForCUI/contlolst');

(async () => {
    var bolean = true;
    var scantext ="";
    console.log("機能＝＞ 1:アーカイブ検索\n" +
        "         2:お歌検索\n" +
        "         3:配信リストの取得\n" +
        "         4:アラートのスイッチ\n" +
        "         5:ランダムアーカイブ選択");
    await scan().then((res)=>{
        scantext = res;
    });
    switch (parseInt(scantext)){
        case 1:
            console.log("検索を行います。");
            await sarch();
            break;
        case 5:
            while (bolean) {
                var temp = await quary('select videoid from videodetail order by RAND() LIMIT 1;');
                bolean = await controlst(temp[0].videoid);
            }
            break;
    }
})();