import { prop, modelOptions, Ref } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import { Course } from './course.model'
@modelOptions({
    schemaOptions:{
        timestamps:true
    }
})
export class Episode{
    @prop()
    @ApiProperty({description:'课时'})
    name:string

    @prop()
    @ApiProperty({description:'文件路径'})
    file:string

    @prop({ref:'Course'})
    course:Ref<Course>
}