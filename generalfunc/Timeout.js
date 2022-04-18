module.exports = async (e) =>{
    const body = document.getElementsByTagNameNS('file:///C:/Users/makin/IdeaProjects/Vtool/html/index.html/body','body')[0]
    await delchild(body);
    const returndiv = document.createElement('div');
    const EROORCODE = document.createElement('h1');
    EROORCODE.innerText = e;
    returndiv.appendChild(EROORCODE);
    const detaildiv = document.createElement('div');
    detaildiv.innerText = "接続に失敗しました。\nctrl+rで再読込してください"
    returndiv.appendChild(detaildiv);
    body.appendChild(returndiv);
}

async function delchild(main){
    while (main.lastChild){
        main.removeChild(main.lastChild);
    }
}