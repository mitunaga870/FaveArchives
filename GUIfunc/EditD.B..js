const setbtevent = require('../GUIfunc/EditD.B.func,/buttons');
const quary = require('../generalfunc/sqlfanc/query');

const genrebox = document.getElementById('genrebox');
const userbox = document.getElementById('userbox');
const newuserform = document.getElementById('newuserform');
const idbox = document.getElementById('idbox');
const titlebox = document.getElementById('titlebox');
const discriptionbox = document.getElementById('discriptionbox');
const contenttypebox = document.getElementById('contenttypebox');
const newnamebox = document.getElementById('newnamebox');
const newcostumebox = document.getElementById('newcostumebox');
const privete = document.getElementById('privetebox');

let newuser = false,M_amount=0,C_amount=0;//新規ユーザーカラム生成bool,マール氏の衣装量,沙花叉の衣装量

(async ()=>{
    setbtevent();
    const userdata = await quary('select * from nameandcostume;');
    for(let data of userdata){
        const op = document.createElement('option');
        op.value = data.userid;
        op.innerText = data.name+"/"+data.costume;
        userbox.appendChild(op);
        if(data.userid.match(/C/))
            C_amount++;
        else
            M_amount++;
    }
    console.log("C:"+C_amount+"M:"+M_amount)
})();