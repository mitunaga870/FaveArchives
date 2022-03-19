const quary = require('../../generalfunc/sqlfanc/query');

module.exports = async (songid) =>{
    const res1 = await quary('select videoid,timestump from songs where songid=\''+songid+'\' ORDER BY RAND() LIMIT 1;');
    if(res1.length==0){
        return 0;
    }
    const res2 = await quary('select private from videodetail where videoid=\''+res1[0].videoid+'\';');
    console.log(res1);
    if(res2.length==0||res2[0].private==-1){
        return 0;
    }
    return {
        videoid:res1[0].videoid,
        private:res2[0].private,
        timestump:res1[0].timestump
    };
}