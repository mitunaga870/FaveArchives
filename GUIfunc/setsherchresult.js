const seach = require('../GUIfunc/searchfunc/seach_main');
const getstdata = require("../GUIfunc/searchfunc/gettitleandtime");
const abbreviation = require('../generalfunc/abbreviation');
const url = new URL(window.location.href);
const params = url.searchParams;
let table = document.createElement('table');
const result = document.getElementById('result');
const keywords = params.get('q');
const type = params.get('f');

(async () => {
    const list = await seach(keywords);
    result.innerText = "";
    if (list.length==0){
        result.append("条件に一致するアーカイブはありません");
        return;
    }
    result.append("検索結果："+list.length+"件");
    for (var i in list){
        var tr = document.createElement('tr');
        var tr2 = document.createElement('tr');
        var des = document.createElement('th');
        var title = document.createElement('th');
        var link = document.createElement('a');
        des.textContent = await abbreviation(list[i].description);
        des.colSpan = 2;
        des.id = "description";
        title.id = "title";
        link.textContent = list[i].title;
        var url = "../html/stdetail.html?v="+list[i].videoid;
        link.href = url;
        title.appendChild(link);
        tr.appendChild(title);
        table.appendChild(tr);
        tr2.appendChild(des);
        table.appendChild(tr2);
    }
    result.id = "result";
    result.appendChild(table);
})();