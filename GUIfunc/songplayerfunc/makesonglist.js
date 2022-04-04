module.exports = (list)=>{
    let n = 0;
    for(var item of list){
        let temp = n;
        let div = document.createElement('button');
        div.innerText = item.songname + "/" + item.singer;
        div.className = 'song';
        div.id = 'item:'+temp;
        div.addEventListener('click',() =>{
            changed=true;
            target = temp;
        });
        document.getElementById('list').appendChild(div);
        n++;
    }
}