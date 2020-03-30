//这一个edit其实是实现添加和修改的两个逻辑 根据get请求是否带参数来决定 带参数是修改 不带是提交
//带参数主要是方便用户修改的是默认将input填数据库里当前用户的值.通过query获取.
const {user}=require('../../model/users')
module.exports=async (req,rep)=>{
    //  再有渲染模板的js代码里用这个记录当前是用户还是文章
    req.app.locals.currentLink='user'
     //默认express框架给的属性可以获取URL里的query值.
    // console.log(message,req.query)
    let {email,message}=req.query  //message 是app.js发过来的,email是修改按钮发送过来的
    // rep.send(id);
    // return;
    if(email){
        
        let users=await user.findOne({email:email})
        
        rep.render('admin/user-edit',{
            email,
            message,
            users,
            link:'/admin/userEdit?email='+email,
            button:'修改' //修改提交的post路由
        }) //渲染的时候最前面不需要加/
    }else{
        rep.render('admin/user-edit',{
            message,
            // users,
            link:'/admin/userAdd', //增加提交的post路由
            button:'添加' 
        })
    }
    
}