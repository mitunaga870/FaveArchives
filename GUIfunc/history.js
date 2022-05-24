const get = require('../GUIfunc/historyfunc/get');

(async ()=>{
    const list = await get();
    for(let item of list){
        console.log(item.title)
        let a = document.createElement('a');
        a.href = "../html/stdetail.html?v="+item.videoid;
        let title = document.createElement('div');
        title.innerText = item.title;
        title.className = 'title heihgt_auto';
        let description = document.createElement('div');
        description.innerText = item.description;
        description.className = 'description';
        let div = document.createElement('div');
        div.appendChild(title);
        div.appendChild(description);
        div.className = 'item heihgt_auto';
        a.appendChild(div);
        document.getElementById('list').appendChild(a);
    }
})()