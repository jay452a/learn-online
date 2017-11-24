<template>
  <el-dialog :title="title"
             :visible.sync="dialogVisible"
             v-loading="loading"
             :element-loading-text="loadingText"
             @close="handleClose()"
             center>
    <slot></slot>
    <article slot="footer"
             class="dialog-footer">
      <el-button @click="handleClose()"
                 v-text="closeButton"></el-button>
      <el-button type="primary"
                 @click="handleReport()"
                 v-text="reportButton"></el-button>
    </article>
  </el-dialog>
</template>

<script>
export default {
  name: 'barrier',
  props: {
    title: {
      type: String,
      default: '标题'
    },
    visible: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String,
      default: '提交中...'
    },
    closeButton: {
      type: String,
      default: '取消'
    },
    reportButton: {
      type: String,
      default: '确定'
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false
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
  methods: {
    handleClose() {
      this.$emit('close');
    },
    handleReport() {
      if (this.isLoading) {
        this.loading = true;
        this.handleSubmit(() => {
          this.loading = false;
        });
      } else {
        this.handleSubmit();
      }
    },
    handleSubmit(callback = function() {}) {
      this.$emit('submit', callback);
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog-footer {
  border-top: 1px dashed #ccc;
  padding-top: 10px;
}
</style>

