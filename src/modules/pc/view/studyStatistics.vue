<template>
  <div>
    <el-form :inline="true"
             class="mb10"
             :model="study">
      <el-form-item label="学习类型">
        <el-select v-model="study.type">
          <el-option v-for="(elem, index) of studyType"
                     :key="index"
                     :label="elem.name"
                     :value="elem.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学习资料名称">
        <el-input v-model="study.name"
                  placeholder="请输入学习资料名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
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
import Tables from 'modules/pc/components/studyStatistics/table.vue';
import Pages from 'modules/pc/components/base/page.vue';
import api from 'api/pc';

export default {
  name: 'studyStatistics',
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      vm.$store.dispatch({
        type: 'getVideoType'
      });

      vm.queryList();
    });
  },
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
    },
    studyType() {
      return this.$store.state.videoType;
    }
  },
  methods: {
    /* 全部列表渲染数据 */
    allData(data) {
      const {
        classification,
        commentCount,
        finishCount,
        id,
        learnCount,
        praiseCount,
        pushTime,
        title
      } = data;
      return {
        classification,
        commentCount,
        finishCount,
        id,
        learnCount,
        praiseCount,
        pushTime,
        title
      };
    },
    /* form搜索列表调用 */
    async queryList() {
      const { type: classification, name } = this.study;
      this.type = classification;
      this.name = name;
      this.currentPage = 1;
      const { pageSize } = this;
      /* 查询列表 */
      await this.handleQueryList({
        name,
        classification,
        pageNum: 1,
        pageSize
      });
    },
    async pageList() {
      const {
        name,
        type: classification,
        pageSize,
        currentPage: pageNum
      } = this;
      await this.handleQueryList({
        name,
        classification,
        pageNum,
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
        .getStatistics(data)
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
      this.queryList();
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
