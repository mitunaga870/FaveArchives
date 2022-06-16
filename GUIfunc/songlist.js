window.jQuery = window.$ = require('jquery');
const getlist = require('../GUIfunc/songlistfanc/getlist');
const listbox = $('#listbox');
const search = require('../generalfunc/searchid');
const settype = require('../GUIfunc/songlistfanc/settype');

(async ()=>{
    let ids = [],targets = [];
    const list = await getlist();
    Array.prototype.forEach.call(list,(item)=> {
        const main = $('<div>', {
            text:item.songname+"/"+item.singer,
            class: "Icon",
            id:item.songid
        });
        if(item.spotifyid!=null) {
            ids.push(item.spotifyid);
            targets.push(item.songid);
        }else {
            const cover = $('<div>',{
                class:"cover",
            });
            const cover_title = $('<div>',{
                class:"cover_title",
                text:item.songname
            })
            cover.append(cover_title);
            main.append(cover);
        }
       listbox.append(main);
    });
})();