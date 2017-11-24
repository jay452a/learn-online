<template>
  <article>
    <div class="preview">
      <lazyImg :lazy="getPreview" />
    </div>
    <div class="content">
      <el-collapse v-model="activeNames">
        <el-collapse-item :title="resolveTitle"
                          name="resolve">
          <infinite-scroll-images :loadMore="handleResolve"
                                  :total.sync="resolveTatal" />
        </el-collapse-item>
        <el-collapse-item :title="abnormalTitle"
                          name="abnormal">
          <infinite-scroll-images :loadMore="handleAbnormal"
                                  :total.sync="abnormalTatal" />
        </el-collapse-item>
      </el-collapse>
    </div>
  </article>
</template>

<script>
import api from 'api/pc';
import LazyImg from 'modules/pc/components/base/lazyImg.vue';
import InfiniteScrollImages from './scrollImages';

export default {
  name: 'auditImg',
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      activeNames: ['resolve', 'abnormal'],
      resolveTatal: 0,
      abnormalTatal: 0
    };
  },
  computed: {
    resolveTitle() {
      return `待确认照片（${this.resolveTatal}）`;
    },
    abnormalTitle() {
      return `异常照片（${this.abnormalTatal}）`;
    },
    getPreview() {
      return this.$store.state.preview;
    }
  },
  beforeDestroy() {
    this.$store.dispatch({
      type: 'getPreview',
      preview: ''
    });
  },
  methods: {
    async handleResolve({ pageNum, pageSize }) {
      const { id: key } = this;
      return await api.getimages({
        key,
        type: 3,
        pageApply: true,
        pageNum,
        pageSize
      });
    },
    async handleAbnormal({ pageNum, pageSize }) {
      const { id: key } = this;
      return await api.getimages({
        key,
        type: 4,
        pageApply: true,
        pageNum,
        pageSize
      });
    }
  },
  components: {
    InfiniteScrollImages,
    LazyImg
  }
};
</script>

<style lang="scss" scoped>
article {
  display: flex;
  min-height: 250px;
}
.preview,
.content {
  flex: 1;
}

.preview {
  display: flex;
  align-items: center;
  padding: 0 10px;
}
</style>


