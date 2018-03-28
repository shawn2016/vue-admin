var user = require('../models/user');

/**
 * 新增用户
 * @returns {Function}
 */
exports.addUser = function (conditions, dbHelper, options, callback) {
    var userModel = user.getModel();
    dbHelper.addData(userModel, conditions, options, function (result) {
        callback(result);
    });
};
/**
 * 查找用户
 * @param conditions
 * @param dbHelper
 * @param callback
 */
exports.findUser = function (conditions, dbHelper, callback) {
    var userModel = user.getModel();
    var fields = {};
    var options = {};
    if (conditions.pagenation) {
        options = {
            sort: { _id: -1 },
            limit: conditions.pagenation.pageSize,
            skip: (conditions.pagenation.pageNo - 1) * conditions.pagenation.pageSize
        }
    }
    dbHelper.findData(userModel, conditions, fields, options, function (result) {
        callback(result);
    });

}

/**
 * 删除用户
 * @param conditions
 * @param dbHelper
 * @param callback
 */
exports.removeUser = function (conditions, dbHelper, callback) {
    var userModel = user.getModel();
    dbHelper.removeData(userModel, conditions, function (result) {
        callback(result);
    });
}

/**
 * 更新用户信息
 * @param conditions
 * @param update
 * @param options
 * @param dbHelper
 * @param callback
 */
exports.updateUser = function (conditions, update, options, dbHelper, callback) {
    var userModel = user.getModel();
    dbHelper.updateData(userModel, conditions, update, options, function (result) {
        callback(result);
    });
}
