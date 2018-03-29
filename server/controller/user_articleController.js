var dbHelper = require('../DBhelper/dbHelper');
var user_articleDao = require('../DBSql/user_articleDao');
/**  
 * add user_article  
 * @returns {Function}  
 */
exports.user_articleAddAction = function (user_article) {
    return function (req, res) {
        //中间表将增加user与article关联  
        user_articleDao.addUser_article(user_article, dbHelper, function (result) {
            res.json(result);
        });




    }
}  