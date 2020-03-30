const mongoose=require('mongoose')
mongoose.set('useCreateIndex', true)
//以zz用户访问

mongoose.connect('mongodb://zz:zz@localhost/blogs',{ useNewUrlParser: true,useUnifiedTopology: true}).then(()=>console.log('数据库连接成功')).catch(()=>{console.log('数据库连接失败')})