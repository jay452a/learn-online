<template>
  <div>
    <ChangeType v-if="isShow"
                :visible.sync="isShow"
                prefixTitle="编辑"
                :detail="detail"
                :name="name"
                :orderNumber="orderNumber"
                @onSubmit="handleSubmit" />
    <tables :loading="loading"
            :data="data"
            style="width: 100%">
      <el-table-column :show-overflow-tooltip="true"
                       v-for="(elem, index) of childData"
                       :key="index"
                       :width="elem.width"
                       :prop="elem.prop"
                       :label="elem.label">
      </el-table-column>
      <el-table-column label="操作"
                       width="100">
        <template slot-scope="scope">
          <div v-if="scope.row.groupId !== 'admin'">
            <el-button type="text"
                       @click="handleEdit(scope.row)">
              编辑
            </el-button>
            <el-button type="text"
                       @click="handleDelete(scope.row.id)"
                       v-cloak>
              {{deleteText}}
            </el-button>
          </div>
        </template>
      </el-table-column>
    </tables>
  </div>
</template>

<script>
import Tables from 'modules/pc/components/base/table.vue';
import ChangeType from 'modules/pc/components/typeManagement/addType.vue';
import api from 'api/pc';

export default {
  name: 'table',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    childData: [
      {
        prop: 'orderNumber',
        label: '排序号',
        width: '70'
      },
      {
        prop: 'name',
        label: '类型名称'
      },
      {
        prop: 'detail',
        label: '类型说明'
      },
      {
        prop: 'publishPeople',
        label: '发布人'
      },
      {
        prop: 'publishTime',
        label: '发布时间'
      },
      {
        prop: 'updateTime',
        label: '更新时间'
      }
    ],
    orderNumber: '',
    detail: '',
    name: '',
    id: '',
    isShow: false,
    deleteText: '删除'
  }),
  methods: {
    handleEdit(data) {
      this.isShow = true;
      this.orderNumber = data.orderNumber;
      this.detail = data.detail;
      this.name = data.name;
      this.id = data.id;
    },
    handleDelete(id) {
      this.$confirm(`您确认将${this.deleteText}该类型？`, `${this.deleteText}提示`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await api
            .deleteVideoType({ id })
            .then(() => {
              this.$message({
                message: `类型${this.deleteText}成功`,
                type: 'success'
              });
              this.$store.dispatch({
                type: 'getVideoType',
                videoTypeUpdate: true
              });
              this.$emit('onSubmit');
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
    async handleSubmit([data, callback]) {
      const { id } = this;
      await api
        .changeVideoType({ id, ...data })
        .then(() => {
          callback(true);
          this.$store.dispatch({
            type: 'getVideoType',
            videoTypeUpdate: true
          });
          this.$emit('onSubmit');
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
    ChangeType
  }
};
</script>

<style scoped lang="scss"></style>
