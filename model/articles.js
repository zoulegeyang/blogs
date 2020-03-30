const mongoose=require('mongoose')

const articleSchema=new mongoose.Schema({
    title:{
        type:String,
        minlength:2,
        maxlength:18,
        required:[true,'文章标题必填']
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,  //该类型是数据库表类型会将user这个字段存放同一数据库其它表以id的形式进行联系
        ref:'user'  //指向表名字
    },
    publishDate:{
        type:Date,
        default:Date.now
    },
    cover:{
        type:String,
        default:null,
    },
    text:{
        type:String
    }

})
const article=mongoose.model('article',articleSchema)

module.exports={
    article,
}