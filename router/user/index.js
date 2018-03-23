
//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
// 加工数据
const filterData = require('../../utils/filterData')
//引入数据模型模块
const Hero = require("../../models/user");

// 查询所有英雄信息路由
// 上例将查询结果按时间倒序，因为 MongoDB 的 _id 生成算法中已经包含了当前的时间，所以这样写不仅没问题，也是推荐的按时间排序的写法。
router.post("/list", (req, res) => {
    if (req.body && req.body.createTime) {
        let createTime = {
            "$gte": req.body.createTime[0],
            "$lt": req.body.createTime[1]
        }
        req.body.createTime = createTime
    }
    console.log(req.body)
    Hero.find(req.body)
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


// 通过ObjectId查询单个英雄信息路由
router.get("/list/:id", (req, res) => {
    Hero.findById(req.params.id)
        .then(hero => {
            res.json(hero);
        })
        .catch(err => {
            res.json(err);
        });
});

// 添加一个英雄信息路由
router.post("/list", (req, res) => {
    //使用Hero model上的create方法储存数据
    Hero.create(req.body, (err, hero) => {
        if (err) {
            res.json(err);
        } else {
            res.json(hero);
        }
    });
});

//更新一条英雄信息数据路由
router.put("/list/:id", (req, res) => {
    Hero.findOneAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                name: req.body.name,
                age: req.body.age,
                sex: req.body.sex,
                address: req.body.address,
                dowhat: req.body.dowhat,
                favourite: req.body.favourite,
                explain: req.body.explain
            }
        },
        {
            new: true
        }
    )
        .then(hero => res.json(hero))
        .catch(err => res.json(err));
});

// 添加图片路由
router.put("/addpic/:id", (req, res) => {
    Hero.findOneAndUpdate(
        { _id: req.params.id },
        {
            $push: {
                imgArr: req.body.url
            }
        },
        {
            new: true
        }
    )
        .then(hero => res.json(hero))
        .catch(err => res.json(err));
});

//删除一条用户信息
router.delete("/list/:id", (req, res) => {
    Hero.findOneAndRemove({
        _id: req.params.id
    })
        .then(hero => {
            let obj = filterData({
                resMsg: "删除成功"
            })
            res.json(obj)
        })
        .catch(err => res.json(err));
});

router.post("/create", function (req, res) {
    Hero.findOne({ "userCode": req.body.userCode }, function (err, doc) {
        if (doc) {
            let obj = filterData({
                respCode: "900000",
                respMsg: "用户已存在"
            })
            res.json(obj)
            return false;
        }
        Hero.create({
            userCode: req.body.userCode,
            userName: req.body.userName,
            identifyNo: req.body.identifyNo,
            refUserRoleCode: req.body.refUserRoleCode,
            status: req.body.status,
            userDuty: req.body.userDuty,
            phonenum: req.body.phonenum,
            createTime: req.body.createTime,
            updateTime: req.body.updateTime,
            desc: req.body.desc,
            password: req.body.password,
        }, function (err, doc) {
            if (err) {
                console.log(err)
                return false;
            }
            if (doc) {
                let obj = filterData({
                    respMsg: "注册成功"
                })
                res.json(obj)
                return false;
            }

        })
    })
})

router.post("/login", function (req, res) {
    Hero.find({
        "userCode": req.body.userCode,
        "password": req.body.password
    },
        function (err, doc) {
            console.log(doc)

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
                    respMsg: "登录成功"
                })
                res.json(obj)
            }

        })

})

module.exports = router;




















