const delay = require('../../generalfunc/delay');
module.exports = async () =>{
    while (true) {
        if(player.ended) {
            console.log('video終了')
            ended = true;
        }
        await delay(1);
    }
}