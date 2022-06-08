const query = require('../../generalfunc/sqlfanc/query');
const store = require('../../generalfunc/store');

module.exports = async (basetxt) =>{
    //タイトルと概要欄に検索
    let q = 'select * from videodetail where match (title,description) against(? IN BOOLEAN MODE) and private != -1'
    if(store.get('privatefilter')){
        q += ' and private != \'1\''
    };
    q+=' limit 100;';
    let main = await query(q,[basetxt]);
    //タグに検索
    const tag_id = await query('select videoid from tags where match (tag) against (? IN BOOLEAN MODE);',[basetxt]);
    //曲リストに検索
    const songs_id = await query('select s.videoid from songs s join songlist s2 on s.songid = s2.songid where match(songname,singer,lyrics,composition) against (? IN BOOLEAN MODE);',[basetxt]);
    //ゲームリストに検索(ゲームのDBの作成後記述)
    //一致率取得及び重複率が高いものと入れ替え。
    main.forEach((item)=>{
        item.rate = 1;
    });
    main = await getrate(main,tag_id);
    main = await getrate(main,songs_id);
    main.sort((first,second)=>{
        return second.rate-first.rate
    });
    return main;
}

async function getrate(base,check_id){
    for(let item of check_id){
        let add = true;
        for(let i in base){
            if(item.videoid == base[i].videoid) {
                base[i].rate++;
                add = false;
            }
        }
        if(add){
            let q = 'select * from videodetail where videoid = ? and private != -1';
            if(store.get('privatefilter')){
                q += ' and private != \'1\''
            };
            let newitem = await query(q,[item.videoid]);
            newitem = newitem[0];
            if(!newitem)
                continue;
            newitem.rate = 1;
            base.unshift(newitem);
        }
    }
    return base;
}