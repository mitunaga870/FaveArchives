const quary = require('../generalfunc/sqlfanc/query');

module.exports = async (id)=>{
    const prayer = document.getElementById('video');
    if(prayer.nodeName.match('VIDEO')) {
        console.log("時刻ログの対象ない")
        let time;
        while (true) {
            time = prayer.currentTime;
            await quary('update videodetail set time =SEC_TO_TIME(\'' + time + '\') where videoid = \'' + id + '\';');
            await delay(5);
        }
    }else {
        console.log("時刻ログの対象外")
        return;
    }
}
function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}