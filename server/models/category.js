var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
    categoryCode: String,
    categoryName: String,
    createTime: Date,
    userCode: String,
    updateTime: Date,
    platType:String,
    desc: String
}, { collection: 'category' });
module.exports = {
    getModel: function () {
        return _getModel();
    }
};

var _getModel = function (type, err) {
    let categoryModel = mongoose.model('category', categorySchema);
    return categoryModel;

};
