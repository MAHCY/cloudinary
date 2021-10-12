import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductSchema } from './product.model';
import { ProductService } from './product.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    CloudinaryModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],

  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
