const scan = require('../generalfunc/scan');
const getid = require('./searchfunc/getid');
const getstdata = require('./searchfunc/gettitleandtime');
const usest = require('./contlolst');

module.exports = async () =>{
  var sctemp;
  console.log("検索したい文字列を入力してください。");
  await scan().then(res=>{ sctemp =res });
  var resid = await getid(sctemp);
  if(resid.length==0){
    console.log("該当結果なし");
    return;
  }
  console.log("該当件数："+resid.length+"件　数字で選択してください");
  var result = await getstdata(resid);
  for(var i in result){
    console.log("検索結果"+i);
    console.log(result[i].title)
  }
  await scan().then(res=>{ sctemp = parseInt(res) });
  var bolean = true;
  while (bolean) {
    bolean = await usest(result[sctemp].videoid);
    if (bolean) {
      console.log("もう一度選択してください");
      await scan().then(res => {
        sctemp = parseInt(res)
      });
    }
  }
};