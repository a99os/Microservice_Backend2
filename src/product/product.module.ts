import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:Product.name}])]
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
