window.jQuery = window.$ = require('jquery');
const query = require('../../generalfunc/sqlfanc/query');
const SetPlayerTime = require('../../generalfunc/playerfunc/SetPlayerTime');

module.exports = async () => {
    const table = $('#timetable'),table_e = $('#timetable-e');
    table.empty();
    table_e.empty();
    const res = await query('select * from timetable where videoid = ?',[id]);
    res.forEach((item)=>{
        const content_val = item.content,time = item.timestump;
        //閲覧用テーブルに配置
        const row = $('<div>',{
            class:"timeteble_row",
        });
        const content = $('<div>',{
            text:content_val,
            class:"timetable_content"
        });
        const timestump = $('<div>',{
            text:time,
            class:"timetable_timestump"
        });
        const gobt = $('<button>',{
            class:"go-button",
            text:"再生"
        });
        gobt.on('click',()=>{
            SetPlayerTime(time);
        });
        row.append(content);
        row.append(timestump);
        row.append(gobt);
        table.append(row);
        //編集用テーブルに出力
        const row_e = $('<div>',{
            class:"timeteble_row foredit",
        });
        const content_e = $('<div>',{
            text:content_val,
            class:"timetable_content foredit"
        });
        const timestump_e = $('<div>',{
            text:time,
            class:"timetable_timestump foredit"
        });
        const delbt_e = $('<button>',{
            text:"削除"
        });
        delbt_e.on('click',()=>{
            row_e.addClass("del");
            row_e.addClass("none");
        });
        row_e.append(content_e);
        row_e.append(timestump_e);
        row_e.append(delbt_e);
        table_e.append(row_e);
    })
}