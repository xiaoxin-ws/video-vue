<template>
  <div>
    <h1>课程管理</h1>
    <table class="custom-table">
      <thead>
          <th>课程序号</th>
          <th>课程的id</th>
          <th>课程名称</th>
          <th>封面图片</th>
          <th>创建时间</th>
          <th>修改时间</th>
          <th>简单操作</th>
      </thead>
      <tbody>
        <tr v-for="(item,i) in this.data" :key="i">
          <td>{{i+1}}</td>
          <td>{{item._id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.cover}}</td>
          <td>{{item.createdAt}}</td>
          <td>{{item.updatedAt}}</td>
          <td>
            <el-button type="warning" size="mini" @click="$router.push(`/courses/courseedit/edit/${item._id}`)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleCourseDelet(item._id)">删除</el-button>
          </td>
          
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import {Vue,Component} from 'vue-property-decorator'

@Component({})
export default class CourseList extends Vue {
    data={}
    async fetch(){
        const res = await this.$http.get('courses');
        this.data = res.data.data;
    }
    async handleCourseDelet(id:String){
        //捕获那个异常
        try{
          await this.$confirm('是否确认删除?') 
        }catch(e){
          this.$message.info('你取消了删除！')
          return
        }
        await this.$http.delete(`courses/${id}`)
        this.$message.success('删除成功！')
        this.fetch();
    }
    created(){
        this.fetch();
    }
}
</script>

<style>

</style>