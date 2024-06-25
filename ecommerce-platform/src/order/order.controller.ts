// order.controller.ts
import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request,HttpStatus,Res } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Response } from 'express';
import {setResponse} from "../comman"

@Controller('api/v1/order')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post("/create")
  @Roles('customer')
  @UseGuards(JwtAuthGuard)
  async create(@Body() createOrderDto: CreateOrderDto, @Request() req:any,@Res() res: Response) {
    return res.status(HttpStatus.CREATED).json(setResponse(true,"order created",await this.orderService.create(createOrderDto, req.user))) ;
  }

  @Get("/getAll")
  @Roles('admin', 'superadmin')
  @UseGuards(JwtAuthGuard)
  async findAll(@Res() res: Response) {
    return res.status(HttpStatus.OK).json(setResponse(true,"All order",await this.orderService.findAll())) ;
  }

  @Get('/user/get')
  @Roles('customer')
  @UseGuards(JwtAuthGuard)
  async findByUser(@Request() req,@Res() res: Response) {
    return res.status(HttpStatus.OK).json(setResponse(true,"Order get by a user id",await this.orderService.findByUser(req.user.id))) ;
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string,@Res() res: Response) {
    return res.status(HttpStatus.OK).json(setResponse(true,"order from get order id",await this.orderService.findOrderOne(+id))) ;
  }

  @Delete('/:id')
  @Roles('admin', 'superadmin')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Request() req,@Res() res: Response) {
    return res.status(HttpStatus.OK).json(setResponse(true,"delete order", await this.orderService.remove(+id, req.user)));
  }
}
