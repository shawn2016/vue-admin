
//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
// 加工数据
const filterData = require('../../utils/filterData')
//引入数据模型模块
const Article = require("../../models/article");

// 文章列表
router.post("/list", (req, res) => {
    if (req.body && req.body.params && req.body.params.createTime && req.body.params.createTime[0]) {
        let createTime = {
            "$gte": req.body.params.createTime[0],
            "$lt": req.body.params.createTime[1]
        }
        req.body.params.createTime = createTime
    } else {
        delete (req.body.params.createTime)
    }
    if (req.body && req.body.params && req.body.params.articleTitle) {
        let articleTitle = {
            "$mod": req.body.params.articleTitle
        }
        req.body.params.articleTitle = articleTitle
    } else {
        delete (req.body.params.articleTitle)
    }
    Article.count(req.body.params, function (err, total) {
        if (err) {
            console.log(err)
            return
        }
        Article.find(req.body.params)
            .sort({ _id: -1 })
            .limit(req.body.pagenation.pageSize)
            .skip((req.body.pagenation.pageNo - 1) * req.body.pagenation.pageSize)
            .then(article => {
                var obj = filterData({
                    values: article,
                    pagenation: {
                        itemCount: total,
                        pageNo: req.body.pagenation.pageNo,
                        pageSize: req.body.pagenation.pageSize
                    }
                })
                res.json(obj)
            })
            .catch(err => {
                res.json(err);
            });
    });
});
// //更新文章
router.post("/update", (req, res) => {
    console.log(req.body.id)
    Article.findOneAndUpdate(
        { _id: req.body.id },
        {
            $set: {
                articleTitle: req.body.articleTitle,
                author: req.body.author,
                status: req.body.status,
                userCode: req.body.userCode,
                category: req.body.category,
                tags: req.body.tags,
                content: req.body.content,
                abstract: req.body.abstract,
                updateTime: +new Date()
            }
        },
        {
            new: true
        }
    )
        .then(user => {
            let obj = filterData({
                respMsg: "修改成功",
            })
            res.json(obj)
        })
        .catch(err => res.json(err));
});

//删除一篇文章
router.delete("/list/:id", (req, res) => {
    Article.findOneAndRemove({
        _id: req.params.id
    })
        .then(Article => {
            let obj = filterData({
                respMsg: "删除成功"
            })
            res.json(obj)
        })
        .catch(err => res.json(err));
});
// 新增文章
router.post("/create", function (req, res) {
    Article.create({
        articleTitle: req.body.articleTitle,
        author: req.body.author,
        status: req.body.status,
        userCode: req.body.userCode,
        category: req.body.category,
        tags: req.body.tags,
        content: req.body.content,
        abstract: req.body.abstract,
        createTime: +new Date(),
        updateTime: +new Date()
    }, function (err, doc) {
        if (err) {
            console.log(err)
            return false;
        }
        if (doc) {
            let obj = filterData({
                respMsg: "保存成功"
            })
            res.json(obj)
            return false;
        }
    })
})

// 获取当前文章的信息
router.post("/articleinfo", function (req, res) {
    Article.find({
        _id: req.body.id
    },
        function (err, doc) {
            if (err) {

                let obj = filterData({
                    respMsg: "文章不存在",
                    respCode: "900000"
                })
                res.json(obj)
                return false;
            }
            if (doc.length == 0) {
                let obj = filterData({
                    respMsg: "文章不存在",
                    respCode: "900000"
                })
                res.json(obj)
                return false;
            } else {
                let obj = filterData({
                    respMsg: "查询成功",
                    body: {
                        articleTitle: doc[0].articleTitle,
                        createTime: doc[0].createTime,
                        updateTime: doc[0].updateTime,
                        author: doc[0].author,
                        category: doc[0].category,
                        userCode: doc[0].userCode,
                        content: doc[0].content,
                        abstract: doc[0].abstract,
                        tags: doc[0].tags,
                        status: doc[0].status
                    }
                })
                res.json(obj)
            }

        })

})

module.exports = router;




















