<template>
  <div>
    <el-form :inline="true"
             :model="study">
      <el-form-item label="所属党组织">
        <el-input v-model="study.name"
                  placeholder="请输入学习资料名称"></el-input>
      </el-form-item>
      <el-form-item label="党员姓名">
        <el-input v-model="study.name"
                  placeholder="请输入学习资料名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div style="text-align: right;">
      <el-button type="primary"
                 style="margin:10px 0;">导出当前数据</el-button>
    </div>
    <tables :data="listData"
            :loading="loading" />
    <pages :current-page.sync="currentPage"
           :page-size.sync="pageSize"
           :total="total"
           @handlePage="changePage"
           @handleSize="changeSize" />
  </div>
</template>

<script>
import Tables from 'modules/pc/components/partyMemberStudyStatistics/table.vue';
import Pages from 'modules/pc/components/base/page.vue';
import api from 'api/pc';

export default {
  name: 'partyMemberStudyStatistics',
  data() {
    return {
      study: {
        name: '',
        type: ''
      },
      name: '',
      type: '',
      pageSize: 10,
      currentPage: 1,
      total: 0,
      tableData: [],
      loading: false
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
    //  this.queryList()
  },
  methods: {
    /* 全部列表渲染数据 */
    allData(data) {
      const {
        suiteId: number,
        suiteName: name,
        suiteId,
        version,
        spName: enterprise,
        groupName: develop,
        createDate: time,
        auditStatus,
        id
      } = data;
      let statusText = '';
      switch (+auditStatus) {
        case 1:
          statusText = '审核中';
          break;
        case 2:
          statusText = '通过';
          break;
        case 3:
          statusText = '不通过';
          break;
      }
      return {
        id,
        number,
        name,
        version,
        suiteId,
        enterprise,
        develop,
        status: +auditStatus,
        time,
        statusText
      };
    },
    /* form搜索列表调用 */
    async queryList() {
      const { type, name } = this.study;
      this.type = type;
      this.name = name;
      this.currentPage = 1;
      const { pageSize } = this;
      /* 查询列表 */
      await this.handleQueryList({
        name,
        type,
        pageNumber: 1,
        pageSize
      });
    },
    async pageList() {
      const { name, type, pageSize, currentPage: pageNumber } = this;
      await this.handleQueryList({
        name,
        type,
        pageNumber,
        pageSize
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
        .getAuditList(data)
        .then((data = { list: [], total: 0 }) => {
          const { list, total } = data;
          this.tableData = list;
          this.total = total;
        })
        .catch(message => {
          this.$alert(message, '错误', {
            confirmButtonText: '确定',
            type: 'warning'
          });
        });
    },
    onSubmit() {
      console.log('submit!');
    }
  },
  components: {
    Tables,
    Pages
  }
};
</script>

<style lang="scss" scoped>

</style>
