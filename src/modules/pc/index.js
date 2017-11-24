import Vue from 'vue';
import ElementUI from 'element-ui';
import VueLazyload from 'vue-lazyload';
import infiniteScroll from 'vue-infinite-scroll';
import store from 'vuexs/pc';
import router from 'routes/pc';
import 'styles/theme/index.css';
import 'styles/element-variables.scss';
import 'common/js/title';
import 'common/js/umspc-sdk.js';
import App from './App';

Vue.use(ElementUI);

Vue.use(infiniteScroll);

Vue.use(VueLazyload, {
  error: require('assets/images/pc/img_default.jpg'),
  loading: require('assets/images/pc/loading.jpg'),
  attempt: 1,
  listenEvents: ['scroll']
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
