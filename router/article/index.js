
//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
// 加工数据
const filterData = require('../../utils/filterData')
//引入数据模型模块
const Article = require("../../models/article");

// 查询所有英雄信息路由
// 上例将查询结果按时间倒序，因为 MongoDB 的 _id 生成算法中已经包含了当前的时间，所以这样写不仅没问题，也是推荐的按时间排序的写法。
router.post("/list", (req, res) => {
    if (req.body && req.body.createTime && req.body.createTime[0]) {
        let createTime = {
            "$gte": req.body.createTime[0],
            "$lt": req.body.createTime[1]
        }
        req.body.createTime = createTime
    } else {
        delete (req.body.createTime)
    }
    if (req.body && req.body.articleTitle) {
        let articleTitle = {
            "$mod": req.body.articleTitle
        }
        req.body.articleTitle = articleTitle
    } else {
        delete (req.body.articleTitle)
    }
    Article.find(req.body)
        .sort({ _id: -1 })
        .limit(10)
        .then(user => {
            var obj = filterData({
                values: user,
                pagenation: {}
            })
            res.json(obj)
        })
        .catch(err => {
            res.json(err);
        });
});

// 分页


// // 通过ObjectId查询单个英雄信息路由
// router.get("/list/:id", (req, res) => {
//     Article.findById(req.params.id)
//         .then(Article => {
//             res.json(Article);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });

// //更新一条英雄信息数据路由
router.post("/update", (req, res) => {
    console.log(req.body)
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

// // 添加图片路由
// router.put("/addpic/:id", (req, res) => {
//     Article.findOneAndUpdate(
//         { _id: req.params.id },
//         {
//             $push: {
//                 imgArr: req.body.url
//             }
//         },
//         {
//             new: true
//         }
//     )
//         .then(Article => res.json(Article))
//         .catch(err => res.json(err));
// });

//删除一条用户信息
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
// 登录
router.post("/login", function (req, res) {
    Article.find({
        "userCode": req.body.userCode,
        "password": req.body.password
    },
        function (err, doc) {
            if (err) {

                let obj = filterData({
                    respMsg: "用户名或密码错误",
                    respCode: "900000"
                })
                res.json(obj)
                return false;
            }
            if (doc.length == 0) {
                let obj = filterData({
                    respMsg: "用户名或密码错误",
                    respCode: "900000"
                })
                res.json(obj)
                return false;
            } else {
                let obj = filterData({
                    respMsg: "登录成功",
                    body: {
                        userName: doc[0].userName,
                        userCode: doc[0].userCode,
                        refUserRoleCode: doc[0].refUserRoleCode
                    }
                })
                res.json(obj)
            }

        })

})
// 获取当前用户信息
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




















