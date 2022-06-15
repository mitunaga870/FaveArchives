const Store = require('electron-store');
const schema = {
    privatefilter:{
        type:'boolean',
        default:true
    },//非公開アーカイブを検索結果に参照するか
    archivespath:{
        type: 'string'
    },//非公開アーカイブの保存ディレクトリ
    chatpath:{
        type: 'string'
    },
    thumbnailpath:{
        type: 'string'
    },
    songvol:{
        type:'number',
        minimum:0,
        maximum:100,
        default:100,
    },
    savechat:{
        type:'boolean',
        default:false
    },
    cookie:{
        type:'string'
    }
};
module.exports = new Store({schema});
