import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config({
        cloud_name:'johor',
        api_key:'193379428338869',
        api_secret:'XYG7mZAGbgdwvIwFsdf8cHbwt8g',
      secure: true,
    });
  },
};
