import io from 'api/io'
import host from 'api/config'

const {appHost: base} = host
const {appCommentHost: commentBase} = host
const {videoHost: videoHost} = host
const api = {
  // 获取置顶图片
  getBannerPic: params => io.post(`${base}/api/app/materails/queryTopMaterails`, params),
  // 获取视频列表
  getSourceList: params => io.post(`${base}/api/app/materails/queryList`, params),
  // 通过ID获取视频
  getSourceById: params => io.post(`${base}/api/app/materails/queryById`, params),
  // 保存视频播放信息
  saveSourcePlayInfo: params => io.post(`${base}/api/app/learn/save`, params),
  // 查询视频分类
  querySourceType: params => io.post(`${base}/api/app/Classification/queryClassification`, params),
  // 查询视频播放记录
  querySourcePlayRecord: params => io.get(`${base}/api/app/learn/record`, {params}),
  // 查询点赞
  queryPraiseByIds: params => io.post(`${base}/api/app/learn/praisecount`, params),
  // 获取用户信息
  getUserInfo: params => io.post(`${base}/api/app/user/querySpinfo`, params),
  // 点赞
  doPriase: params => io.post(`${base}/api/app/learn/praise`, params),
  // 评论
  sourceComment: params => io.post(`${commentBase}/comment/add`, params),
  // 查询评论
  queryComment: params => io.post(`${commentBase}/comment/pagelist`, params),
  // 查询播放记录列表
  queryPlayedList: params => io.get(`${base}/api/app/learn/recordstatus`, {params}),
  // 播放之前调用
  beforePlay: params => io.get(`${videoHost}/video/geturls`, {params})
}

export default api
