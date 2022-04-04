const query = require('../../generalfunc/sqlfanc/query');
const store = require('../../generalfunc/store');

module.exports = async (id,rate,filter,onlyexist =  true) =>{
    let q = "";
    var result;
    if(Array.isArray(id)&&id.length != 0){
        var temp ="\'";
        for (var i in id){
            temp+=id[i]+"\'"
            if (id[parseInt(i)+1]!=undefined){
                temp += ",\'";
            }
        }
        q+='select videodetail.videoid,videodetail.title,videodetail.userid,publishedtime.publishedAt,videodetail.description from videodetail inner join publishedtime on videodetail.videoid= publishedtime.videoid where videodetail.videoid in ('+temp+')';
    }else {
        q+='select videodetail.videoid,videodetail.title,videodetail.userid,publishedtime.publishedAt,videodetail.description from videodetail inner join publishedtime on videodetail.videoid= publishedtime.videoid where videodetail.videoid = \''+id+'\'';
    }
    if(filter.match('すべて')) {}else {
        q +=' and videodetail.type = \''+filter+'\''
    }
    if(onlyexist){
        q += ' and videodetail.private != \'-1\''
    }
    if(store.get('privatefilter')){
        q += ' and videodetail.private != \'1\''
    }
    q+=' order by publishedAt desc;';
    result = await query(q);
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