<template>
    <el-container>
        <el-header style="background:#999">
                <h3>教育网后台管理界面</h3>
        </el-header>
        
        <el-container>
            <el-aside  style="width:200px">
                <el-menu :unique-opened="true" style="height:100vh;background:#e0e0e0;" mode="vertical" :default-active="$route.path" router>
                    <el-submenu v-for="(menu, i) in menus.items"
                        :index="`menu-${i}`"
                        :key="i">
                        <template slot="title">{{menu.title}}</template>
                        <el-menu-item v-for="(item, i1) in menu.items"
                            :index="item.path"
                            :key="i1"
                            >
                                {{item.title}}
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view :key="$route.path"></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({})
export default class Main extends Vue {
    menus = {
        items:[        
            {
                title:"内容管理",
                items:[
                    //{title:"课程管理",path:"/courses/courselist"},
                    //{title:"添加课程",path:"/courses/coursecreat/create"},
                    {title:"首页",path:"/"},
                    {title:"课程管理",path:"/courses/list"},
                    {title:"课时管理",path:"/episodes/list"},
                ]    
            },
            {
                title:"运营管理",
                items:[
                    {title:"用户管理",path:"/user/list"},
                    {title:"角色管理",path:"/user/list"},
                ]    
            },
        ]
    }
}


</script>

<style>

</style>