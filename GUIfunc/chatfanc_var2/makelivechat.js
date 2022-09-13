module.exports = (id) => {
    const chatwindow = ipcRenderer.invoke('openchat',[id]);
}