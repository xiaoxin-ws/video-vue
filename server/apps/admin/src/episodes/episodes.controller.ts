import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Episode } from '@libs/db/models/episode.model';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Course } from '@libs/db/models/course.model';
@Crud({
    model:Episode
})
@Controller('episodes')
@ApiTags('课时')
export class EpisodesController {
    constructor(
        @InjectModel(Course) private readonly coursemodel:ReturnModelType<typeof Course>,
        @InjectModel(Episode) private readonly model:ReturnModelType<typeof Episode>
    ){}
    @Get('option')
    async option(){
        const courses =  (await this.coursemodel.find()).map(v=>({
            label:v.name,
            value:v._id
        }))
            return{
                option:{
                    title:'课时管理',
                    border:true,
                    index: true,
                    page:false,
                    viewBtn:true,
                    printBtn:true,
                    excelBtn:true, //导出
                    align:'center',
                    menuAlign:'center',
                    translate:false,//解决上传文件时参数错误
                    column:[
                    {
                        label:'课时的id',
                        prop:'_id',
                        editDisplay:false,
                        addDisplay:false,
                        
                    },
                    {
                      prop:"course",
                      label:"所属课程",
                      type:"select",
                      row:true,
                      dicData:courses
                    },
                    {
                        label:'课时名称',
                        prop:'name',
                        span:24,
                    },
                    {
                        label: "视频文件",
                        prop: "file",
                        type:'upload',
                        row:true,
                        listType:'picture-img',
                        action:'/upload',
                        span:24,
                      },
                    { 
                        label: "创建时间",
                        prop: "createdAt",
                        type: "date",
                        format: "yyyy-MM-dd hh:mm:ss",
                        valueFormat: "yyyy-MM-dd hh:mm:ss",
                        editDisplay:false,
                        addDisplay:false,
                        sortable:true,
                    },
                    {
                        label: "修改时间",
                        prop: "updatedAt",
                        type: "date",
                        format: "yyyy-MM-dd hh:mm:ss",
                        valueFormat: "yyyy-MM-dd hh:mm:ss",
                        editDisplay:false,
                        addDisplay:false,
                        sortable:true,
                    },
                    ]
              }
            }
        }
}
