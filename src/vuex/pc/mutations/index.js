import * as types from 'vuexs/pc/mutation-types';

export default {
  [types.SWITCH_MENU] (state, { menu = [] }) {
    state.menu = menu;
  },
  [types.SELECT_VIDEO_TYPE] (state, { videoType = [] }) {
    state.videoType = [
      {
        id: '',
        name: '全部状态'
      },
      ...videoType
    ];
  },
  [types.CHANGE_STICKCOURSES] (state, { stickCourses = [] }) {
    state.stickCourses = stickCourses;
  },
  [types.GET_SPID] (state, { spId = '' }) {
    state.spId = spId;
  },
  [types.GET_PREVIEW_URL] (state, { preview = '' }) {
    state.preview = preview;
  }
};
