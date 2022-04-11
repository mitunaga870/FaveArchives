module.exports = async (src) =>{
    console.log(src);
    const chat = document.createElement('div');
    chat.className = 'chat';
    for(let run of src){
        let item;
        if(run.type.match('pic')){
            item = document.createElement('img')
            item.src = run.src;
            item.className = 'stump';
            chat.appendChild(item);
        }else {
            chat.innerText += run.src;
        }
    }
    return chat;
}