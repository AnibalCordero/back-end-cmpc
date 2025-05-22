import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { BookModule } from './modules/book/book.module';
import { AuthorModule } from './modules/author/author.module';
import { GenreModule } from './modules/genre/genre.module';
import { EditorialModule } from './modules/editorial/editorial.module';
import { AuditModule } from './modules/audit/audit.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      // on development use true on server use false
      synchronize: true,
      logging: false,
    }),
    AuthModule,
    UserModule,
    BookModule,
    AuthorModule,
    GenreModule,
    EditorialModule,
    AuditModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
