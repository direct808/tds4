import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { User } from './entity';

interface UserAddInput {
  login: string;
  password: string;
  name: string;
}

@Injectable()
export class UserService {
  constructor(private readonly entityManager: EntityManager) {}

  async add(args: UserAddInput) {
    const user = this.entityManager.create(User, args);
    await this.entityManager.save(user);
  }

  getList() {
    return this.entityManager.find(User);
  }
}
