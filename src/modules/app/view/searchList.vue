<template>
    <section>
        <Search v-model="searchName" @on-search="searchSure"></Search>
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
        <div class="noData" v-show="noData">
            <img src="~src/assets/images/app/searchNodata.png"/>
            <p>暂无数据</p>
        </div>
        <p class="app-noMore" v-show="noMoreData">没有更多了</p>
    </section>
</template>
<script>
    import api from 'src/api/app/index'
    import Search from 'src/modules/app/components/searchByName.vue'
    import { Toast, Indicator } from 'mint-ui';
    export default {
      data () {
        return {
          value: '',
          result: '',
          noData: false,
          noMoreData: false,
          searchName: '',
          allLoaded: false,
          list: []
        }
      },
      methods: {
        loadTop () {
          this.pageNo = 1
          this.list = []
          this.getList()
          this.$refs.loadmore.onTopLoaded();
        },
        loadBottom () {
          this.pageNo++
          this.getList()
          this.$refs.loadmore.onBottomLoaded();
        },
        getList () {
          let param = {
            title: this.searchName,
            pageSize: 20,
            pageNo: 1
          }
          this.noMoreData = false
          Indicator.open('加载中...')
          api.getSourceList(param).then(res => {
            this.list = res.results
            if (res.results.length === 0 || !res.results) {
              this.noData = true
            } else {
              this.noData = false
            }
            if ( res.results.length < 20 && res.results.length > 0) {
              this.allLoaded = true
              this.noMoreData = true
            }
            Indicator.close()
          }, err => {
            Indicator.close()
            this.noData = true
          }).catch(() => {
            Indicator.close()
            this.noData = true
          })
        },
        searchSure () {
          /*if (!this.searchName) {
            return
          }*/
          this.getList()
        },
        toDetail (id) {
          window.sessionStorage.videoId = id
          window.location.href = '#/play'
        }
      },
      components: {
        Search
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
        -webkit-overflow-scrolling: touch;
    }
    .videoList{
        border: none;
    }
    .videoList li{
        display:flex;
        display: -ms-flexbox;
        img{width: 30%;height: px2rem(120px)}
        margin: px2rem(30px) 0;
        padding: px2rem(15px);
        background: white;
        div{
            padding-left: 3%;
            width: 70%;
            &>h3{
                overflow : hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                @include font-dpr(14px);
                color: #333333;
            }
            &>p{
                margin-top: px2rem(15px);
                overflow : hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                @include font-dpr(12px)
            }
        }
    }
    .noData{
        text-align: center;
        margin-top: 30%;
        p{
            color: #626262;
        }

    }
</style>
