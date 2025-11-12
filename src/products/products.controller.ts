import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { BaseController } from '../bases/base.controller';

@Controller('products')
export class ProductsController extends BaseController<
  CreateProductDto,
  UpdateProductDto,
  any
> {
  constructor(private readonly productsService: ProductsService) {
    super(productsService);
  }

  @Get('status/:productId')
  async getStatus(@Param('productId') productId: string) {
    try {
      const status = await this.productsService.getStatus(+productId);

      if (!status) {
        return {
          statusCode: 404,
          message: `Product with id ${productId} not found`,
        };
      }
      return {
        statusCode: 200,
        message: 'Success',
        data: status,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Error',
        error: error.message,
      };
    }
  }

  @Put('adjust/:productId')
  override async update(
    @Param('productId') productId: number,
    @Body() dto: UpdateProductDto,
  ) {
    return super.update(productId, dto);
  }
}
