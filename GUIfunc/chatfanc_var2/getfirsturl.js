const puppeteer = require("puppeteer");
const delay = require("../../generalfunc/delay");

module.exports = async (page,id) => {
    await page.goto('https://www.youtube.com/watch?v=' + id + '?t=0');
    await delay(1);
    let src
    try {
        src = await page.$$eval("script", (list) => {
            for (let ele of list) {
                if (ele.textContent.match('var ytInitialData')) {
                    let temp = ele.textContent;
                    temp = temp.match(/{"title":"チャットのリプレイ","selected":false,"continuation":{"reloadContinuationData":{"continuation":"(\S{136})"/);
                    return "https://www.youtube.com/live_chat_replay?continuation=" + temp[1];
                }
            }
        });
    }catch (e) {
        throw e;
    }
    return src;
}