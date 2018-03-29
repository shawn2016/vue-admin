
//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
// 加工数据
const filterData = require('../../utils/filterData')
//引入数据模型模块
const User = require("../../models/user");
// 用户列表
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
    User.count(req.body.params, function (err, total) {
        if (err) {
            console.log(err)
            return
        }
        User.find(req.body.params)
            .sort({ _id: -1 })
            .limit(req.body.pagenation.pageSize)
            .skip((req.body.pagenation.pageNo - 1) * req.body.pagenation.pageSize)
            .then(user => {
                var obj = filterData({
                    values: user,
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
// 修改用户信息
router.post("/update", (req, res) => {
    User.findOneAndUpdate(
        { userCode: req.body.userCode },
        {
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
        },
        {
            new: true
        }
    )
        .then(user => {
            let obj = filterData({
                respMsg: "修改成功",
                body: {
                    userCode: req.body.userCode
                }
            })
            res.json(obj)
        })
        .catch(err => res.json(err));
});
//删除一条用户信息
router.delete("/list/:id", (req, res) => {
    User.findOneAndRemove({
        _id: req.params.id
    })
        .then(user => {
            let obj = filterData({
                respMsg: "删除成功"
            })
            res.json(obj)
        })
        .catch(err => res.json(err));
});
// 新增用户&注册用户
router.post("/create", function (req, res) {
    User.findOne({ "userCode": req.body.userCode }, function (err, doc) {
        if (doc) {
            let obj = filterData({
                respCode: "900000",
                respMsg: "用户已存在"
            })
            res.json(obj)
            return false;
        }
        User.create({
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
            password: req.body.password,
        }, function (err, doc) {
            if (err) {
                console.log(err)
                return false;
            }
            if (doc) {
                let respMsg
                if (req.body.userName) {
                    respMsg = "保存成功"
                } else {
                    respMsg = "注册成功,即将登录..."
                }
                let obj = filterData({
                    respMsg,
                    body: {
                        userCode: req.body.userCode
                    }
                })
                res.json(obj)
                return false;
            }

        })
    })
})
// 登录
router.post("/login", function (req, res) {
    User.find({
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
router.post("/userinfo", function (req, res) {
    User.find({
        "userCode": req.body.userCode
    },
        function (err, doc) {
            if (err) {

                let obj = filterData({
                    respMsg: "用户不存在",
                    respCode: "900000"
                })
                res.json(obj)
                return false;
            }
            if (doc.length == 0) {
                let obj = filterData({
                    respMsg: "用户不存在",
                    respCode: "900000"
                })
                res.json(obj)
                return false;
            } else {
                let obj = filterData({
                    respMsg: "查询成功",
                    body: {
                        userName: doc[0].userName,
                        userCode: doc[0].userCode,
                        identifyNo: doc[0].identifyNo,
                        refUserRoleCode: doc[0].refUserRoleCode,
                        status: doc[0].status,
                        createTime: doc[0].createTime,
                        updateTime: doc[0].updateTime,
                        userDuty: doc[0].userDuty,
                        desc: doc[0].desc,
                        phonenum: doc[0].phonenum
                    }
                })
                res.json(obj)
            }

        })

})

module.exports = router;




















