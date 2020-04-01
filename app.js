const express = require('express')
const path = require('path')
const app = express()

//方法
const dateformat = require('dateformat')
const config = require('config')
console.log(config.get('title'));


//封装中间件
const login = require('./middleWare/login')
const morgan = require('morgan')

// if(process.env.Nss=='development'){
//     app.use(morgan('dev'))
// }
console.log(process.env.NODE_ENV)
//模板的方法  模板可以直接使用这些方法
const template = require('art-template')
template.defaults.imports.dateformat = dateformat

//请求相关
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: false
}))
//导入路由
const home = require('./router/home')
const admin = require('./router/admin')
//session和cooKie
const session = require('express-session')
app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 //以毫秒为单位设置cookie的过期时间. 这样当这次会话结束以后下次还是以登录的状态访问
    }
})) //该中间件会把req上添加session属性.会给客户端返回一个cookie,那个cookie有这条数据的唯一标识
//数据库
require('./model/connect')
const {
    user
} = require('./model/users')

//配置模板引擎
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'art')
app.engine('art', require('express-art-template'))

//配置静态资源(配置静态资源使得模板里写的路径引入的静态资源里文件时可以引得到)
//当art文件内部有引入静态资源的时候会从这个目录下找. 且会相对于请求路径找比如localhost/admin 就会从public下面admin目录找.但是如果,art文件引入资源是以绝对路径访问的(在路径前加/),则就会从配置的路径在加那里的绝对路径来访问.
app.use(express.static(path.join(__dirname, 'public')))


//路由绑定
//需要注意的是这个判断逻辑 需要写在下面post /admin请求的上面 要先判断,在处理.
app.use('/admin', login)

app.use('/home', home)
app.use('/admin', admin)


// 除非测试最终这里的错误代码 以及最后产品完成后把这里不注释,其它时候都注释掉 不然正确的报错都被这里搞乱了
// app.use((err,req,rep,next)=>{
//     // console.log('zzzz')
//     let result=JSON.parse(err)
//     //由于每个错误信息都含有地址,但是其它携带的错误信息可能字段不一致,所以不能写死要采用循环拼接的方式.
//     let items=[]
//     for( item in result){
//         if(item!='path'){
//             items.push(item+'='+result[item])
//         }
//     }

//     rep.redirect(result.path+'?'+items.join('&'))
// })

app.listen(80)
console.log('启动成功!')