<template>
  <div class="course"
       v-loading.fullscreen.lock="loading"
       element-loading-text="保存中...">
    <header>
      <h1>置顶课程最多可以设置6个</h1>
      <el-button @click="handleSave"
                 type="primary">保存设置</el-button>
    </header>
    <div>
      <stick-course />
    </div>
    <footer>
      <el-button @click="visible = true"
                 icon="el-icon-circle-plus-outline"
                 class="ghost">添加置顶课程</el-button>
    </footer>
    <add-course :visible.sync="visible"
                v-if="visible" />
  </div>
</template>

<script>
import StickCourse from 'modules/pc/components/studyManagement/stickCourse.vue';
import AddCourse from 'modules/pc/components/studyManagement/addCourse.vue';
import api from 'api/pc';

export default {
  name: 'studyManagement',
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      api
        .getStickList()
        .then(data => {
          vm.$store.dispatch({
            type: 'setStickCourses',
            stickCourses: data
          });
        })
        .catch(message => {
          vm.$alert(message, '错误', {
            confirmButtonText: '确定',
            type: 'warning'
          });
        });
    });
  },
  data: () => ({
    visible: false,
    loading: false
  }),
  computed: {
    stickCourses() {
      return this.$store.state.stickCourses;
    }
  },
  methods: {
    async handleSave() {
      const list = this.stickCourses.map(({ id }) => ({ materailsId: id }));
      this.loading = true;
      await api
        .saveStickList({
          list
        })
        .then(() => {
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
        })
        .catch(message => {
          this.$alert(message, '错误', {
            confirmButtonText: '确定',
            type: 'warning'
          });
        });
      this.loading = false;
    }
  },
  components: {
    StickCourse,
    AddCourse
  }
};
</script>

<style lang="scss" scoped>
.course {
  padding: 0 20px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0 20px;
  h1 {
    font-size: 14px;
  }
}

footer {
  padding: 10px 0;
}
</style>


