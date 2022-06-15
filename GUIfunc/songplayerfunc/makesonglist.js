window.jQuery = window.$ = require('jquery');
const spotify = require('../../generalfunc/spotifyfacn/spotify');

module.exports = async (list)=>{
    $('#list').empty();
    let n = 0;
    let ids = [];
    let targets = [];
    for(var item of list){
        let temp = n;
        const button = $('<div>',{
            class:"song",
            id:"item:"+temp
        });
        const title = $('<div>',{
            text:item.songname + "/" + item.singer,
            class:"title"
        })
        button.append(title);
        button.on('click',() =>{
            changed=true;
            target = temp;
        });
        $('#list').append(button);
        n++;
        if(item.spotifyid!=null) {
            ids.push(item.spotifyid);
            targets.push('item:' + temp);
        }else {
            const cover = $('<div>',{
                class:"cover",
            });
            const cover_title = $('<div>',{
                class:"cover_title",
                text:item.songname
            })
            cover.append(cover_title);
            button.append(cover);
        }
    }
    setcover(targets,ids);
}

async function setcover(targets,ids){
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