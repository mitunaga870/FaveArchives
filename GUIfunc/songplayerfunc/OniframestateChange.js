module.exports = (event) =>{
    console.log(event.data)
    if(event.data === 0)
        ended = true;
}