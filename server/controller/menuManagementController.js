var dbHelper = require('../DBhelper/dbHelper');
var menuDao = require('../DBSql/menuDao');
const filterData = require('../utils/filterData')

/**
 * 新增菜单
 * @returns {Function}
 */
exports.menuAddAction = function () {
    return function (req, res) {
        let menu = {
            icon: req.body.icon,
            menuId: req.body.menuId,
            menuLevel: req.body.menuLevel,
            menuName: req.body.menuName,
            platType: req.body.platType,
            pmenuId: req.body.pmenuId,
            remark: req.body.remark,
            url: req.body.url,
            userCode:req.body.userCode,
            createTime: req.body.createTime,
            updateTime: req.body.updateTime
        }
        let options = {
            params: {
                "menuId": req.body.menuId,
            },
            errorRespMsg: '菜单已存在'
        }
        menuDao.addMenu(menu, dbHelper, options, function (result) {
            res.json(result);
        });
    }
}


/**
 * 获取菜单列表
 * @returns {Function}
 */
exports.menuFindAction = function () {
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
        menuDao.findMenu(conditions, dbHelper, function (result) {
            res.json(result)
        });
    }
}

/**
 *  删除菜单
 * @returns {Function}
 */
exports.menuRemoveAction = function () {
    return function (req, res) {
        var conditions = req.body;
        menuDao.removeMenu(conditions, dbHelper, function (result) {
            res.json(result);
        });
    }
}
/**
 *  更新菜单信息
 * @returns {Function}
 */
exports.menuUpdateAction = function () {
    return function (req, res) {
        var conditions = {
            menuCode: req.body.menuCode
        };
        var update = {
            $set: {
                menuCode: req.body.menuCode,
                menuName: req.body.menuName,
                identifyNo: req.body.identifyNo,
                refmenuRoleCode: req.body.refmenuRoleCode,
                status: req.body.status,
                menuDuty: req.body.menuDuty,
                phonenum: req.body.phonenum,
                updateTime: +new Date(),
                desc: req.body.desc,
                password: req.body.password,
            }
        }
        var options = {
            new: true
        }
        menuDao.updateMenu(conditions, update, options, dbHelper, function (result) {
            if (result.respCode === '000000') {
                result = filterData({
                    respMsg: '修改成功',
                    body: {
                        menuCode: conditions.menuCode
                    }
                })
            }
            res.json(result);
        });
    }
}
