<template>
  <div>
    <!-- 审核视频 -->
    <audit v-if="visible"
           :visible.sync="visible"
           :id="id"
           @on-audit="handleAudit" />

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
                       width="140">
        <template slot-scope="scope">
          <el-button type="text"
                     v-if="handleStatus(scope.row.identifyStatus)"
                     @click="jumpAudit(scope.row.saveKey)">
            审核视频
          </el-button>
        </template>
      </el-table-column>
    </tables>
  </div>
</template>

<script>
import Audit from 'modules/pc/components/videoAudit/audit.vue';
import Tables from 'modules/pc/components/base/table.vue';

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
        prop: 'videoName',
        label: '视频名称'
      },
      {
        prop: 'spName',
        label: '企业名'
      },
      {
        prop: 'uploadUser',
        label: '上传人'
      },
      {
        prop: 'failedNum',
        label: '异常照片'
      },
      {
        prop: 'identifyNum',
        label: '待确认照片'
      },
      {
        prop: 'uploadTime',
        label: '视频上传时间'
      },
      {
        prop: 'identifyText',
        label: '状态'
      }
    ],
    visible: false,
    id: ''
  }),
  methods: {
    jumpAudit(id) {
      this.visible = true;
      this.id = id;
    },
    handleAudit() {
      this.$emit('submit');
    },
    handleStatus(identifyStatus) {
      if (identifyStatus === 2) {
        return false;
      } else if (identifyStatus === 6) {
        return false;
      }
      return true;
    }
  },
  components: {
    Tables,
    Audit
  }
};
</script>

<style scoped lang="scss"></style>
