<template>
  <div>
    <el-form :inline="true"
             :model="type">
      <el-form-item label="类型名称">
        <el-input v-model="type.name"
                  placeholder="请输入关键字查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-button @click="handleAddType"
                 icon="el-icon-fa-plus"
                 class="ghost">新建类型</el-button>
      <add-types :visible.sync="addType"
                 prefixTitle="添加"
                 @onSubmit="handleSubmit" />
    </div>
    <tables :data="listData"
            :loading="loading"
            @onSubmit="pageList" />
    <pages :current-page.sync="currentPage"
           :page-size.sync="pageSize"
           :total="total"
           @handlePage="changePage"
           @handleSize="changeSize" />
  </div>
</template>

<script>
import Tables from 'modules/pc/components/typeManagement/table.vue';
import AddTypes from 'modules/pc/components/typeManagement/addType.vue';
import Pages from 'modules/pc/components/base/page.vue';
import api from 'api/pc';

export default {
  name: 'typeManagement',
  data() {
    const myself = this;
    return {
      type: {
        name: ''
      },
      name: '',
      pageSize: 10,
      currentPage: 1,
      total: 0,
      tableData: [],
      loading: false,
      addType: false
    };
  },
  computed: {
    /* 渲染列表数据 */
    listData() {
      return this.tableData.map(elem => {
        return this.allData(elem);
      });
    }
  },
  created() {
    this.queryList();
  },
  methods: {
    handleAddType() {
      this.addType = true;
    },
    /* 全部列表渲染数据 */
    allData(data) {
      const {
        sort: orderNumber,
        name,
        description: detail,
        createUserName: publishPeople,
        createTime: publishTime,
        updateTime,
        groupId,
        id
      } = data;
      return {
        orderNumber,
        name,
        groupId,
        detail,
        publishPeople,
        publishTime,
        updateTime,
        id
      };
    },
    /* form搜索列表调用 */
    async queryList() {
      const { name } = this.type;
      this.name = name;
      this.currentPage = 1;
      const { pageSize } = this;
      /* 查询列表 */
      await this.handleQueryList({
        name,
        pageNo: '1',
        pageSize: `${pageSize}`
      });
    },
    async pageList() {
      const { name, pageSize, currentPage: pageNo } = this;
      await this.handleQueryList({
        name,
        pageNo: `${pageNo}`,
        pageSize: `${pageSize}`
      });
    },
    /* 点击页数调用 */
    async changePage() {
      await this.pageList();
    },
    /* 改变每页显示数量调用 */
    async changeSize() {
      await this.pageList();
    },
    /* 列表的ajax */
    async handleQueryList(data) {
      this.loading = true;
      await this.allRequest(data);
      this.loading = false;
    },
    /* 全部列表ajax */
    async allRequest(data) {
      await api
        .getVideoTypeList(data)
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
    onSubmit() {
      this.queryList();
    },
    async handleSubmit([data, callback]) {
      await api
        .addVideoType(data)
        .then(() => {
          callback(true);
          this.$store.dispatch({
            type: 'getVideoType',
            videoTypeUpdate: true
          });
          this.pageList();
        })
        .catch(message => {
          this.$alert(message, '错误', {
            confirmButtonText: '确定',
            type: 'warning'
          });
        });
      callback();
    }
  },
  components: {
    Tables,
    Pages,
    AddTypes
  }
};
</script>

<style lang="scss" scoped>

</style>
