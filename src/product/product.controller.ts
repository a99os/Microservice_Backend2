import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { EventPattern } from '@nestjs/microservices';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @EventPattern('product_created')
  create(@Body() createProductDto: CreateProductDto) {
    console.log(createProductDto);
    return this.productService.create(createProductDto);
  }

  // @Post()
  // create(@Body() createProductDto: CreateProductDto) {
  //   return this.productService.create(createProductDto);
  // }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @EventPattern('hello')
  async hello(data: string) {
    console.log(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productService.update(+id, updateProductDto);
  // }
  @EventPattern('product_updated')
  async update(@Body() updateProductDto: UpdateProductDto) {
    console.log(updateProductDto);
    const { id, ...updateData } = updateProductDto;
    return await this.productService.update(+id, updateData);
  }

  @EventPattern('product_deleted')
  async remove(id: number) {
    console.log(id);
    return await this.productService.remove(+id);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productService.remove(+id);
  // }
}
