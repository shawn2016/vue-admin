var category = require('../models/category');

/**
 * 新增分类
 * @returns {Function}
 */
exports.addCategory = function (conditions, dbHelper, options, callback) {
    var categoryModel = category.getModel();
    dbHelper.addData(categoryModel, conditions, options, function (result) {
        callback(result);
    });
};
/**
 * 查找分类
 * @param conditions
 * @param dbHelper
 * @param callback
 */
exports.findCategory = function (conditions, dbHelper, callback) {
    var categoryModel = category.getModel();
    var fields = {};
    var options = {};
    if (conditions.pagenation) {
        options = {
            sort: { _id: -1 },
            limit: conditions.pagenation.pageSize,
            skip: (conditions.pagenation.pageNo - 1) * conditions.pagenation.pageSize
        }
    }
    dbHelper.findData(categoryModel, conditions, fields, options, function (result) {
        callback(result);
    });

}

/**
 * 删除分类
 * @param conditions
 * @param dbHelper
 * @param callback
 */
exports.removeCategory = function (conditions, dbHelper, callback) {
    var categoryModel = category.getModel();
    dbHelper.removeData(categoryModel, conditions, function (result) {
        callback(result);
    });
}

/**
 * 更新分类信息
 * @param conditions
 * @param update
 * @param options
 * @param dbHelper
 * @param callback
 */
exports.updateCategory = function (conditions, update, options, dbHelper, callback) {
    var categoryModel = category.getModel();
    dbHelper.updateData(categoryModel, conditions, update, options, function (result) {
        callback(result);
    });
}
