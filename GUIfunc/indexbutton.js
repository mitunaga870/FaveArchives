const quary = require('../generalfunc/sqlfanc/query');
const gas = require('../generalfunc/gas');
const randbutton = document.querySelector('#rand');
const recbutton = document.querySelector('#recbt');
const alexabutton = document.querySelector('#alexabt');
const fitbitbutton = document.querySelector('#fitbitbt');
const subalexabutton = document.querySelector('#subalexabt');
const subfitbitbutton = document.querySelector('#subfitbitbt');
const arambutton = document.querySelector('#areambt');
const recbt = document.getElementById('recbt');
const areambt = document.getElementById('areambt');
const alexabt = document.getElementById('alexabt');
const subalexabt = document.getElementById('subalexabt');
const fitbit = document.getElementById('fitbitbt');
const subfitbit = document.getElementById('subfitbitbt');
const select = document.getElementById('aleatthing');
const selection = document.querySelector('#aleatthing');
const store = require('../generalfunc/store');

(async () => {
    let temp;
    await gas('getindexdata',[]).then(res=>{
        console.log(res);
        temp=res.data.response;
        temp=temp.result;
        recbt.innerText = "録画"+temp.recsw;
        areambt.innerText = "アラーム"+temp.areamsw;
        alexabt.innerText="アレクサ"+temp.alexasw;
        subalexabt.innerText="アレクサ枠通知"+temp.subalexasw;
        fitbit.innerText="fitbit"+temp.fitbitsw;
        subfitbit.innerText="fitbit枠通知"+temp.subfitbitsw;
    }).catch(error=>{console.log(error)});
    //アラートスイッチの対象を追加、及び配信中・待機中のとき速報追加及び視聴ボタン
    var def = document.createElement('option');
    def.innerText="すべて";
    def.value = "-1";
    select.appendChild(def);
    await gas ('getStreamStatus',[]).then(res=>{
        console.log(res);
        temp=res.data.response.result;
        console.log(temp)
        temp=JSON.parse(temp);
        for (var i in temp.streamdetail){
            var title = temp.streamdetail[i].title;
            console.log(title)
            var op = document.createElement('option');
            op.innerText = "枠"+i+"："+title;
            op.value = i;
            select.appendChild(op);
            let a = document.createElement('a');
            a.href = "../html/streamwatch.html?id=" + temp.streamdetail[i].id;
            let div = document.createElement('div');
            div.className = "aleat";
            div.innerText = temp.streamdetail[i].content+"\n"+temp.streamdetail[i].title+"\n"+temp.streamdetail[i].scheduletime;
            a.appendChild(div);
            document.getElementById('staleatbox').appendChild(a);
        }
    }).catch(error=>{console.log(error)});
    //対象変更時
    selection.addEventListener('change',async function (){
        console.log(select.value)
        await gas ('getstaleat',[select.value]).then(res=>{
            console.log(res);
            temp=res.data.response;
            temp=temp.result;
            recbt.innerText = "録画"+temp.recsw;
            areambt.innerText = "アラーム"+temp.areamsw;
            alexabt.innerText="アレクサ"+temp.alexasw;
            subalexabt.innerText="アレクサ枠通知"+temp.subalexasw;
            fitbit.innerText="fitbit"+temp.fitbitsw;
            subfitbit.innerText="fitbit枠通知"+temp.subfitbitsw;
        }).catch(error=>{console.log(error)});
    })
    //録画オン・オフ
    recbutton.addEventListener('click',async function () {
        await gas('recsw',[select.value]).then(res=>{
            temp = res.data.response.result;
        }).catch(error=>{console.log(error)});
        recbt.innerText = "録画"+temp;
    });
    //アラームオン・オフ
    arambutton.addEventListener('click',async function () {
        await gas('areamsw',[select.value]).then(res=>{
            temp = res.data.response.result;
        }).catch(error=>{console.log(error)});
        areambt.innerText = "アラーム"+temp;
    });
    //alexaオン・オフ
    alexabutton.addEventListener('click',async function () {
        await gas('alexasw',[select.value]).then(res=>{
            temp = res.data.response.result;
        }).catch(error=>{console.log(error)});
        alexabt.innerText = "Alexa"+temp;
    });
    //fitbitオン・オフ
    fitbitbutton.addEventListener('click',async function () {
        await gas('fitbitsw',[select.value]).then(res=>{
            temp = res.data.response.result;
        }).catch(error=>{console.log(error)});
        fitbit.innerText = "Fitbit"+temp;
    });
    //alexa枠通知オン・オフ
    subalexabutton.addEventListener('click',async function () {
        await gas('subalexasw',[select.value]).then(res=>{
            temp = res.data.response.result;
        }).catch(error=>{console.log(error)});
        subalexabt.innerText = "Alexa枠通知"+temp;
    });
    //fitbit枠通知オン・オフ
    subfitbitbutton.addEventListener('click',async function () {
        const button = document.getElementById('subfitbitbt');
        await gas('subfitbitsw',[select.value]).then(res=>{
            temp = res.data.response.result;
        }).catch(error=>{console.log(error)});
        subfitbit.innerText = "Fitbit枠通知"+temp;
    });
    //ランダムアーカイブボタン
    randbutton.addEventListener('click',async function () {
        let q = 'select videoid from videodetail';
        if(store.get('privatefilter')){
            q += ' where private = \'0\''
        }
        q += ' order by RAND() LIMIT 1;';
        const temp = await quary(q);
        document.location="../html/stdetail.html?v=" + temp[0].videoid;
    });
})();