// auth.controller.ts
import { Controller,Get, Post, Body, UseGuards, HttpCode, HttpStatus, Request,Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RegisterDto } from './register.dto';
import { LoginDto } from './login.dto';
import { Response } from 'express';
import {setResponse} from "../comman"

@Controller('api/v1/user')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto,@Res() res:Response) {
    return res.status(HttpStatus.CREATED).json(setResponse(true,"User created successfully",await this.authService.register(registerDto.username, registerDto.password, registerDto.roles)))
    // let userData = await this.authService.register(registerDto.username, registerDto.password, registerDto.roles);
    // if (userData){
    //   return res.status(HttpStatus.CREATED).json(setResponse(true,"User created successfully",await this.authService.register(registerDto.username, registerDto.password, registerDto.roles)))
    // }
    // return res.status(HttpStatus.BAD_REQUEST).json(setResponse(false,"User is already exists",{}))
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto,@Res() res: Response) {
    console.log("loginDto",loginDto)
    return res.status(HttpStatus.OK).json(setResponse(true,"Login Successfully",await this.authService.login(loginDto)))

    // const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    // if (user) {
    //   const userdata = await this.authService.login(user)
    // //   const response = this.authService.login(user);
    //   return res.status(HttpStatus.OK).json(setResponse(true,"Login Successfully",userdata))
    //     // return this.authService.login(user);
    // }
    // return res.status(HttpStatus.BAD_REQUEST).json(setResponse(false,"Invalid credentials",{}))
    // return { message: 'Invalid credentials' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req,@Res() res:Response) {

    return res.status(HttpStatus.OK).json(setResponse(true,"User Profile Data",req.user));
  }
}
