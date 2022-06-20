window.jQuery = window.$ = require('jquery');
const query = require('../../generalfunc/sqlfanc/query');
const refresh = require('../../GUIfunc/edittimetable/refresh');

module.exports = () => {
    refresh();
    const popout = $('#edittimetable');
    //編集ポップアウト開く
    $('#open-edit_timetable').on('click',()=>{
        popout.toggleClass("closed");
    });
    //閉じるボタン
    $('#close-edit_timetable').on('click',()=>{
        popout.toggleClass("closed");
    });
    //一時テーブルに内容追加
    $('#add_timetable').on('click',()=>{
        const row = $('<div>',{
            class:"timeteble_row foredit new",
        });
        const content = $('<div>',{
            text:$('#contentbox').val(),
            class:"timetable_content foredit"
        });
        const timestump = $('<div>',{
            text:$('#timestump_content').val(),
            class:"timetable_timestump foredit"
        });
        const delbt = $('<button>',{
            text:"削除"
        });
        delbt.on('click',()=>{
            row.removeClass("new");
            row.addClass("none");
        });
        row.append(content);
        row.append(timestump);
        row.append(delbt);
        $('#timetable-e').append(row);
    });
    //一時てーぶる上のデータを送信
    $('#send_timetable').on('click',async ()=>{
        let senddeta = [],deldeta = [];
       $('.timeteble_row.foredit.new').each((i,ele)=>{
           let temp =[id];
           $(ele).children('div').each((n,elem)=>{
               temp.push($(elem).text());
           })
           senddeta.push(temp);
       });
        $('.timeteble_row.foredit.del').each((i,ele)=>{
            let temp = [];
            $(ele).children('div').each((n,elem)=>{
                temp.push($(elem).text());
            })
            deldeta.push(temp);
        });
        if(senddeta.length)
            await query('insert into timetable (videoid,content,timestump) values ?;',[senddeta]);
        if(deldeta.length)
            await query('delete from timetable where videoid = ? and (content,timestump) in ?;',[id,[deldeta]]);
        await refresh();
        popout.addClass("closed")
    });
}