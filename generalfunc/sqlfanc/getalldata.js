const quary = require('./query');

module.exports = async (id) =>{
    let quarytx = "select * from videodetail join publishedtime on videodetail.videoid = publishedtime.videoid where videodetail.videoid = \'";
    quarytx += id + '\';';
    const mainres = await quary(quarytx);
    if(typeof mainres === 'string')
        return mainres;
    quarytx = "select * from publishedtime where videoid =\'"+id+"\';";
    const timeres =await quary(quarytx);
    if(typeof timeres === 'string')
        return timeres;
    quarytx = 'select * from tags where videoid = \''+id+'\';';
    const tags = await quary(quarytx);
    if(typeof tags === 'string')
        return tags;
    quarytx = 'select * from content where videoid = \''+id+'\';';
    const content = await quary(quarytx);
    if(typeof content === 'string')
        return content;
    let results = Object.assign(mainres[0],timeres[0],{tags},{content});
    return results;
}