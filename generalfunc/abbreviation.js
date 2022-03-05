module.exports = async (str) => {
    if (str.length>150){
        str = str.slice(0,150);
        str += "...";
    }
    return str;
}