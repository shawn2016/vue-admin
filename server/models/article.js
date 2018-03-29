var mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    articleTitle: String,
    createTime: Date,
    updateTime: Date,
    userCode:String,
    content:String,
    abstract: String,
    tags: Array,
    category:Array,
    status:String,
}, { collection: 'article' })
module.exports = {
    getModel: function () {
        return _getModel();
    }
};

var _getModel = function (type, err) {
    let articleModel = mongoose.model('article', articleSchema);
    return articleModel;

};
