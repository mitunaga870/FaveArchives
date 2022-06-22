const puppeteer = require('puppeteer');
const delay = require("../../generalfunc/delay");
const parselog = require('../../GUIfunc/chatfanc_var2/parselog');
const play = require('../../GUIfunc/chatfanc_var2/chatprayer');

module.exports = async (page,url,player) => {
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
    return url;
}