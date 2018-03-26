const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
    articleTitle: String,
    createTime: Date,
    updateTime: Date,
    author: String,
    category: Array,
    userCode:String,
    content:String,
    abstract: String,
    tags: Array,
    status:String
}, { collection: 'article' })
//这里mongoose.Schema要写上第二个参数，明确指定到数据库中的哪个表取数据


const Hero = module.exports = mongoose.model('article', articleSchema);