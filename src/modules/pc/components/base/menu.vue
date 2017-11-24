<template>
  <div class="page-content-container">
    <div class="content-crumbs">
      <span>您当前的位置：</span>
      <span class="crumb-item"
            v-for="(crumb, index) in crumbsData"
            :key="index">
            <span v-if="crumbsData.length > 1 && crumb.path">
              <router-link :to="{name:crumb.path}" v-text="crumb.name"/>
            </span>
            <span v-else v-text="crumb.name"/>
      </span>
    </div>
    <div class="content-wrp">
      <div class="content-menu">
        <ul>
          <li v-for="(item, index) in menuArray"
              :key="index"
              :class="{active: item.active}">

            <a href="javascript:;"
               @click="handleRoute(item.path, item.params)">{{item.name}}</a>

            <ul v-if="item.children">
              <li class="sub-li"
                  v-for="(item2, index) in item.children"
                  :key="index"
                  :class="{active: item2.active}">
                <a href="javascript:;"
                   @click="handleRoute(item2.path)">{{item2.name}}</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="content-main">
        <div class="page-title">{{title}}</div>
        <div class="content-main-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'menu',
  props: {
    title: {
      type: String,
      default: ''
    },
    menus: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      crumbs: [],
      menuArray: []
    };
  },
  computed: {
    crumbsData() {
      return this.crumbs.reverse();
    }
  },
  mounted() {
    this.crumbsFn();
  },
  methods: {
    findObject(data) {
      for (let i = 0; i < data.length; i++) {
        this.crumbs.push({ name: data[i].name });
        if (data[i].sub) {
          this.crumbs[this.crumbs.length - 1].path = data[i].path;
          this.sub(data[i].sub);
        }
        if (data[i].active) {
          return;
        } else if (data[i].children) {
          return this.findObject(data[i].children);
        } else {
          this.crumbs.shift();
        }
      }
    },
    crumbsFn(menu = this.menuArray) {
      this.crumbs.splice(0);
      this.findObject(menu);
    },
    handleRoute(path, params) {
      if (path) {
        this.$router.push({ name: path, params });
        this.menuArray.forEach(elem => {
          const { path: oldPath } = elem;
          if (oldPath === path) {
            elem.active = true;
          } else {
            elem.active = false;
          }
        });
        this.crumbsFn();
      }
    },
    activeMenu(title, menuArray = this.menuArray, parents) {
      for (let i = 0; i < menuArray.length; i++) {
        const elem = menuArray[i];
        const { name } = elem;
        if (name === title) {
          parents ? (parents.active = true) : (elem.active = true);
        } else if (elem.sub) {
          this.activeMenu(title, elem.sub, elem);
        }
      }
    },
    sub(sub) {
      const { title } = this;
      sub.forEach(({ name }) => {
        if (name === title) {
          this.crumbs.unshift({ name });
        }
      });
    }
  },
  watch: {
    menus: {
      handler(val) {
        this.menuArray = val;
      },
      immediate: true,
      deep: true
    },
    title: {
      handler(val) {
        this.activeMenu(val);
        this.crumbsFn();
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style scoped lang="scss">
@import '~styles/base/vars.scss';

.page-content-container {
  width: $content-container-width;
  margin: 0 auto 20px;
  background: #fff;

  .content-crumbs {
    font-size: 12px;
    line-height: 30px;
    padding-top: 15px;
    background: #f7f7f7;

    .crumb-item {
      & + .crumb-item {
        &:before {
          content: '>>';
          display: inline-block;
          margin: 0 5px;
        }
      }
    }
  }

  .content-wrp {
    border: 1px solid #dcdcdc;
    display: flex;

    .content-menu {
      width: 140px;
      border-right: 1px solid #dcdcdc;
      padding-top: 15px;
      padding-bottom: 20px;

      ul,
      li {
        list-style-type: none;
        margin: 0;
        padding: 0;
      }

      li {
        line-height: 42px;
        font-size: 14px;
        font-weight: normal;
        position: relative;

        &.active {
          &::before {
            background: #ec4740;
          }
          & > a {
            color: #ec4740;
          }
        }

        &:before {
          content: ' ';
          position: absolute;
          top: 4px;
          left: 0;
          width: 3px;
          height: 34px;
          background: #fff;
        }
      }

      a {
        display: block;
        position: relative;
        text-decoration: none;
        margin-left: 25px;
      }

      .sub-li a {
        padding-left: 15px;

        &:after {
          content: '';
          display: block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          position: absolute;
          top: 20px;
          left: 3px;
          background: #dcdcdc;
        }
      }
    }

    .content-main {
      flex: 1;
      width: 1058px;
      position: relative;
    }

    .page-title {
      height: 34px;
      line-height: 34px;
      font-size: 14px;
      background: #f5f5f5;
      padding-left: 15px;
      border-bottom: 1px solid #dcdcdc;
    }

    .content-main-body {
      padding: 20px;
    }
  }

  .el-loading-mask {
    z-index: 99 !important;
  }
}
</style>
