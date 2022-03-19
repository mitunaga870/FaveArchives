const quary = require('./query');

module.exports = async (id,title,description,contenttype,private,type,userid) =>{
    quary('update videodetail set title=\''+title.replace(/\'/g,"\\\'")+'\',description=\''+description.replace(/\'/g,"\\\'")+'\',contenttype=\''+contenttype+'\',private=\''+private+'\',type=\''+type+'\',userid=\''+userid+'\' where videoid=\''+id+'\';');
}
