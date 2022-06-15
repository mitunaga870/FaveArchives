const spotify = require("../../generalfunc/spotifyfacn/spotify");
window.jQuery = window.$ = require('jquery');

module.exports = async () => {
    let i=0;
    const spotifyapi = await spotify();
    let res = await spotifyapi.getCategories({
        offset: 0,
        country: 'JP'
    });
    const categories = res.body.categories.items;
    Array.prototype.forEach.call(categories,async (item) => {
        let error = false;
        const res = await spotifyapi.getPlaylistsForCategory(item.id,{
            country:'JP'
        }).catch((e)=>{
            console.log(e+"\nid:"+item.id);
            error = true;
        });
        if(error)
            return;
        res.body.playlists.items.forEach((playlist)=> {
            const rowname = ".playlistrow." + (i++ % 2);
            const a = $('<a>', {
                href: "songplayer.html?sp=" + playlist.id
            });
            const div = $('<div>', {
                "class": "items song",
                css: {
                    "background-image": "linear-gradient(rgba(0,0,0,0.8),20%,rgba(0,0,0,0)),URL(" + playlist.images[0].url + ")"
                },
                text: playlist.name
            });
            a.append(div);
            $(rowname).append(a);
        });
    })
}