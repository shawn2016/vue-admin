var category_article = require('../models/category_article');
var category = require('../models/category');
var article = require('../models/article');

/** 
 * add Category_article 
 * @param conditions 
 * @param dbHelper 
 * @param callback 
 */
exports.addCategory_article = function (conditions, dbHelper, callback) {


    var category_articleModel = category_article.getModel();
    let options = {
        isNotOne: true
    }
    dbHelper.addData(category_articleModel, conditions, options, function (result) {
        callback(result);
    });


}

/** 
 * find Category_article 非Ref 
 * @param conditions 
 * @param dbHelper 
 * @param callback 
 */
exports.findCategory_article = function (conditions, dbHelper, callback) {

    var category_articleModel = category_article.getModel();
    var conditions = conditions;
    var fields = {};
    var options = {};
    dbHelper.findData(category_articleModel, conditions, fields, options, function (result) {
        callback(result);
    });

}

/** 
 * find Category_article 是Ref 
 * @param conditions 
 * @param path         需要被填充的字段 
 * @param dbHelper 
 * @param callback 
 */
exports.findCategory_articleRef = function (conditions, path, dbHelper, callback) {
    var category_articleModel = category_article.getModel();
    var path = path;
    var fields = { __v: 0 };
    var options = { sort: { _id: 1 } };
    var refmodel1 = article.getModel();
    var refmodel2 = category.getModel();
    dbHelper.findDataPopulation(category_articleModel, conditions, path, fields, {}, options, function (result) {
        callback(result);
    });
}

/** 
 * remove Category_article 
 * @param conditions 
 * @param dbHelper 
 * @param callback 
 */
exports.removeCategory_article = function (conditions, dbHelper, callback) {
    var category_articleModel = category_article.getModel();
    dbHelper.removeData(category_articleModel, conditions, function (result) {
        callback(result);
    });
}