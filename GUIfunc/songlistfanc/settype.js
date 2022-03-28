module.exports = (select) =>{
    const type = select.value;
    const target = document.getElementById('listbox').children;
    for (let t of target) {
        let classes = t.classList;
        if (type.match("all")){
            classes.remove('none2');
        }else {
            console.log(classes)
            if(classes.contains(type)){
                classes.remove('none2');
            }else {
                classes.add('none2');
            }
        }
    }
}