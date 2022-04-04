const quary = require('../../generalfunc/sqlfanc/query');

module.exports = async () => {
    return await quary('select v.videoid,v.title,v.description from history join videodetail v on history.videoid = v.videoid order by counter DESC LIMIT 50;');
}