import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    UseInterceptors,
    UploadedFile,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
  // import { Observable, of } from 'rxjs';
  // import { v4 as uuidv4 } from 'uuid';
  
  @Controller('products')
  export class ProductController {
    constructor(private readonly productsService: ProductService) {}
  
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async addProduct(
      @Body('productName') productName: string,
      @Body('description') prodDesc: string,
      @Body('price') prodPrice: number,
      @Body('status') prodStatus: number,

      // @Body('image') prodImageUrl: string,
      @UploadedFile() file: Express.Multer.File,
    ) {
      const generatedId = await this.productsService.insertProduct(
        productName,
        prodDesc,
        prodPrice,
        prodStatus,
        // prodImageUrl,
        file,
      );
      return { id: generatedId };
    }
  
    @Get()
    async getAllProducts() {
      const products = await this.productsService.getProducts();
      return products;
    }
  
   
  
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadImage(@UploadedFile() file: Express.Multer.File) {
      // show in terminal
      console.log(file);
      // show in postman body
      return this.productsService.uploadImageToCloudinary(file);
    }
  
   
  }