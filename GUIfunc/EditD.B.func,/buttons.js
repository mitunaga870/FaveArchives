module.exports = () => {
    const word = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    document.getElementById('make_newuser').addEventListener('click',()=>{
        newuser = true;
        newuserform.classList.remove('none');
        userbox.classList.add('none');
        document.getElementById('make_newuser').classList.add('none');
    });
    document.getElementById('sendnew_archive').addEventListener('click',async ()=> {
        let usrid, stop = false;
        if (newuser) {
            let name;
            if (newnamebox.value.match(/M/)) {
                usrid = "M" + await zeroPadding(M_amount + 1, 4);
                name = "マール氏";
            } else {
                usrid = "C" + await zeroPadding(C_amount + 1, 4);
                name = "沙花叉クロヱ";
            }
            const newuser_detail = [usrid, name, newcostumebox.value]
            console.log(newuser_detail);
            await quary('insert into nameandcostume (userid,name,costume) values (?,?,?);',)
        } else
            usrid = userbox.value;
        let videoid = idbox.value;
        //必須要素が空かどうか確認する
        const musts = document.getElementsByClassName('must');
        console.log(musts);
        Array.prototype.forEach.call(musts, (item) => {
            let text = item.value;
            let divid = item.id.replace("box", "") + "form";
            console.log(divid);
            let formdiv = document.getElementById(divid);
            if (!(text.match(/\S/)) || !text) {
                formdiv.classList.add("warn");
                stop = true;
            } else
                formdiv.classList.remove("warn");
        });
        if (stop)
            return;
        if (!(videoid.match(/\S/))||!videoid) {//idformが空文字のとき、作成する。idの重複確認
            do {
                videoid = "";
                for (let i = 0; i < 11; i++)
                    videoid += word.charAt(Math.floor(Math.random() * word.length));
                console.log(videoid);
            } while (await checkid(videoid));
        } else if (await checkid(videoid))
            return;
        const senddata =[videoid,titlebox.value,discriptionbox.value,contenttypebox.value,usrid,genrebox.value,parseInt(privetebox.value)];
        const timedata =[videoid,null,null,null,null];
        console.log(senddata);
        await quary('insert into publishedtime (videoid,videoid, publishedAt, scheduletime, actualStartTime, actualEndTime) values (?,?,?,?,?);',timedata);
        await quary('insert into videodetail (videoid,title,description,contenttype,userid,type,private) values (?,?,?,?,?,?,?);',senddata);
    })
}

async function zeroPadding(NUM, LEN){
    return ( Array(LEN).join('0') + NUM ).slice( -LEN );
}

async function checkid(id){//idが重複の場合trueを返す
    let temp = await quary('select videoid from videodetail where videoid = ?;',[id]);
    return !(temp.length == 0);
}