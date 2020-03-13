import { prop, modelOptions, arrayProp,Ref } from "@typegoose/typegoose";
import { ApiProperty } from "@nestjs/swagger";
import { Episode } from "./episode.model";

@modelOptions({
    schemaOptions:{
        timestamps:true,
        toJSON:{virtuals:true}
    }
})
export class Course{
    @prop()
    @ApiProperty({description:'课程名'})
    name:string

    @prop()
    @ApiProperty({description:'封面'})
    cover:string

    @arrayProp({
        ref:'Episode',
        localField:'_id',
        foreignField:'course'
        //itemsRef:'Episode'
    })
    @ApiProperty({description:'课时'})
    episodes:Ref<Episode>[]

}