const store = require('../generalfunc/store');
const change = require('../GUIfunc/settingfunc/change');
const priselect = document.getElementById('priselection');
const sendbt = document.querySelector('#sendbt');

(async ()=>{
    let nowsection = 'generalset';
    setsettiong('general');
    sendbt.addEventListener('click',function () {
        let target = document.getElementById('sendbt').className;
        if(target.match("generalset")){
            store.set('privatefilter',Boolean(parseInt(priselect.value)));
        }else if(target.match('fileset')){
            store.set('archivespath',document.getElementById('path').value);
        }
        setsettiong(target);
    })
})();
function setsettiong(settingtype){
    if(settingtype.match('general')){
        let privatefilter = store.get('privatefilter');
        console.log(privatefilter);
        if(privatefilter){
            priselect.value = "1";
        }else {
            priselect.value = "0";
        }
    }else if (settingtype.match('fileset')){
        let path = store.get('archivespath');
        document.getElementById('path').value = path;
    }
}