const quary = require('../../generalfunc/sqlfanc/query');

module.exports = async (id) =>{
    let q = 'select * from songlist where songid = \''+id+'\';'
    const res = await  quary(q);
    return res[0];
}