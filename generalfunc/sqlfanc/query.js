const mysql = require('mysql');
const util = require('util')


module.exports = async (query,arr) => {
    try {
        const connection = mysql.createConnection({
            host: '34.122.252.236',
            user: 'root',
            password: '96804',
            database: 'videolist'
        });
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
        document.location = "timeout.html?url="+new URL(window.location.href)+"&detail="+e;
    }
}