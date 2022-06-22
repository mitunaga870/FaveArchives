const getfirsturl = require('../../GUIfunc/chatfanc_var2/getfirsturl');
const getlog = require('../../GUIfunc/chatfanc_var2/getlog');
const puppeteer = require("puppeteer");
const store = require("../../generalfunc/store");
const cookies = JSON.parse(store.get('cookie'));
const headless = false;
const args = [];

module.exports = async (id,player) => {
    const browser = await puppeteer.launch({headless, args});
    const page = (await browser.pages())[0];
    const session = await page.target().createCDPSession();
    const {windowId} = await session.send('Browser.getWindowForTarget');
    await session.send('Browser.setWindowBounds', {windowId, bounds: {windowState: 'minimized'}});
    await page.setCookie(...cookies);
    let url = await getfirsturl(page,id);
    while (url){
        url = await getlog(page,url,player);
    }
    await page.close();
}