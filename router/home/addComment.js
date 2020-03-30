const {comment} = require('../../model/comments')
module.exports=async(req,rep)=>{
    // rep.send(req.body)
    const {content,artId,userId}=req.body
    // console.log({content,artId,userId})
    // rep.send(req.app.locals.userInfo    )
    await comment.create({
        userId,
        content,
        artId,
        // date:Date.now  //这个是数据库提供的方法这里用不了
        date:new Date()
    })
    rep.redirect('/home/article?id='+artId)
}