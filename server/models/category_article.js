var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var category_articleSchema = mongoose.Schema({
    categoryId:{type: Schema.Types.ObjectId, ref: 'category' },
    articleId:{type: Schema.Types.ObjectId, ref: 'article' }
}, { collection: 'category_article' });
module.exports = {
    getModel: function () {
        return _getModel();
    }
};

var _getModel = function (type, err) {
    let category_articleModel = mongoose.model('category_article', category_articleSchema);
    return category_articleModel;

};
