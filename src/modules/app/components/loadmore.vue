<template>
    <section>
        <mt-loadmore
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
import { Toast, Indicator } from 'mint-ui';
export default {
  props: {
    classify: {
      type: String,
      default: ''
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      allLoaded: false,
      // pageSize: 10,
      pageNo: 1,
      noMoreData: false,
      classification: this.classify,
      list: [],
      mockData: [
        {minImageUrl: require('src/assets/images/pc/img_default.jpg'), title:'hehe1', description: 'rnm'},
        {minImageUrl: require('src/assets/images/pc/img_default.jpg'), title:'hehe2', description: 'rnm'},
        {minImageUrl: require('src/assets/images/pc/img_default.jpg'), title:'hehe3', description: 'rnm'},
        {minImageUrl: require('src/assets/images/pc/img_default.jpg'), title:'hehe4', description: 'rnm'},
        {minImageUrl: require('src/assets/images/pc/img_default.jpg'), title:'hehe5', description: 'rnm'},
        {minImageUrl: require('src/assets/images/pc/img_default.jpg'), title:'hehe6', description: 'rnm'},
        {minImageUrl: require('src/assets/images/pc/img_default.jpg'), title:'hehe7', description: 'rnm'},
        {minImageUrl: require('src/assets/images/pc/img_default.jpg'), title:'hehe8', description: 'rnm'},
        {minImageUrl: require('src/assets/images/pc/img_default.jpg'), title:'hehe9', description: 'rnm'},
        {minImageUrl: require('src/assets/images/pc/img_default.jpg'), title:'hehe10', description: 'rnm'},
        {minImageUrl: require('src/assets/images/pc/img_default.jpg'), title:'hehe11', description: 'rnm'},
        {minImageUrl: require('src/assets/images/pc/img_default.jpg'), title:'hehe12', description: 'rnm'}
      ]
    }
  },
  methods: {
    /*loadTop () {
      this.pageNo = 1
      this.list = []
      this.getList()
      this.$refs.loadmore.onTopLoaded();
    },*/
    loadBottom () {
      this.pageNo++
      setTimeout(() => {
        this.getList()
        this.$refs.loadmore.onBottomLoaded();
        }, 1000)

    },
    getList () {
      let param = {
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        classification: this.classification
      }
      this.noMoreData = false
      if (this.pageNo === 1 ) {
        Indicator.open('加载中')
      }
      api.getSourceList(param).then(res => {
        // res.results = this.mockData
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
  created () {
    if (this.classification) {
      this.getList()
    }
  },
  watch: {
    classify (val) {
      this.classification = val
      this.getList()
    }
  }
}
</script>
<style lang="scss" scoped>
    @import '~src/styles/app/mixin';
    /*section{
        position: absolute;
        width: 100%;
        height: 100%;
        left:0;
        top:0;
        -webkit-overflow-scrolling: touch;
        overflow-y: auto;
    }*/
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