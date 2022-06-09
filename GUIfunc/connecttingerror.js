const url = new URL(window.location.href);
const params = url.searchParams;
const basepage = params.get('url');
const detail = params.get('detail');
const quarytxt = params.get('q');
const quaryarr = params.get('arr');
const link = document.getElementById('reload');
const detailbox = document.getElementById('detail');

(async ()=>{
    console.log(basepage);
    link.href=basepage;
    console.log(detail);
    let innerText=detail+"\nquarytext:"+quarytxt;
    if(quaryarr!=undefined)
        innerText +="\nquaryqrr:"+quaryarr;
    detailbox.innerText=innerText;
})();