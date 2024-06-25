// product.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './product.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    
    JwtModule.register({
      secret: 'yourSecretKey',
      signOptions: { expiresIn: '60m' },
    }),
    TypeOrmModule.forFeature([Product,]),

],
  providers: [
    ProductService
  ],
  controllers: [ProductController],
})
export class ProductModule {}
