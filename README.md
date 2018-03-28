# Vue-admin

这是一个不简单的全栈后台管理系统。

### 想法

做一个全栈项目，可以发表文章，管理评论、用户、标签、文章、添加图片等类似于wordpress的项目，主要是学习mongoose操作mongodb数据库，学习一对多，多对多关系设计。

由于工作量很大，将后期陆续完成。

主要功能有：

1. 首页 (一些文章新增，用户动态)
2. 文章管理（文章列表+新增文章）
3. 菜单管理（分配菜单）
4. 角色管理（暂时只有两种用户：管理员+一般用户）
5. 页面管理（后期新增一些模板，可以新增菜单链接相应页面）
6. 文章标签管理
7. 文章分类管理
8. 用户管理

### 技术栈

- [ ] vue2
- [ ] vuex
- [ ] axios
- [ ] vue-router
- [ ] express
- [ ] mongoose
- [ ] iview
- [ ] vue-echarts

### 效果

<p align="center">
<a href="https://github.com/shawn2016/vue-admin.git"><img src="https://github.com/shawn2016/vue-admin/blob/master/static/dashboard.png" /></a>
</p>

<p align="center">
<a href="https://github.com/shawn2016/vue-admin.git"><img src="https://github.com/shawn2016/vue-admin/blob/master/static/article.png" /></a>
</p>

<p align="center">
<a href="https://github.com/shawn2016/vue-admin.git"><img src="https://github.com/shawn2016/vue-admin/blob/master/static/addArticle.png" /></a>
</p>

<p align="center">
<a href="https://github.com/shawn2016/vue-admin.git"><img src="https://github.com/shawn2016/vue-admin/blob/master/static/updateArtilce.png" /></a>
</p>

### 下载&安装

``` bash
git clone https://github.com/shawn2016/vue-admin.git
cd vue-admin
npm i
```

### 运行

```
npm start
```

### 后台服务

先启动**mongodb**服务：https://www.cnblogs.com/wzlblog/p/6364045.html)

```
npm run server
```

### 目录说明

```js
.

├── README.md
├── app.js #启动文件
├── beizhu.md #字段说明
├── build #vue-cli
│   ├── build.js
│   ├── check-versions.js
│   ├── logo.png
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config
│   ├── db.js #mogodb地址
│   ├── dev.env.js
│   ├── index.js
│   ├── prod.env.js
│   └── test.env.js
├── index.html
├── package.json
├── router
│   └── index.js #路由分发
├── server #后台服务层
│   ├── DBhelper #公共sql方法
│   │   └── dbHelper.js
│   ├── DBsql #模型sql操作
│   │   ├── articleDao.js
│   │   ├── homeDao.js
│   │   ├── menuDao.js
│   │   ├── pageDao.js
│   │   ├── roleDao.js
│   │   └── userDao.js
│   ├── controller #mvc中C层，做逻辑处理
│   │   ├── articleManagementController.js
│   │   ├── homeManagementController.js
│   │   ├── menuManagementController.js
│   │   ├── pageManagementController.js
│   │   ├── roleManagementController.js
│   │   └── userManagementController.js
│   ├── models # mvc中m层，数据表模型
│   │   ├── article.js
│   │   ├── home.js
│   │   ├── menu.js
│   │   ├── page.js
│   │   ├── role.js
│   │   └── user.js
│   └── utils
│       ├── filterData.js # 返回格式处理
├── src #前台
│   ├── App.vue
│   ├── assets
│   │   └── styles
│   ├── components #公用组件
│   │   ├── breadcrumb.vue #面包屑
│   │   ├── bus.js #加载条
│   │   ├── editor.vue #富文本编辑器
│   │   ├── layout.vue #布局
│   │   └── navcontent.vue #导航条
│   ├── config
│   │   ├── env.js
│   │   ├── index.js
│   │   └── mUtils.js
│   ├── data # mock数据
│   │   ├── bar.js
│   │   ├── connect.js
│   │   ├── logo.js
│   │   ├── map.js
│   │   ├── pie.js
│   │   ├── polar.js
│   │   ├── scatter.js
│   │   └── theme.json
│   ├── favicon.ico
│   ├── filters #过滤器
│   │   ├── commonFilter.js
│   │   ├── date.js
│   │   └── index.js
│   ├── langs #富文本编辑器中文
│   │   └── zh_CN.js
│   ├── libs #请求方法与配置
│   │   ├── baseUrl.js
│   │   ├── fetch.js
│   │   ├── tree
│   │   └── util.js
│   ├── main.js
│   ├── pages #所有页面
│   │   ├── articleManage #文章管理
│   │   ├── home #首页
│   │   ├── login # 登陆 注册 重置密码
│   │   ├── menuManage #菜单管理
│   │   ├── pageManage #页面管理
│   │   ├── roleManage #角色管理
│   │   └── userManage #用户管理
│   ├── router #vue路由
│   │   └── index.js
│   ├── service #所有请求由这里发出
│   │   ├── getData.js
│   │   └── randomWord.js
│   ├── skins #富文本编辑器
│   │   └── lightgray
│   └── store #vuex
│       ├── action.js
│       ├── getters.js
│       ├── index.js
│       ├── mutation-types.js
│       └── mutations.js
├── static #静态资源
│   ├── addArticle.png
│   ├── article.png
│   ├── dashboard.png
│   └── updateArtilce.png
├── test 
    └── unit
        ├── jest.conf.js
        ├── setup.js
        └── specs

```

### tree 目录生成命令

```
tree -L 3 -I "node_modules"

brew install tree  ||  apt-get install tree

- tree -d 只显示文件夹；
- tree -L n 显示项目的层级。n表示层级数。比如想要显示项目三层结构，可以用tree -l 3；
- tree -I pattern 用于过滤不想要显示的文件或者文件夹。比如你想要过滤项目中的node_modules文件夹，可以使用tree -I "node_modules"；
- tree > tree.md 将项目结构输出到tree.md这个文件。

```

### License

Licensed under the MIT License.