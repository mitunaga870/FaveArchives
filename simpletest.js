const fs = require('fs');
const quary = require('./generalfunc/sqlfanc/query');
const delay = require('./generalfunc/delay');

(async ()=>{
    const dir = 'E:\\deta\\OSHI\\archives\\thumbnails\\'
    let list = fs.readdirSync(dir);
    for(let i = 0;i<list.length+50;i+=50) {
        const temp = list.slice(i,i+50);
        Array.prototype.forEach.call(temp, async (name) => {
            const res = await quary('select videoid from videodetail where title = ?;', [name.slice(0, -4)]);
            if (!res.length)
                return;
            const id = res[0].videoid;
            console.log(id)
            fs.renameSync(dir+name,dir+id+".jpg");
        })
        await delay(1);
    }
})();