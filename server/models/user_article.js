var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var user_articleSchema = mongoose.Schema({
    userId:{type: Schema.Types.ObjectId, ref: 'user' },
    articleId:{type: Schema.Types.ObjectId, ref: 'article' }
}, { collection: 'user_article' });
//????getModel???????user_article??
module.exports = {
    getModel: function () {
        return _getModel();
    }
};

var _getModel = function (type, err) {
    let user_articleModel = mongoose.model('user_article', user_articleSchema);
    return user_articleModel;

};
