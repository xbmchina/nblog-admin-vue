<template>
  <div class="container"> 
    <el-form ref="form" :model="form">
      <el-row style="margin-top: 3px;">
        <el-col :span="2">
          <el-select v-model="form.origin" placeholder="类型">
            <el-option
              v-for="item in originOpts"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="18">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="danger" @click="onSubmit">发布文章</el-button>
            <el-button @click="returnBack">返回</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top: 3px;margin-bottom: 3px;"  :gutter="20">
        <el-col :span="4">
          <el-select v-model="form.specialId" placeholder="发布专栏">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="20">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新增</el-button>
        </el-col>
      </el-row>
      <div id="editor">
        <mavon-editor v-model="form.content"  :ishljs = "true" style="height: 100%"></mavon-editor>
      </div>
    </el-form>
  </div>
</template>
<script>
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  import { addArticle,getArticle } from '@/api/article'

  export default {
    name: 'editor',
    components: {
      mavonEditor
    },
    data() {
      return {
        id: this.$route.params.id,
        title: '',
        form: {
          origin: '',
          title: '',
          specialId: '',
          content: ''
        },
        originOpts: [{
          value: 0,
          label: '原创'
        },{
          value: 1,
          label: '转载'
        },{
          value: 2,
          label: '翻译'
        }],
        options: [{
          value: 1,
          label: '黄金糕'
        }, {
          value: 2,
          label: '双皮奶'
        }, {
          value: 3,
          label: '蚵仔煎'
        }, {
          value: 4,
          label: '龙须面'
        }, {
          value: 5,
          label: '北京烤鸭'
        }],
        value: '',
         dynamicTags: ['标签一', '标签二', '标签三'],
        inputVisible: false,
        inputValue: ''
      }
    },
    mounted() {
      console.log("xxxxx"+this.id);
      var id =  this.id;
      if(id != null && id != undefined && id != ''){
        this.fetchData({"id":id});
      }
    },
     methods: {
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      
      onSubmit() {
        console.log('submit!');
        if(this.form.title != undefined && this.form.content != undefined 
        && this.form.title != '' && this.form.content != '') {
          addArticle(this.form).then(response => {
            console.log(response);
            this.returnBack();
          });
        }

      },
      returnBack() {
         this.$router.push({name: 'Article'});
      },
      fetchData(params) {
        console.log('fetchData!');
        getArticle(params).then(response => {
          console.log(response);
          this.form = response.data;
        });
      }
    }
  }
</script>
<style>
  #editor {
    margin: auto;
    /* width: 80%; */
    height: 580px;
    /* margin-top: 5rem; */
  }

  .container {
    padding: 10px;
    /* text-align: center; */
  }

  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
