<template>
  <el-dialog title="审核视频"
             :visible.sync="dialogVisible"
             v-loading="loading"
             element-loading-text="审核中..."
             :before-close="handleClose"
             center>
    <el-tabs v-model="activeName">
      <el-tab-pane label="审核原始视频"
                   name="video">
        <auditVideo :src="originalSrc"
                    v-if="activeName === 'video'" />
      </el-tab-pane>
      <el-tab-pane label="审核视频截图"
                   name="images">
        <audit-img v-if="activeName === 'images'"
                   :id="id" />
      </el-tab-pane>
    </el-tabs>
    <div slot="footer"
         class="dialog-footer">
      <el-button type="primary"
                 @click="handlePass">审核通过</el-button>
      <el-button @click="handleNoPass">审核不通过</el-button>
      <el-button @click="handleClose">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import api from 'api/pc';
import AuditVideo from 'modules/pc/components/base/video.vue';
import AuditImg from 'modules/pc/components/videoAudit/auditImg.vue';

export default {
  name: 'audit',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      activeName: 'video',
      originalSrc: ''
    };
  },
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
  created() {
    const { id: key } = this;
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
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    async handlePass() {
      this.loading = true;
      await api
        .videoPass({
          key: this.id
        })
        .then(() => {
          this.handleClose();
          this.$emit('on-audit');
          this.$message({
            type: 'success',
            message: '审核通过!'
          });
        })
        .catch(message => {
          this.$alert(message, '错误', {
            confirmButtonText: '确定',
            type: 'warning'
          });
        });
      this.loading = false;
    },
    async handleNoPass() {
      this.loading = true;
      await api
        .videoFailed({
          key: this.id
        })
        .then(() => {
          this.handleClose();
          this.$emit('on-audit');
          this.$message({
            type: 'success',
            message: '审核不通过!'
          });
        })
        .catch(message => {
          this.$alert(message, '错误', {
            confirmButtonText: '确定',
            type: 'warning'
          });
        });
      this.loading = false;
    }
  },
  components: {
    AuditVideo,
    AuditImg
  }
};
</script>

<style lang="scss" scoped>
.dialog-footer {
  border-top: 1px dashed #ccc;
  padding-top:10px;
}
</style>


