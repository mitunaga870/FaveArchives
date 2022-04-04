const delay = require('../../generalfunc/delay');

module.exports = async (type,log,player) => {
    timechange = false;
    for(let row of log){
        let item = document.createElement('dev');
        let username = document.createElement('dev');
        username.innerText = row.user;
        username.className = 'username';
        item.appendChild(username);
        let chat = document.createElement('dev');
        chat.innerText = row.chat;
        chat.className = 'chat';
        item.appendChild(chat);
        item.className = 'item';
        while (true){
            let ct;
            if(type){ct=player.currentTime}else{ct=player.getCurrentTime()}
            if(row.time <= ct){
                let comment = document.getElementById('coment');
                comment.appendChild(item);
                comment.scrollTo(0, comment.scrollHeight);
                break
            }
            if(timechange){
                await delchild(document.getElementById('coment'));
                waitkey = true;
                return;
            }
            await delay(1);
        }
    }
}

async function delchild(main){
    while (main.lastChild){
        main.removeChild(main.lastChild);
    }
}