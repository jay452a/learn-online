import Vue from 'vue';
import VueRouter from 'vue-router';
import list from 'src/modules/app/view/list.vue'
import searchList from 'src/modules/app/view/searchList.vue'
import myLearning from 'src/modules/app/view/myLearning.vue'
import play from 'src/modules/app/view/videoPlay.vue'
import select from 'src/modules/app/view/typeSelect.vue'
import ceshiTab from 'src/modules/app/view/ceshiTab.vue'
Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    //  这是一个例子
    // {
    //   path: '/',
    //   component: Index,
    //   name: 'index',
    //   meta: {title: 'PC端入口1首页'}
    // },
    //  没有匹配到路由 返回'/'路由
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      component: list,
      name: 'list',
      meta: {title: '在线学习', keepAlive: true}
    },
    {
      path: '/search',
      component: searchList,
      name: 'searchList',
      meta: {title: '在线学习'}
    },
    {
      path: '/myLearning',
      component: myLearning,
      name: 'myLearning',
      meta: {title: '在线学习'}
    },
    {
      path: '/play',
      component: play,
      name: 'play',
      meta: {title: '在线学习'}
    },
    {
      path: '/select',
      component: select,
      name: 'select',
      meta: {title: '在线学习', keepAlive: true}
    },
    {
      path: '/selectSwiper',
      component: ceshiTab,
      name: 'ceshiTab',
      meta: {title: '在线学习', keepAlive: true}
    }
  ]
});
