const quary = require('../../generalfunc/sqlfanc/query');

module.exports = async () =>{
    let res = await quary('select songid,duration,songname,singer from songlist where duration!=\'null\';');
    let x = res.length-1;
    let results = [];
    for(var i = 0;i<res.length;i++){
        let rand = Math.floor(Math.random()*(x));
        results.push(res[rand]);
        res.splice(rand,1);
        x--;
    }
    return results;
}