import { Controller, Get } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { Course } from '@libs/db/models/course.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose/lib/types';
import { ApiTags } from '@nestjs/swagger';
@Crud({
    model:Course
})
@Controller('courses')
@ApiTags('课程')
export class CoursesController {
    constructor(
        @InjectModel(Course) private readonly model:ReturnModelType<typeof Course>
    ){}
    @Get('option')
    // option(){
    //   return {
    //     option:{
    //     title: "课程管理",
    //     column: [
    //       { prop: "name", label: "课程名称", sortable: true, search: true, regex: true, span: 24, row: true },
    //       { prop: "cover", label: "课程封面图", sortable: true, search: true, regex: true, span: 24, row: true },
    //       // { prop: "cover", label: "课程封面图", type: 'upload', width: 120, listType: 'picture-img', row: true, action: 'upload' }
    //     ]
    //   }
    // }
    // }
    option(){
        return{
            option:{
                title:'课程管理',
                searchMenuSpan:4,
                border:true,
                index: true,
                page:false,
                //viewBtn:true,
                printBtn:true,
                excelBtn:true, //导出
                align:'center',
                menuAlign:'center',
                column:[
                   {
                    label:'课程的id',
                    prop:'_id',
                    editDisplay:false,
                    addDisplay:false,
                    row:true
                  },
                  {
                    label:'课程名称',
                    prop:'name',
                    sortable:true,
                    search:true,
                    regex:true,
                    span:24,
                    
                    row:true
                  },
                  {
                    label: "封面图片",
                    prop: "cover",
                    type:'upload',
                    listType:'picture-img',
                    row:true,
                    action:'upload',
                    width:'120'
                  },
                  { 
                    label: "创建时间",
                    prop: "createdAt",
                    type: "date",
                    format: "yyyy-MM-dd hh:mm:ss",
                    valueFormat: "yyyy-MM-dd hh:mm:ss",
                    editDisplay:false,
                    addDisplay:false,
                    row:true
                    //sortable:true,
                  },
                  {
                    label: "修改时间",
                    prop: "updatedAt",
                    type: "date",
                    format: "yyyy-MM-dd hh:mm:ss",
                    valueFormat: "yyyy-MM-dd hh:mm:ss",
                    editDisplay:false,
                    addDisplay:false,
                    row:true,
                    //sortable:true,
                  },
                ]
              }
        }
    }
}
