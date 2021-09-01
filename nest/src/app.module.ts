import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CloudinaryController } from './cloudinary/cloudinary.controller';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
const cloudinary = require ('cloudinary')
@Module({
  imports: [   

      MongooseModule.forRoot('mongodb://localhost/Hundstein_backend', {
        useNewUrlParser: true
      }),
//   // }),
//   cloudinary.forRoot({
//     cloud_name:'johor',
//     api_key:'193379428338869',
//     api_secret:'XYG7mZAGbgdwvIwFsdf8cHbwt8g'
// }),
  CloudinaryModule, ProductModule,
  
  ],
  controllers: [AppController, CloudinaryController],
  providers: [AppService],
})
export class AppModule {}
