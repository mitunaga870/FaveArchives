const gas = require("./generalfunc/gas");

(async () => {
    gas('recsw',[]).then(res=>{
        console.log(res.data.response.result);
    }).catch(error=>{console.log(error)});
})();