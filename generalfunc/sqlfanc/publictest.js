const query = require('./query');
module.exports=async (id)=>{
    var res = await query('select private from videodetail where videoid=\''+id+'\';');
    if(typeof res === 'string')
        return res;
    return res[0].private;
}