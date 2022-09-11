const axios = require('axios');
const auth = require('./auth.json');

module.exports = async (func,videoid) =>{
    const data = {...auth,...{target:func}}
    return await axios.put('http://tois-systems.net:3000/api/v0/FaveDB/ToggleFunctionBT/' + videoid, data);
}