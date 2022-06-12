window.jQuery = window.$ = require('jquery');

module.exports = () =>{
    window.addEventListener('resize',()=>{
        let parentheight = $('#innerother').height();
        let btheight = $('#buttons2').height();
        console.log("oya"+parentheight+"\nbt"+btheight);
        $('#list').height([parentheight-btheight]);
    })
}