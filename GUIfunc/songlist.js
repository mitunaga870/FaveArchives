window.jQuery = window.$ = require('jquery');
const getlist = require('../GUIfunc/songlistfanc/getlist');
const listbox = $('#listbox');
const SetCover =require('../GUIfunc/UI/SetCover');
const add_playlist = require('../GUIfunc/songlistfanc/add_playlist_buttons');
const set_playlist = require('../GUIfunc/songlistfanc/set_playlist');
const set_serchfanc = require('../GUIfunc/songlistfanc/seachfanc');
const playlist_checker = require('../GUIfunc/playlistfunc/check_playlist');
const delay = require("../generalfunc/delay");
let nowid;

(async ()=>{
    let ids = [],targets = [];
    const list = await getlist();
    add_playlist();
    set_playlist();
    set_serchfanc();
    Array.prototype.forEach.call(list,async (item)=> {
        const main = $('<div>', {
            class: "Icon",
            id:item.songid
        });
        const wraper = $('<div>',{
            css:{
                height:"auto"
            }
        })
        const cover = $('<div>',{
            class:"cover",
            id:"cover:"+item.songid
        });
        const title_singer = $('<div>',{
            text:item.songname+"/"+item.singer,
            class:"title_singer",
        });
        main.append(wraper);
        wraper.append(title_singer);
        wraper.append(cover);
        main.addClass(item.idtype);
        //カバー画像設定
        if(item.spotifyid!=null) {
            ids.push(item.spotifyid);
            targets.push("cover:"+item.songid);
        }else {
            const cover_title = $('<div>',{
                class:"cover_title",
                text:item.songname
            })
            cover.append(cover_title);
        }
        //詳細要素の設定
        const detail = $('<div>',{
            class:"detail"
        });
        const description = $('<div>',{
            class:"description"
        })
        const title = $('<h1>',{
            class:"title",
            text:item.songname
        });
        description.append(title)
        const singer = $('<div>',{
            class:"singer",
            text:item.singer
        });
        description.append(singer)
        const duration = $('<div>',{
            class:"duration",
            text:await gettime(item.duration)
        });
        description.append(duration);
        const buttons = $('<div>',{
            class:"buttons",
        });
        description.append(buttons);
        //下のボタン要素編集
        buttons.append($('<a>',{
            href:"./songdetail.html?id="+item.songid,
        }).append($('<div>',{
            class:"go_detail",
            text:"詳細情報を編集"
        })));
        buttons.append($('<a>',{
            href:"./songplayer.html?s="+item.songid
        }).append($('<div>',{
            class:"go_randsong",
            text:"ランダムお歌"
        })));
        buttons.append($('<button>',{
            class:"add_playlist",
            text:"プレイリストに追加"
        }).on('click',async ()=>{
            nowid=item.songid;
            $('#playlisteditor').removeClass("none");
        }));
        buttons.append($('<button>',{
            class:"other",
            text:"その他"
        }).on('click',async ()=>{
        }));
        detail.append(description);
        main.append(detail)
        //クリックイベント追加
        cover.on('click',async ()=>{
            $('.detail').not(detail).removeClass("open");
            playlist_checker();
            detail.toggleClass("open");
            $('#listbox').scrollTop(detail.position().top+$('#listbox').scrollTop()-150);
            for(let i = 0;i < 9; i++){
                $('#listbox').scrollTop(detail.position().top+$('#listbox').scrollTop()-150);
                await delay(0.1);
            }
        })
        listbox.append(main);
    });
    SetCover(targets,ids);
})();

async function gettime(ms){
    let sec = Math.floor(ms/1000);
    let min = Math.floor(sec/60);
    if(min<10){
        min = "0"+min;
    }
    sec = sec % 60;
    return min + ":" + sec;
}