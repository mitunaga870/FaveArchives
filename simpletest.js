const ToIS = require("./generalfunc/ToISAPI/index");

(async ()=>{
    let temp = "沙花叉クロヱ"
    temp = temp.replace(/沙花叉/g,"<sub alias=\"さかまた\">沙花叉</sub>");
    console.log(temp);
})();