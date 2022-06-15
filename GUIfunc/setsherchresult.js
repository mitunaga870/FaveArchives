const seach = require('../GUIfunc/searchfunc/seach_main');
const abbreviation = require('../generalfunc/abbreviation');
const store = require("../generalfunc/store");
window.jQuery = window.$ = require('jquery');
const url = new URL(window.location.href);
const params = url.searchParams;
const keywords = params.get('q');
const type = params.get('f');

const result_summary = $('#res_summary');
const result_main = $('#res_main');

(async () => {
    const list = await seach(keywords);
    result_summary.text("検索結果："+list.length+"件");
    if (list.length==0){
        result_main.text("対象アーカイブは見つかりませんでした。");
        return;
    }
    for (var item of list){
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
        const main = $('<a>',{
            class:"item",
            href:"./stdetail.html?v="+item.videoid
        });
        const thumbnail_div = $('<div>',{
            class:"thumnail",
            css:{
                "background-image": "URL("+thumbnail+")"
            }
        });
        main.append(thumbnail_div);
        const detail_div = $('<div>',{
            class:"detail"
        });
        const title_div =$('<div>',{
            class:"title",
            text:item.title
        });
        detail_div.append(title_div);
        const description_div =$('<div>',{
            class:"description",
            text:item.description
        });
        detail_div.append(description_div);
        main.append(detail_div);
        result_main.append(main);
    }
})();