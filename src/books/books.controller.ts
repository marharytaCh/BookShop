import { Controller, Get, Post, Param, Body, UseFilters, ForbiddenException } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBook } from './book.model';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
// import { AnyExceptionFilter } from 'src/common/exception.filter';

@ApiUseTags('books')
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @ApiResponse({ status: 200, description: 'Return all books.'})
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

  @ApiOperation({ title: 'Create book' })
  @ApiResponse({ status: 201, description: 'The book has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
    addBook(@Body() createBook: CreateBook) {
      const book = this.booksService.addBook(createBook);
      return book;
    }
}
