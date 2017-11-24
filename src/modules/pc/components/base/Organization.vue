<template>
  <tree-select :tree-data="optionData"
               :tree-props="treeProps"
               v-model="dataValue"
               :multiple="multiple"
               :input-width="width">

  </tree-select>
</template>

<script>
import TreeSelect from './TreeSelect';
import { getOrganization } from 'api/leaveManager';

export default {
  components: {
    TreeSelect
  },
  props: {
    value: {},
    width: {
      type: Number
    },
    multiple: {
      type: Boolean,
      default: false
    },
    origin: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectOption: [],
      optionData: [],
      dataValue: this.value,
      treeProps: {
        children: 'children',
        label: 'label',
        level: 'level'
      }
    };
  },
  mounted() {
    if (this.origin) {
      getOrganization({}).then(data => {
        this.mapData(1, data);

        this.optionData = data;
      });
    } else {
      this.mapData(1, this.options);
      this.optionData = this.options;
    }
  },
  methods: {
    mapData(level, data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].children && data[i].children.length > 0) {
          console.log(data[i].label);
          this.mapData(level + 1, data[i].children);
          data[i].level = level;
        } else {
          data[i].level = level;
          data[i].children = [];
        }
      }
    }
  },
  watch: {
    dataValue(val) {
      this.$emit('input', val);
    },
    options(val) {
      this.mapData(1, val);
      this.optionData = val;
    }
  }
};
</script>
