module.exports = (n) =>{
    return new Promise(async function(resolve){
        setTimeout(resolve,n*1000);
    });
}