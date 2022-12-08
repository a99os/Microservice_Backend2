import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}
  create(createProductDto: CreateProductDto) {
    const createProduct = new this.productModel(createProductDto);
    return createProduct;
  }

  findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  findOne(id: number): Promise<Product> {
    return this.productModel.findOne({ id }).exec();
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productModel.findOneAndUpdate({ id }, updateProductDto, {
      new: true,
    });
  }

  remove(id: number) {
    return this.productModel.deleteOne({ id });
  }
}
