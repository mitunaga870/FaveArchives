const autoevent = require('../../GUIfunc/UI/stdetail/autoevent');
const {compileETag} = require("express/lib/utils");
window.jQuery = window.$ = require('jquery');

module.exports = () =>{
    let parentheight = $('#innerother').height();
    let btheight = $('#buttons2').height();
    console.log("oya"+parentheight+"\nbt"+btheight);
    $('#coment').height([parentheight-btheight]);
    autoevent();
}