const chat_popupBT = $('#chat_popup');

module.exports = (id) => {
    const chatinfo = $('#info')
    chat_popupBT.on('click',()=>{
        ipcRenderer.invoke('popupchat',[id]);
        chatinfo.text("ここには表示されません。別ウィンドウに移動しました。");
        chatinfo.addClass("chat_closed");
    });
    ipcRenderer.on('closepopup',()=>{
        chatinfo.text("");
        chatinfo.removeClass("chat_closed");
    })
}