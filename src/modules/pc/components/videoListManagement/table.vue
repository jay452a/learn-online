<template>
  <div>
    <preview-video v-if="visible"
                   :visible.sync="visible"
                   :url="url" />
    <tables :loading="loading"
            :data="data"
            style="width: 100%">
      <el-table-column :show-overflow-tooltip="true"
                       v-for="(elem, index) of childData"
                       :key="index"
                       :width="elem.width"
                       :prop="elem.prop"
                       :label="elem.label">
      </el-table-column>
      <el-table-column label="操作"
                       width="170">
        <template slot-scope="scope">
          <el-button type="text"
                     v-if="previewStatus(scope.row)"
                     @click="handlePreview(scope.row.materailsUrl)">
            预览
          </el-button>
          <el-button type="text"
                     v-if="changeStatus(scope.row)"
                     @click="handleChange(scope.row.id)">
            修改
          </el-button>
          <el-button type="text"
                     v-if="publishStatus(scope.row)"
                     @click="handlePublish(scope.row.id)"
                     v-cloak>
            {{publishText}}
          </el-button>
          <el-button type="text"
                     v-if="deleteStatus(scope.row)"
                     @click="handleDelete(scope.row.id)"
                     v-cloak>
            {{deleteText}}
          </el-button>
          <el-button type="text"
                     v-if="closeStatus(scope.row)"
                     @click="handleClose(scope.row.id)"
                     v-cloak>
            {{closeText}}
          </el-button>
        </template>
      </el-table-column>
    </tables>
  </div>
</template>

<script>
import Tables from 'modules/pc/components/base/table.vue';
import api from 'api/pc';
import PreviewVideo from './previewVideo';

export default {
  name: 'table',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    childData: [
      {
        prop: 'title',
        label: '学习资料标题'
      },
      {
        prop: 'studyType',
        label: '学习类型'
      },
      {
        prop: 'type',
        label: '类型'
      },
      {
        prop: 'status',
        label: '状态'
      },
      {
        prop: 'publishTime',
        label: '发布时间'
      },
      {
        prop: 'updateTime',
        label: '更新时间'
      },
      {
        prop: 'updatePeople',
        label: '更新人'
      }
    ],
    publishText: '发布',
    deleteText: '删除',
    closeText: '关闭',
    visible: false,
    url: ''
  }),
  methods: {
    handlePreview(materailsUrl) {
      this.visible = true;
      this.url = materailsUrl;
    },
    handleChange(id) {
      this.$router.push({
        name: 'changeVideo',
        params: {
          id
        }
      });
    },
    handleClose(id) {
      this.$confirm(`您确认将${this.closeText}该条课程？`, `${this.closeText}提示`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await api
            .closeVideo({ id })
            .then(() => {
              this.$message({
                message: `视频${this.closeText}成功`,
                type: 'success'
              });
              this.$emit('onSubmit');
            })
            .catch(message => {
              this.$alert(message, '错误', {
                confirmButtonText: '确定',
                type: 'warning'
              });
            });
        })
        .catch(() => {});
    },
    handlePublish(id) {
      this.$confirm(`您确认将${this.publishText}该条课程？`, `${this.publishText}提示`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await api
            .publishVideo({ id })
            .then(() => {
              this.$message({
                message: `视频${this.publishText}成功`,
                type: 'success'
              });
              this.$emit('onSubmit');
            })
            .catch(message => {
              this.$alert(message, '错误', {
                confirmButtonText: '确定',
                type: 'warning'
              });
            });
        })
        .catch(() => {});
    },
    handleDelete(id) {
      this.$confirm(`您确认将${this.deleteText}该条课程？`, `${this.deleteText}提示`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await api
            .deleteVideo({ id })
            .then(() => {
              this.$message({
                message: `视频${this.deleteText}成功`,
                type: 'success'
              });
              this.$emit('onSubmit');
            })
            .catch(message => {
              this.$alert(message, '错误', {
                confirmButtonText: '确定',
                type: 'warning'
              });
            });
        })
        .catch(() => {});
    },
    previewStatus(data) {
      const { statusCode } = data;
      return statusCode === '2' || statusCode === '3' || statusCode === '4';
    },
    publishStatus(data) {
      const { statusCode } = data;
      return statusCode === '2' || statusCode === '4';
    },
    deleteStatus(data) {
      const { statusCode } = data;
      return statusCode === '4' || statusCode === '6' || statusCode === '2';
    },
    closeStatus(data) {
      const { statusCode } = data;
      return statusCode === '3';
    },
    changeStatus(data) {
      const { statusCode, materailsUrl } = data;
      if (materailsUrl.match(/^https?/i)) {
        return statusCode === '0' || statusCode === '1' || statusCode === '6';
      }
      return true;
    }
  },
  components: {
    Tables,
    PreviewVideo
  }
};
</script>

<style scoped lang="scss"></style>
