import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { EventPattern } from '@nestjs/microservices';
import { HttpService } from '@nestjs/axios';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly httpService: HttpService,
  ) {}

  @EventPattern('product_created')
  create(@Body() createProductDto: CreateProductDto) {
    console.log(createProductDto);
    return this.productService.create(createProductDto);
  }

  @Post(':id/likes')
  async likeBoss(@Param('id') id: number) {
    const product = await this.productService.findOne(+id);
    if (!product) {
      throw new NotFoundException('Bunday product topilmadi');
    }
    this.httpService
      .post(`http://localhost:3000/api/products/${id}/like`, {})
      .subscribe((res) => {
        console.log(res);
      });
    return this.productService.update(id, {
      likes: product.likes + 1,
    });
  }

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
