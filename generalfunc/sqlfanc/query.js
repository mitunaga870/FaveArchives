const mysql = require('mysql2');
const util = require('util')
const wan_quoth = require('./wan_quoth.json');
const lan_quoth = require('./lan_quoth.json');
const wan_pool = mysql.createPool(wan_quoth);
const wan_ppool = wan_pool.promise();
const lan_pool = mysql.createPool(lan_quoth);
const lan_ppool = lan_pool.promise();
module.exports = async (query,arr) => {
    try {
        var respond;
        console.log(query);
        if (arr == undefined) {
            try {
                respond = await wan_ppool.query(query);
            }catch (e) {
                respond = await lan_ppool.query(query);
            }
        }else {
            try {
                respond = await wan_ppool.query(query,arr);
            }catch (e) {
                respond = await lan_ppool.query(query,arr);
            }
        }
        return respond[0];
    }catch (e) {
        document.location = "timeout.html?url="+new URL(window.location.href)+"&detail="+e+"&q="+query+"&arr="+arr;
    }
}