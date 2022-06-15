const store = require('../generalfunc/store');
const change = require('../GUIfunc/settingfunc/change');
const priselect = document.getElementById('priselection');
const sendbt = document.querySelector('#sendbt');
window.jQuery = window.$ = require('jquery');

(async ()=>{
    let nowsection = 'generalset';
    setsettiong();
    sendbt.addEventListener('click',async function () {
        let target = document.getElementById('sendbt').className;
        if(target.match("general")){
            await store.set('privatefilter',Boolean(parseInt(priselect.value)));
            await store.set('savechat',Boolean(parseInt(savechat.value)));
        }else if(target.match('fileset')){
            await store.set('archivespath',document.getElementById('archive-path').value);
            await store.set('chatpath',document.getElementById('chat-path').value);
            await store.set('cookie',document.getElementById('cookie').value);
            await store.set('thumbnailpath',$('#thumbnail-path').val());
        }
        setsettiong(target);
    })
})();
function setsettiong(){
        let privatefilter = store.get('privatefilter');
        console.log(privatefilter);
        if(privatefilter){
            priselect.value = "1";
        }else {
            priselect.value = "0";
        }
        if(store.get('savechat')){
            savechat.value = "1";
        }else {
            savechat.value = "0";
        }
        let path = store.get('archivespath');
        console.log(path)
        document.getElementById('archive-path').value = path;
        document.getElementById('chat-path').value = store.get('chatpath');
        document.getElementById('cookie').value = store.get('cookie');
        $('#thumbnail-path').val(store.get('thumbnailpath'));
}