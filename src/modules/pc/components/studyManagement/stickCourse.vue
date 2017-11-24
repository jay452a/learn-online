<template>
  <transition-group name="list"
                    tag="ul">
    <li v-for="(item, index) of stickCourses"
        :key="item.id">
      <lazy-img class="lazyImg"
                :lazy="item.materailsPicture"
                :name="item.title" />
      <div class="detail">
        <h1>{{item.title}}</h1>
        <p>发布时间：{{item.pushTime}}</p>
        <p>发布部门：{{item.groupName}}</p>
        <p>类型：{{item.classification}}</p>
      </div>
      <div>
        <el-button :disabled="index === 0"
                   @click="handelBefore(index)">前移</el-button>
        <el-button :disabled="index === stickCourses.length - 1"
                   @click="handleAfter(index)">后移</el-button>
        <el-button @click="handleDelete(index, item.title)">删除</el-button>
      </div>
    </li>
  </transition-group>
</template>

<script>
import lazyImg from 'modules/pc/components/base/lazyImg.vue';

export default {
  name: 'stickCourse',
  computed: {
    stickCourses: {
      get() {
        return this.$store.state.stickCourses;
      },
      set(stickCourses) {
        this.$store.dispatch({
          type: 'setStickCourses',
          stickCourses
        });
      }
    }
  },
  methods: {
    handelBefore(index) {
      this.stickCourses.splice(
        index - 1,
        0,
        this.stickCourses.splice(index, 1).shift()
      );
    },
    handleAfter(index) {
      this.stickCourses.splice(
        index + 1,
        0,
        this.stickCourses.splice(index, 1).shift()
      );
    },
    handleDelete(index, name) {
      this.$confirm(`确认要在置顶中移除 ${name}?`, '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.stickCourses.splice(index, 1);
        })
        .catch(() => {});
    }
  },
  components: {
    lazyImg
  }
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
}

.detail {
  flex: 1;
  align-self: flex-start;

  h1 {
    font-size: 24px;
    line-height: 1;
  }

  * {
    word-break: break-all;
    margin-bottom: 5px;
  }
}

li {
  padding: 10px;
  background: #fff;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  transition: all 1s;

  .lazyImg {
    width: 220px;
    height: 124px;
    margin-right: 10px;
  }
}

// 自制动画
.list-enter {
  opacity: 0;
  transform: translateY(-30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>


