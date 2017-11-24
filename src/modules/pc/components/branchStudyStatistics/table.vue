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
        label: '党组织名称'
      },
      {
        prop: 'branchTotal',
        label: '支部总数'
      },
      {
        prop: 'total',
        label: '党员总数'
      },
      {
        prop: 'studyPeople',
        label: '参加学习人数'
      },
      {
        prop: 'study',
        label: '参学率'
      },
      {
        prop: 'average',
        label: '平均学习数'
      },
      {
        prop: 'averageTime',
        label: '平均学习时长'
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
  components: {
    Tables
  }
};
</script>

<style scoped lang="scss"></style>
