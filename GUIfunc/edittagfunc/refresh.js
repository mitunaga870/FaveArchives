const query = require('../../generalfunc/sqlfanc/query');
window.jQuery = window.$ = require('jquery');

module.exports = async (tags = null) => {
    if(!tags){
        tags = await query('select * from tags where videoid = ?;',[id]);
    }
    const tagbox = $('#taglist');
    const edittagbox =  $('#edittag');
    tagbox.empty();
    edittagbox.empty();
    tags.forEach((item)=>{
        const tag = $('<div>',{
            text:item.tag,
            class:"tag"
        });
        tagbox.append(tag);
        const tag2 = $('<div>',{
            text:item.tag,
            value:item.tag,
            class:"etag"
        });
        const del = $('<button>',{
            text:"X",
            class:"delbt"
        }).on('click',()=>{
            tag2.addClass("none");
            tag2.addClass("del")
        });
        tag2.append(del);
        edittagbox.append(tag2);
    });
}