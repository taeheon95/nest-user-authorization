import { Logger, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from 'src/user/user.entity';
import { ConfigModule } from '@nestjs/config';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => {
        const logger = new Logger('MikroORM');
        return {
          type: 'postgresql',
          dbName: 'auth',
          host: process.env.DATABASE_HOST,
          port: Number(process.env.DATABASE_PORT),
          user: process.env.DATABASE_USER,
          password: process.env.DATABASE_PASSWORD,
          entities: [User],
          entitiesTs: [User],
          highlighter: new SqlHighlighter(),
          logger: logger.log.bind(logger),
          debug: true,
        };
      },
    }),
  ],
  exports: [MikroOrmModule],
})
export class OrmModule {}
