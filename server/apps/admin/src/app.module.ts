import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { DbModule } from '@libs/db';
import { UserModule } from './user/user.module';
import { CoursesModule } from './courses/courses.module';
import { EpisodesModule } from './episodes/episodes.module';
import { MulterModule } from '@nestjs/platform-express';
import { CommonModule } from '@app/common';
//import { MAO } from 'multer-aliyun-oss';
@Module({
  imports: [
    CommonModule,
    //oss 异步注册配置
    // MulterModule.registerAsync({
    //   useFactory(){
    //     return{       
    //       storage: MAO({
    //         config: {
    //             region: process.env.OSS_REGIN,
    //             accessKeyId: process.env.OSS_ACCESS_KEY_ID,
    //             accessKeySecret: process.env.OSS_ASSESS_KEY_SECRET,
    //             bucket: process.env.OSS_BUCKET
    //         }
    //     })
    //   }
    // },
    //本地路径
    MulterModule.register({
       dest:'upload'
    }),
    CommonModule,
    //DbModule,
    UserModule,
    CoursesModule,
    EpisodesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
