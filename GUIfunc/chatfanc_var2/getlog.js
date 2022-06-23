const puppeteer = require('puppeteer');
const delay = require("../../generalfunc/delay");
const parselog = require('../../GUIfunc/chatfanc_var2/parselog');
const play = require('../../GUIfunc/chatfanc_var2/chatprayer');
const store = require("../../generalfunc/store");
const fs = require("fs");

module.exports = async (page,url,player,number,tmppath) => {
    //ブラウザを開く
    await page.goto(url);
    let str = undefined;
    while (str == undefined) {
        await delay(0.5);
        str = await page.$$eval("script", (list) => {
            let temp = [];
            for (let ele of list) {
                if (ele.textContent.match('ytInitialData'))
                    return ele.textContent;
            }
        });
    }
    let chat_obj = JSON.parse(str.slice(26, -1));
    try {
        url = "https://www.youtube.com/live_chat_replay?continuation="
        url += chat_obj["continuationContents"]["liveChatContinuation"]["continuations"][0]["liveChatReplayContinuationData"]["continuation"]
    } catch (e) {
        url = false;
    }
    const log = await parselog(chat_obj);
    play(log,player);
    if(store.get('savechat'))
        fs.writeFileSync(tmppath+'\\'+number+'.json', JSON.stringify({
            log,
            nexturl:url
        }, null, '    '));
    return url;
}