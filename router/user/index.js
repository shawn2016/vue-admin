
//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
// 加工数据
const filterData = require('../../utils/filterData')
//引入数据模型模块
const Hero = require("../../models/user");

// 查询所有英雄信息路由
router.get("/list", (req, res) => {
    Hero.find({})
        .sort({ _id: -1 })
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

//删除一条英雄信息路由
router.delete("/list/:id", (req, res) => {
    console.log(req.params.id)
    Hero.findOneAndRemove({
        _id: req.params.id
    })
        .then(hero => {
            console.log(hero)
            filterData({
                res
            })
        })
        .catch(err => res.json(err));
});

router.post("/create", function (req, res) {
    Hero.findOne({ "user": req.body.userCode }, function (err, doc) {
        if (doc) {
            filterData({
                res,
                respCode: "900000",
                respMsg: "用户已存在"
            })
            return false;
        }
        Hero.create({
            name: req.body.name,
            userCode: req.body.userCode,
            userName: req.body.userName,
            identifyNo: req.body.identifyNo,
            refUserRoleCode: req.body.refUserRoleCode,
            status: req.body.status,
            userDuty: req.body.userDuty,
            createTime: +new Date,
            password: req.body.password,
        }, function (err, doc) {
            if (err) {
                console.log(err)
                return false;
            }
            if (doc) {
                filterData({
                    res
                })
                return false;
            }

        })
    })
})

module.exports = router;




















