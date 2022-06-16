window.jQuery = window.$ = require('jquery');
const setcover = require('../../GUIfunc/UI/SetCover');

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
