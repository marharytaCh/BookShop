import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { BooksModule } from './books/books.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { BooksController } from './books/books.controller';

@Module({
  imports: [BooksModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  confiqure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LoggerMiddleware)
    .forRoutes('books');

  }
}
