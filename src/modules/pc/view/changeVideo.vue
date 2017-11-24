<template>
  <div v-loading.fullscreen.lock="loading"
       element-loading-text="上传中...">
    <el-button icon="el-icon-fa-reply"
               size="mini"
               class="back"
               @click="$router.back()">返回</el-button>
    <el-form label-width="80px">
      <el-form-item label="上传模式">
        <el-radio v-model="type"
                  :label="1">本地上传</el-radio>
        <el-radio v-model="type"
                  :label="0">视频地址</el-radio>
      </el-form-item>
      <upload v-if="type"
              :detail="uploads"
              :id="id"
              :loading.sync="loading"
              :videoType="videoType" />
      <video-url v-else
                 :detail="videoUrl"
                 :id="id"
                 :loading.sync="loading"
                 :videoType="videoType" />
    </el-form>
  </div>
</template>

<script>
import api from 'api/pc';
import Upload from 'modules/pc/components/changeVideo/upload.vue';
import VideoUrl from 'modules/pc/components/changeVideo/videoUrl.vue';

export default {
  name: 'changeVideo',
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      vm.$store.dispatch({
        type: 'getVideoType'
      });
      const { id } = vm;
      if (id) {
        api
          .getVideoDetail({
            id,
            type: '0'
          })
          .then(data => {
            const { materailsUrl } = data;
            if (materailsUrl.match(/^https?/)) {
              vm.type = 0;
              vm.videoUrl = data;
              return;
            }
            vm.type = 1;
            vm.uploads = data;
          })
          .catch(message => {
            vm.$alert(message, '错误', {
              confirmButtonText: '确定',
              type: 'warning'
            });
          });
      }
    });
  },
  data() {
    return {
      id: this.$route.params.id,
      uploads: null,
      videoUrl: null,
      type: 1,
      loading: false
    };
  },
  computed: {
    videoType() {
      return this.$store.getters.videoType;
    }
  },
  components: {
    Upload,
    VideoUrl
  }
};
</script>

<style lang="scss" scoped>
.back {
  position: absolute;
  top: 1.5px;
  right: 15px;
}
</style>



