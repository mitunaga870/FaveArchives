const make_categoryplaylist = require("../GUIfunc/suggenstions_fanc/make_categoryplaylist");
const make_randomarchive = require("../GUIfunc/suggenstions_fanc/make_randomarchive");
const make_randomsong = require("../GUIfunc/suggenstions_fanc/make_randomsongs");

(async () => {
    make_categoryplaylist();
    make_randomarchive();
    make_randomsong();
})();
