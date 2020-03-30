const { article } = require('../../model/articles')
const pagination = require('mongoose-sex-page')
module.exports = async(req, rep) => {
    let result = await pagination(article).find().populate('author').page(1).size(4).display(5).exec()
        // rep.send(result)
        // return;
    rep.render('home/default', {
        result,
    })
}