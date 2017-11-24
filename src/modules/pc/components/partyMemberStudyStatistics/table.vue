<template>
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
                   @click="jumpDetails(scope.row.number)">
          详情
        </el-button>
      </template>
    </el-table-column>
  </tables>
</template>

<script>
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
        prop: 'name',
        label: '党员姓名'
      },
      {
        prop: 'superOrganizationName',
        label: '上级组织名称'
      },
      {
        prop: 'branchName',
        label: '党支部名称'
      },
      {
        prop: 'totalStudy',
        label: '总学习数'
      },
      {
        prop: 'completed',
        label: '已完成'
      },
      {
        prop: 'studyTotalTime',
        label: '总学习时长'
      },
      {
        prop: 'like',
        label: '点赞'
      },
      {
        prop: 'comment',
        label: '评论'
      }
    ]
  }),
  methods: {
    jumpDetails(number) {}
  },
  components: {
    Tables
  }
};
</script>

<style scoped lang="scss"></style>
