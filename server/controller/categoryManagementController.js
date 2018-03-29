var dbHelper = require('../DBhelper/dbHelper');
var categoryDao = require('../DBSql/categoryDao');
const filterData = require('../utils/filterData')

/**
 * 新增分类
 * @returns {Function}
 */
exports.categoryAddAction = function () {
    return function (req, res) {
        let category = {
            categoryCode: req.body.categoryCode,
            categoryName: req.body.categoryName,
            userCode: req.body.userCode,
            createTime: +new Date(),
            updateTime: +new Date(),
            desc: req.body.desc
        }
        let options = {
            params: {
                "categoryName": req.body.categoryName,
                "userCode": req.body.userCode
            },
            errorRespMsg: '分类已存在'
        }
        categoryDao.addCategory(category, dbHelper, options, function (result) {
            if (result.respCode === '000000') {
                let respMsg
                if (req.body.categoryName) {
                    respMsg = "保存成功"
                } else {
                    respMsg = "注册成功,即将登录..."
                }
                result = filterData({
                    respMsg,
                    body: {
                        categoryCode: req.body.categoryCode
                    }
                })
            }
            res.json(result);
        });
    }
}


/**
 * 获取分类列表
 * @returns {Function}
 */
exports.categoryFindAction = function () {
    return function (req, res) {
        let conditions = {};
        // 处理时间数组
        if (req.body && req.body.params && req.body.params.createTime && req.body.params.createTime[0]) {
            let createTime = {
                "$gte": req.body.params.createTime[0],
                "$lt": req.body.params.createTime[1]
            }
            req.body.params.createTime = createTime
        } else if (req.body.params && req.body.params.createTime) {
            delete (req.body.params.createTime)
        }
        // 赋值
        conditions = req.body
        categoryDao.findCategory(conditions, dbHelper, function (result) {
            res.json(result)
        });
    }
}

/**
 *  删除分类
 * @returns {Function}
 */
exports.categoryRemoveAction = function () {
    return function (req, res) {
        var conditions = req.body;
        categoryDao.removeCategory(conditions, dbHelper, function (result) {
            res.json(result);
        });
    }
}
/**
 *  更新分类信息
 * @returns {Function}
 */
exports.categoryUpdateAction = function () {
    return function (req, res) {
        var conditions = {
            categoryCode: req.body.categoryCode
        };
        var update = {
            $set: {
                categoryCode: req.body.categoryCode,
                categoryName: req.body.categoryName,
                identifyNo: req.body.identifyNo,
                refCategoryRoleCode: req.body.refCategoryRoleCode,
                status: req.body.status,
                categoryDuty: req.body.categoryDuty,
                phonenum: req.body.phonenum,
                updateTime: +new Date(),
                desc: req.body.desc,
                password: req.body.password,
            }
        }
        var options = {
            new: true
        }
        categoryDao.updateCategory(conditions, update, options, dbHelper, function (result) {
            if (result.respCode === '000000') {
                result = filterData({
                    respMsg: '修改成功',
                    body: {
                        categoryCode: conditions.categoryCode
                    }
                })
            }
            res.json(result);
        });
    }
}
