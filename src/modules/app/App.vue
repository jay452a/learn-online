<template>
    <main>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </main>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      searchIcon: require('src/assets/images/app/appTitle/searchIcon.png'),
      homeIcon: require('src/assets/images/app/appTitle/homePageIcon.png')
    }
  },
  mounted () {
    console.log(this.searchIcon)
    this.$nextTick(() => {
      let base1 = window.location.href.split('#/')[0]
      let base2 = window.location.href.split('?_')[1]
      let urlSearh = base1 + '#/search' + '?_' + base2
      var actionBtn0 = {text: '资料搜索', icon: this.searchIcon, action: 'toSearch'};
      var actionBtn1 = {text: '返回首页', icon: this.homeIcon, action: 'custom-event'};
      var params = {style: {header: {optBtn: {text: '更多', action: '', icon: '', actionBtns: [actionBtn0, actionBtn1]}}}}
      UmsApp.action.viewSettings(params);

      setTimeout(function () {
        var body = document.querySelector('body')
        body.on('custom-event', function (data) {
          UmsApp.view.workbench();
        })
        body.on('toSearch', function (data) {
          window.location.href = urlSearh
        })
      }, 200)
    })
  }
};
</script>

<style lang="scss">
    @import '~src/styles/app/mixin';
    *{
        margin: 0;
        padding:0;
        list-style: none;
        @include font-dpr(12px);
       font-family: "Helvetica", "Tahoma", "Arial", "Hiragino Sans GB", "Hiragino Sans GB W3", "Microsoft YaHei", "STXihei", "STHeiti", "Heiti", "SimSun", "sans-serif";
    }
    body{
        background: #f3f3f3;
    }
</style>
