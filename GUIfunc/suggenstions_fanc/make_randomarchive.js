const quary = require('../../generalfunc/sqlfanc/query');
const store = require("../../generalfunc/store");
window.jQuery = window.$ = require('jquery');

module.exports = async () =>{
    let q = 'select videoid,title,description from videodetail';
    if(store.get('privatefilter')){
        q += ' where private = \'0\''
    }
    q += ' order by RAND() LIMIT 50;';
    const res = await quary(q);
    res.forEach((item)=>{
        const a = $('<a>',{
            href:"stdetail.html?v="+item.videoid
        });
        const div = $('<div>',{
            "class":"items movie",
            css:{
                "background-image": "URL(https://img.youtube.com/vi/" + item.videoid + "/0.jpg)"
            },
            text:item.title
        });
        a.append(div);
        $("#movielist").append(a);
    })
}