module.exports = (boxid,targetid) => {
    const box = document.getElementById(boxid);
    const target = document.getElementById(targetid);
    const searchtx = box.value;
    const rows = target.children;
    console.log(searchtx);
    for(let row of rows){
        if(row.id.match(new RegExp(searchtx))){
            row.classList.remove('none');
        }else {
            row.classList.add('none');
        }
    }
}