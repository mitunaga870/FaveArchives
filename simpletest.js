const ToIS = require("./generalfunc/ToISAPI/index");

(async ()=>{
    const res = await ToIS.ToggleDefaultBT('Aleam');
    console.log(res.data.AfterValue);
})();