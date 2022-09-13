const make_categoryplaylist = require("../GUIfunc/suggenstions_fanc/make_categoryplaylist");
const make_randomarchive = require("../GUIfunc/suggenstions_fanc/make_randomarchive");
const make_randomsong = require("../GUIfunc/suggenstions_fanc/make_randomsongs");
const {ipcRenderer,BrowserWindow} = require("electron");
window.jQuery = window.$ = require('jquery');

(async () => {
    await ipcRenderer.invoke('closechat',);
    try {
        $('#suggestions').load("./suggestions.html");
    }catch (e) {
        $('#suggestions').load("./resources/app.asar/html/suggestions.html");
    }
    make_categoryplaylist();
    make_randomarchive();
    make_randomsong();
    try {
        $('#header').load("./header.html");
    }catch (e) {
        $('#header').load("./resources/app.asar/html/header.html");
    }
})();
