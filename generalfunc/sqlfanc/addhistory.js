const quary = require('../../generalfunc/sqlfanc/query');

module.exports = (id) => {
    quary('insert into history (videoid) values (?);',[id]);
}