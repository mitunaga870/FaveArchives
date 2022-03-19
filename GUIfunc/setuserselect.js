const quary = require('../generalfunc/sqlfanc/query');
module.exports = async (target)=>{
    const temp = await quary('select * from nameandcostume');
    temp.forEach(res=>{
        let op =document.createElement('option');
        op.value = res.userid;
        op.innerText = res.name + "/" + res.costume;
        target.appendChild(op);
    });
}