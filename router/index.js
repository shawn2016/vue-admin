
var express = require('express');
var router = express.Router();

var userManagementController = require('../server/controller/userManagementController');
var articleManagementController = require('../server/controller/articleManagementController');
var menuManagementController = require('../server/controller/menuManagementController');
var categoryManagementController = require('../server/controller/categoryManagementController');

// var schoolClassManagermentController = require('../server/controller/schoolClassManagermentController');
// var user_schoolClassController = require('../server/controller/user_schoolClassController');

/**
 * 用户管理
 */
router.post('/user/create',userManagementController.userAddAction());
router.post('/user/list',userManagementController.userFindAction());
router.post('/user/remove',userManagementController.userRemoveAction());
router.post('/user/update',userManagementController.userUpdateAction());
//router.get('/resetPass',userManagementController.resetPass());

/**
 * 文章管理
 */
router.post('/article/create',articleManagementController.articleAddAction());
router.post('/article/list',articleManagementController.articleFindAction());
router.post('/article/remove',articleManagementController.articleRemoveAction());
router.post('/article/update',articleManagementController.articleUpdateAction());
//router.get('/resetPass',articleManagementController.resetPass());

/**
 * 菜单管理
 */
router.post('/menu/create',menuManagementController.menuAddAction());
router.post('/menu/list',menuManagementController.menuFindAction());
router.post('/menu/remove',menuManagementController.menuRemoveAction());
router.post('/menu/update',menuManagementController.menuUpdateAction());
//router.get('/resetPass',menuManagementController.resetPass());

/**
 * 分类管理
 */
router.post('/category/create',categoryManagementController.categoryAddAction());
router.post('/category/list',categoryManagementController.categoryFindAction());
router.post('/category/remove',categoryManagementController.categoryRemoveAction());
router.post('/category/update',categoryManagementController.categoryUpdateAction());
//router.get('/resetPass',menuManagementController.resetPass());


/**
 * schoolClass Managerment
 */
//router.post('/schoolClassUpdateAction',schoolClassManagermentController.schoolClassUpdateAction());
// router.get('/schoolClassFindAction',schoolClassManagermentController.schoolClassFindAction());
// router.get('/schoolClassAddAction',schoolClassManagermentController.schoolClassAddAction());
// //router.post('/schoolClassRemoveAction',schoolClassManagermentController.schoolClassRemoveAction());
// //router.get('/schoolClassDistinctFindAction',schoolClassManagermentController.schoolClassDistinctFindAction());
// //router.get('/schoolClassDistinctFindAction',schoolClassManagermentController.schoolClassDistinctFindAction());

// router.get('/user_schoolClassAddAction',user_schoolClassController.user_schoolClassAddAction());
// router.get('/user_schoolClassFindRefAction',user_schoolClassController.user_schoolClassFindRefAction());
// router.get('/user_schoolClassFindAction',user_schoolClassController.user_schoolClassFindAction());


module.exports = router;