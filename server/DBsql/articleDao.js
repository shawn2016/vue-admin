var article = require('../models/article');

/**
 * 新增文章
 * @returns {Function}
 */
exports.addArticle = function (conditions, dbHelper, options, callback) {
    var articleModel = article.getModel();
    dbHelper.addData(articleModel, conditions, options, function (result) {
        callback(result);
    });
};
/**
 * 查找文章
 * @param conditions
 * @param dbHelper
 * @param callback
 */
exports.findArticle = function (conditions, dbHelper, callback) {
    var articleModel = article.getModel();
    var fields = {};
    var options = {};
    if (conditions.pagenation) {
        options = {
            sort: { _id: -1 },
            limit: conditions.pagenation.pageSize,
            skip: (conditions.pagenation.pageNo - 1) * conditions.pagenation.pageSize
        }
    }
    dbHelper.findData(articleModel, conditions, fields, options, function (result) {
        callback(result);
    });

}

/**
 * 删除文章
 * @param conditions
 * @param dbHelper
 * @param callback
 */
exports.removeArticle = function (conditions, dbHelper, callback) {
    var articleModel = article.getModel();
    dbHelper.removeData(articleModel, conditions, function (result) {
        callback(result);
    });
}

/**
 * 更新文章信息
 * @param conditions
 * @param update
 * @param options
 * @param dbHelper
 * @param callback
 */
exports.updateArticle = function (conditions, update, options, dbHelper, callback) {
    var articleModel = article.getModel();
    dbHelper.updateData(articleModel, conditions, update, options, function (result) {
        callback(result);
    });
}
