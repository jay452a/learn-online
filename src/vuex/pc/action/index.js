import api from 'api/pc';
import * as types from 'vuexs/pc/mutation-types';
import { setStickCourses, addStickCourses } from './stickCourses';

// 获取视频分类
export const getVideoType = (
  { commit, state },
  { videoTypeUpdate = false }
) => {
  if (!state.videoType.length || videoTypeUpdate) {
    api
      .getVideoType({})
      .then(data => {
        commit({ type: types.SELECT_VIDEO_TYPE, videoType: data.results });
      })
      .catch(() => {});
  }
};

// 获取spId
export const getSpId = async ({ commit, state }) => {
  if (!state.spId) {
    return await api.getSpId({}).then(data => {
      commit({ type: types.GET_SPID, spId: data.spId });
    });
  }
};

// 获取审核预览图
export const getPreview = ({ commit }, { preview = '' }) => {
  commit({
    type: types.GET_PREVIEW_URL,
    preview
  });
};

export { setStickCourses, addStickCourses };
