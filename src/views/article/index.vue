<template>
  <div class="app-container">
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="作者">
        <el-input v-model="form.author" placeholder="作者"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="form.category" placeholder="类型">
            <el-option
                v-for="item in categoryOpts"
                :key="item.name"
                :label="item.name"
                :value="item.id"
              ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布日期">
       <el-date-picker type="date" placeholder="选择日期" v-model="form.deployTime" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="success" @click="handlAdd">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="标题"
      prop="title">
    </el-table-column>
    <el-table-column
      label="作者"
      prop="author">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    background
    layout="prev, pager, next"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :total="total">
  </el-pagination>
  </div>
</template>

<script>
import { getArticleList,delArticle } from '@/api/article'
import { getList } from "@/api/special";
import { getCategoryList } from '@/api/category';

 export default {
    data() {
      return {
        tableData: [],
        form: {
          author: '',
          deployTime: '',
          category: ''
        },
        search: '',
        currentPage: 1,
        total: 50,
        categoryOpts: [],
      }
    },
    mounted() {
      this.fetchData();
      this.getCateList();
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
        this.$router.push({name: '/article/add',params:{ id:row.id}});
      },
      handlAdd() {
        this.$router.push({name: '/article/add'});
      }, 
      getCateList(params) {
      getCategoryList(params).then(response => {
        if (response.code == 200) {
          this.categoryOpts = response.data.data;
        }
      });
    },
      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm('是否删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          delArticle({"id":row.id}).then(response=>{
            this.fetchData();
          });
          
        }).catch(() => {
        });
      },
      handleCurrentChange(val) {
        this.fetchData({"pageNum":val,"pageSize":10});
      },
      onSubmit() {
        this.fetchData(this.form);
      },
      fetchData(params) {
        getArticleList(params).then(response => {
          if(response.code == 200){
            this.tableData = response.data.data;
            this.total = response.data.total;
          }
        })
      }
    },
  }
</script>
