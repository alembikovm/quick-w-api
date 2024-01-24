
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileUploadService {
  async uploadFile(file) {
    try {
      if (!file.buffer || !file.originalname) {
        throw new Error('Invalid file data');
      }

      const { originalname } = file;

      // Define the upload directory based on the deployment settings
      const uploadDir = process.env.NODE_ENV === 'production' ? 'uploads' : '../uploads';
      
      // Create the full path for the upload directory
      const fullPath = path.join(__dirname, '..', uploadDir);
      
      // Ensure the directory exists, if not, create it
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }

      // Save the file to the upload directory
      const filePath = path.join(fullPath, originalname);
      fs.writeFileSync(filePath, file.buffer);

      return { message: 'File uploaded successfully' };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Error uploading file');
    }
  }
}
