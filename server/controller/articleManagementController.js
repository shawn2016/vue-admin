var dbHelper = require('../DBhelper/dbHelper');
var articleDao = require('../DBSql/articleDao');
var category_articleController = require('./category_articleController');
/**
 * 新增文章
 * @returns {Function}
 */
exports.articleAddAction = function () {
    return function (req, res) {
        let article = {
            articleTitle: req.body.articleTitle,
            status: req.body.status,
            userCode: req.body.userCode,
            tags: req.body.tags,
            content: req.body.content,
            abstract: req.body.abstract,
            userCode: req.body.userCode,
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
            // 添加文章与分类 关联关系
            for (let i = 0; i < req.body.category.length; i++) {
                category_articleController.category_articleAddAction({
                    articleId: result.body._id,
                    categoryId: req.body.category[i]
                })()
            }
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
            let params = {}
            console.log(conditions)
            if (conditions.params && conditions.params._id) {
                params = {
                    articleId: conditions.params._id
                }
            }
            // 查出文章的分类
            category_articleController.category_articleFindRefAction(params).then((resp) => {
                for (let j = 0; j < result.values.length; j++) {
                    for (let i = 0; i < resp.values.length; i++) {
                        if (String(resp.values[i].articleId) == String(result.values[j]._id)) {
                            if (req.body.edit) {
                                result.values[j].category.push(resp.values[i].categoryId._id)
                            } else {
                                result.values[j].category.push(resp.values[i].categoryId.categoryName)
                            }
                        }
                    }
                }
                res.json(result)
            }).catch((err) => {
                res.json(result)
                console.log(err)
            })
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
        console.log(conditions)
        articleDao.removeArticle(conditions, dbHelper, function (result) {
            // 删除表关联
            category_articleController.category_articleRemoveAction({
                articleId: req.body._id
            }).then((resp) => {
                res.json(result)
            }).catch((err) => {
                console.log(err)
                res.json(result)
            })
        })
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
                articleTitle: req.body.articleTitle,
                status: req.body.status,
                userCode: req.body.userCode,
                tags: req.body.tags,
                content: req.body.content,
                abstract: req.body.abstract,
                userCode: req.body.userCode,
                updateTime: +new Date()
            }
        }
        var options = {

        }//{upsert:false};

        articleDao.updateArticle(conditions, update, options, dbHelper, function (result) {
            // 删除表关联
            category_articleController.category_articleRemoveAction({
                articleId: req.body._id
            }).then((resp) => {
                for (let i = 0; i < req.body.category.length; i++) {
                    category_articleController.category_articleAddAction({
                        articleId: req.body._id,
                        categoryId: req.body.category[i]
                    })()
                }
            })
            res.json(result)
        });
    }
}
