window.jQuery = window.$ = require('');
const delay = require('../../../generalfunc/delay');

module.exports = async () => {
    for(let i = 0;i < 9; i++){
        $('#listbox').scrollTop(detail.position().top+$('#listbox').scrollTop()-150);
        await delay(0.1);
    }
}