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
  
    // @Post('uplaod')
    // @UseInterceptors(
    //   FileInterceptor('file', {
    //     storage: diskStorage({
    //       destination: './uploads/productimages',
    //       filename: (req, file, cb) => {
    //         const filename: string =
    //           path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
    //         const extension: string = path.parse(file.originalname).ext;
  
    //         cb(null, '${filename}${extension}');
    //       },
    //     }),
    //   }),
    // )
    // // eslint-disable-next-line @typescript-eslint/ban-types
    // uploadFile(@UploadedFile() file): Observable<Object> {
    //   return of({ imagePath: file.path });
    // }
  }