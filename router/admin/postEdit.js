
const {user}=require('../../model/users')
module.exports=edit=async (req,rep,next)=>{
    // rep.send(req.body)
    // return;
    let {password,username,email,state,role}=req.body;
    
    let email2 =req.query.email;
    // rep.send(req.query)
    // return;
    let users=await user.findOne({email:email2}) //查看是哪个用户需要修改
    if(users&&users.password==password){ //如果存在用户并且用户的密码和和填写的密码一致则可以进行修改.
        //可以修改则修改除密码以外的数据
        await users.updateOne({
            email,
            username,
            state,
            role,
        })
        
        rep.redirect('/admin/user')
    }else{
        let result={path:'/admin/userEdit',message:'修改不成功',email:email2} //需要继续发送邮箱以便错误处理好之后好把页面重定向到修改页面
        // 由于修改页面和增加页面是以url地址栏里有没有email来区分的 

        next(JSON.stringify(result))
    }
    
}