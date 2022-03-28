// アプリケーション作成用のモジュールを読み込み
const {app, BrowserWindow ,ipcMain ,dialog} = require('electron');
const Store = require('electron-store');
Store.initRenderer();

// メインウィンドウ
let mainWindow;

function createWindow() {
    // メインウィンドウを作成します
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        width: 800, height: 600,
        autoHideMenuBar: true,
        icon:__dirname +'/Asset/icon.png'
    });

    // メインウィンドウに表示するURLを指定します
    // （今回はmain.jsと同じディレクトリのindex.html）
    mainWindow.loadFile('html/index.html');



    // デベロッパーツールの起動
    mainWindow.webContents.openDevTools();

    // メインウィンドウが閉じられたときの処理
    mainWindow.on('closed', () => {
        mainWindow = null;
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

ipcMain.handle('comfirm',async (event, args) => {
    return (await dialog.showMessageBox({
        title: "確認",
        message: args[0],
        buttons: ['CANCEL', 'OK'],
    })).response;
})