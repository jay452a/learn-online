<template>
  <div>
    <el-form ref="forms"
             style="width:500px;"
             :rules="rules"
             :model="form"
             label-width="80px">
      <el-form-item prop="fileName">
        <el-input v-model.trim="form.fileName"
                  placeholder="请输入视频URL">
          <el-select v-model="prefix"
                     slot="prepend"
                     class="select">
            <el-option v-for="(elem, index) of prefixArray"
                       :key="index"
                       :label="elem"
                       :value="elem" />
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="视频标题"
                    prop="title">
        <el-input placeholder="请您输入20字长的主题"
                  :maxlength="20"
                  v-model.trim="form.title" />
      </el-form-item>
      <el-form-item label="视频分类"
                    prop="classification">
        <el-select v-model="form.classification"
                   placeholder="请选择">
          <el-option v-for="(elem, index) of videoType"
                     :key="index"
                     :label="elem.name"
                     :value="elem.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="视频介绍"
                    prop="description">
        <el-input type="textarea"
                  :rows="3"
                  v-model.trim="form.description"
                  placeholder="请输入视频介绍" />
      </el-form-item>
    </el-form>
    <footer>
      <el-button type="primary"
                 @click="handleSubmit">保存</el-button>
    </footer>
  </div>
</template>

<script>
import api from 'api/pc';

export default {
  name: 'videoUrl',
  props: {
    videoType: {
      type: Array,
      default: () => []
    },
    detail: {
      type: Object,
      default: () => ({})
    },
    id: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const checkUrl = (rule, value, callback) => {
      const reg = /[-a-z\d@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-z\d@:%_\+.~#?&//=]*)/gi;

      if (!value) {
        return callback(new Error('请输入视频URL'));
      } else if (reg.test(value)) {
        return callback();
      }
      return callback(new Error('视频URL格式不正确'));
    };
    return {
      form: {
        type: '0',
        title: '',
        fileName: '',
        classification: '',
        description: ''
      },
      prefixArray: ['http://', 'https://'],
      prefix: 'http://',
      rules: {
        fileName: [{ required: true, validator: checkUrl, trigger: 'change' }],
        title: [{ required: true, message: '请输入视频标题', trigger: 'change' }],
        classification: [
          { required: true, message: '请选择视频分类', trigger: 'change' }
        ],
        description: [{ required: true, message: '请输入视频介绍', trigger: 'change' }]
      }
    };
  },
  computed: {
    materailsUrl() {
      return `${this.prefix}${this.form.fileName}`;
    }
  },
  methods: {
    handleSubmit() {
      const { type, title, classification, description } = this.form;
      const { materailsUrl } = this;
      const { id } = this;
      let data = {
        type,
        title,
        classification,
        materailsUrl,
        description
      };
      if (id) {
        data = { ...data, id };
      }

      this.$refs.forms.validate(async valid => {
        this.$emit('update:loading', true);
        if (valid) {
          await api
            .changeVideo(data)
            .then(() => {
              this.$router.push({
                name: 'videoListManagement'
              });
            })
            .catch(message => {
              this.$alert(message, '错误', {
                confirmButtonText: '确定',
                type: 'warning'
              });
            });
        }
        this.$emit('update:loading', false);
      });
    }
  },
  watch: {
    detail: {
      handler(vals) {
        if (!vals) {
          return;
        }
        const {
          classification = '',
          materailsUrl = '',
          title = '',
          description = ''
        } = vals;
        const matchArray = materailsUrl.match(/(^https?:\/\/)(.*)$/);
        let fileName = '';
        if (matchArray && matchArray.length) {
          this.prefix = matchArray[1];
          fileName = matchArray[2];
        }
        const form = this.form;
        form.title = title || form.title;
        form.description = description || form.description;
        form.classification = classification || form.classification;
        form.fileName = fileName || form.fileName;
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
.select {
  width: 100px;
}

footer {
  border-top: 1px dashed #ccc;
  text-align: center;
  padding: 10px 0;
}
</style>


