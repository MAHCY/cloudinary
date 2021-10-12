import { Injectable,Post } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
 @Post()
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        // if (error) return reject(error);
        // resolve(result);
        if (result) {
          resolve(result);
          return result.secure_url;
        } else {
          reject(error);
        }
      });
      toStream(file.buffer).pipe(upload);
    });
  }
}