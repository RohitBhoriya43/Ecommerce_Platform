// product.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto, UpdateProductDto } from './product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private productRepository: Repository<Product>) {}

  create(createProductDto: CreateProductDto): Promise<Product> {
    // const {name,price,description} = createProductDto
    console.log("data")
    // let productObj = new Product()
    // productObj.name = name
    // productObj.price = price
    // productObj.description = description

    const product = this.productRepository.create(createProductDto);
    console.log(product)
    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  findOne(id: string): Promise<Product> {
    return this.productRepository.findOne({where:{id:Number(id)}});
  }

  update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productRepository.save({ ...updateProductDto, id: Number(id) });
  }

  remove(id: string): Promise<void> {
    return this.productRepository.delete(id).then(() => {});
  }
}
