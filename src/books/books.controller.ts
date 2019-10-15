import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBook } from './book.model';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';

@ApiUseTags('books')
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  getBooks() {
    const books = this.booksService.getBooks();
    return books;
  }

  @Get(':bookId')
  getBookById(@Param('bookId') bookId) {
    const book = this.booksService.getBookById(bookId);

    return book;
  }

  @Post()
    addBook(@Body() createBook: CreateBook) {
        const book = this.booksService.addBook(createBook);
        return book;
    }
}
