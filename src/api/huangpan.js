import io from 'api/io';
import host from 'api/config';

const { pcHost: base, videoHost, appCommentHost: commentHost } = host;

const prefix = `${base}/api/pc`;

const api = {
  // 获取视频分类
  getVideoType: params =>
    io.post(`${prefix}/Classification/queryClassification`, params),
  // 创建视频 | 修改视频
  changeVideo: params => io.post(`${prefix}/materails/create`, params),
  // 获取视频详情
  getVideoDetail: params => io.post(`${prefix}/materails/queryById`, params),
  // 获取视频列表
  getVideoList: params => io.post(`${prefix}/materails/queryList`, params),
  // 视频关闭
  closeVideo: params => io.post(`${prefix}/materails/closeMaterails`, params),
  // 视频删除
  deleteVideo: params => io.post(`${prefix}/materails/deleteMaterails`, params),
  // 视频发布
  publishVideo: params => io.post(`${prefix}/materails/pushMaterails`, params),
  // 视频类型列表
  getVideoTypeList: params =>
    io.post(`${prefix}/Classification/queryClassificationByPage`, params),
  // 添加视频类型
  addVideoType: params =>
    io.post(`${prefix}/Classification/createClassification`, params),
  // 删除视频类型
  deleteVideoType: params =>
    io.post(`${prefix}/Classification/deleteClassificationById`, params),
  // 修改视频类型
  changeVideoType: params =>
    io.post(`${prefix}/Classification/createClassification`, params),
  // 获取审核列表
  getAuditList: params => io.get(`${prefix}/identify/getvideolist`, { params }),
  // 获取置顶列表
  getStickList: params =>
    io.post(`${prefix}/materails/queryTopMaterails`, params),
  // 保存置顶列表
  saveStickList: params =>
    io.post(`${prefix}/materails/addTopMaterails`, params),
  // 获取评论列表
  getCommentList: params => io.post(`${prefix}/comment/getlist`, params),
  // 删除评论
  deleteComment: params =>
    io.post(`${commentHost}/comment/deleteOrRecover`, params),
  // 获取置顶课程封面
  getCourseCover: params => io.get(`${videoHost}/video/geturls`, { params }),
  // 获取上传视频的token
  getUploadToken (spId) {
    const resolution = JSON.stringify([1, 2, 3, 4]);
    const uptoken_url = `${videoHost}/video/uploadtoken?spId=${
      spId
    }&resolution=${resolution}&legalFlag=true`;
    return uptoken_url;
  },
  // 获取置顶课程封面
  getSpId: params => io.post(`${prefix}/user/querySpinfo`, params),
  // 获取审核视频URL
  geturls: params => io.get(`${videoHost}/video/geturls`, { params }),
  // 获取审核图片
  getimages: params => io.get(`${videoHost}/image/cut/getimages`, { params }),
  // 审核不通过
  videoFailed: params => io.post(`${prefix}/identify/failed`, params),
  // 审核通过
  videoPass: params => io.post(`${prefix}/identify/pass`, params),
  // 查询学习资料统计
  getStatistics: params => io.get(`${prefix}/statistics/materails`, { params })
};

export default api;
