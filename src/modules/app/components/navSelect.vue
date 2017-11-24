<!--
筛选头部组件
-->
<template>
    <header id = "navTitle">
        <ul class="navTitle">
            <li
                    :class="{active: selected == index}"
                    v-for="(item, index) in selectType"
                    @click="getType(index, item.id)"
            ><span>{{item.name}}</span></li>
        </ul>
    </header>
</template>
<script>
import api from 'src/api/app';
import { Toast } from 'mint-ui';
export default {
  props:{
    value:{
      type:Number,
      default: 0
    }
  },
  data () {
    return {
      selectType: [],
      selected: this.value,
      sourceId: '',
      headDom: '',
      ulWidth: ''
    }
  },
  methods: {
    getType (index, id) {
       this.selected = index
       this.sourceId = id
    },
    countLiWidth (count) {
      console.log(count)
      let LI = document.querySelectorAll('li')
      let UL = document.querySelector('.navTitle')
      LI.forEach(res => {
        res.style.width = 100/count + '%'
      })
      UL.style.width = count*25 + '%'
      this.ulWidth = UL.offsetWidth
    }
  },
  created () {
    api.querySourceType({}).then(res => {
      this.selectType = res.results
      this.$emit('on-selected', res.results[0].id, this.selectType.length, 1)
      this.$nextTick(() => {  // dom更新了之后执行
        this.countLiWidth(this.selectType.length)
      });
    }, err => {
      Toast(err)
    })
  },
  watch: {
    selected (val) {
      this.$emit('on-selected',this.selectType[val].id, this.selectType.length, this.selected + 1)
      let left = (this.ulWidth/this.selectType.length)*(this.selected)
      console.log(left, 'px')
      this.headDom.scrollLeft  =left
    },
    value (val) {
      this.selected = val - 1
    }
  },
  mounted () {
    this.$nextTick(() => {
      let head  = document.getElementById('navTitle')
      this.headDom = head
    })
  }
}
</script>
<style lang="scss" scoped>
@import '~src/styles/app/mixin';
header{
    width: 100%;
    overflow-x: auto;
}
ul.navTitle{
    width: 125%;
    background: white;
    li{
        box-sizing: border-box;
        width: 20%;
        display: inline-block;
        text-align: center;
        &>span{
            display: inline-block;
            padding: px2rem(20px) px2rem(10px);
        }
        &.active>span{
            border-bottom: px2rem(6px) solid $primaryColor;
        }
    }
}
</style>
