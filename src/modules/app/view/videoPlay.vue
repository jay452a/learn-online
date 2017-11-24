<template>
    <section class="app-videoPlay">
       <div id="playBox" class="playBox" :style="`background-image:url(${source.maxImageUrl?source.maxImageUrl:require('src/assets/images/pc/img_default.jpg')})`">
           <img src="~src/assets/images/app/playBig.png"@click="play"/>
           <div class="Picover"></div>
       </div>
        <div class="main">
            <h3>{{source.title}}
                <img src="~src/assets/images/app/arrow.png" :class="{arrow:true,hidden:!show}" @click="show=!show"/>
            </h3>
            <transition name="fade">
                <p v-if="show" class="info">
                    {{source.description}}
                </p>
            </transition>

           <!-- <p>test: {{playData}}</p>-->
            <div class="userOperate app-borderSkew">
                <span @click="doPriase"><img src="~src/assets/images/app/likeIcon.png"/>{{priase}}</span>
                <span><img src="~src/assets/images/app/discussIcon.png"/>{{comment}}</span>
            </div>
            <div class="userOperate app-borderSkew">
               评论 （{{comment}}）
            </div>
            <mt-loadmore
                    :bottom-method="loadBottom"
                    :bottomAllLoaded="allLoaded"
                    :autoFill="false"
                     ref="loadmore">
                <ul class="discuss">
                   <li class="app-borderSkew" v-for="item in commentList">
                       <p class="name">{{item.commentAuthor}}</p>
                       <p>{{item.content}}</p>
                       <p>{{item.createTime}}</p>
                   </li>
                </ul>
            </mt-loadmore>
            <p class="app-noMore" v-show="noMoreData">没有更多了</p>
        </div>
        <footer>
            <textarea v-model="introduction"
                      v-if="showTextarea"
                      :class="{focusin: textareaFocus}"
                      @focus="focusin"
                      ref="discuss"
                      maxlength="150"
                      placeholder="写评论..."></textarea>
            <img src="~src/assets/images/app/discussIcon.png" @click="doComment"/>
        </footer>
        <div class="cover" v-show="showCover" @click="coverClick"></div>
    </section>
</template>
<script>
import { Indicator, Toast } from 'mint-ui';
import api from 'src/api/app/index'
export default {
  data () {
    return {
      show: true,
      allLoaded: false,
      loadMoreBottomText: '上拉刷新',
      showCover: false,
      showTextarea: true,
      introduction: '',
      playData: '',
      textareaFocus: false,
      source: {},
      playRecord: {},
      priase: 0, // 点赞数
      comment: 0,
      userInfo: {},
      commentList: [],
      pageNo: 1,
      pageSize: 10,
      noMoreData: false,
      playUrl: ''
    }
  },
  methods: {
    loadBottom () {
      this.pageNo++
      this.queryComment()
      this.$refs.loadmore.onBottomLoaded();
    },
    focusin () {
      this.textareaFocus = this.showCover = true
    },
    coverClick () {
      this.textareaFocus = this.showCover = false
    },
    play () {
      const _this = this
      // Toast(this.playUrl)
      let params = {
        url: this.playUrl ? this.playUrl : 'http://img.ksbbs.com/asset/Mon_1605/0ec8cc80112a2d6.mp4',
        id: 'text_xxx', playMode: 0,
        progressBar: {
          offsetSecond: this.playRecord.watchTime || 0,
          mode: this.playRecord.finish ? 0 : 2
        }
      }
      UmsApp.action.initVideo(params, function (err, data) {
      });

      setTimeout(function () {
        UmsApp.action.closeVideo({id: 'text_xxx'}, function (data) {
          _this.playData = JSON.stringify(data)
          window.sessionStorage.playedTime = data.position // 播放的秒数
          window.sessionStorage.playState = data.state // 是否播放完毕
          let param = {
            finish: data.state == 1 ? false : true,
            watchTime: data.position,
            lastTime:data.state == 1 ? '' : data.position,
            groupId: _this.userInfo.groupId,
            key: _this.source.materailsUrl,
            userId: _this.userInfo.userId,
            userName: _this.userInfo.userName,
            spId: _this.userInfo.spId
          }
           // alert(JSON.stringify(param), 2)
          _this.savePlayedInfo(param)
        })
        UmsApp.action.closeVideo = null
      }, 200)
    },
    savePlayedInfo (param) {
      api.saveSourcePlayInfo(param).then(res => {
        Toast('保存播放进度成功')
        let p = {
          id: window.sessionStorage.videoId
        }
        this.getPlayRecord(p)
      })
    },
    getPlayRecord (param) {
      api.querySourcePlayRecord(param).then(res => {
        this.playRecord = {...res}
      })
    },
    doPriase () {
       let param = {
         key: window.sessionStorage.videoId
       }
       api.doPriase(param).then(res => {
         Toast('点赞成功')
         this.priase++
       }, err => {
         Toast(err)
       })
    },
    doComment () { // 评论
       if (this.introduction.trim() === '') {
         Toast('评论内容不能为空')
         return
       }
       let param = {
         businessId: this.source.materailsUrl,
         businessKey: 'studyComment',
         commentAuthor: this.userInfo.userName,
         commentAuthorId: this.userInfo.userId,
         spId: this.userInfo.spId,
         content: this.introduction
       }
       console.log(param, 222)
       api.sourceComment(param).then(res => {
         Toast('评论成功')
         this.pageNo = 1
         this.commentList = []
         this.queryComment()
         this.showCover = false
         this.introduction = ''
         this.allLoaded = false
       }, err => {
         Toast(err)
         this.showCover = false
         this.introduction = ''
       })
    },
    queryComment () {
      let param = {
        businessId: this.source.materailsUrl,
        businessKey: ['studyComment'],
        commentAuthor: this.userInfo.userName,
        commentAuthorId: this.userInfo.userId,
        spId: this.userInfo.spId,
        page: this.pageNo,
        limit: this.pageSize,
        sortFlag: '-1'
      }
      this.noMoreData = false
      api.queryComment(param).then(res => {
        Indicator.close()
        this.commentList.push(...res.items)
        if (!res.items) {
          this.allLoaded = true
          this.noMoreData = true
        } else {
          if(res.items.length < this.pageSize) {
            this.allLoaded = true
            this.noMoreData = true
          }
        }
      }, err => {
        Toast(err)
        Indicator.close()
      })
    },
    beforePlay () { // 视频播放前调用
      let param = {
        key: this.source.materailsUrl
      }
      api.beforePlay(param).then(res => {
        this.playUrl = res.urls.original
      })
    }
  },
  created () {
    let param = {
      id: window.sessionStorage.videoId
    }
    this.getPlayRecord(param)
    api.queryPraiseByIds({keys: [window.sessionStorage.videoId]}).then(res => {
      for (let key in res) {
        if (window.sessionStorage.videoId === key) {
          this.priase = res[key].praise
          this.comment = res[key].comment
        }
      }
    }, err => {
      Toast(err)
    })
    const getSoure =new Promise((resolve, reject) => {
      api.getSourceById(param).then(res => {
        this.source = {...res}
        resolve()
      }, err => {
        reject()
      })
    })
    const getUser = new Promise((resolve, reject) => {
      api.getUserInfo().then(res => {
        this.userInfo = res
        resolve()
      }, err => {
        reject()
      })
    })
    Indicator.open('加载中...')
    Promise.all([getSoure, getUser]).then(() => { // 当获取资源信息和获取用户信息接口同时resolve才调用
      this.queryComment()
      this.beforePlay()
      Indicator.close()
    }).catch((err) => {
      Indicator.close()
      Toast('服务器异常')
    })
    //api.ceshi({})
  },
  mounted () {

  }
}
</script>
<style lang="scss" scoped>
    @import '~src/styles/app/mixin';
    p{@include font-dpr(12px)}
    section{
        background: white;
    }
    .app-videoPlay{
        width: 100%;
        overflow-x: hidden;
        height: 100%;
        position: absolute;
        left:0;
        top:0;
        -webkit-overflow-scrolling: touch;
    }
    .playBox{
        width: 100%;
        height:32vh;
        background-size: auto 100%;
        background-position: center;
        position: relative;
        // @extend .app-borderSkew;
        img{
            width: px2rem(120px);
            position: absolute;
            left:50%;
            top:50%;
            margin-left: px2rem(-60px);
            margin-top: px2rem(-60px);
            z-index: 9;
        }
        .Picover{
            width: 100%;
            height:100%;
            position: absolute;
            left:0;
            top:0;
            background: black;
            opacity: 0.3;
        }
    }
    .main{
        width: 95%;
        margin: px2rem(15px) auto;
    }
    .arrow{
        float: right;
        padding: px2rem(5px);
        color: #626262;
        transition: all 0.5s;
        position: relative;
        top:px2rem(-5px);
        width: px2rem(30px);
        transform: rotateZ(180deg);
        &.hidden{
            transform: rotateZ(0deg);
        }
    }
    .icon-arrow:after{
        content: '\25B2';
        font-style: normal;
        padding:px2rem(5px)
    }
    .info{
        margin-top: px2rem(15px);
        color: #626262;
    }
    .userOperate{
        margin-top: px2rem(15px);
        padding-bottom: px2rem(15px);
        span{margin-right: px2rem(30px)}
        i{
            color: #626262;
            @include font-dpr(14px);
            position: relative;
            top:px2rem(2px);
        }
        img{
            width: px2rem(30px);
            position: relative;
            top:px2rem(3px);
            margin-right: px2rem(4px);
        }
    }
    .discuss p{
        margin: px2rem(15px) 0;
    }
    .discuss p:last-child{
        color: #999;
    }
    .discuss p.name{
        color: $primaryColor;
    }
    footer{
        display: none;
        padding: px2rem(15px);
        background: #f7f7f7;
        position: fixed;
        left:0;
        bottom: 0;
        width: 100%;
        display: flex;
        align-items: center;
        z-index: 100;
        textarea{
            width: 75%;
            padding-left: px2rem(15px);
            margin-left: px2rem(30px);
            margin-right: px2rem(30px);
            outline: none;
            padding-top: px2rem(5px);
            height: px2rem(50px);
            border-radius: px2rem(20px);
            border:1px solid $borderColor;
            &.focusin{
               // height: px2rem(120px);
            }
        }
        i{
            @include font-dpr(24px);
            color: #626262;
            position: absolute;
            bottom: px2rem(15px);
            right: px2rem(90px);
        }
        img{
            width: px2rem(50px);
            position: absolute;
            bottom: px2rem(20px);
            right: px2rem(90px);
        }
    }
    .cover{
        width: 100%;
        height:100%;
        background: black;
        opacity:0.5;
        position: fixed;
        left:0;
        top:0;
        z-index:99;
    }
    .fade-enter-active, .fade-leave-active {
        transition: all .3s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
        opacity: 0;
    }
    .app-noMore{
        margin-bottom: px2rem(100px);
        margin-top: px2rem(30px);
    }
</style>