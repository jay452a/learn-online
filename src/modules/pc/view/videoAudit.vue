<template>
  <div>
    <el-form :inline="true"
             class="mb10"
             :model="audit">
      <el-form-item>
        <el-input v-model.trim="audit.name"
                  placeholder="企业名称/编号" />
      </el-form-item>
      <el-form-item>
        <el-input v-model.trim="audit.video"
                  placeholder="视频名称" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="audit.type">
          <el-option v-for="(elem, index) of auditType"
                     :key="index"
                     :label="elem.name"
                     :value="elem.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <tables :data="listData"
            :loading="loading"
            @submit="pageList" />
    <pages :current-page.sync="currentPage"
           :page-size.sync="pageSize"
           :total="total"
           @handlePage="changePage"
           @handleSize="changeSize" />
  </div>
</template>

<script>
import Tables from 'modules/pc/components/videoAudit/table.vue';
import Pages from 'modules/pc/components/base/page.vue';
import api from 'api/pc';

export default {
  name: 'videoAudit',
  data() {
    return {
      auditType: [
        {
          name: '全部状态',
          value: null
        },
        {
          name: '待审核',
          value: 1
        },
        {
          name: '审核通过',
          value: 2
        },
        {
          name: '审核不通过',
          value: 6
        }
      ],
      audit: {
        name: '',
        type: null,
        video: ''
      },
      name: '',
      type: null,
      video: '',
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
    this.queryList();
  },
  methods: {
    /* 全部列表渲染数据 */
    allData(data) {
      const {
        failedNum,
        identifyNum,
        identifyStatus,
        saveKey,
        spName,
        uploadTime,
        uploadUser,
        videoName
      } = data;
      let identifyText = '';
      switch (identifyStatus) {
        case 1:
          identifyText = '待审核';
          break;
        case 2:
          identifyText = '审核通过';
          break;
        case 6:
          identifyText = '审核不通过';
          break;
      }

      return {
        failedNum,
        identifyNum,
        identifyText,
        identifyStatus,
        saveKey,
        spName,
        uploadTime,
        uploadUser,
        videoName
      };
    },
    /* form搜索列表调用 */
    async queryList() {
      const {
        video: videoName,
        name: spName,
        type: identifyStatus
      } = this.audit;
      this.type = identifyStatus;
      this.name = spName;
      this.name = videoName;
      this.currentPage = 1;
      const { pageSize } = this;
      /* 查询列表 */
      await this.handleQueryList({
        spName,
        videoName,
        identifyStatus,
        pageNum: 1,
        pageSize
      });
    },
    async pageList() {
      const {
        name: spName,
        video: videoName,
        type: identifyStatus,
        pageSize,
        currentPage: pageNum
      } = this;
      await this.handleQueryList({
        spName,
        spName,
        videoName,
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
