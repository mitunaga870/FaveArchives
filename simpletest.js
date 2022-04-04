const quary = require('./generalfunc/sqlfanc/query');
const fs = require("fs");
const store = require('./generalfunc/store');

(async ()=>{
    const dir = "E:/deta/OSHI/archives/chat/"; // ← 変更してね
    const fileNameList = fs.readdirSync(dir);
    const targetFileNames = fileNameList.filter(RegExp.prototype.test, /.*\.txt$/); // ← 変更してね
    for (const filename of targetFileNames) {
        console.log(filename);
        const base = fs.readFileSync(dir+filename,'utf8');
        const row = base.split(/\n/g);
        let log = [];
        for (const item of row) {
            console.log(item)
            const temp = item.split(/,/);
            if(temp.length!=2)
                continue
            const time = await getsec(temp[0]);
            const user = "";
            const chat = temp[1].split(/\r/)[0];
            log.push({
                time:time,
                user:user,
                chat:chat
            })
        }
        console.log(log);
        let name = dir+filename.split('.')[0]+'.json';
        fs.writeFileSync(name,JSON.stringify({log},null,'  '));
        if(log.length == 0||log[0].time==0){
            fs.unlinkSync(dir+filename);
        }
    }

})()

async function getsec(src){
    if(src[0].match(/-/))
        return 0;
    let temp = src.split(/:/g);
    if(temp.length == 3) {
        return parseInt(temp[0] * 60 * 60) + parseInt(temp[1] * 60) + parseInt(temp[2]);
    }else {
        return parseInt(temp[0] * 60) + parseInt(temp[1]);
    }
}