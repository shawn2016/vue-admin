var dbHelper = require('../DBhelper/dbHelper');
var userDao = require('../DBSql/userDao');
const filterData = require('../utils/filterData')

/**
 * 新增用户
 * @returns {Function}
 */
exports.userAddAction = function () {
    return function (req, res) {
        let user = {
            userCode: req.body.userCode,
            userName: req.body.userName,
            identifyNo: req.body.identifyNo,
            refUserRoleCode: req.body.refUserRoleCode,
            status: req.body.status,
            userDuty: req.body.userDuty,
            phonenum: req.body.phonenum,
            createTime: +new Date(),
            updateTime: +new Date(),
            desc: req.body.desc,
            password: req.body.password
        }
        let options = {
            params: {
                "userCode": req.body.userCode,
            },
            errorRespMsg: '用户已存在'
        }
        userDao.addUser(user, dbHelper, options, function (result) {
            if (result.respCode === '000000') {
                let respMsg
                if (req.body.userName) {
                    respMsg = "保存成功"
                } else {
                    respMsg = "注册成功,即将登录..."
                }
                result = filterData({
                    respMsg,
                    body: {
                        userCode: req.body.userCode
                    }
                })
            }
            res.json(result);
        });
    }
}


/**
 * 获取用户列表
 * @returns {Function}
 */
exports.userFindAction = function () {
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
        userDao.findUser(conditions, dbHelper, function (result) {
            res.json(result)
        });
    }
}

/**
 *  删除用户
 * @returns {Function}
 */
exports.userRemoveAction = function () {
    return function (req, res) {
        var conditions = req.body;
        userDao.removeUser(conditions, dbHelper, function (result) {
            res.json(result);
        });
    }
}
/**
 *  更新用户信息
 * @returns {Function}
 */
exports.userUpdateAction = function () {
    return function (req, res) {
        var conditions = {
            userCode: req.body.userCode
        };
        var update = {
            $set: {
                userCode: req.body.userCode,
                userName: req.body.userName,
                identifyNo: req.body.identifyNo,
                refUserRoleCode: req.body.refUserRoleCode,
                status: req.body.status,
                userDuty: req.body.userDuty,
                phonenum: req.body.phonenum,
                updateTime: +new Date(),
                desc: req.body.desc,
                password: req.body.password,
            }
        }
        var options = {
            new: true
        }
        userDao.updateUser(conditions, update, options, dbHelper, function (result) {
            if (result.respCode === '000000') {
                result = filterData({
                    respMsg: '修改成功',
                    body: {
                        userCode: conditions.userCode
                    }
                })
            }
            res.json(result);
        });
    }
}
