const quary = require('./query');

module.exports = async (id) =>{
    let quarytx = "select * from videodetail join publishedtime on videodetail.videoid = publishedtime.videoid where videodetail.videoid = \'";
    quarytx += id + '\';';
    const mainres = await quary(quarytx);
    if(mainres.match(/ERROR/))
        return mainres;
    quarytx = "select * from publishedtime where videoid =\'"+id+"\';";
    const timeres =await quary(quarytx);
    if(timeres.match(/ERROR/))
        return timeres;
    quarytx = 'select * from tags where videoid = \''+id+'\';';
    const tags = await quary(quarytx);
    if(tags.match(/ERROR/))
        return tags;
    quarytx = 'select * from content where videoid = \''+id+'\';';
    const content = await quary(quarytx);
    if(content.match(/ERROR/))
        return content;
    let results = Object.assign(mainres[0],timeres[0],{tags},{content});
    return results;
}