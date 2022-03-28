module.exports = (target) => {
    const pages = document.getElementById('page').children;
    for(let page of pages){
        document.getElementById('sendbt').className = target;
        if(page.id.match(target)){
            page.classList.remove('closed');
        }else {
            page.classList.add('closed');
        }
    }
}