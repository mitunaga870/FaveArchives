const quary = require('./query');

module.exports = async (id) =>{
    let quarytx = "select * from videodetail join publishedtime on videodetail.videoid = publishedtime.videoid where videodetail.videoid = \'";
    quarytx += id + '\';';
    const mainres = await quary(quarytx);
    quarytx = "select * from publishedtime where videoid =\'"+id+"\';";
    const timeres =await quary(quarytx);
    quarytx = 'select * from tags where videoid = \''+id+'\';';
    const tags = await quary(quarytx);
    quarytx = 'select * from content where videoid = \''+id+'\';';
    const content = await quary(quarytx);
    let results = Object.assign(mainres[0],timeres[0],{tags},{content});
    return results;
}