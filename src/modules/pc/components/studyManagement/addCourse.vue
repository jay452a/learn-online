<template>
  <Barrier title="添加课程"
           :visible.sync="dialogVisible"
           @close="handleClose"
           @submit="handlePass"
           :isLoading="true">
    <el-form :inline="true"
             class="mb10"
             :model="form"
             label-width="80px">
      <el-form-item>
        <el-select v-model="form.type">
          <el-option v-for="(elem, index) of studyType"
                     :key="index"
                     :label="elem.name"
                     :value="elem.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model.trim="form.name"
                  placeholder="请输入关键字查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div style="height:240px;overflow:auto;">
      <tables :data="listData"
              :loading="loading"
              @selection-change="handleSelectionChange" />
    </div>
  </Barrier>
</template>

<script>
import Tables from 'modules/pc/components/studyManagement/table.vue';
import Barrier from 'modules/pc/components/base/barrier.vue';
import api from 'api/pc';

export default {
  name: 'addCourse',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        name: '',
        type: ''
      },
      tableData: [],
      loading: false,
      multipleSelection: []
    };
  },
  mounted() {
    this.$store.dispatch({
      type: 'getVideoType'
    });
    this.queryList();
  },
  computed: {
    /* 渲染列表数据 */
    listData() {
      return this.tableData.map(elem => {
        return this.allData(elem);
      });
    },
    studyType() {
      return this.$store.state.videoType;
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /* 全部列表渲染数据 */
    allData(data) {
      const {
        classification: studyType,
        updateUserName: updatePeople,
        updateTime,
        title,
        type,
        pushTime: publishTime,
        status,
        id
      } = data;
      return {
        id,
        studyType,
        title,
        type,
        status,
        publishTime,
        updateTime,
        updatePeople
      };
    },
    async queryList() {
      const { name: title, type: classification } = this.form;
      /* 查询列表 */
      await this.handleQueryList({
        title,
        classification,
        status: 3,
        pageNo: '1',
        pageSize: '99999'
      });
    },
    /* 列表的ajax */
    async handleQueryList(data) {
      this.loading = true;
      await this.allRequest(data);
      this.loading = false;
    },
    async allRequest(data) {
      await api
        .getVideoList(data)
        .then((data = { results: [], totalRecord: 0 }) => {
          const { results, totalRecord } = data;
          this.tableData = results;
          this.total = totalRecord;
        })
        .catch(message => {
          this.$alert(message, '错误', {
            confirmButtonText: '确定',
            type: 'warning'
          });
        });
    },
    handlePass(callback) {
      const { multipleSelection: stickCourses } = this;
      setTimeout(async () => {
        await this.$store
          .dispatch({
            type: 'addStickCourses',
            stickCourses
          })
          .then(() => {
            this.handleClose();
          })
          .catch(message => {
            this.$alert(message, '错误', {
              confirmButtonText: '确定',
              type: 'warning'
            });
          });
        callback();
      }, 500);
    },
    handleClose() {
      this.dialogVisible = false;
    },
    onSubmit() {
      this.queryList();
    }
  },
  components: {
    Barrier,
    Tables
  }
};
</script>

<style lang="scss" scoped>

</style>

