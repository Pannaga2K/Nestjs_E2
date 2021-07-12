import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './user.entity';

@Controller("users")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.appService.getAll();
  }

  @Get("add")
  async createUser(name: string): Promise<User> {
    return this.appService.createUser("PANNAGA");
  }

}
