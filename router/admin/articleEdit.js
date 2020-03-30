module.exports = (req, rep) => {
    req.app.locals.currentLink = 'article'

    rep.render('admin/article-edit', {

    })
}