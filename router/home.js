const express = require('express')

// const app=express()
const home = express.Router()
home.get('/', require('./home/index'));
home.get('/article', require('./home/article'))
home.post('/addComment',require('./home/addComment'))
module.exports = home;