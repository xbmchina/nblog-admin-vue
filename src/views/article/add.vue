<template>
  <div class="container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-row>
        <el-col :span="4">
          <el-form-item label="类型">
            <el-select v-model="form.origin" placeholder="类型">
              <el-option
                v-for="item in originOpts"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="标题">
            <el-input v-model="form.title" placeholder="请输入标题"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4" style="margin-left:10px;">
          <el-button type="danger" @click="onSubmit">发布文章</el-button>
          <el-button @click="returnBack">返回</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="摘要">
          <el-col :span="20">
            <el-input v-model="form.shortcut" placeholder="请输入摘要"></el-input>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row style="margin-top: 3px;margin-bottom: 3px;" :gutter="20">
        <el-col :span="6">
          <el-form-item label="专栏">
            <el-select v-model="form.specialId" placeholder="发布专栏">
              <el-option
                v-for="item in specailOpts"
                :key="item.name"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="分类">
            <el-select v-model="form.categoryId" placeholder="分类">
              <el-option
                v-for="item in categoryOpts"
                :key="item.name"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

    <el-col :span="6">
          <el-form-item label="题图">
            <el-input v-model="form.img" placeholder="请输入题图"></el-input>
          </el-form-item>
        </el-col>

      <!--  <el-col :span="16">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >{{tag}}</el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          ></el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新增</el-button>
        </el-col> -->
      </el-row>
      <div id="editor" style="width:94%;">
        <mavon-editor
          ref="md"
          @imgAdd="$imgAdd"
          v-model="form.content"
          :ishljs="true"
          style="height: 100%"
        ></mavon-editor>
      </div>
    </el-form>
  </div>
</template>
<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { addArticle, getArticle, uploadImg } from "@/api/article";
import { getList } from "@/api/special";
import { getCategoryList } from '@/api/category';

export default {
  name: "editor",
  components: {
    mavonEditor
  },
  data() {
    return {
      id: this.$route.params.id,
      title: "",
      form: {
        origin: "",
        title: "",
        shortcut: "",
        specialId: "",
        categoryId: "",
        content: "",
        img:""
      },
      originOpts: [
        {
          value: 0,
          label: "原创"
        },
        {
          value: 1,
          label: "转载"
        },
        {
          value: 2,
          label: "翻译"
        }
      ],
      specailOpts: [],
      categoryOpts: [],
      value: "",
      dynamicTags: [],
      inputVisible: false,
      inputValue: ""
    };
  },
  mounted() {
    var id = this.id;
    if (id != null && id != undefined && id != "") {
      this.fetchData({ id: id });
    }
    this.getSpecialList();
    this.getCateList();
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    getSpecialList(params) {
      getList(params).then(response => {
        if (response.code == 200) {
          this.specailOpts = response.data.data;
        }
      });
    },
    getCateList(params) {
      getCategoryList(params).then(response => {
        if (response.code == 200) {
          this.categoryOpts = response.data.data;
        }
      });
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
      this.inputValue = "";
    },

    onSubmit() {
      if (
        this.form.title != undefined &&
        this.form.content != undefined &&
        this.form.title != "" &&
        this.form.content != ""
      ) {
        addArticle(this.form).then(response => {
          console.log(response);
          this.returnBack();
        });
      }
    },
    returnBack() {
      this.$router.push({ name: "Article" });
    },
    fetchData(params) {
      console.log("fetchData!");
      getArticle(params).then(response => {
        console.log(response);
        this.form = response.data;
      });
    },
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("file", $file);
      uploadImg(formdata).then(response => {
        console.log(response);
        this.$refs.md.$img2Url(pos, "/blog" + response.data);
      });
      //  axios({
      //      url: '/api/file/upload',
      //      method: 'post',
      //      data: formdata,
      //      headers: { 'Content-Type': 'multipart/form-data' },
      //  }).then((url) => {
      //      // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
      //      /**
      //      * $vm 指为mavonEditor实例，可以通过如下两种方式获取
      //      * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
      //      * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
      //      */
      //      $vm.$img2Url(pos, url);
      //  })
    }
  }
};
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
