const mongoose=require('mongoose')

const commentSchema=new mongoose.Schema({
    artId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'article'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    date:{
        type:Date,
    },
    content:{
        type:String
    }
})
const comment=mongoose.model('comment',commentSchema)

module.exports={
    comment,
}