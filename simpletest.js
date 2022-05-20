const quary = require('./generalfunc/sqlfanc/query');

(async () => {
    let main = await quary('select videoid from videodetail;');
    for (id of main){
        await quary('select videoid from publishedtime where videoid = ?;',[id.videoid]).then(res=>{
            if(res.length==0)
                console.log(id);
        })
    }
})();
