const delay = require("../../generalfunc/delay");
module.exports = async (type,player) =>{
    while (true){
        if(type){ct=player.currentTime}else{ct=player.getCurrentTime()}
        console.log(ct);
        await delay(1);
    }
}
