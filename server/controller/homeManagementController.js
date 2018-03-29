var dbHelper = require('../DBhelper/dbHelper');
var articleDao = require('../DBSql/articleDao');
/**
 * 新增文章
 * @returns {Function}
 */
exports.articleAddAction = function () {
    return function (req, res) {
        let article = {
            articleTitle: req.body.articleTitle,
            userCode: req.body.userCode,
            status: req.body.status,
            userCode: req.body.userCode,
            category: req.body.category,
            tags: req.body.tags,
            content: req.body.content,
            abstract: req.body.abstract,
            createTime: +new Date(),
            updateTime: +new Date()
        }
        let options = {
            // 以后可以限制文章发表标题或者其他的条件 防止重复
            params: {
                _id: '2',
            },
            errorRespMsg: '文章已存在'
        }
        articleDao.addArticle(article, dbHelper, options, function (result) {
            res.json(result);
        });
    }
}


/**
 * 获取文章列表
 * @returns {Function}
 */
exports.articleFindAction = function () {
    return function (req, res) {
        let conditions = {};
        // 处理时间数组
        if (req.body && req.body.params && req.body.params.createTime && req.body.params.createTime[0]) {
            let createTime = {
                "$gte": req.body.params.createTime[0],
                "$lt": req.body.params.createTime[1]
            }
            req.body.params.createTime = createTime
        } else {
            delete (req.body.params.createTime)
        }
        // 赋值
        conditions = req.body
        articleDao.findArticle(conditions, dbHelper, function (result) {
            res.json(result)
        });
    }
}

/**
 * 删除文章
 * @returns {Function}
 */
exports.articleRemoveAction = function () {
    return function (req, res) {
        var conditions = req.body;
        articleDao.removeArticle(conditions, dbHelper, function (result) {
            res.json(result);
        });
    }
}
/**
 * 更新文章信息
 * @returns {Function}
 */
exports.articleUpdateAction = function () {
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
        }//{upsert:false};

        articleDao.updateArticle(conditions, update, options, dbHelper, function (result) {
            res.json(result);
        });
        //????????????update user_schoolClass???userid ?scoolClassId
    }
}
