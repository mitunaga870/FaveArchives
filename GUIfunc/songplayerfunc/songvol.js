const delay = require('../../generalfunc/delay');
const store = require('../../generalfunc/store');

module.exports = async () => {
    while (true) {
        if(player.tagName){
            player.volume = store.get('songvol')/100;
        }else
            player.setVolume(store.get('songvol'));
        await delay(1);
    }
}