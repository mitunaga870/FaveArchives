const store = require("../../generalfunc/store");
const quary = require("../../generalfunc/sqlfanc/query");
const ToIS = require('../../generalfunc/ToISAPI/index');
const selection = $('#aleatthing');
const RecBT = $('#AutoRec_bt');

module.exports = (default_SW,StreamStatus) => {
    //対象変更時
    let selectstream,tmp;
    selection.on('change',async function (){
        selectstream = StreamStatus[selection.val()];
        if(selectstream){
            if(parseInt(selectstream.FitbitLiveNotice))
                $('#FitbitLiveNotice').text("ON");
            else
                $('#FitbitLiveNotice').text("OFF");
            if(parseInt(selectstream.FitbitUpcomingNotice))
                $('#FitbitUpcomingNotice').text("ON");
            else
                $('#FitbitUpcomingNotice').text("OFF");
            if(parseInt(selectstream.AlexaLiveNotice))
                $('#AlexaLiveNotice').text("ON");
            else
                $('#AlexaLiveNotice').text("OFF");
            if(parseInt(selectstream.AlexaUpcomingNotice))
                $('#AlexaUpcomingNotice').text("ON");
            else
                $('#AlexaUpcomingNotice').text("OFF");
            if(parseInt(selectstream.AutoRec))
                $('#AutoRec').text("ON");
            else
                $('#AutoRec').text("OFF");
            if(parseInt(selectstream.Aleam))
                $('#Aleam').text("ON");
            else
                $('#Aleam').text("OFF");
        }else {
            for (let value of default_SW) {
                if(parseInt(value.Default))
                    $('#' + value.Field).text("ON");
                else
                    $('#' + value.Field).text("OFF");
            }
        }
    });
    //録画オン・オフ
    RecBT.on('click',async function () {
        const valuediv = $('#AutoRec');
        if(selectstream) {
            const res = await ToIS.ToggleFunctionBT('AutoRec', 'K3BqWvxGn4w');
            if(res.data.AfterValue)
                valuediv.text("ON");
            else
                valuediv.text("OFF");
        }else {
            const res = await ToIS.ToggleDefaultBT('AutoRec');
            if(res.data.AfterValue)
                valuediv.text("ON");
            else
                valuediv.text("OFF");
        }
    });
    //アラームオン・オフ
    $('#Aleam_bt').on('click',async () => {
        const valuediv = $('#Aleam');
        if(selectstream) {
            const res = await ToIS.ToggleFunctionBT('Aleam', 'K3BqWvxGn4w');
            if(res.data.AfterValue)
                valuediv.text("ON");
            else
                valuediv.text("OFF");
        }else {
            const res = await ToIS.ToggleDefaultBT('Aleam');
            if(res.data.AfterValue)
                valuediv.text("ON");
            else
                valuediv.text("OFF");
        }
    })
    //alexaオン・オフ
    $('#AlexaLiveNotice_bt').on('click',async () => {
        const valuediv = $('#AlexaLiveNotice');
        if(selectstream) {
            const res = await ToIS.ToggleFunctionBT('AlexaLiveNotice', 'K3BqWvxGn4w');
            if(res.data.AfterValue)
                valuediv.text("ON");
            else
                valuediv.text("OFF");
        }else {
            const res = await ToIS.ToggleDefaultBT('AlexaLiveNotice');
            if(res.data.AfterValue)
                valuediv.text("ON");
            else
                valuediv.text("OFF");
        }
    })
    //fitbitオン・オフ
    $('#FitbitLiveNotice_bt').on('click',async () => {
        const valuediv = $('#FitbitLiveNotice');
        if(selectstream) {
            const res = await ToIS.ToggleFunctionBT('FitbitLiveNotice', 'K3BqWvxGn4w');
            if(res.data.AfterValue)
                valuediv.text("ON");
            else
                valuediv.text("OFF");
        }else {
            const res = await ToIS.ToggleDefaultBT('FitbitLiveNotice');
            if(res.data.AfterValue)
                valuediv.text("ON");
            else
                valuediv.text("OFF");
        }
    })
    //alexa枠通知オン・オフ
    $('#AlexaUpcomingNotice_bt').on('click',async () => {
        const valuediv = $('#AlexaUpcomingNotice');
        if(selectstream) {
            const res = await ToIS.ToggleFunctionBT('AlexaUpcomingNotice', 'K3BqWvxGn4w');
            if(res.data.AfterValue)
                valuediv.text("ON");
            else
                valuediv.text("OFF");
        }else {
            const res = await ToIS.ToggleDefaultBT('AlexaUpcomingNotice');
            if(res.data.AfterValue)
                valuediv.text("ON");
            else
                valuediv.text("OFF");
        }
    })
    //fitbit枠通知オン・オフ
    $('#FitbitUpcomingNotice_bt').on('click',async () => {
        const valuediv = $('#FitbitUpcomingNotice');
        if(selectstream) {
            const res = await ToIS.ToggleFunctionBT('FitbitUpcomingNotice', 'K3BqWvxGn4w');
            if(res.data.AfterValue)
                valuediv.text("ON");
            else
                valuediv.text("OFF");
        }else {
            const res = await ToIS.ToggleDefaultBT('FitbitUpcomingNotice');
            if(res.data.AfterValue)
                valuediv.text("ON");
            else
                valuediv.text("OFF");
        }
    })
    //ランダムアーカイブボタン
    $('#rand').on('click',async function () {
        let q = 'select videoid from videodetail';
        if(store.get('privatefilter')){
            q += ' where private = \'0\''
        }
        q += ' order by RAND() LIMIT 1;';
        const temp = await quary(q);
        document.location="../html/stdetail.html?v=" + temp[0].videoid;
    });
}