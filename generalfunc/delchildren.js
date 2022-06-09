module.exports = async (target) =>{
    for (let temp of target.children){
        temp.remove()
    }
    return;
}