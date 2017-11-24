<!--搜索-->
<template>
    <div>
        <input type="text" placeholder="请输入关键字搜索" v-model="name"/>
        <i class="icon-search"></i>
        <p @click="search">搜索</p>
    </div>
</template>
<script>
    export default {
      props: {
        value: { // 必须要使用value
          default: '',
        },
      },
      data () {
        return {
          name: this.value
        }
      },
      methods: {
        search () {
          this.$emit('on-search')
        }
      },
      watch: {
        name (value) {
          this.$emit('input', value)
        }
      }
    }
</script>
<style lang="scss" scoped>
    @import '~src/styles/app/mixin';
    div{
        padding: px2rem(15px) 5%;
        position: relative;
        background: $primaryColor;
        display: flex;
        display: -ms-flexbox;
        input{
            height: px2rem(60px);
            width: 85%;
            border:none;
            outline: none;
            border-radius: px2rem(5px);
            padding-left: px2rem(40px);
        }
        i{
            @include font-dpr(16px);
            position: absolute;
            left:6%;
            top:px2rem(28px);
        }
        p{
            color: white;
            @include font-dpr(14px);
            margin-left: px2rem(10px);
            display: inline-block;
            width: 15%;
            text-align: center;
            line-height: px2rem(60px);
        }
    }
</style>