
//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
//引入数据模型模块
const Hero = require("../../models/user");
function filterStatus(obj) {
    let data = {}
    // table
    if (obj && obj.type === 'table') {
        data = {
            respCode: "000000",
            respMsg: "查询成功",
            values: obj.data,
            pagenation: {
                itemCount: 8,
                pageCount: 1,
                pageNo: 1,
                pageSize: 10
            }
        }
        // 删除
    } else if (obj && obj.type === 'delete') {
        data = {
            respCode: "000000",
            respMsg: "删除成功"
        }
    }
    return obj.res.json(data);
}
// 查询所有英雄信息路由
router.get("/list", (req, res) => {
    Hero.find({})
        .sort({ update_at: -1 })
        .then(user => {
            filterStatus({
                res,
                data: user,
                pagenation: {},
                type: "table",
                status: "SUCCESS"
            })
        })
        .catch(err => {
            res.json(err);
        });
});

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
            filterStatus({
                res,
                type: "delete",
                status: "SUCCESS"
            })
        })
        .catch(err => res.json(err));
});

module.exports = router;




















