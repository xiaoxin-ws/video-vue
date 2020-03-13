import { Controller, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { Crud } from "nestjs-mongoose-crud"
import { ApiTags } from '@nestjs/swagger'
@Crud({
    model:User
})
@Controller('user')
@ApiTags('用户')
export class UserController {
    constructor(
        @InjectModel(User) private readonly model)
        {}
        @Get('option')
        option(){
            return{
                option:{
                    title:'用户管理',
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
                        label:'用户的id',
                        prop:'_id',
                        editDisplay:false,
                        addDisplay:false
                    },
                    {
                        label:'用户名称',
                        prop:'username'
                    },
                    {
                        label:'用户密码',
                        prop:'password'
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
