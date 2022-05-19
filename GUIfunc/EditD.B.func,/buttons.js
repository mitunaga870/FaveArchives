module.exports = () => {
    document.getElementById('make_newuser').addEventListener('click',()=>{
        newuser = true;
        newuserform.classList.remove('none');
        userbox.classList.add('none');
        document.getElementById('make_newuser').classList.add('none');
    });
    document.getElementById('sendnew_archive').addEventListener('click',async ()=>{
        if(newuser){
            let usrid,name;
            if(newnamebox.value.match(/M/)) {
                usrid = "M" + await zeroPadding(M_amount+1, 4);
                name = "マール氏";
            }else {
                usrid = "C" + await zeroPadding(C_amount+1, 4);
                name = "沙花叉クロヱ";
            }
            const newuser_detail = [usrid,name,newcostumebox.value]
            console.log(newuser_detail);
            //await quary('insert into nameandcostume (userid,name,costume) values (?,?,?);',)
        }
    })
}

async function zeroPadding(NUM, LEN){
    return ( Array(LEN).join('0') + NUM ).slice( -LEN );
}