module.exports=(req,rep)=>{
    if(req.app.locals.userInfo){   
        req.session.destroy(function(){   //退出登录将 session中保存的当前的用户值清空.
            rep.clearCookie('connect.sid');             //同时将客户端的cookie删除.  connect.sid是默认express框架发的cookieId   
            rep.redirect('/admin/login')

            req.app.locals.userInfo=null;
        })
    }
}