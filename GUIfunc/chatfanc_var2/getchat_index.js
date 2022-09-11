const getfirsturl = require('../../GUIfunc/chatfanc_var2/getfirsturl');
const getlog = require('../../GUIfunc/chatfanc_var2/getlog');
const play = require('../../GUIfunc/chatfanc_var2/chatprayer');
const puppeteer = require("puppeteer");
const fs = require('fs');
const store = require("../../generalfunc/store");
const cookies = JSON.parse(store.get('cookie'));
const headless = false;
const args = [];

module.exports = async (id,player) => {
    const tmppath = store.get('chatpath')+"\\"+id+"_tmp";
    //ブラウザ立ち上げ
    const executablepath = puppeteer.executablePath().replace('app.asar','app.asar.unpacked');
    const browser = await puppeteer.launch({headless, executablePath:executablepath, args});
    const page = (await browser.pages())[0];
    const session = await page.target().createCDPSession();
    const {windowId} = await session.send('Browser.getWindowForTarget');
    await session.send('Browser.setWindowBounds', {windowId, bounds: {windowState: 'minimized'}});
    await page.setCookie(...cookies);
    let url,count;
    if(fs.existsSync(tmppath)){
        //途中からの取得
        const files = fs.readdirSync(tmppath);
        count = files.length;
        files.forEach((file)=>{
            let log = JSON.parse(fs.readFileSync(tmppath+"\\"+file));
            play(log.log,player);
            if(file.match((files.length-1)+".json"))
                url = log.nexturl;
        });
    }else {//取得状況が０のとき
        fs.mkdirSync(tmppath);
        try {
            url = await getfirsturl(page, id);
        }catch (e){
            $('#coment').text("チャットのリプレイは利用できません。");
            page.close();
            return;
        }
        count = 0;
    }
    while (url) {
        url = await getlog(page, url, player, count, tmppath);
        count++;
    }
    await page.close();

    //１ファイルにまとめる
    const files = fs.readdirSync(tmppath);
    let logs = [];
    files.forEach((file)=>{
        let log = JSON.parse(fs.readFileSync(tmppath+"\\"+file));
        logs.push(log.log);
    });
    logs.sort((first,second)=>first.duration - second.duration);
    if(store.get('savechat')) {
        fs.writeFileSync(store.get('chatpath') + '\\' + id + '.json', JSON.stringify({log}, null, '    '));
        fs.rmdirSync(tmppath);
    }
}