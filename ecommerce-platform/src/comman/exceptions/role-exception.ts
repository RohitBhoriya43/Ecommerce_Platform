import { HttpStatus, HttpException } from '@nestjs/common';

export class RolesNotMatchedException extends HttpException {
  constructor() {
    super('Roles not matched', HttpStatus.FORBIDDEN);
  }
}

export class ClientSideException extends HttpException {
    constructor(Message:string,status:HttpStatus) {
      super(Message, status);
    }
  }
  
