<!--
分类筛选
-->
<template>
    <section>
       <NavTitle @on-selected="getSelectType"></NavTitle>
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
        <p class="app-noMore" v-show="noMoreData">没有更多了</p>
    </section>
</template>
<script>
    import api from 'src/api/app';
    import NavTitle from 'src/modules/app/components/navSelect.vue'
    import { Toast, Indicator } from 'mint-ui';
    export default{
      data () {
        return {
          allLoaded: false,
          list: [],
          pageSize: 20,
          pageNo: 1,
          classification: '',
          noMoreData: false
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
        getSelectType (id) {
          console.log(id, 'se')
          this.classification = id
          this.list = []
          this.getList()
        },
        getList () {
          let param = {
            pageSize: this.pageSize,
            pageNo: this.pageNo,
            classification: this.classification
          }
          Indicator.open('加载中...')
          this.noMoreData = false
          api.getSourceList(param).then(res => {
            this.list.push(...res.results)
            if (res.results.length < this.pageSize) {
              this.allLoaded = true
              this.noMoreData = true
            }
            Indicator.close()
          }, err => {
            Toast(err)
            Indicator.close()
          })
        },
        toDetail (id) {
          window.sessionStorage.videoId = id
          window.location.href = '#/play'
        }
      },
      components: {
        NavTitle,
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
</style>
