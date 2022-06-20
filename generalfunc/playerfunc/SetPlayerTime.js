module.exports = async (time)=>{
    let prayer = document.getElementById('video');
    if(prayer.nodeName.match('VIDEO')) {
        prayer.currentTime = await dts(time);
    }else {
        let t = await dts(time)
        let temp = prayer.src;
        temp = temp.split(/&/)
        temp = temp[0];
        prayer.src = temp + "&start=" +t;
    }
}