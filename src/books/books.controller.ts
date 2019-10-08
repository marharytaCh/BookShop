import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dto/create-books.dto'



@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  getBooks() {
    const books = this.booksService.getBooks();
    return books;
  }

  @Get(':bookId')
  getBookById(@Param('bookId') bookId){
    const book = this.booksService.getBookById(bookId);
    return book;
  }

  @Get(':bookName')
  getBookByName(@Param('bookName') bookName){
    const book = this.booksService.getBookByName(bookName);
    return book;
  }

  @Post()
    addBook(@Body() createBookDTO: CreateBookDTO) {
        const book = this.booksService.addBook(createBookDTO);
        return book;
    }
}
