<template>
  <transition-group name="list"
                    tag="ul">
    <li v-for="(elem,index) of data"
        :key="index"
        @click="handleImg(elem.url, index)">
      <lazyImg :lazy="elem.url"
               :class="{active:elem.active}" />
    </li>
  </transition-group>
</template>

<script>
import lazyImg from 'modules/pc/components/base/lazyImg.vue';

export default {
  name: 'images',
  props: {
    urls: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      data: []
    };
  },
  methods: {
    handleImg(preview, mainIndex) {
      this.$store.dispatch({
        type: 'getPreview',
        preview
      });
      this.data.map((elem, index) => {
        if (mainIndex === index) {
          elem.active = true;
        }
        return elem;
      });
    }
  },
  watch: {
    urls: {
      handler(vals = []) {
        this.data = vals.map(elem => {
          return {
            url: elem,
            active: false
          };
        });
      },
      immediate: true,
      deep: true
    }
  },
  components: {
    lazyImg
  }
};
</script>

<style lang="scss" scoped>
ul {
  overflow: hidden;
  li {
    margin: 0 10px 10px 0;
    float: left;
    width: 50px;
    height: 50px;
    transition: all 1s;
    cursor: pointer;
  }
}

.active {
  border: 2px solid #f72648;
}

.list-enter {
  opacity: 0;
  transform: translateX(-30px);
}
</style>


