const fs = require('fs');
const store = require('../../generalfunc/store');
const play_chat = require('../../GUIfunc/chatfanc_var2/chatprayer');
const get_chat = require('../../GUIfunc/chatfanc_var2/getchat_index');
const puppeteer = require("puppeteer");

module.exports = async (id,player) => {
    if(store.get('savechat')&&fs.existsSync(store.get('savechat')+id+".json")){
        let log = fs.readFileSync(store.get('savechat')+id+".json");
        play_chat(log.log);
    }else {
        get_chat(id,player);
    }
}