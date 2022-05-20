const getlist = require('../GUIfunc/songlistfanc/getlist');
const listbox = document.getElementById('listbox');
const search = require('../generalfunc/searchid');
const settype = require('../GUIfunc/songlistfanc/settype');

(async ()=>{
    const list = await getlist();
    for(var detail of list){
        let a = document.createElement('a');
        let main = document.createElement('div');
        main.className = 'row heihgt_auto';
        let title = document.createElement('div');
        title.className = 'title heihgt_auto';
        let singer = document.createElement('div');
        singer.className = 'singer heihgt_auto';
        title.innerText = detail.songname;
        singer.innerText = detail.singer;
        main.appendChild(title);
        main.appendChild(singer);
        a.appendChild(main);
        a.id = detail.songname+detail.singer;
        a.href = "../html/songdetail.html?id="+detail.songid;
        a.classList.add(detail.idtype)
        listbox.appendChild(a);
    }
})();