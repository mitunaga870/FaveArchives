module.exports = (target) =>{
    for (let temp of target.children){
        temp.remove()
    }
}