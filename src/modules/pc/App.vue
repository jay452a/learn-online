<template>
  <main>
    <container :title="title"
               :menus="menu">
      <router-view v-title="title"></router-view>
    </container>
  </main>
</template>

<script>
import Container from './components/base/menu.vue';
import * as types from 'vuexs/pc/mutation-types';

export default {
  name: 'app',
  computed: {
    menu() {
      return this.$store.state.menu;
    },
    title() {
      return this.$route.meta.title;
    }
  },
  components: {
    Container
  }
};
</script>

<style lang="scss">
@import '~styles/main';

.el-textarea__inner {
  resize: none;
}

ul {
  list-style: none;
}
</style>
