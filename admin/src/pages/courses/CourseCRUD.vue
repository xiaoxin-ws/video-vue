<template>
  <div>
    <avue-crud 
    :data="data" 
    :option="option" 
    @row-save="handleCourseCreat"
    @row-update="handleCourseUpdata"
    @row-del="handleCourseDelet"
   
    >
    </avue-crud>
  </div>
</template>

<script lang="ts">
import {Vue,Component} from 'vue-property-decorator'

@Component({})
export default class CourseList extends Vue {
    data() {
      return {
        obj:{},
        data: [],
        option:{
          title:'课程管理',
          border:true,
          index: true,
          page:false,
          viewBtn:true,
          printBtn:true,
          excelBtn:true, //导出
          align:'center',
          menuAlign:'center',
          column:[
             {
              label:'课程的id',
              prop:'_id',
              editDisplay:false,
              addDisplay:false
            },
            {
              label:'课程名称',
              prop:'name'
            },
            {
              label: "封面图片",
              prop: "cover",
            },
            { 
              label: "创建时间",
              prop: "createdAt",
              type: "date",
              format: "yyyy-MM-dd hh:mm:ss",
              valueFormat: "yyyy-MM-dd hh:mm:ss",
              editDisplay:false,
              addDisplay:false
            },
            {
              label: "修改时间",
              prop: "updatedAt",
              type: "date",
              format: "yyyy-MM-dd hh:mm:ss",
              valueFormat: "yyyy-MM-dd hh:mm:ss",
              editDisplay:false,
              addDisplay:false
            },
          ]
        }
      }
    }
    async fetch(){
        const res = await this.$http.get('courses');
        this.data = res.data.data;
    }
    async handleCourseCreat(row:any,done:any,loading:any){
        const data =JSON.parse(JSON.stringify(row))
        delete data._id
        delete data.$index
        delete data.createdAt
        delete data.updatedAt
        await this.$http.post('courses',data)
        this.fetch();
        done();
        
    }
    async handleCourseUpdata(row:any,index:any,done:any,loading:any){
        const data =JSON.parse(JSON.stringify(row))
        delete data._id
        delete data.$index
        delete data.updatedAt
        await this.$http.put(`courses/${row._id}`,data)
        this.fetch();
        done();
    }
    async handleCourseDelet(row:any){
        //捕获那个异常
        try{
          await this.$confirm('是否确认删除?') 
        }catch(e){
          this.$message.info('你取消了删除！')
          return
        }
        await this.$http.delete(`courses/${row._id}`)
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