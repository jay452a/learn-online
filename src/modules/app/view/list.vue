<template>
    <section id="sourceList">
        <div class="header">
            <ul>
                <li :class="{active: showAll}"@click="allStudy()">全部学习
                </li>
                <li :class="{active: showMy}"@click="myStudy()">
                    我的学习<img src="~src/assets/images/app/arrow.png" @click.stop="showType2" :class="{visible:visibleType&&showMy}"/>
                </li>
            </ul>
            <transition name="fade">
                <nav v-show="visibleType">
                    <p>正在学习 （{{learning}}）</p>
                    <p>完成学习 （{{learned}}）</p>
                </nav>
            </transition>
        </div>
        <div class="silder" v-if="visibleBanner">
            <swiper :options="swiperOption" ref="mySwiper">
                <!-- slides -->
                <swiper-slide class="silder-line" v-for="item in bannerData">
                    <p class="title">{{item.title}}</p>
                    <img :src="item.maxImageUrl?item.maxImageUrl:require('src/assets/images/pc/img_default.jpg')"  @click="toDetail(item.id)"/>
                    <p class="learnInfo">
                        <img src="~src/assets/images/app/playIcon.png"/>{{item.finish}}人
                        <img src="~src/assets/images/app/watchIcon.png"/>{{item.learn}}人</p>
                    <footer style="background: white">
                        <p>{{item.groupName}} {{item.classification}}</p>
                        <p>
                            <img src="~src/assets/images/app/likeIcon.png" class="discussIcon"/>{{item.priase}}&nbsp&nbsp&nbsp
                            <img src="~src/assets/images/app/discussIcon.png" class="discussIcon"/>{{item.comment}}
                        </p>
                    </footer>
                </swiper-slide>
                <!-- Optional controls -->
                <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
        </div>
        <mt-loadmore
                :top-method="loadTop"
                :bottom-method="loadBottom"
                :autoFill="false"
                :bottom-all-loaded="allLoaded" ref="loadmore">
            <ul class="videoList">
                <li v-for="item in list" @click="toDetail(item.id)">
                    <img :src="item.minImageUrl">
                    <div>
                        <h3>{{item.title}}</h3>
                        <p>{{item.description}}</p>
                    </div>
                </li>
            </ul>
        </mt-loadmore>
        <p style="text-align: center;margin-top: 10%;" v-show="noData">暂无数据</p>
        <p class="app-noMore" v-show="noMoreData">没有更多了</p>
        <img src="~src/assets/images/app/select.png" class="selectImg" @click="toSelect">
        <Slide :visible="slideVisible" @close="closeSlide"@search-back="getTypeId"></Slide>
    </section>
</template>
<script>
    import api from 'src/api/app'
    import { Toast, Indicator } from 'mint-ui';
    import Slide from '../components/slide.vue';
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    import utils from 'src/common/js/util'
    export default {
      data () {
        return {
          allLoaded: false,
          list: [],
          pageSize: 20,
          pageNo: 1,
          classification: '',
          bannerData: [],
          slideVisible: false,
          noData: false,
          noMoreData: false,
          swiperOption: {
            notNextTick: true,
            // swiper configs 所有的配置同swiper官方api配置
            autoplay: 3000,
            loop: true,
            pagination : '.swiper-pagination',
          },
          showAll: true,
          showMy: false,
          visibleType: false,
          visibleBanner: true,
          userInfo: {},
          learning: '',
          learned: ''
        }
      },
      methods: {
        toSelect () {
          window.location.href = '#/select'
        },
        closeSlide(val) {
          this.slideVisible = val
        },
        getTypeId (id) {
          this.list = []
          this.classification = id
          this.getList()
        },
        loadTop () {
          this.pageNo = 1
          this.classification = ''
          this.list = []
          if (this.showAll) {
            this.getList()
          }
          if (this.showMy) {
            this.getMyStudyList()
          }
          this.$refs.loadmore.onTopLoaded();
        },
        loadBottom () {
          this.pageNo++
          this.getList()
          this.$refs.loadmore.onBottomLoaded();
        },
        showType1 () {
            this.visibleType = false
        },
        showType2 () {
          if (this.showMy) {
            this.visibleType =!this.visibleType
          }
        },
        allStudy () {
          this.showAll = true
          this.showMy = false;
          this.visibleType = false
          this.visibleBanner = true
        },
        myStudy () {
          this.showMy = true;
          this.showAll = false;
          this.visibleBanner = false
          this.visibleType = true
        },
        getList () {
          Indicator.open('加载中...')
          this.noMoreData = false
          this.noData = false
          let param = {
            pageNo: this.pageNo,
            pageSize: this.pageSize,
            // classification: this.classification
          }
          api.getSourceList(param).then(res => {
            Indicator.close()
            this.list.push(...res.results)
            if (res.results.length < this.pageSize && res.results.length > 0) {
              this.allLoaded = true
              this.noMoreData = true
            }
            if (res.results.length === 0) {
              this.noData = true
            }
          }, err => {
            Toast(err)
            Indicator.close()
          })
        },
        getMyStudyList () {
          Indicator.open('加载中...')
          this.noMoreData = false
          this.noData = false
          let param = {
            pageNum: this.pageNo,
            pageSize: this.pageSize,
            pageApply: true,
            spId: this.userInfo.spId,
            userId: this.userInfo.userId,
            finish: false
          }
          api.queryPlayedList(param).then(res => {
            Indicator.close()
            this.list.push(...res.list)
            this.learning = res.learnTotal
            this.learned = res.overTotal
            if (res.list.length < this.pageSize && res.list.length > 0) {
              this.allLoaded1 = true
              this.noMoreData = true
            }
            if (res.list.length === 0 || !res.list) {
              this.noData = true
            }
          }, err => {
            Toast(err)
            Indicator.close()
          })
        },
        toDetail (id) {
          window.sessionStorage.videoId = id
          window.location.href = '#/play'
        },
        async getTopSource () {
          return new Promise(function (resolve, reject) {
            api.getBannerPic().then(res => {
              resolve(res)
            }, err => {
              reject(err)
            })
          })
        },
        async getPraiseByIds (param) {
          return new Promise(function (resolve, reject) {
            api.queryPraiseByIds(param).then(res => {
              resolve(res)
            }, err => {
              reject(err)
            })
          })
        },
        async getTopSourceTOgetPraiseByIds () { // 异步通过id查询点赞
          const f1 = await this.getTopSource()
          this.bannerData = f1
          let ids = []
          f1.map(res => {
            ids.push(res.id)
          })
          let f2Param = {
            keys: ids
          }
          const f2 = await this.getPraiseByIds(f2Param)
          return f2
        }
      },
      created () {
        this.getTopSourceTOgetPraiseByIds().then(res => {
          console.log(res, 222)
          for (let key in res) {
            this.bannerData.map(res2 => {
              if (res2.id === key) {
                this.$set(res2, 'priase', res[key].praise)
                this.$set(res2, 'learn', res[key].learn)
                this.$set(res2, 'finish', res[key].finish)
                this.$set(res2, 'comment', res[key].comment)
              }
            })
          }
        }, err => {
          Toast(err)
        })
        const getUser = new Promise((resolve, reject) => {
          api.getUserInfo().then(res => {
            this.userInfo = res
            resolve()
          }, err => {
            reject()
          })
        })
        Promise.all([getUser]).then(() => {
          this.getList()
        })
      },
      components: {
        Slide,
        swiper,
        swiperSlide
      },
      watch: {
        showAll (val) {
          if (val === true) {
            this.list = []
            this.pageNo = 1
            this.getList()
          }
        },
        showMy (val) {
          if (val === true) {
            this.pageNo = 1
            this.list = []
            this.getMyStudyList()
          }
        }
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
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    .silder{
        width: 100%;
        height:  35vh;
        background: white;
        margin-top: px2rem(10px);
    }
    .silder-line{
        position: relative;
        background: #f7f7f7;
        &>img{
            width:100%;
            height:  30vh;
            display: inherit;
        }
        p.title{
            position: absolute;
            top:3%;
            left:3%;
           // color: white;
        }
        p.learnInfo{
            position: absolute;
            left:5%;
            bottom:  px2rem(80px);
           // color: white;
            &>img{
                position: relative;
                top:px2rem(9px);
                margin-right: px2rem(8px);
                margin-left: px2rem(15px);
                width: px2rem(30px);
            }
            &>img:last-child{
                top:px2rem(2px);
            }
        }
        footer{
            display: flex;
            display: -ms-flexbox;
            height: px2rem(60px);
            align-items: center;
            background: #f7f7f7;
            &>p:first-child{
                width: 50%;
                text-align: left;
                padding-left: 5%;
            }
            &>p:last-child{
                width: 50%;
                text-align: right;
                padding-right: 5%;
            }
            i{
                @include font-dpr(14px);
                margin-right: px2rem(2px);
                position: relative;
                top:px2rem(2px);
                color: #626262;
            }
            .discussIcon{
                width: px2rem(30px);
                margin-right: px2rem(4px);
                position: relative;
                top:px2rem(2px);
            }
        }
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
    img.selectImg{
        position: fixed;
        width: px2rem(100px);
        right: px2rem(50px);
        bottom: px2rem(50px);
    }
    .header ul{
        display: flex;
        display: -ms-flexbox;
        background: white;
        li{
            width: 100%;
            text-align: center;
            padding: px2rem(5px) 0;
            margin: px2rem(20px) 0;
            position: relative;
            &.active:after{
                content: '';
                width: 100%;
                height: px2rem(4px);
                background: $primaryColor;
                position: absolute;
                bottom: px2rem(-15px);
                left:0;
            }
        }
        li:first-child{
            border-right: 1px solid $borderColor;
        }
        img{
            width: px2rem(32px);
            position: relative;
            top:px2rem(6px);
            left: px2rem(4px);
            transition: all 0.3s;
            &.visible{
                transform: rotateZ(180deg);
            }
        }
    }
    .header nav{
        background: white;
        position: relative;
        z-index: -1;
        overflow: hidden;
        p{
            padding: px2rem(30px) 0;
            padding-left: 20%;
            float: left;
        }
        p:first-child{
            position: relative;
            &:after{
                position: absolute;
                left: 0;
                bottom: 0;
            }

        }
    }
    .fade-enter-active, .fade-leave-active {
        transition: all .5s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
        opacity: 0;
        margin-top:px2rem(-90px)
    }
</style>