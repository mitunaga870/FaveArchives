const delay = require('../../generalfunc/delay');

module.exports = (type,player,start,end)=>{
    let skip = false;
    changed = false;
    console.log(i);
    return new Promise(async function (resolve){
        document.getElementById('skip').addEventListener('click',()=>{skip=true;})
        while (true) {
            let ct;
            if(type){ct=player.currentTime}else{ct=player.getCurrentTime()}
            if (changed)
                resolve(target)
            if (ct >= start + end || ct >= start + end||skip)
                resolve(i + 1);
            await delay(1);
        }
    })
}