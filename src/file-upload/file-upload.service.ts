
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileUploadService {
  async uploadFile(file) {
    if (!file.buffer || !file.originalname) {
      throw new Error('Invalid file data');
    }

    const { originalname } = file;


    // Create the full path for the upload directory
    const fullPath = path.join(__dirname, '..', 'dist', 'uploads');

    // Ensure the directory exists, if not, create it
    try {
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }
    } catch (error) {
      console.error('Error creating upload directory:', error);
      throw new Error('Error creating upload directory');
    }

    // Save the file to the upload directory
    try {
      const filePath = path.join(fullPath, originalname);
      fs.writeFileSync(filePath, file.buffer);
      return { message: 'File uploaded successfully' };
    } catch (error) {
      console.error('Error saving file:', error);
      throw new Error('Error saving file');
    }
  }
}
