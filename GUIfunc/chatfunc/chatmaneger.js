const getchat = require('../../GUIfunc/chatfunc/getchat');
const chat = require('../../GUIfunc/chatfunc/chat');
const store = require('../../generalfunc/store');
const fs = require("fs");
const {ipcRenderer} = require("electron");

module.exports = async (type,player,id) => {
    if(store.get('cookie')==undefined)
        ipcRenderer.invoke('notice',["チャット取得用クッキーが登録されていないため取得できない場合があります。"]);
    let log = await getchat(id);
    if(store.get('savechat'))
        fs.writeFileSync(store.get('chatpath')+'\\'+id+'.json', JSON.stringify(log, null, '    '));
    chat(type,log.log,player);
}