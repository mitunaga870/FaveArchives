module.exports = async (src) =>{
    const chat = document.createElement('div');
    chat.className = 'chat';
    try {
        for (let run of src) {
            let item;
            if (run.type.match('pic')) {
                item = document.createElement('img')
                item.src = run.src;
                item.className = 'stump';
                chat.appendChild(item);
            } else {
                chat.innerText += run.src;
            }
        }
    }
    catch (e) {
        console.error(e+"\n"+src);
    }
    return chat;
}