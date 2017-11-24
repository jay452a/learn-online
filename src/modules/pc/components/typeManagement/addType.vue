<template>
  <Barrier :title="title"
           :visible.sync="dialogVisible"
           @close="handleClose"
           @submit="handlePass"
           :isLoading="true">
    <el-form ref="form"
             :model="form"
             :rules="rules"
             label-width="80px">
      <el-form-item label="类型名称"
                    prop="name">
        <el-input v-model.trim="form.name"
                  placeholder="请输入类型名称"></el-input>
      </el-form-item>
      <el-form-item label="类型说明"
                    prop="detail">
        <el-input v-model.trim="form.detail"
                  type="textarea"
                  :rows="3"
                  :maxlength="150"
                  placeholder="请输入类型说明"></el-input>
      </el-form-item>
      <el-form-item label="序号"
                    required
                    prop="orderNumber">
        <el-input v-model.trim="form.orderNumber"
                  placeholder="请输入1-99之间的数字"></el-input>
      </el-form-item>
    </el-form>
  </Barrier>
</template>

<script>
import Barrier from 'modules/pc/components/base/barrier.vue';

export default {
  name: 'addType',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    prefixTitle: {
      type: String,
      default: ''
    },
    detail: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    orderNumber: {
      type: String,
      default: ''
    }
  },
  data() {
    const validateOrderNumber = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入序号'));
      } else if (value !== '0' && /^\d{1,2}$/.test(value)) {
        callback();
      } else {
        callback(new Error('请输入正确的格式'));
      }
    };
    return {
      form: {
        detail: '',
        name: '',
        orderNumber: ''
      },
      rules: {
        orderNumber: [
          {
            validator: validateOrderNumber,
            trigger: 'change'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入类型名称',
            trigger: 'change'
          }
        ]
      }
    };
  },
  computed: {
    title() {
      return `${this.prefixTitle}类型`;
    },
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
    handlePass(callback) {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.handleSubmit(callback);
        } else {
          callback();
          return false;
        }
      });
    },
    handleClose() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    handleSubmit(callback) {
      const { detail: description, orderNumber: sort, name } = this.form;
      this.$emit('onSubmit', [
        {
          description,
          sort,
          name
        },
        isClose => {
          if (isClose) {
            this.handleClose();
          }
          callback();
        }
      ]);
    }
  },
  watch: {
    detail: {
      handler(val) {
        this.form.detail = val;
      },
      immediate: true
    },
    name: {
      handler(val) {
        this.form.name = val;
      },
      immediate: true
    },
    orderNumber: {
      handler(val) {
        this.form.orderNumber = val;
      },
      immediate: true
    }
  },
  components: {
    Barrier
  }
};
</script>

<style lang="scss" scoped>

</style>


