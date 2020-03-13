import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../pages/Main.vue'
//import CourseList from '../pages/courses/CourseList.vue'
//import CourseEdit from '../pages/courses/CourseEdit.vue'
//import CourseCreat from '../pages/courses/CourseCreat.vue'
// import CourseCRUD from '../pages/courses/CourseCRUD.vue'
import ResourceCrud from '../components/ResourceCrud.vue'

Vue.use(VueRouter)

const routes:RouteConfig[] = [
  {
    path: '/',
    component: Main,
    children:[
      {path:'/',name:'home',component:Home},
      //{path:'courses/courselist',name:'courselist',component:CourseList},
      //{path:'courses/courseedit/edit/:id',name:'courseedit',component:CourseEdit,props:true},
      //{path:'courses/coursecreat/create',name:'coursecreat',component:CourseCreat},
      //{path:'courses/coursecrud',name:'coursecrud',component:CourseCRUD},
      {path:'/:resource/list',name:'resourcescrud',component:ResourceCrud,props:true},
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
