const mysql = require('mysql2');
const util = require('util')
const quoth = require('./quoth.json');

module.exports = async (query,arr) => {
    try {
        const connection = mysql.createConnection(quoth);
        var respond;
        console.log(query);
        connection.query = util.promisify(connection.query);
        if (arr == undefined) {
            respond = await connection.query(query);
        }else {
            respond = await connection.query(query,arr);
        }
        connection.end();
        return respond;
    }catch (e) {
        document.location = "timeout.html?url="+new URL(window.location.href)+"&detail="+e+"&q="+query+"&arr="+arr;
    }
}