import Vue from 'vue';
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import 'swiper/dist/css/swiper.css';
// import store from 'vuexs/app';
import router from 'routes/app';
import 'common/js/title';
import App from './App';
import 'lib-flexible';
import '../../styles/app/cover.scss'
import '../../styles/app/style.css'
import fastclick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
fastclick.attach(document.body)
Vue.use(Mint);
Vue.use(VueAwesomeSwiper);
// let base = process.env.NODE_ENV === 'development' ? true : false
new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app');
// document.write(`<script type="text/javascript" src="https://dev-app.ums86.com/js/umsapp-sdk-0.0.1.js?debug=${base}"></script>`)
