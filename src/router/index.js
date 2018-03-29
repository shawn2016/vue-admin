const routers = {
  common: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login/login'),
      meta: {
        title: '登录'
      }
    },
    { path: '*', redirect: '/home/home' }
  ],
  home: [
    {
      path: '/home/home',
      name: 'home',
      component: () => import('@/pages/home/home'),
      meta: {
        title: '概览'
      }
    }
  ],
  articleManage: [{
    path: '/articleManage/articleList',
    name: 'articleList',
    component: () => import('@/pages/articleManage/articleList'),
    meta: {
      title: '文章列表'
    }
  }, {
    path: '/articleManage/editArticle',
    name: 'editArticle',
    component: () => import('@/pages/articleManage/editArticle'),
    meta: {
      title: '新增文章'
    }
  }, {
    path: '/articleManage/articleDesc',
    name: 'articleDesc',
    show: 'false',
    component: () => import('@/pages/articleManage/articleDesc'),
    meta: {
      title: '文章详情'
    }
  }],
  menuManage: [{
    path: '/menuManage/menuList',
    name: 'menuList',
    component: () => import('@/pages/menuManage/menuList'),
    meta: {
      title: '菜单列表'
    }
  }, {
    path: '/menuManage/addMenu',
    name: 'addMenu',
    component: () => import('@/pages/menuManage/addMenu'),
    meta: {
      title: '新增菜单'
    }
  }, {
    path: '/menuManage/menuList/menuDesc',
    name: 'menuDesc',
    component: () => import('@/pages/menuManage/menuDesc'),
    show: 'false',
    meta: {
      title: '菜单详情'
    }
  }],
  roleManage: [{
    path: '/roleManage/roleList',
    name: 'roleList',
    component: () => import('@/pages/roleManage/roleList'),
    meta: {
      title: '角色列表'
    }
  }, {
    path: '/roleManage/addRole',
    name: 'addRole',
    component: () => import('@/pages/roleManage/addRole'),
    meta: {
      title: '新增角色'
    }
  }, {
    path: '/roleManage/roleList/roleDesc',
    name: 'roleDesc',
    component: () => import('@/pages/roleManage/roleDesc'),
    show: 'false',
    meta: {
      title: '角色详情'
    }
  }],
  pageManage: [{
    path: '/pageManage/pageList',
    name: 'pageList',
    component: () => import('@/pages/pageManage/pageList'),
    meta: {
      title: '页面列表'
    }
  }, {
    path: '/pageManage/addPage',
    name: 'addPage',
    component: () => import('@/pages/pageManage/addPage'),
    meta: {
      title: '新增页面'
    }
  }],
  userManage: [{
    path: '/userManage/userList',
    name: 'userList',
    component: () => import('@/pages/userManage/userList'),
    meta: {
      title: '用户列表'
    }
  }, {
    path: '/userManage/addUser',
    name: 'addUser',
    component: () => import('@/pages/userManage/addUser'),
    meta: {
      title: '新增用户'
    }
  }, {
    path: '/userManage/userList/userDesc',
    name: 'userDesc',
    component: () => import('@/pages/userManage/userDesc'),
    show: 'false',
    meta: {
      title: '用户详情'
    }
  }],
  categoryManage: [{
    path: '/categoryManage/categoryList',
    name: 'categoryList',
    component: () => import('@/pages/categoryManage/categoryList'),
    meta: {
      title: '分类列表'
    }
  }, {
    path: '/categoryManage/addCategory',
    name: 'addCategory',
    component: () => import('@/pages/categoryManage/addCategory'),
    meta: {
      title: '新增分类'
    }
  }, {
    path: '/categoryManage/categoryList/categoryDesc',
    name: 'categoryDesc',
    component: () => import('@/pages/categoryManage/categoryDesc'),
    show: 'false',
    meta: {
      title: '分类详情'
    }
  }],
  tagsManage: [{
    path: '/userManage/userList',
    name: 'userList',
    component: () => import('@/pages/userManage/userList'),
    meta: {
      title: '用户列表'
    }
  }, {
    path: '/userManage/addUser',
    name: 'addUser',
    component: () => import('@/pages/userManage/addUser'),
    meta: {
      title: '新增用户'
    }
  }, {
    path: '/userManage/userList/userDesc',
    name: 'userDesc',
    component: () => import('@/pages/userManage/userDesc'),
    show: 'false',
    meta: {
      title: '用户详情'
    }
  }], 
  commentManage: [{
    path: '/userManage/userList',
    name: 'userList',
    component: () => import('@/pages/userManage/userList'),
    meta: {
      title: '用户列表'
    }
  }, {
    path: '/userManage/addUser',
    name: 'addUser',
    component: () => import('@/pages/userManage/addUser'),
    meta: {
      title: '新增用户'
    }
  }, {
    path: '/userManage/userList/userDesc',
    name: 'userDesc',
    component: () => import('@/pages/userManage/userDesc'),
    show: 'false',
    meta: {
      title: '用户详情'
    }
  }]
}



function getRouters() {
  let router = []
  for (const i in routers) {
    for (let j = 0; j < routers[i].length; j++) {
      const element = routers[i][j];
      router.push(element)
    }
  }
  return router
}
export let routerArray = function () {
  delete (routers.common)
  return routers
}
export default getRouters()