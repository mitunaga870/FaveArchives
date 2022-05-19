const setbtevent = require('../GUIfunc/EditD.B.func,/buttons');
const quary = require('../generalfunc/sqlfanc/query');
const genrebox = document.getElementById('genrebox');
const userbox = document.getElementById('userbox');

(async ()=>{
    const userdata = await quary('select * from nameandcostume;');
    for(let data of userdata){
        const op = document.createElement('option');
        op.value = data.userid;
        op.innerText = data.name+"/"+data.costume;
        userbox.appendChild(op);
    }
})();