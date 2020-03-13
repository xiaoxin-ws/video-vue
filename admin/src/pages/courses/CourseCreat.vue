<template>
<div>
   <h1>创建课程</h1>
    <ele-form
      :form-data="formData"
      :form-desc="formDesc"
      :request-fn="handleSubmit"
    ></ele-form>
</div>
</template>

<script lang="ts">
import {Vue,Component, Prop} from "vue-property-decorator"
@Component({})
export default class CourseEdit extends Vue{
    //@Prop(String) id!:string
    formData={}
    formDesc={
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
    async handleSubmit(data:object){
      await this.$http.post('courses', data)
      this.$message.success('添加成功！')
      this.$router.push("/courses/courselist")
      //global.console.log(data)
    }
}
</script>

<style>

</style>