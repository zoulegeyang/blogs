// const qureyString=require('querystring')
const {user} =require('../../model/users')
module.exports=async (req,rep)=>{
    //分页
    req.app.locals.currentLink='user'
    
    let page=req.query.page || 1;
    let pageSize=10;
    let total=Math.ceil(user.countDocuments()/pageSize)
    //将数据进行筛选返回给模板.
    let users=await user.find({}).limit(pageSize).skip((page-1)*pageSize)  //老是忘了写await 
    // rep.send(users)
    rep.render('admin/user',{
        users,
        total
    })
}