const query = require('../../generalfunc/sqlfanc/query');

module.exports = async (id,rate,filter) =>{
    var result;
    if(filter == undefined||filter.match("すべて")){
        if(Array.isArray(id)){
            var temp ="\'";
            for (var i in id){
                temp+=id[i]+"\'"
                if (id[parseInt(i)+1]!=undefined){
                    temp += ",\'";
                }
            }
            result = await query('select videodetail.videoid,videodetail.title,videodetail.name,publishedtime.publishedAt,videodetail.description from videodetail inner join publishedtime on videodetail.videoid= publishedtime.videoid where videodetail.videoid in ('+temp+') order by publishedAt desc;');
        }else {
            result = await query('select videodetail.videoid,videodetail.title,videodetail.name,publishedtime.publishedAt,videodetail.description from videodetail inner join publishedtime on videodetail.videoid= publishedtime.videoid where videodetail.videoid = \''+id+'\' order by publishedAt desc;');
        }
    }else {
        if (Array.isArray(id)) {
            var temp = "\'";
            for (var i in id) {
                temp += id[i] + "\'"
                if (id[parseInt(i) + 1] != undefined) {
                    temp += ",\'";
                }
            }
            result = await query('select videodetail.videoid,videodetail.title,videodetail.name,publishedtime.publishedAt,videodetail.description from videodetail inner join publishedtime on videodetail.videoid= publishedtime.videoid where videodetail.videoid in (' + temp + ') and videodetail.type = \''+filter+'\' order by publishedAt desc;');
        } else {
            result = await query('select videodetail.videoid,videodetail.title,videodetail.name,publishedtime.publishedAt,videodetail.description from videodetail inner join publishedtime on videodetail.videoid= publishedtime.videoid where videodetail.videoid = \'' + id + '\' and videodetail.type = \''+filter+'\' order by publishedAt desc;');
        }
    }
    temp = Object.keys(rate);
    result.forEach((value)=>{
        temp.forEach((key)=>{
            if(value.videoid.match(key)){
                value.rate = rate[key];
            }
        })
    });
    console.log(result);
    for(i=result.length;i>0;i--){
        for(var j = 0;i>j+1;j++){
            let N = result[j],M = result[j+1]
            if(parseInt(result[j].rate) < parseInt(M.rate)){
                console.log("入れ替え")
                result[j] = M;
                result[j+1] = N;
            }
        }
    }
    return result;
}