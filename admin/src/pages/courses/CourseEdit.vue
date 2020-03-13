<template>
<div>
   <h1>编辑课程</h1>
    
    <ele-form
      :form-data="formEditData"
      :form-desc="formEditDesc"
      :request-fn="handleEditSubmit"
    ></ele-form>
</div>
</template>

<script lang="ts">
import {Vue,Component, Prop} from "vue-property-decorator"
@Component({})
export default class CourseEdit extends Vue{
    @Prop(String) id!:string
    formEditData={}
    formEditDesc={
       name: {
          type: 'input',
          label: '课程名称'
        },
        cover: {
          type: 'input',
          label: '封面图片'
        },
    }
    // get isNew(){
    //     return !this.id
    // }
    async getOneData(){
      const res = await this.$http.get(`courses/${this.id}`)
      this.formEditData= res.data
    }
    created(){
      this.getOneData()
    }
    async handleEditSubmit(){
      await this.$http.put(`courses/${this.id}`, this.formEditData)
      this.$message.success('编辑成功！')
      this.$router.push("/courses/courselist")
      //global.console.log(data)
    }
}
</script>

<style>

</style>