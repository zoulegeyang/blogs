const {article} =  require('../../model/articles')
const pagination=require('mongoose-sex-page')
module.exports=async (req,rep)=>{
    // rep.send('文字');
    // return;
    let page=req.query.page;
    req.app.locals.currentLink='article'
    //pagination直接对表的是咧进行包装然后查询 articles 返回的是一个对象 page里传的是undefined的时候默认是1.
    let articles=await pagination(article).find().populate('author').page(page).size(2).display(3).exec()  //populate 表的联合查询,对author这个字段不直接返回值,返回这个值对应的表的对象
    // rep.send(articles);
    // return;
    
    rep.render('admin/article',{
        articles
        
    })
    
    // return;
}