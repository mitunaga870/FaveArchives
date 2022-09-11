const quary = require('../generalfunc/sqlfanc/query');
const event = require('../GUIfunc/indexfunc/event');
const select = document.getElementById('aleatthing');
window.jQuery = window.$ = require('jquery');

(async () => {
    let temp;
    //デフォルトのスイッチ状況を取得
    const default_SW = await quary('Desc functionSW;');
    for (let value of default_SW) {
        if(parseInt(value.Default))
            $('#' + value.Field).text("ON");
        else
            $('#' + value.Field).text("OFF");
    }
    //アラートスイッチの対象を追加、及び配信中・待機中のとき速報追加及び視聴ボタン
    var def = document.createElement('option');
    def.innerText="すべて";
    def.value = "-1";
    select.appendChild(def);
    const StreamStatus = await quary('select f.*,v.title,v.livestate,p.scheduletime from functionSW f join videodetail v on f.videoid = v.videoid join publishedtime p on f.videoid = p.videoid;');
    for(let i in StreamStatus){
        //リストに追加
        const option = $('<option>');
        option.text("枠："+i+StreamStatus[i].title);
        option.val(i);
        $('#aleatthing').append(option);
        //推し速報に追加
        const link = $('<a>');
        link.attr("href","../html/streamwatch.html?id=" + StreamStatus[i].videoid);
        //live/upcomingを変更
        let livestate = "待機枠作成済み";
        if(StreamStatus[i].livestate.match("live"))
            livestate = "配信中";
        const div = $('<div>',{
            css:{
                "background-image": "linear-gradient(rgba(0,0,0,0.8),20%,rgba(0,0,0,0)), URL(https://img.youtube.com/vi/"+StreamStatus[i].videoid+"/0.jpg)"
            },
            text:livestate+"\n"+StreamStatus[i].title+"\n"+StreamStatus[i].scheduletime,
            "class":"aleat"
        });
        link.append(div);
        $('#staleatbox').append(link);
    }
    if(!StreamStatus.length) {
        const div = $('<div>', {
            text: "NO STREAM",
            id: "no_stream"
        });
        $('#staleatbox').append(div);
    }
    event(default_SW,StreamStatus);
})();