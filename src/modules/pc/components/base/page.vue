<template>
  <el-pagination class="pageContainer"
                 @size-change="handleSizeChange"
                 @current-change="handleCurrentChange"
                 :current-page="currentPage"
                 :page-sizes="[10, 20, 50]"
                 :page-size="pageSize"
                 layout="total, sizes, prev, pager, next, jumper"
                 :total="total">
  </el-pagination>
</template>

<script>
export default {
  name: 'page',
  props: {
    pageSize: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleSizeChange(size) {
      this.$emit('update:pageSize', size);
      this.$nextTick(() => {
        this.$emit('handleSize', size);
      });
    },
    handleCurrentChange(page) {
      this.$emit('update:currentPage', page);
      this.$nextTick(() => {
        this.$emit('handlePage', page);
      });
    }
  }
};
</script>

<style scoped lang="scss">
.pageContainer {
  text-align: right;
  margin-top: 5px;
}
</style>

