const fs = require('fs');
const store = require('../../generalfunc/store');
const play_chat = require('../../GUIfunc/chatfanc_var2/chatprayer');
const get_chat = require('../../GUIfunc/chatfanc_var2/getchat_index');
const make_livechat = require('../../GUIfunc/chatfanc_var2/makelivechat');
const puppeteer = require("puppeteer");

module.exports = async (id,player,livestate) => {
    if(!livestate.match("none")){
        make_livechat(id);
    }else if(!store.get('savechat')){
        $('#coment').text("チャットのリプレイは利用できません。");
    }else if(fs.existsSync(store.get('savechat')+id+".json")){
        let log = fs.readFileSync(store.get('savechat')+id+".json");
        play_chat(log.log);
    }else {
        get_chat(id,player);
    }
}