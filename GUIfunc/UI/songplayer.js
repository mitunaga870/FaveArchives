const autoevent = require('../../GUIfunc/UI/songplayer/autoevent');
window.jQuery = window.$ = require('jquery');

module.exports = () =>{
    let parentheight = $('#innerother').height();
    let btheight = $('#buttons2').height();
    console.log("oya"+parentheight+"\nbt"+btheight);
    $('#list').height([parentheight-btheight]);
    autoevent();
}