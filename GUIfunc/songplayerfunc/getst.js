const quary = require('../../generalfunc/sqlfanc/query');
const store = require("../../generalfunc/store");

module.exports = async (songid) =>{
    let q = 'select songs.videoid,songs.timestump,videodetail.private from songs join videodetail on songs.videoid = videodetail.videoid where videodetail.private!=-1 and songs.songid=\''+songid+'\'';
    if (store.get('privatefilter'))
        q+= ' and videodetail.private=0';
    q+=' ORDER BY RAND() LIMIT 1;';
    const res = await quary(q);
    if(res.length==0){
        return 0;
    }
    return {
        videoid:res[0].videoid,
        private:res[0].private,
        timestump:res[0].timestump
    };
}