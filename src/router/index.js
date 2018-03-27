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
      title: '所有文章'
    }
  }, {
    path: '/articleManage/editArticle',
    name: 'editArticle',
    component: () => import('@/pages/articleManage/editArticle'),
    meta: {
      title: '写文章'
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
  roleManage: [{
    path: '/roleManage/roleList',
    name: 'roleList',
    component: () => import('@/pages/roleManage/roleList'),
    meta: {
      title: '所有角色'
    }
  }],
  userManage: [{
    path: '/userManage/userList',
    name: 'userList',
    component: () => import('@/pages/userManage/userList'),
    meta: {
      title: '所有用户'
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

export let menuGroup = {
  home: {
    name: "首页",
    icon: "home"
  },
  userManage: {
    name: "用户管理",
    icon: "person-stalker"
  },
  roleManage: {
    name: "角色管理",
    icon: "ios-people"
  },
  articleManage: {
    name: "文章管理",
    icon: "ios-book"
  },
  tagsManage: {
    name: "标签管理",
    icon: "ios-pricetags"
  },
  commentManage: {
    name: "评论管理",
    icon: "chatbox-working"
  },
  menuManage: {
    name: "菜单管理",
    icon: "chatbox-working"
  }
};

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