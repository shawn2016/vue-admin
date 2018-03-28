# vue-test

> A Vue.js project

所属平台

前台：100

后台：200

菜单级别：

一级：100

二级：200

后期考虑：

1. session
2. cookie



routes：路由分发

controller：mvc中C层，做逻辑处理

models：mvc中m层，数据表模型

DBsql：模型sql操作

DBhelper：公共sql方法

主菜单：

首页：

1. 最新文章，文章数，文章标题
2. 最新评论10条，总评价数
3. 文章数，文章标题

菜单管理

1. 新增菜单
2. 修改菜单
3. 增删改查

角色管理

1. 新增菜单
2. 修改菜单
3. 增删改查

文章管理

1. 新增文章
2. 修改文章
3. 文章列表(管理员all，user->自己)
4. 增删改查

### 功能添加

1. 返回菜单（根据角色）
2. 用户信息
3. 修改密码
4. 添加角色管理
5. 用户发表文章
6. 管理文章
7. 安全退出

### 加工数据

```
/*@方法名 filterData 
* @参数 obj {
* res 返回结果 必传
* respCode 返回码 默认："000000" 
* respMsg 返回信息 默认："处理成功" 
* }
*/
例如：
filterData(obj){

}
```



### 定义一些码值：

```
000000	处理成功		
900000	处理失败		处理失败
900001	签名校验失败		系统异常，请稍后重试或联系客服人员
900002	报文格式非法		系统异常，请稍后重试或联系客服人员
900003	用户鉴权失败		暂未开通权限，请联系管理员
900004	参数校验失败		系统异常，请稍后重试或联系客服人员
900005	TOKEN鉴权失败		由于您长时间未登录或在其他浏览器上登录，请重新登录
900006	图片验证码已过期		验证码已过期，请重新获取
900007	图片验证码不正确		验证码不正确，请重新输入
900008	短信验证码已过期		验证码已过期，请重新获取
900009	短信验证码不正确		验证码不正确，请重新输入
900010	UKey验证参数为空		Ukey验证失败，请联系管理员或客服人员
900011	UKey验证失败		Ukey与账号不符，请核对
900012	触发60秒一次		申请过于频繁，请1分钟后再试
900013	触发一天N次		获取的次数过于频繁，请明天再试
900014	短信发送异常		发送短信失败，请稍后重试
999999	系统异常		系统异常，请稍后重试或联系客服人员系统异常
```

### 效果
<p align="center">
<a href="https://github.com/shawn2016/vue-admin.git"><img src="https://github.com/shawn2016/vue-admin/blob/master/static/dashboard.png" /></a>
</p>

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
