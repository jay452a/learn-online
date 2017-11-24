<!--
右侧滑动过来-->
<template>
    <div>
        <ul :class="{visible: isVisible}">
            <li @click="search('')">全部类型</li>
            <li v-for="item in listData" @click="search(item.id)">{{item.name}}</li>
        </ul>
        <div class="cover" @click="hide" v-if="coverShow"></div>
    </div>
</template>
<script>
    import api from 'src/api/app/index'
    export default {
      props: {
        visible: {
          type: Boolean,
          default: true
        }
      },
      data () {
        return {
          coverShow: false,
          isVisible: false,
          listData: []
        }
      },
      methods: {
        hide () {
          this.coverShow = this.isVisible = false
          this.$emit('close', false)
        },
        search (id) {
          this.coverShow = this.isVisible = false
          this.$emit('close', false)
          this.$emit('search-back', id)
        }
      },
      watch: {
        visible (val) {
          this.coverShow = this.isVisible = val
        }
      },
      created () {
        api.querySourceType({}).then(res => {
          this.listData = res.results
        })
      }
    }
</script>
<style lang="scss" scoped>
    @import '~src/styles/app/mixin';
    ul{
        width: 50%;
        height: 100%;
        position: fixed;
        right: -50%;
        top:0;
        z-index: 999;
        background: white;
        transition: all 0.5s;
        overflow-y: auto;
        &.visible{
            right: 0;
        }
        li{
            padding: px2rem(30px);
            border-bottom:1px solid #DCDCDC;
        }
    }
    .cover{
        position: fixed;
        width: 100%;
        height: 100%;
        top:0;
        left:0;
        z-index: 998;
        background: black;
        opacity:0.5;
    }
</style>
