import api from 'api/pc';
import * as types from 'vuexs/pc/mutation-types';

const addVideoCover = async stickCourses => {
  // 获取视频封面
  for (const elem of stickCourses) {
    const { materailsUrl: key } = elem;
    await api
      .getCourseCover({
        key
      })
      .then(({ coverUrls }) => {
        elem.materailsPicture =
          coverUrls.minImageUrl || 'coverUrls.minImageUrl';
      })
      .catch(() => {
        elem.materailsPicture = 'coverUrls.minImageUrl';
      });
  }
};

// 保存置顶课程
export const setStickCourses = async ({ commit }, { stickCourses = [] }) => {
  await addVideoCover(stickCourses);
  commit({
    type: types.CHANGE_STICKCOURSES,
    stickCourses
  });
};

// 添加置顶课程并去重
export const addStickCourses = async (
  { commit, state },
  { stickCourses = [] }
) => {
  const addStickCourses = [
    ...state.stickCourses,
    ...deWeightCourses(state.stickCourses, stickCourses)
  ];
  const max = 6;
  if (addStickCourses.length > max) {
    return Promise.reject(new Error(`置顶课程只能选${max}个`).message);
  }
  await addVideoCover(addStickCourses);
  commit({
    type: types.CHANGE_STICKCOURSES,
    stickCourses: addStickCourses
  });
  return Promise.resolve();
};

//  去重的方法
function deWeightCourses (oldStickCourses, newStickCourses) {
  return newStickCourses.filter(
    ({ id }) => !~oldStickCourses.findIndex(({ id: childId }) => id === childId)
  );
}
