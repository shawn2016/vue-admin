var menu = require('../models/menu');

/**
 * 新增菜单
 * @returns {Function}
 */
exports.addMenu = function (conditions, dbHelper, options, callback) {
    var menuModel = menu.getModel();
    dbHelper.addData(menuModel, conditions, options, function (result) {
        callback(result);
    });
};
/**
 * 查找菜单
 * @param conditions
 * @param dbHelper
 * @param callback
 */
exports.findMenu = function (conditions, dbHelper, callback) {
    var menuModel = menu.getModel();
    var fields = {};
    var options = {};
    if (conditions.pagenation) {
        options = {
            sort: { _id: -1 },
            limit: conditions.pagenation.pageSize,
            skip: (conditions.pagenation.pageNo - 1) * conditions.pagenation.pageSize
        }
    }
    dbHelper.findData(menuModel, conditions, fields, options, function (result) {
        callback(result);
    });

}

/**
 * 删除菜单
 * @param conditions
 * @param dbHelper
 * @param callback
 */
exports.removeMenu = function (conditions, dbHelper, callback) {
    var menuModel = menu.getModel();
    dbHelper.removeData(menuModel, conditions, function (result) {
        callback(result);
    });
}

/**
 * 更新菜单信息
 * @param conditions
 * @param update
 * @param options
 * @param dbHelper
 * @param callback
 */
exports.updateMenu = function (conditions, update, options, dbHelper, callback) {
    var menuModel = menu.getModel();
    dbHelper.updateData(menuModel, conditions, update, options, function (result) {
        callback(result);
    });
}
