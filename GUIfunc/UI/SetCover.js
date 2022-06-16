const spotify = require("../../generalfunc/spotifyfacn/spotify");

module.exports = async (targets,ids)=>{
    let error = false;
    const spotifyAPI = await spotify();
    for(let i =0;i <ids.length;i+=50) {
        const res = await spotifyAPI.getTracks(ids.slice(i, i + 50)).catch((e) => {
            console.log(e)
            console.log("tracid:" + ids);
            error = true;
        });
        if (error)
            return
        Array.prototype.forEach.call(res.body.tracks,(body,j)=>{
            const target = targets[i+j];
            document.getElementById(target).style.cssText="background-image:linear-gradient(rgba(0,0,0,0.8),20%,rgba(0,0,0,0)), URL(" + body.album.images[0].url + ");";
        })
    }
}