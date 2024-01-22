import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import path from 'path';
import fs from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  uploadFile(@UploadedFile() file, @Body('username') username) {
    const imagePath = path.join(__dirname, 'public', 'images', 'users', username, file.originalname);

    fs.mkdirSync(path.join(__dirname, 'public', 'images', 'users', username), { recursive: true });

    fs.writeFileSync(imagePath, file.buffer);

    return 'File uploaded!';
  }
}
