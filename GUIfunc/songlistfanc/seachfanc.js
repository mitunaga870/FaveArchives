window.jQuery = window.$ = require('jquery');

module.exports = () =>{
    $('#songname').on("change",()=>{
        $('.title_singer').each((i,ele)=>{
            ele = $(ele);
            const main = ele.parent().parent();
            if(ele.text().match($('#songname').val()))
                main.removeClass("none");
            else
                main.addClass("none");
        })
    });
    $('#idtype').on('change',()=>{
        const filter = $('#idtype').val();
        if(filter.match(/all/)) {
            $('.Icon').removeClass("none");
            return;
        }
        const selector = '.'+filter;
        $('.Icon').not(selector).addClass("none");
        $(selector).removeClass("none");
    })
}