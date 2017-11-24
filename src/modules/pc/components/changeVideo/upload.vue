<template>
  <div>
    <el-form ref="forms"
             style="width:500px;"
             :rules="rules"
             :model="form"
             label-width="80px">
      <el-form-item prop="fileName">
        <el-input v-model="form.fileName"
                  readonly>
          <div id="container"
               slot="append">
            <el-button id="pickfiles">浏览</el-button>
          </div>
        </el-input>
        <input type="hidden"
               v-model="form.materailsUrl" />
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
                 :disabled="disabled"
                 @click="handleUpload"
                 id="start_upload">保存</el-button>
    </footer>
  </div>
</template>

<script>
import api from 'api/pc';
const Qinius = import(/* webpackChunkName: "Qinius" */
/* webpackMode: "lazy" */
'modules/pc/components/changeVideo/qiniu.js').then(data => data.default);

export default {
  name: 'upload',
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
    return {
      form: {
        type: '0',
        title: '',
        classification: '',
        materailsUrl: '',
        description: '',
        fileName: ''
      },
      uploader: {},
      disabled: true,
      rules: {
        fileName: [{ required: true, message: '请选择本地上传视频', trigger: 'change' }],
        title: [{ required: true, message: '请输入视频标题', trigger: 'change' }],
        classification: [
          { required: true, message: '请选择视频分类', trigger: 'change' }
        ],
        description: [{ required: true, message: '请输入视频介绍', trigger: 'change' }]
      }
    };
  },
  computed: {
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
        Qinius.then(data => {
          if (data.every(elem => elem)) {
            this.getUploadToken();
            this.disabled = false;
            return;
          }
        }).catch(message => {
          this.$alert(message, '错误', {
            confirmButtonText: '确定',
            type: 'warning'
          });
        });
      })
      .catch(() => {});
  },
  methods: {
    handleUpload() {
      this.$refs.forms.validate(valid => {
        if (valid) {
          if (this.form.materailsUrl && this.form.fileName) {
            this.handleSubmit();
            return;
          }
          this.uploader.start();
        } else {
          return false;
        }
      });
    },
    getUploadToken() {
      this.uploader = this.qiniuConfig();
    },
    qiniuConfig() {
      const uptoken_url = api.getUploadToken(this.spId);
      return Qiniu.uploader({
        disable_statistics_report: false,
        runtimes: 'html5,flash,html4',
        browse_button: 'pickfiles',
        container: 'container',
        drop_element: 'container',
        max_file_size: '10000mb',
        flash_swf_url: 'bower_components/plupload/js/Moxie.swf',
        dragdrop: true,
        chunk_size: '4mb',
        multi_selection: !(moxie.core.utils.Env.OS.toLowerCase() === 'ios'),
        uptoken_url,
        domain: 'http://owv621rl3.bkt.clouddn.com/',
        get_new_uptoken: true,
        max_retries: 3,
        unique_names: true,
        auto_start: false,
        log_level: 5,
        init: {
          FilesAdded: (up, files) => {
            this.form.fileName = files[0].name;
          },
          BeforeUpload: (up, file) => {
            this.$emit('update:loading', true);
          },
          FileUploaded: (up, file, info) => {
            this.form.materailsUrl = JSON.parse(info).key;
            this.handleSubmit();
          },
          Error: (up, err, errTip) => {
            this.$alert(errTip, '错误', {
              confirmButtonText: '确定',
              type: 'warning'
            });
            this.$emit('update:loading', false);
          }
        }
      });
    },
    handleSubmit() {
      const {
        type,
        title,
        classification,
        materailsUrl,
        fileName: materailsAlias,
        description
      } = this.form;
      const { id } = this;
      let data = {
        type,
        title,
        materailsAlias,
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
          description = '',
          materailsAlias = ''
        } = vals;
        const form = this.form;
        form.title = title || form.title;
        form.description = description || form.description;
        form.classification = classification || form.classification;
        form.fileName = materailsAlias || form.fileName;
        form.materailsUrl = materailsUrl || form.materailsUrl;
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
footer {
  border-top: 1px dashed #ccc;
  text-align: center;
  padding: 10px 0;
}
</style>


