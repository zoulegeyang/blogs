const {user}=require('../../model/users')
module.exports=async (req,rep)=>{
    console.log(req.body)
    const {email,password}=req.body
    if(req.body.email.trim()==''||req.body.password.trim()==''){
        return rep.status(400).render('admin/error',{msg:'邮箱或地址没有输入'})
    } 
    let users=await user.findOne({email})
    if(users){
        if(password==users.password){
            req.session.username=users.username //会把post提交的数据放在session里.
            req.session.role=users.role  //将角色也放到session里便于区分普通用户和管理用户
            req.app.locals.userInfo=users //将user对象放到公共数据对象供公共组件使用.
            // rep.end('success')
            if(users.role=='normal'){
                rep.redirect('/home')  //如果是普通用户则重定向到自己的博客页面
            }else{
                // console.log('--------')
                rep.redirect('/admin/user') //如果是管理用户则登录的时候将其重定向到管理页面
            }
            
        }else{
            return rep.status(400).render('admin/error',{msg:'邮箱或地址输入错误'})
        }
    }else{
        return rep.status(400).render('admin/error',{msg:'邮箱或地址输入错误'})

    }
}