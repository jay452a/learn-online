<template>
  <tables ref="multipleTable"
          :loading="loading"
          :data="data"
          @selection-change="handleSelectionChange"
          style="width: 100%;">
    <el-table-column :show-overflow-tooltip="true"
                     v-for="(elem, index) of childData"
                     :key="index"
                     :width="elem.width"
                     :prop="elem.prop"
                     :label="elem.label">
    </el-table-column>
    <el-table-column type="selection"
                     width="55">
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
        label: '学习资料'
      },
      {
        prop: 'publishTime',
        label: '发布时间'
      }
    ]
  }),
  computed: {
    multipleSelection() {
      return this.$store.state.stickCourses;
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit('selection-change', val);
    },
    toggleRowSelection(data) {
      this.$nextTick(() => {
        data.forEach(elem => {
          const { id } = elem;
          const row = this.multipleSelection.some(
            ({ id: multipleSelectionId }) => id === multipleSelectionId
          );
          if (row) {
            this.$refs.multipleTable.toggleRowSelection(elem);
          }
        });
      });
    }
  },
  watch: {
    data(vals) {
      this.toggleRowSelection(vals);
    }
  },
  components: {
    Tables
  }
};
</script>

<style scoped lang="scss"></style>
