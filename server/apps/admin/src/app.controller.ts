import { Controller, Get, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import {FileInterceptor} from '@nestjs/platform-express'
import { fail } from 'assert';
@Controller()
@ApiTags('根')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile('file') file){
    return {
      url: `http://localhost:${process.env.ADMIN_PORT}/upload/${file.filename}`
    }
  }
}
