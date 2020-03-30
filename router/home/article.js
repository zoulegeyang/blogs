const {article}=require('../../model/articles')
const {comment}=require('../../model/comments')
module.exports = async(req, rep) => {
    let id=req.query.id
    let articles=await article.findOne({_id:id}).populate('author')
    let comments=await comment.find().populate('userId')
    // rep.send(comments)
    // return;

    rep.render('home/article',{
        articles,
        comments
    })
}