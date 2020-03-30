//该函数是登录的中间件函数
const login=(req,rep,next)=>{
    //req.session每次都是当前请求的session 所以下面的意思当前请求的服务器的session下没有username
    if(req.url!='/login'&&!req.session.username){ //如果用户访问的不是登录页面以及用户是未登录的状态,则其它页面访问不了,重定向到登录页面
        rep.redirect('/admin/login')

    }else{
        //虽然登录了 但防止用户以登录好了之后的状态再在url地址栏里输入admin想访问管理员页面,所以此时对身份在进行判读,如果是管理身份则可以,如果不是则继续跳到博客首页.
        // if(req.session.role=='admin'){
        //     next()
        // }else{
        //     return rep.redirect('/home')  
        // }
        // 不能像上面那样写,由于norml是特列,其它情况包括没有登录,以及以管理员身份登录好了之后  而没有登录也是通过admin下的login进行登录的
        if(req.session.role=='normal'){
            return rep.redirect('/home')
        }else{
            next()
        }
        
    }
}
module.exports=login