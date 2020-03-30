const {user,verify} =require('../../model/users')

module.exports=async (req,rep,next)=>{
    try{
       await verify(req.body)
    }catch(err){  //catch可以捕获异步函数里的错误
        //加return 是因为rep.redirect有send方法. 防止重复调用
        //return rep.redirect(`/admin/userEdit?message=${err.message}`)  //若验证失败则已get请求重定向到当前页面.并将错误信息拼接到url里.
        let result={path:'/admin/userEdit',message:err.message}

        return next(JSON.stringify(result)) //next方法里可以写参数 表示捕捉到的错误信息
    }
    //通过查询邮箱来看邮箱的唯一性
    let users=await user.findOne({email:req.body.email})

    if(users){
        let result={path:'/admin/userEdit',message:'邮箱已存在'}
        return next(JSON.stringify(result))
    }else{
        //邮箱不存在则加添加的用户存到数据库中
        await user.create(req.body)
        rep.redirect('/admin/user')
    }
}