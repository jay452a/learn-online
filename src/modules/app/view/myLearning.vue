<template>
    <section>
        <div class="header">
            <ul>
                <li :class="{active: showAll}"@click="allStudy()">全部学习
                    <img src="~src/assets/images/app/arrow.png" @click="showType1" :class="{visible:visibleType&&showAll}"/>
                </li>
                <li :class="{active: showMy}"@click="myStudy()">
                    我的学习<img src="~src/assets/images/app/arrow.png" @click="showType2" :class="{visible:visibleType&&showMy}"/>
                </li>
            </ul>
            <transition name="fade">
                <nav v-show="visibleType">
                    <p>正在学习 （10）</p>
                    <p>完成学习 （3）</p>
                </nav>
            </transition>
        </div>
        <mt-loadmore
                :top-method="loadTop1"
                :bottom-method="loadBottom1"
                :autoFill="false"
                :bottom-all-loaded="allLoaded1" ref="loadmore">
            <ul class="videoList">
                <li v-for="item in list" @click="toDetail(item.id)">
                    <img :src="item.materailsPicture">
                    <div>
                        <h3>{{item.title}}</h3>
                        <p>{{item.description}}</p>
                    </div>
                </li>
            </ul>
        </mt-loadmore>
        <p class="app-noMore" v-show="noMoreData">没有更多了</p>
    </section>
</template>
<script>
    import { Toast, Indicator } from 'mint-ui';
    import api from 'src/api/app/index'
    export default{
      data () {
        return {
          allLoaded1: false,
          showAll: true,
          showMy: false,
          visibleType: false,
          pageSize: 20,
          pageNo: 1,
          list: [],
          noMoreData: false,
          userInfo: {}
        }
      },
      methods: {
        loadTop1 () {
          this.pageNo = 1
          this.list = []
          this.getList()
          this.$refs.loadmore.onTopLoaded();
        },
        loadBottom1 () {
          this.pageNo++
          this.getList()
          this.$refs.loadmore.onBottomLoaded();
        },
        showType1 () {
          if (this.showAll) {
            this.visibleType =!this.visibleType
          }
        },
        showType2 () {
          if (this.showMy) {
            this.visibleType =!this.visibleType
          }
        },
        allStudy () {
          this.showAll = true
          this.showMy = false;
        },
        myStudy () {
          this.showMy = true;
          this.showAll = false;
        },
        getList () {
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
            this.list.push(...res.results)
            if (res.results.length < this.pageSize) {
              this.allLoaded1 = true
              this.noMoreData = true
            }
            if (res.results.length === 0 || !res.results) {
              this.noData = true
            }
          }, err => {
            Toast(err)
            Indicator.close()
          })
        },
      },
      created () {
        const getUser = new Promise((resolve, reject) => {
          api.getUserInfo().then(res => {
            this.userInfo = res
            resolve()
          }, err => {
            reject()
          })
        })
        Promise.all([getUser]).then(res => {
          this.getList()
        })
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
          }
        }
      }
    }
</script>
<style lang="scss" scoped>
    @import '~src/styles/app/mixin';
    section{
        position: absolute;
        left:0;
        top:0;
        width: 100%;
        height: 100%;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    .learnState{
        padding: px2rem(15px) 0;
        background: #f7f7f7;
        display: flex;
        align-items: center;
        span{
            width: 50%;
            text-align: center;
        }
    }
    .videoList li{
        display:flex;
        display: -ms-flexbox;
        img{width: 30%;height: px2rem(120px)}
        margin: px2rem(30px) 0;
        padding: px2rem(15px) 0;
        background: #f7f7f7;
        div{
            padding-left: 3%;
            width: 70%;
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
    .icon-chevron-left{
        transform: rotateZ(90deg);
        @include font-dpr(16px);
        font-weight: 100;
        padding: px2rem(5px);
        color: #626262;
        transition: all 0.5s;
        position: relative;
        top:px2rem(-5px);
        &.hidden{
            transform: rotateZ(270deg);
        }
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
        p{
           padding: px2rem(30px) 0;
            padding-left: 20%;
        }
        p:first-child{
            @extend .app-borderSkew;
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
        margin-top:px2rem(-180px)
    }
</style>