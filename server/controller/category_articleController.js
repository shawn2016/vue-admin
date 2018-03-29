var dbHelper = require('../DBhelper/dbHelper');
var category_articleDao = require('../DBSql/category_articleDao');
/**  
 * add category_article  
 * @returns {Function}  
 */
exports.category_articleAddAction = function (category_article) {
    return function (req, res) {
        //中间表将增加category与article关联  
        category_articleDao.addCategory_article(category_article, dbHelper, function (result) {
            // res.json(result);
        });
    }
}

/**  
 * 查找方法，不关联查找  
 * category_article find  
 * @returns {Function}  
 */
exports.category_articleFindAction = function () {
    return function (req, res) {

        var conditions = {};
        category_articleDao.findCategory_article(conditions, dbHelper, function (result) {
            res.json(result);

        });
    }
}

/**  
 * 关联查找  
 * category_article find Ref  
 * @returns {Function}  
 */
exports.category_articleFindRefAction = function (conditions) {
    return new Promise((resolve, reject) => {
        //用空格隔开要被填充的字段  
        var path = "categoryId"
        category_articleDao.findCategory_articleRef(conditions, path, dbHelper, function (result) {
            resolve(result)
        });
    })
}

exports.category_articleUpdateAction = function (conditions, update, options) {
    return new Promise((resolve, reject) => {
        //用空格隔开要被填充的字段  
        // var conditions = {};//{_id:xxx};
        // var update = {};//{$set : {_id:xxx}};
        // var options = {};//{upsert:false}
        category_articleDao.updateCategory_article(conditions, update, options, dbHelper, function (result) {
            resolve(result)
        });
    })
}

exports.category_articleRemoveAction = function (conditions) {
    return new Promise((resolve, reject) => {
        category_articleDao.removeCategory_article(conditions, dbHelper, function (result) {
            resolve(result)
        });
    })
}
