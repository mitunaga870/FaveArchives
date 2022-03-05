const query = require('../generalfunc/sqlfanc/query');

module.exports = async (id) =>{
    const base = await query('select songname from songs id = \''+id+'\';');
    console.log(base);
}