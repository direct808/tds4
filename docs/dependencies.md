## Зависимости проекта

### dependencies

| First Header                      | Second Header                                                                                                                |
|-----------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| @apollo/gateway                   | Нужен api-gateway для реализации федерации                                                                                   |
| @apollo/subgraph                  | Нужен в сервисах для построения схемы subgraph                                                                               |
| @grpc/grpc-js                     | gRPC Client                                                                                                                  |
| @nestjs/apollo                    | Apollo для nest jS                                                                                                           |
| @nestjs/common                    | nest js                                                                                                                      |
| @nestjs/core                      | nest js                                                                                                                      |
| @nestjs/graphql                   | Graphql для Nest JS                                                                                                          |
| @nestjs/microservices             | Поддержка микросервисов для Nest JS                                                                                          |
| @nestjs/platform-express          | HTTP драйвер для Nest JS                                                                                                     |
| @nestjs/typeorm                   | Поддержка typeorm для Nest JS                                                                                                |
| apollo-server-express             | Логика сервера Apollo. Помечен как deprecated. Рекомендуется использовать @apollo/server, но @nestjs\apollo это не соблюдает |
| axios                             | HTTP клиент для выполнения внешних запросов                                                                                  |
| class-transformer                 | Для DTO                                                                                                                      |
| class-validator                   | Валидация данных                                                                                                             |
| dataloader                        | Лоадер для решения проблемы n+1                                                                                              |
| dotenv                            | Импорт env из файлов                                                                                                         |
| graphql                           | Зависимость для @nestjs\graphql                                                                                              |
| jsonwebtoken                      | Используется для подписи в двойном мета редиректе                                                                            |
| lodash                            | Различные утилиты                                                                                                            |
| nanoid                            | Генерация кода для кампании                                                                                                  |
| nanoid-dictionary                 | Словарь для nanoid                                                                                                           |
| pg                                | Драйвер postgresql для typeorm                                                                                               |
| rxjs                              | Reactive Extensions                                                                                                          |
| typeorm                           | ORM                                                                                                                          |
| typeorm-naming-strategies         | Стратегии нэйминга для typeorm                                                                                               |
| ua-parser-js                      | Парсинг user agent                                                                                                           |
| weighted                          | Выбор случайного элемента массива по весу, используется при выборе streamOffer                                               |


### devDependencies

@apollo/rover
@graphql-codegen/add
@graphql-codegen/cli
@graphql-codegen/typescript
@nestjs/cli
@nestjs/schematics
@nestjs/testing
@types/express
@types/jest
@types/nanoid-dictionary
@types/node
@types/supertest
@typescript-eslint/eslint-plugin
@typescript-eslint/parser
cross-env
eslint
eslint-config-prettier
eslint-import-resolver-typescript
eslint-plugin-boundaries
eslint-plugin-prettier
jest
nestjs-proto-gen-ts
prettier
rimraf
source-map-support
supertest
ts-jest
ts-loader
ts-node
tsconfig-paths
typescript
