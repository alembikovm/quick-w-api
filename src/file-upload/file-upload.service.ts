
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class FileUploadService {
  async uploadFile(file) {
    try {
      const { originalname } = file;
      fs.writeFileSync(`${originalname}`, file.buffer);
      return { message: 'File uploaded successfully' };
    } catch (error) {
      throw new Error('Error uploading file');
    }
  }
}
