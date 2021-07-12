import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class AppService {

  // DATA MAPPER
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  // GET ALL
  getAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: ["pets"]                                 // SELECT * FROM USER JOIN PETS
    });
  }

  // GET SINGLE ITEM
  async getSingleUser(id: number): Promise<User> {
    try {
      const user = this.usersRepository.findOneOrFail(id);
      return user;
    } catch(err) {
      throw err;
    }
  }

  // INSERT
  createUser(name: string): Promise<User> {
    const newUser = this.usersRepository.create({name});
    return this.usersRepository.save(newUser);
  }

  // UPDATE
  async updateUser(id: number, name: string): Promise<User> {
    const user = await this.getSingleUser(id);
    user.name = name;
    return this.usersRepository.save(user);
  }

  // DELETE
  async deleteUser(id: number): Promise<User> {
    const user = await this.getSingleUser(id);
    return this.usersRepository.remove(user);
  }

  // CUSTOM QUERY
  // customQuery(): any {
  //   return this.usersRepository.createQueryBuilder("user").select("name").where("...")
  // }

  getHello(): string {
    return 'Hello World!';
  }
}