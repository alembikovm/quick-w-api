
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class FileUploadService {
  async uploadFile(file) {
    try {
      if (!file.buffer || !file.originalname) {
        throw new Error('Invalid file data');
      }

      const { originalname } = file;
      fs.writeFileSync(`uploads/${originalname}`, file.buffer);
      return { message: 'File uploaded successfully' };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Error uploading file');
    }
  }
}
