const quary = require('../../generalfunc/sqlfanc/query');
const store = require("../../generalfunc/store");
window.jQuery = window.$ = require('jquery');

module.exports = async () =>{
    let q = 'select videoid,title,description,private from videodetail where private != -1';
    if(store.get('privatefilter')){
        q += ' and private = \'0\''
    }
    q += ' order by RAND() LIMIT 50;';
    const res = await quary(q);
    res.forEach((item)=>{
        let thumbnail;
        if(item.private) {
            thumbnail = store.get('thumbnailpath') +"/"+ item.videoid + ".jpg";
            thumbnail = thumbnail.replace(/\\/g,"/");
            if(!require('fs').existsSync(thumbnail))
                thumbnail = "../Asset/no_thumbnail.png"
        }else
            thumbnail = "https://img.youtube.com/vi/"+item.videoid+"/0.jpg";
        const a = $('<a>',{
            href:"stdetail.html?v="+item.videoid
        });
        const div = $('<div>',{
            "class":"items movie",
            css:{
                "background-image": "linear-gradient(rgba(0,0,0,0.8),20%,rgba(0,0,0,0)),URL("+thumbnail+")"
            },
            text:item.title
        });
        a.append(div);
        $("#movielist").append(a);
    })
}