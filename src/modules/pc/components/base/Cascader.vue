<template>
  <el-cascader class="custom-cascader"
               :options="optionData"
               v-model="selectOption"
               :clearable="true"
               @change="handleChange"
               change-on-select
               :show-all-levels="false"
               placeholder="选择组织架构"
               ref="elCascader">
  </el-cascader>
</template>

<script>
import { getOrganization } from 'api/leaveManager';
export default {
  props: {
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: String,
      default: ''
    },
    origin: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      selectOption: [],
      optionData: this.options,
      dataValue: this.value
    };
  },
  created() {
    if (this.origin) {
      getOrganization({}).then(data => {
        this.optionData = data;
      });
    }
  },
  methods: {
    handleChange(value) {
      console.log('value', value);
      if (value.length) {
        this.dataValue = value[value.length - 1];
        this.$emit('chose-submit', value[value.length - 1]);
      } else {
        this.dataValue = '';
        this.$emit('chose-submit', '');
      }
    }
  },
  watch: {
    value(val) {
      this.dataValue = val;
    },
    dataValue(val) {
      this.$emit('input', val);
    },
    options(val) {
      this.optionData = this.options;
    }
  }
};
</script>

<style>

</style>

<style lang="scss">
.custom-cascader .el-cascader__label {
  font-size: 12px;
}
</style>
