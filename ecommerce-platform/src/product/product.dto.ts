import { IsString, IsInt, IsOptional, IsPositive,IsNumber, Min, Max  } from 'class-validator';
 

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsInt()
  @IsPositive()
  price: number;

  @IsInt()
  @IsOptional()
  @IsPositive()
  stock?: number; // Optional field
}


// update-product.dto.ts


export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;
}
