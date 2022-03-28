module.exports = (select) =>{
    const spodiv = document.getElementById('spodiv').classList;
    const opdiv = document.getElementById('opdiv').classList;
    if(select.match('spotify')){
        spodiv.remove('none');
        opdiv.add('none');
    }else {
        opdiv.remove('none');
        spodiv.add('none');
    }
}