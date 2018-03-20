const router = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/pages/home'),
    meta: {
      title: '控制台'
    }
  },
  {
    path: '/user/list',
    name: 'userlist',
    component: () => import('@/pages/user/list'),
    meta: {
      title: '用户管理'
    }
  }
]
export default router