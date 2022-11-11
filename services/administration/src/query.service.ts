// import { Injectable } from '@nestjs/common';
// import { Query } from '@nestjs/graphql';
// import { LoginInput, LoginResponse, Query as qq, User } from './graphql';
// import { MethodList } from '@tds/common';
// import { EntityManager } from 'typeorm';
// import { UserService } from './user.service';
//
// @Injectable()
// export class QueryService implements MethodList<qq> {
//   constructor(private readonly userService: UserService) {}
//
//   @Query()
//   login(args: LoginInput): LoginResponse {
//     return {
//       token: {
//         token: 'string',
//         expiration: 'esdfdf',
//       },
//       user: {
//         id: 'asdasd',
//         name: 'asdasd',
//       },
//     };
//   }
//
//   @Query()
//   async userList(): Promise<User[]> {
//     console.log(11111111);
//     const asdf = await this.userService.getList();
//     console.log(asdf);
//     return asdf;
//   }
//
//   @Query()
//   user(): User {
//     return {
//       id: '123123',
//       name: '123123',
//     };
//   }
// }
