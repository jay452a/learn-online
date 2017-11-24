<template>
  <div>
    <el-form :inline="true"
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
                   @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-button @click="handleAddVideo"
                 icon="el-icon-fa-plus"
                 class="ghost">添加视频资料</el-button>
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
import Tables from 'modules/pc/components/videoListManagement/table.vue';
import Pages from 'modules/pc/components/base/page.vue';
import api from 'api/pc';

export default {
  name: 'videoListManagement',
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
        classification: studyType,
        updateUserName: updatePeople,
        updateTime,
        title,
        type,
        materailsUrl,
        pushTime: publishTime,
        status,
        id,
        statusCode
      } = data;
      return {
        id,
        materailsUrl,
        statusCode,
        studyType,
        title,
        type,
        status,
        publishTime,
        updateTime,
        updatePeople
      };
    },
    /* form搜索列表调用 */
    async queryList() {
      const { name: title, type: classification } = this.study;
      this.type = classification;
      this.name = title;
      this.currentPage = 1;
      const { pageSize } = this;
      /* 查询列表 */
      await this.handleQueryList({
        title,
        classification,
        pageNo: '1',
        pageSize: `${pageSize}`
      });
    },
    async pageList() {
      const {
        name: title,
        type: classification,
        pageSize,
        currentPage: pageNo
      } = this;
      await this.handleQueryList({
        title,
        classification,
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
    onSubmit() {
      this.queryList();
    },
    handleAddVideo() {
      this.$router.push({
        name: 'addVideo'
      });
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
