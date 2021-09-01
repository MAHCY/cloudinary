import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Product } from './product.model';

@Injectable()
export class ProductService {

    constructor(
      @InjectModel('Product') private readonly productModel: Model<Product>,
      private cloudinary: CloudinaryService,
    ) {}
  
    async insertProduct(
      productName: string,
      description: string,
      price: number,status:number,
      // imageUrl: string,
      file: Express.Multer.File,
    ) {
      const image = await this.uploadImageToCloudinary(file);
      // imageUrl = imageSecureUrl;
      const newProduct = new this.productModel({
        productName: productName,
        description: description,
        price: price,
        status:status,
        imageObj: image[0],
        imageURL: image[1],
      });
      const result = await newProduct.save();
      console.log(result);
      return result.id as string;
    }
  
    async getProducts() {
      const products = await this.productModel.find().exec();
      console.log(products);
      return products.map((prod) => ({
        id: prod.id,
        productName: prod.productName,
        description: prod.description,
        price: prod.price,
        status: prod.status,
        imageObj: prod.imageObj,
        imageUrl: prod.imageURL,
      }));
    }
  

  
   
    async uploadImageToCloudinary(file: Express.Multer.File) {
      // find product
  
      // upload and return secure url to controller
      // return (await this.cloudinary.uploadImage(file))
      // .catch(() => {
      //   throw new BadRequestException('Invalid file type. :D');
      // });
  
      // json data to string(stringify) string to object(parse)
      const imageObj = await this.cloudinary.uploadImage(file);
      const imageUrl = imageObj.secure_url;
      // console.log(imageUrl);
      return [JSON.stringify(imageObj), imageUrl];
    }
  

  }