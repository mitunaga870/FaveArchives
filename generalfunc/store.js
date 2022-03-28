const Store = require('electron-store');
const schema = {
    privatefilter:{
        type:'boolean',
        default:true
    },//非公開アーカイブを検索結果に参照するか
    archivespath:{
        type: 'string'
    }//非公開アーカイブの保存ディレクトリ
};
module.exports = new Store({schema});
