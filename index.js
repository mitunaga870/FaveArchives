// アプリケーション作成用のモジュールを読み込み
const {app, BrowserWindow ,ipcMain ,dialog} = require('electron');
const Store = require('electron-store');
Store.initRenderer();

// メインウィンドウ
let mainWindow,chatwindow,chatwindow_popup;

//ここから関数定義
function chat_resize(event,newBounds) {
    if(!newBounds){
        newBounds = mainWindow.getBounds();
    }
    const chatBounds = {
        x: Math.round(newBounds.x + newBounds.width * 0.7-1),
        y: Math.round(newBounds.y + 175),
        width: Math.round(newBounds.width * 0.3-7),
        height: Math.round(newBounds.height-177)
    };
    chatwindow.setBounds(chatBounds);
}


function createWindow() {
    // メインウィンドウを作成します
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        frame:false,
        width: 800, height: 600,
        autoHideMenuBar: true,
        icon:__dirname +'/Asset/icon.png'
    });
    //チャットウィンドウを生成しりサイズ
    chatwindow = new BrowserWindow({
        resizable:false,
        parent:mainWindow,
        frame:false,
        autoHideMenuBar: true,
        show:false,
        icon:__dirname +'/Asset/icon.png'
    });
    chat_resize();
    //ポップアウト用のウィンドウを生成
    chatwindow_popup=new BrowserWindow({
        parent:mainWindow,
        autoHideMenuBar:true,
        show:false
    })
    // メインウィンドウに表示するURLを指定します
    mainWindow.loadFile('html/index.html');

    // メインウィンドウが閉じられたときの処理
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    //チャットウィンドウのサイズ処理
    mainWindow.on('will-resize',chat_resize);
    mainWindow.on('will-move',chat_resize);
    mainWindow.on('maximize',chat_resize);
    mainWindow.on('unmaximize',chat_resize);
    mainWindow.on('minimize',()=>{chatwindow.hide()});
    mainWindow.on('restore',chat_resize);
    //ポップアップ時の処理
    chatwindow_popup.on('show',()=>{chatwindow.hide()});
    chatwindow_popup.on('close',(event)=>{
            event.preventDefault();
            chatwindow_popup.hide();
            chatwindow.show();
            mainWindow.webContents.send('closepopup');
    });
}
//  初期化が完了した時の処理
app.on('ready', createWindow);

// 全てのウィンドウが閉じたときの処理
app.on('window-all-closed', () => {
    // macOSのとき以外はアプリケーションを終了させます
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
// アプリケーションがアクティブになった時の処理(Macだと、Dockがクリックされた時）
app.on('activate', () => {
    // メインウィンドウが消えている場合は再度メインウィンドウを作成する
    if (mainWindow === null) {
        createWindow();
    }
});

//ここからipcHandle
//確認ウィンドウ
ipcMain.handle('comfirm',async (event, args) => {
    return (await dialog.showMessageBox({
        title: "確認",
        message: args[0],
        buttons: ['CANCEL', 'OK'],
    })).response;
})
//通知ウィンドウ
ipcMain.handle('notice',async (event,args)=>{
    return(await dialog.showMessageBox({
        title:"通知",
        message: args[0]
    })).response;
})
//終了イベント
ipcMain.handle('close',()=>{
    BrowserWindow.fromId(mainWindow.id).close();
});
//最大化イベント
ipcMain.handle('maximize',()=>{
    const win = BrowserWindow.fromId(mainWindow.id);
    if(win.isMaximized())
        win.unmaximize();
    else
        win.maximize();
});
//最小化イベント
ipcMain.handle('minimize',()=>{
    BrowserWindow.fromId(mainWindow.id).minimize();
});

//チャット表示イベント
ipcMain.handle('openchat',(event, args)=>{
    chatwindow.show()
    chatwindow.loadURL("https://www.youtube.com/live_chat?is_popout=1&v=" + args[0]);
});
//チャットウィンドウクロースイベント
ipcMain.handle('closechat',()=>{
    chatwindow.hide();
    chatwindow_popup.hide();
});
//ポップアップイベント
ipcMain.handle('popupchat',(event, args)=>{
    chatwindow_popup.show()
    chatwindow_popup.loadURL("https://www.youtube.com/live_chat?is_popout=1&v=" + args[0]);
});