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
  systemManage: [{
    path: '/systemManage/userManage',
    name: 'userManage',
    component: () => import('@/pages/systemManage/userManage'),
    meta: {
      title: '用户管理'
    }
  }, {
    path: '/systemManage/addUser',
    name: 'addUser',
    component: () => import('@/pages/systemManage/addUser'),
    meta: {
      title: '新增用户'
    }
  }, {
    path: '/systemManage/userManage/userDesc',
    name: 'userDesc',
    component: () => import('@/pages/systemManage/userDesc'),
    show:'false',
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
  systemManage: {
    name: "系统管理",
    icon: "gear-a"
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