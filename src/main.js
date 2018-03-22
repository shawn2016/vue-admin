// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Routers from './router'
import iView from 'iview'
import Env from './config/env';
import Util from './libs/util'
import bus from './components/bus'
import 'iview/dist/styles/iview.css';
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/line';
import fetch from './libs/fetch'
Vue.config.productionTip = false
Vue.use(iView)
Vue.use(VueRouter);
// Vue.use(ECharts)
Vue.component('chart', ECharts)

// 将API方法绑定到全局
Vue.prototype.$fetch = fetch;
// 开启debug模式
Vue.config.debug = true;
// 路由配置
const RouterConfig = {
  routes: Routers
};
if (Env != 'local') {
  RouterConfig.mode = 'history';
}
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  bus.loading = true;
  Util.title(to.meta.title);
  next();
});

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish();
  bus.loading = false;
  window.scrollTo(0, 0);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
