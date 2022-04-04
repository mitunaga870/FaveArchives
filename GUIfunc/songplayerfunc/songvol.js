const delay = require('../../generalfunc/delay');
const store = require('../../generalfunc/store');

module.exports = async () => {
    while (true) {
        if(player.tagName.match('VIDEO')){
            player.volume = store.get('songvol')/100;
        }
        await delay(1);
    }
}