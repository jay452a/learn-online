const menu = [
  {
    name: '学习资料管理',
    path: 'videoListManagement',
    sub: [
      {
        name: '添加视频',
        path: 'addVideo'
      },
      {
        name: '修改视频',
        path: 'changeVideo'
      }
    ]
  },
  {
    name: '学习资料统计',
    path: 'studyStatistics'
  },
  {
    name: '支部学习统计',
    path: 'branchStudyStatistics'
  },
  {
    name: '党员学习统计',
    path: 'partyMemberStudyStatistics'
  },
  {
    name: '学习评论管理',
    path: 'commentStatistics'
  },
  {
    name: '置顶学习管理',
    path: 'studyManagement'
  },
  {
    name: '学习类型管理',
    path: 'typeManagement'
  },
  {
    name: '视频人工审核',
    path: 'videoAudit'
  }
];

const videoType = [];

const stickCourses = [];

const spId = '';

const preview = '';

const state = {
  menu,
  videoType,
  stickCourses,
  spId,
  preview
};

export default state;
