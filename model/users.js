const mongoose=require('mongoose')
const Joi=require('joi') //用于验证提价用户的数据是否规范.
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        minlength:2,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,

    },
    password:{
        type:String,
        minlength:2,
        required:true,

    },
    role:{
        type:String,
        required:true,

    },
    state:{
        type:Number,
        default:0
    }
})

const user=mongoose.model('user',userSchema)
// user.create({username:'zz',email:'a120@qq.com',password:'123456',role:'admin',state:0})

//用于验证从客户端输入提交的文字是否符合数据库的规范.
const verify=body=>{
    
    const Schema={
        username:Joi.string().min(2).max(10).required().error(new Error('用户名不符合规范')),
        email:Joi.string().email().required().error(new Error('邮箱格式不对')),
        password:Joi.string().min(2).regex(/^[a-zA-Z0-9]{3,15}$/).required().error(new Error('密码不符合规范')),
        role:Joi.string().valid('normal','admin').required().error(new Error('角色值输入错误')),
        state:Joi.number().valid(0,1).error(new Error('状态值出错'))
    }
    return Joi.validate(body,Schema)
}
module.exports={
    user,
    verify
}