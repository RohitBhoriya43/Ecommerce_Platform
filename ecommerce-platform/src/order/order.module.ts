import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { RolesGuard } from '../auth/roles.guard'; // Import RolesGuard
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule if JwtService is used here
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product,Order]),
    // Example JwtModule import if JwtService is used here
    JwtModule.register({
      secret: 'yourSecretKey',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    ProductService,
    // RolesGuard, // Provide RolesGuard as a provider
  ],
})
export class OrderModule {}
