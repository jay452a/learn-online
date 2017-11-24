<template>
  <tables :loading="loading"
          :data="data"
          style="width: 100%"
          @selection-change="handleSelectionChange">
    <el-table-column type="selection"
                     width="55">
    </el-table-column>
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
        prop: 'content',
        label: '评论内容'
      },
      {
        prop: 'title',
        label: '学习资料'
      },
      {
        prop: 'commentTime',
        label: '评论日期'
      },
      {
        prop: 'commentAuthor',
        label: '评论者'
      }
    ]
  }),
  methods: {
    handleSelectionChange(val) {
      this.$emit('selection-change', val);
    }
  },
  components: {
    Tables
  }
};
</script>

<style scoped lang="scss"></style>
