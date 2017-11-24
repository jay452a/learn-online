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
        prop: 'title',
        label: '学习资料标题'
      },
      {
        prop: 'classification',
        label: '分类'
      },
      {
        prop: 'pushTime',
        label: '发布时间'
      },
      {
        prop: 'learnCount',
        label: '正在学习人数'
      },
      {
        prop: 'finishCount',
        label: '已完成人数'
      },
      {
        prop: 'praiseCount',
        label: '点赞'
      },
      {
        prop: 'commentCount',
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
