const query = require('../../generalfunc/sqlfanc/query');

module.exports = async (id) =>{
    var result;
    if(Array.isArray(id)){
        var temp ="\'";
        for (var i in id){
            temp+=id[i]+"\'"
            if (id[parseInt(i)+1]!=undefined){
                temp += ",\'";
            }
        }
        result = await query('select videodetail.videoid,videodetail.title,videodetail.name,publishedtime.publishedAt from videodetail inner join publishedtime on videodetail.videoid= publishedtime.videoid where videodetail.videoid in ('+temp+') order by publishedAt desc;');
    }else {
        result = await query('select videodetail.videoid,videodetail.title,videodetail.name,publishedtime.publishedAt from videodetail inner join publishedtime on videodetail.videoid= publishedtime.videoid where videodetail.videoid = \''+id+'\' order by publishedAt desc;');
    }
    return result;
}