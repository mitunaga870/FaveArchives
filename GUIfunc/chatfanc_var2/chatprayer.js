const delay = require('../../generalfunc/delay');
const makechat = require('../../GUIfunc/chatfanc_var2/makechattext');
let ct;

module.exports = async (log,player) => {
    getct(player);
    timechange = false;
    let start = 0;
    for (let i in log){
        if(log[i].duration >= (ct-60)){
            start = i;
            break;
        }
    }
    for(let i = parseInt(start);i<log.length;i = i + 101){
        let rows = log.slice(i,i+100);
        console.log(rows.length)
        await Promise.all(rows.map(async row => {
            let item = document.createElement('dev');
            let inner = document.createElement('div');
            let username = document.createElement('dev');
            username.innerText = row.user.name;
            username.className = 'username';
            inner.appendChild(username);
            let chat = await makechat(row.text);
            inner.appendChild(chat);
            inner.className= 'flex';
            item.appendChild(inner);
            item.className = 'item';
            while (true) {
                if (row.duration <= ct) {
                    let comment = document.getElementById('coment');
                    comment.appendChild(item);
                    comment.scrollTo(0, comment.scrollHeight);
                    break;
                }
                if (timechange) {
                    delchild(document.getElementById('coment'));
                    waitkey = true;
                    return;
                }
                await delay(0.5);
            }
        }));
        console.log('一周')
        await delay(1);
    }
}

async function delchild(main){
    while (main.lastChild){
        main.removeChild(main.lastChild);
    }
}

async function getct(player){
    while (true) {
        try {
            ct = player.currentTime
        }catch (e) {
            ct = player.getCurrentTime()
        }
        await delay(1);
    }
}
