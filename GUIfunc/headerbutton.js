(async ()=>{
    $('#close').on('click',()=>{
        ipcRenderer.invoke('close');
    });
    $('#maximize').on('click',()=>{
        ipcRenderer.invoke('maximize');
    });
    $('#minimize').on('click',()=>{
        ipcRenderer.invoke('minimize');
    })
})();