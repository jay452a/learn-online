import Vue from 'vue';
import VueRouter from 'vue-router';
const VideoListManagement = () =>
  import(/* webpackChunkName: "group-route" */ 'modules/pc/view/videoListManagement.vue');
const StudyStatistics = () =>
  import(/* webpackChunkName: "group-route" */ 'modules/pc/view/studyStatistics.vue');
const BranchStudyStatistics = () =>
  import(/* webpackChunkName: "group-route" */ 'modules/pc/view/branchStudyStatistics.vue');
const PartyMemberStudyStatistics = () =>
  import(/* webpackChunkName: "group-route" */ 'modules/pc/view/partyMemberStudyStatistics.vue');
const CommentStatistics = () =>
  import(/* webpackChunkName: "group-route" */ 'modules/pc/view/commentStatistics.vue');
const StudyManagement = () =>
  import(/* webpackChunkName: "group-route" */ 'modules/pc/view/studyManagement.vue');
const TypeManagement = () =>
  import(/* webpackChunkName: "group-route" */ 'modules/pc/view/typeManagement.vue');
const VideoAudit = () =>
  import(/* webpackChunkName: "group-route" */ 'modules/pc/view/videoAudit.vue');
const ChangeVideo = () =>
  import(/* webpackChunkName: "group-route" */ 'modules/pc/view/changeVideo.vue');

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/videoListManagement',
      name: 'videoListManagement',
      component: VideoListManagement,
      meta: { title: '学习资料管理' }
    },
    {
      path: '/studyStatistics',
      name: 'studyStatistics',
      component: StudyStatistics,
      meta: { title: '学习资料统计' }
    },
    {
      path: '/branchStudyStatistics',
      name: 'branchStudyStatistics',
      component: BranchStudyStatistics,
      meta: { title: '支部学习统计' }
    },
    {
      path: '/partyMemberStudyStatistics',
      name: 'partyMemberStudyStatistics',
      component: PartyMemberStudyStatistics,
      meta: { title: '党员学习统计' }
    },
    {
      path: '/commentStatistics',
      name: 'commentStatistics',
      component: CommentStatistics,
      meta: { title: '学习评论管理' }
    },
    {
      path: '/studyManagement',
      name: 'studyManagement',
      component: StudyManagement,
      meta: { title: '置顶学习管理' }
    },
    {
      path: '/typeManagement',
      name: 'typeManagement',
      component: TypeManagement,
      meta: { title: '学习类型管理' }
    },
    {
      path: '/videoAudit',
      name: 'videoAudit',
      component: VideoAudit,
      meta: { title: '视频人工审核' }
    },
    {
      path: '/addVideo',
      name: 'addVideo',
      component: ChangeVideo,
      meta: { title: '添加视频' }
    },
    {
      path: '/changeVideo/:id',
      name: 'changeVideo',
      component: ChangeVideo,
      meta: { title: '修改视频' }
    },
    {
      path: '*',
      redirect: '/videoListManagement'
    }
  ]
});
