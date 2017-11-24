<template>
  <el-dialog title="视频预览"
             :visible.sync="dialogVisible"
             :before-close="handleClose"
             center>
    <preview-videos :src="originalSrc" />
    <div slot="footer"
         class="dialog-footer">
      <el-button @click="handleClose"
                 type="primary">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import api from 'api/pc';
import PreviewVideos from 'modules/pc/components/base/video.vue';

export default {
  name: 'previewVideo',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    originalSrc: ''
  }),
  computed: {
    dialogVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit('update:visible', val);
      }
    }
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    }
  },
  watch: {
    url: {
      handler(key) {
        api
          .geturls({
            key
          })
          .then(({ urls = '' }) => {
            this.originalSrc = urls.original;
          })
          .catch(message => {
            this.$alert(message, '错误', {
              confirmButtonText: '确定',
              type: 'warning'
            });
          });
      },
      immediate: true,
      deep: true
    }
  },
  components: {
    PreviewVideos
  }
};
</script>

<style lang="scss" scoped>
.dialog-footer {
  border-top: 1px dashed #ccc;
  padding-top: 10px;
}
</style>


