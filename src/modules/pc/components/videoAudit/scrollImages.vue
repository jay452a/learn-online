<template>
  <div class="infinite"
       v-infinite-scroll="loadMore"
       :infinite-scroll-disabled="busy"
       infinite-scroll-distance="100">
    <lazy-image :urls="urls" />
  </div>
</template>

<script>
import LazyImage from './images';

export default {
  name: 'scrollImages',
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: ''
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      busy: false,
      urls: []
    };
  },
  methods: {
    async loadMore() {
      let { pageNum, pageSize } = this;

      this.busy = true;

      await this.$attrs
        .loadMore({ pageNum, pageSize })
        .then(({ urls = [], total = 0 }) => {
          this.urls = urls;
          this.$emit('update:total', total);
          if (urls.length < 10) {
            this.busy = true;
            return;
          }
          this.pageNum = ++pageNum;
          this.busy = false;
        })
        .catch(message => {
          this.$alert(message, '错误', {
            confirmButtonText: '确定',
            type: 'warning'
          });
          this.busy = false;
        });
    }
  },
  components: {
    LazyImage
  }
};
</script>

<style lang="scss" scoped>
.infinite {
  height: 200px;
  overflow-y: auto;
}
</style>


