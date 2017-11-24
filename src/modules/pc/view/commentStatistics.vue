<template>
  <div>
    <el-form :inline="true"
             class="mb10"
             :model="comment">
      <el-form-item label="评论内容">
        <el-input v-model="comment.name"
                  placeholder="请输入关键字查询"></el-input>
      </el-form-item>
      <el-form-item label="评论时间">
        <el-date-picker :editable="false"
                        v-model="comment.startTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="开始日期"
                        :picker-options="startTimeOptions">
        </el-date-picker>
        -
        <el-date-picker :editable="false"
                        v-model="comment.endTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="结束日期"
                        :picker-options="endTimeOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <tables :data="listData"
            :loading="loading"
            @selection-change="handleSelectionChange" />
    <el-button style="float: left;margin-top: 5px;"
               icon="el-icon-delete"
               :disabled="!multipleSelection"
               @click="handleDelete">批量删除</el-button>
    <pages :current-page.sync="currentPage"
           :page-size.sync="pageSize"
           :total="total"
           @handlePage="changePage"
           @handleSize="changeSize" />
  </div>
</template>

<script>
import Tables from 'modules/pc/components/commentStatistics/table.vue';
import Pages from 'modules/pc/components/base/page.vue';
import api from 'api/pc';

export default {
  name: 'commentStatistics',
  data() {
    const myself = this;
    return {
      comment: {
        name: '',
        startTime: '',
        endTime: ''
      },
      multipleSelection: '',
      name: '',
      startTime: '',
      endTime: '',
      pageSize: 10,
      currentPage: 1,
      total: 0,
      tableData: [],
      loading: false,
      startTimeOptions: {
        disabledDate(time) {
          const { comment: { endTime } } = myself;
          if (endTime) {
            return time.getTime() > new Date(endTime);
          }
          return false;
        }
      },
      endTimeOptions: {
        disabledDate(time) {
          const { comment: { startTime } } = myself;
          if (startTime) {
            return time.getTime() < new Date(startTime);
          }
          return false;
        }
      }
    };
  },
  computed: {
    /* 渲染列表数据 */
    listData() {
      return this.tableData.map(elem => {
        return this.allData(elem);
      });
    },
    spId() {
      return this.$store.state.spId;
    }
  },
  created() {
    this.$store
      .dispatch({
        type: 'getSpId'
      })
      .then(() => {
        this.queryList();
      })
      .catch(() => {});
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val.map(({ id }) => id).join();
    },
    handleDelete() {
      this.$confirm(`确认要删除该条评论?`, '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          api
            .deleteComment({
              commentIds: this.multipleSelection,
              flag: '1'
            })
            .then(() => {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.pageList();
            })
            .catch(message => {
              this.$alert(message, '错误', {
                confirmButtonText: '确定',
                type: 'warning'
              });
            });
        })
        .catch(() => {});
    },
    /* 全部列表渲染数据 */
    allData(data) {
      const { content, commentAuthor, commentTime, id, title } = data;

      return {
        content,
        commentAuthor,
        commentTime,
        id,
        title
      };
    },
    /* form搜索列表调用 */
    async queryList() {
      const { startTime: beginTime, endTime, name: content } = this.comment;
      const { spId } = this;
      this.startTime = beginTime;
      this.endTime = endTime;
      this.name = content;
      this.currentPage = 1;
      const { pageSize: limit } = this;
      /* 查询列表 */
      await this.handleQueryList({
        beginTime,
        endTime,
        content,
        spId,
        page: 1,
        limit
      });
    },
    async pageList() {
      const {
        startTime: beginTime,
        endTime,
        name: content,
        pageSize: limit,
        currentPage: page,
        spId
      } = this;
      await this.handleQueryList({
        beginTime,
        endTime,
        content,
        spId,
        page,
        limit
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
        .getCommentList(data)
        .then((data = { list: [], total: 0 }) => {
          const { list, total } = data;
          this.tableData = list;
          this.total = +total;
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
