<template>
  <div>
    <!-- @on-load="onLoad" -->
    <avue-crud
      :table-loading="loading"
      v-if="option.column"
      :page="page"
      :data="data" 
      :option="option" 
      @row-save="handleCourseCreat"
      @row-update="handleCourseUpdata"
      @row-del="handleCourseDelet" 
      @size-change="sizeChange"
      @current-change="currentChange"
      @sort-change="handleSortChange"
      @search-change="handleSearchChange"
    >
    </avue-crud>
  </div>
</template>

<script lang="ts">
import {Vue,Component, Prop} from 'vue-property-decorator'

@Component({})
export default class ResourcesCRUD extends Vue {
    @Prop(String) resource!:string
    loading:boolean=true
    data:any= []
    option:any={}
    page:any={
      pageSize:5,//每页的数据
      pageSizes: [5, 10],//默认
      currentPage:1,//第几页
      total:0,//数据总数
    }
    query:any={
      //sort:{'name':-1}
      limit:5
    }
    //分页回调函数
    //自定义分页
    sizeChange(val:any) {
        this.page.pageSize = val
        this.query.limit = this.page.pageSize
        this.fetchData()
      }
      currentChange(val:any) {
        this.query.limit = this.page.pageSize
        this.query.page = val
        this.fetchData()
      }
    //onLoad事件框架分页
    // async onLoad(page:any){
    //   this.query.page=page.currentPage;
    //   this.query.limit = page.pageSize
    //   this.fetchData()
    // }
    //分页回调函数结束
    //搜索
    async handleSearchChange(params:any,done:any) {
        // 模糊查询
        for(let k in params){
          const field = this.option.column.find((v:any) => v.prop ===k && v.regex)
          if(field.regex){
            params[k]  = {$regex:params[k]};
          }
        }
        //params.name={$regex:params.name}
        this.query.where = params;
        this.fetchData();
        done();
        
      }
    //服务端排序
    async handleSortChange({prop,order}:any){
         if (!order) {
            this.query.sort = null;
          } else {
            this.query.sort = {
              [prop]: order === "ascending" ? 1 : -1
            };
            this.fetchData()
          }
         this.fetchData()
      }
    async fetchOption(){
        const res = await this.$http.get(`${this.resource}/option`);
        //global.console.log(res)
        this.option = res.data.option;
    }
    async fetchData(){
        const res = await this.$http.get(`${this.resource}`,{
          params:{
            query:this.query
            }
          });
        this.page.total=res.data.total;
        this.data = res.data.data;
        setTimeout(()=>{
          this.loading = false
        },1000)
}
    async handleCourseCreat(row:any,done:any,loading:any){
        const data =JSON.parse(JSON.stringify(row))
        delete data._id
        delete data.$index
        delete data.createdAt
        delete data.updatedAt
        await this.$http.post(`${this.resource}`,data)
        this.fetchData();
        done();
        this.loading = true
        
    }
    async handleCourseUpdata(row:any,index:any,done:any,loading:any){
        const data =JSON.parse(JSON.stringify(row))
        delete data._id
        delete data.$index
        delete data.updatedAt
        await this.$http.put(`${this.resource}/${row._id}`,data)
        this.fetchData();
        done();
        this.loading = true
    }
    async handleCourseDelet(row:any){
        //捕获那个异常
        try{
          await this.$confirm('是否确认删除?') 
        }catch(e){
          this.$message.info('你取消了删除！')
          return
        }
        await this.$http.delete(`${this.resource}/${row._id}`)
        this.$message.success('删除成功！')
        this.fetchData();
        this.loading = true
    }
    created(){
        //global.console.log(this.resource)
        this.fetchOption();
        this.fetchData();
    }
    beforeDestroy(){}
}
</script>

<style>

</style>