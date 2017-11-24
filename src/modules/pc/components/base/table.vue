<template>
  <el-table ref="table"
            v-loading="loading"
            :element-loading-text="elementLoadingText"
            :empty-text="emptyText"
            :data="data"
            @selection-change="handleSelectionChange"
            :border="border">
    <slot></slot>
  </el-table>
</template>

<script>
export default {
  name: 'Table',
  inheritAttrs: false,
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    emptyText: {
      type: String,
      default: '无数据'
    },
    elementLoadingText: {
      type: String,
      default: '拼命加载中'
    },
    border: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit('selection-change', val);
    },
    toggleRowSelection(val, active) {
      this.$refs.table.toggleRowSelection(val, active);
    }
  }
};
</script>

<style lang="scss" scoped>

</style>


