// order.service.ts
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto,ProductOrderDto } from './order.dto';
import { User } from '../auth/user.entity';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private orderRepository: Repository<Order>,private productService: ProductService) {}

  async create(createOrderDto: CreateOrderDto, user: User):Promise<{}> {
    console.log("createOrderDto",createOrderDto)
    
    createOrderDto.products.forEach( async (item:ProductOrderDto)=>{
      let order = this.orderRepository.create({
        product:await this.productService.findOne(""+item.productId),
        user,
        quantity:item.quantity,
        total:item.price
      });
      await this.orderRepository.save(order);
    })
    return {}
    
    
  }

  findAll(): Promise<Order[]> {
    return this.orderRepository.find({relations: ['user','product']});
  }

  findByUser(userId: number): Promise<Order[]> {
    return this.orderRepository.find({ where: { user: { id: userId } },relations: ['product'], });
  }

  async findOrderOne(id: number): Promise<Order> {
    return this.orderRepository.findOne({where:{id:id},relations: ['product'],}).then(order => {
      if (!order) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }
      return order;
    });
  }

  async remove(id: number, user: User): Promise<void> {
    const order = await this.orderRepository.findOne({where:{id:id}});
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    if (order.user.id !== user.id) {
      throw new UnauthorizedException('You are not authorized to delete this order');
    }
    await this.orderRepository.delete(id);
  }

  
}
