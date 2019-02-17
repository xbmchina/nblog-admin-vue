<template>
  <div class="app-container">
    <el-button type="success" @click="handlAdd">新增</el-button>
    <el-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="名称"
      prop="name">
    </el-table-column>
    <el-table-column
      label="描述"
      prop="detail">
    </el-table-column>
    <el-table-column
      label="备注"
      prop="remark">
    </el-table-column>
    <el-table-column
      align="right">
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

    <el-dialog title="详情" :visible.sync="dialogFormVisible">
        <el-form  :model="form"  label-width="80px">
            <el-form-item label="名称">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="描述">
                <el-input v-model="form.detail" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="图片地址">
                <el-input v-model="form.img" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="form.remark" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNewProject">确 定</el-button>
    </div>
    </el-dialog>
    
  </div>
</template>

<script>
  import { getList,saveSpecial,updateSpecial,delSpecial } from '@/api/special'

 export default {
    data() {
      return {
        dialogFormVisible: false,
        tableData: [],
        form: {
          name: '',
          detail: '',
          img: '',
          remark: ''
        },
        search: '',
        currentPage: 1,
        total: 50
      }
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      handleEdit(index, row) {
         this.form = row;
         this.dialogFormVisible = true;
      },
      handlAdd() {
        this.dialogFormVisible = true;
        this.form = {};
        var data = {name: null,detail: null,img: null,remark: null};
        this.from = data;
        console.log("xxxxx"+this.form);
      }, 
      addNewProject() {
        this.dialogFormVisible = false;
        saveSpecial(this.form).then(response => {
          if(response.code == 200){
             this.fetchData();
          }
        });
      },
      handleDelete(index, row) {
        this.$confirm('是否删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          delSpecial({"id":row.id}).then(response=>{
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
        getList(params).then(response => {
          if(response.code == 200){
            this.tableData = response.data.data;
            this.total = response.data.total;
          }
        });
      }
    },
  }
</script>
