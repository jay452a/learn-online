<!--测试tab加下拉-->
<template>
    <section id="content">
        <NavTitle @on-selected="getSelectType" :value="page"></NavTitle>
        <swiper :options="swiperOption" ref="mySwiper" class="container">
            <!-- slides -->
            <swiper-slide  v-for="n in tabnum">
                <loadMore :classify="type['index' + n]" :pageSize="20"></loadMore>
            </swiper-slide>
            <!-- Optional controls -->
        </swiper>
    </section>
</template>
<script>
  import api from 'src/api/app';
  import NavTitle from 'src/modules/app/components/navSelect.vue'
  import loadMore from 'src/modules/app/components/loadMore.vue'
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import { Toast, Indicator } from 'mint-ui';
  export default {
        data () {
          return {
            page: 0,
            type: {},
            tabnum: 0,
            swiperOption: {
              notNextTick: true,
              loop: true,
              initialSlide: 1,
              onSlideChangeEnd: swiper => {
                //这个位置放swiper的回调方法
                this.page = swiper.realIndex + 1;
              }
            }
          }
        },
    methods: {
      getSelectType (id, length, index) {
        console.log(id, length, index, 'tab')
        this.classification = id
        this.tabnum = length
        this.$refs.mySwiper.swiper.slideTo(index, 500, false)
        this.$set(this.type, 'index'+index, id)
      }
    },
    components: {
      NavTitle,
      swiper,
      swiperSlide,
      loadMore
    }
  }
</script>
<style lang="scss" scoped>
    @import '~src/styles/app/mixin';
    section{
        position: absolute;
        width: 100%;
        height: 100%;
        left:0;
        top:0;
        -webkit-overflow-scrolling: touch;
    }
    .container{
        position: absolute;
        top: px2rem(80px);
        bottom: 0px;
        width: 100%;
        height: auto;
        -webkit-overflow-scrolling: touch;
        overflow-y: auto;
    }
    .videoList li{
        display:flex;
        display: -ms-flexbox;
        img{width: 35%;height: px2rem(150px)}
        margin: px2rem(30px) 0;
        padding: px2rem(15px) 2.5%;
        background: white;
        div{
            padding-left: 3%;
            width: 62%;
            &>h3{
                overflow : hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
            }
            &>p{
                margin-top: px2rem(15px);
                overflow : hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
            }
        }
    }
    .silder-line{
        overflow-y: auto;
    }
    .swiper-slide{
        overflow: hidden;
    }

    .swiper-slide-active{
        overflow: auto !important;
    }
</style>