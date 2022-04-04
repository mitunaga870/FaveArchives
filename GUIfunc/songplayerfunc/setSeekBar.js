const seekbar = document.getElementById('SeekBar');
const delay = require('../../generalfunc/delay');

module.exports = async (type,player,start,end) =>{
    seekbar.max = start+end;
    seekbar.min = start;
    while (true){
            let ct;
            if(type){ct=player.currentTime}else{ct=player.getCurrentTime()}
            seekbar.value = String(Math.floor(ct));
            await delay(0.5);
            if(seekdel){
                seekdel = false;
                break;
            }
    }
}