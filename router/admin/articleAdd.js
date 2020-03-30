const formidable=require('formidable')
const path=require('path')
const {article}=require('../../model/articles')
module.exports=(req,rep)=>{
    
    const form=new formidable.IncomingForm()  //用于解析从客户端传的非一般类型的表单数据
    //配置form
    form.uploadDir=path.join(__dirname,'../','../','public/upload')  //字符串拼接还可以拼上级目录
    form.keepExtensions=true; //保留后缀

    form.parse(req,async (err,fields,files)=>{  //req是请求对象, err是错误对象 ,fields是一般表单数据对象,files是文件对象.
        // rep.send(files)
        await article.create({
            title:fields.title,
            author:fields.author,
            publishDate:fields.publishDate,
            // 这里的files.cover是由于表单里那里name写的cover 如果有多个文件上传,可能还有更多的属性
            // cover 保存的是public下面图片的路径,由于数据库不能存图片
            cover:files.cover.path.split('public')[1], //字符串的split方法可以将一个字符串以一个位置进行切割,然后返回一个数组.
            text:fields.text,
        })
        rep.redirect('/admin/article')
    })
}