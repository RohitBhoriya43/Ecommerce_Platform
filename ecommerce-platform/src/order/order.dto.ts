// order.dto.ts
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsArray, ArrayNotEmpty, ValidateNested } from 'class-validator';

export class ProductOrderDto {
  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  price: number;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ProductOrderDto)
  readonly products: ProductOrderDto[];

}
