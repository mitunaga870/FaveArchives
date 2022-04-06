const puppeteer = require('puppeteer');
const delay = require('./generalfunc/delay');
const headless = false;
const width = 1280, height = 800;
const args = [
];


(async () => {
    const browser = await puppeteer.launch({ headless, args });
    const page = (await browser.pages())[0];
    await page.setViewport({ width, height });
    await page.goto('https://www.youtube.com/watch?v=IOZVEw9Svbk');
    await delay(3);
    let src = await page.$$eval("iframe", (list) => {
        for(let ele of list) {
            if (ele.src.match('live_chat_replay')) {
                return ele.src
            }
        }
    });
    console.log(src);
    await page.setJavaScriptEnabled(false);
    let res = [];
    while (true){
        await page.goto(src);
        let str;
        while (str==undefined) {
            str = await page.$$eval("script", (list) => {
                for (let ele of list) {
                    if (ele.textContent.match('ytInitialData')) {
                        return ele.textContent;
                    }
                }
            });
            await delay(0.5);
        }
        let chat_obj = JSON.parse(str.slice(26,-1));
        let continue_url = chat_obj["continuationContents"]["liveChatContinuation"]["continuations"][0]["liveChatReplayContinuationData"]["continuation"]
        src = "https://www.youtube.com/live_chat_replay?continuation=" + continue_url;
        if (continue_url == undefined)
            break;
        res.push(chat_obj["continuationContents"]["liveChatContinuation"]["actions"]);
        console.log(continue_url);
    }
    console.log(res);
})();