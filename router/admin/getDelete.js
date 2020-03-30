const {user}=require('../../model/users')
module.exports=async (req,rep)=>{
    // rep.send(req.query.id);
    // return;
    await user.findOneAndDelete({_id:req.query.id})

    rep.redirect('/admin/user')
}