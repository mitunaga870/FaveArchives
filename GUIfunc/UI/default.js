window.jQuery = window.$ = require('jquery');

let items = document.getElementsByClassName('side-scroll');
Array.prototype.forEach.call(items,(item)=>{
    item.addEventListener('wheel',(event)=>{
        event.preventDefault();
        if(event.deltaY>0){
            item.scrollLeft += 30;
        }else {
            item.scrollLeft -= 30;
        }
    },{passive:false});
});
(function(d) {
    var config = {
            kitId: 'sdh1mwc',
            scriptTimeout: 3000,
            async: true
        },
        h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
})(document);