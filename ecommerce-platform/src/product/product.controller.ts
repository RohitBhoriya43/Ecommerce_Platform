// product.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Res, HttpCode, HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Response } from 'express';
import {setResponse} from "../comman"

@Controller('api/v1/products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post("/create")
  // @UseGuards(JwtAuthGuard)

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles("admin","superadmin")
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProductDto: CreateProductDto,@Res() res:Response) {
    console.log(createProductDto)
    return res.status(HttpStatus.CREATED).json(setResponse(true,"product created", await this.productService.create(createProductDto)));
  }

  @Get("/getAll")
  @UseGuards(JwtAuthGuard)
  async findAll(@Res() res:Response) {
    return res.status(HttpStatus.OK).json(setResponse(true,"All product find out",await this.productService.findAll())) ;
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string,@Res() res:Response) {
    return res.status(HttpStatus.OK).json(setResponse(true,"One product find out",await this.productService.findOne(id)))  ;
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles("admin","superadmin")
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto,@Res() res:Response) {
    return res.status(HttpStatus.OK).json(setResponse(true,"Update product", await this.productService.update(id, updateProductDto)));
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles("admin","superadmin")
  async remove(@Param('id') id: string,@Res() res:Response) {
    return res.status(HttpStatus.OK).json(setResponse(true," Delete product",await this.productService.remove(id)));
  }
}
