const autoevent = require('../../GUIfunc/UI/songplayer/autoevent');
const delay = require('../../generalfunc/delay');
window.jQuery = window.$ = require('jquery');

module.exports = async () =>{
    await delay(1);
    let parentheight = $('#innerother').height();
    let btheight = $('#buttons2').height();
    console.log("oya"+parentheight+"\nbt"+btheight);
    $('#list').height([parentheight-btheight]);
    autoevent();
}