// app.module.ts
import { Module } from '@nestjs/common';
import { APP_GUARD,APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { User } from './auth/user.entity';
import { Product } from './product/product.entity';
import { Order } from './order/order.entity';
import { RolesGuard } from './auth/roles.guard';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { JwtStrategy } from './auth/jwt.strategy';
import { GlobalExceptionFilter } from './comman/exceptions/global-exception.filter';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'ecommerce.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ProductModule,
    AuthModule,
    OrderModule,
    JwtModule.register({
      secret: 'yourSecretKey',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [
    {
      provide:APP_FILTER,
      useClass: GlobalExceptionFilter
    }
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
    
  ],
})
export class AppModule {}
