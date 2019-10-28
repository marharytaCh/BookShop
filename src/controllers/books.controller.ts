import { Controller, Get, Post, Param, Body, Res, HttpStatus, NotFoundException, Put, Query, Delete} from '@nestjs/common';
import { BooksService } from 'src/services/books.service';
import { CreateBook } from '../models/book.model';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ValidateObjectId } from 'src/common';

@ApiUseTags('books')
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @ApiOperation({ title: 'Get all books' })
  @ApiResponse({ status: 200, description: 'Return all books.'})
  @Get()
  public async getBooks() {
    console.log('hello1');
    const booksArr = await this.booksService.getBooks();
   
    return booksArr;
  }

  // @Get(':bookId')
  // async getBookById(@Res() res, @Param('bookId') bookId: string,
  //   ) {
  //   const book = await this.booksService.getBookById(bookId);
  //   if (!book) {
  //     throw new NotFoundException('Book does not exist');
  //   }
  //   return book;
  // }

  // @ApiOperation({ title: 'Create book' })
  // @ApiResponse({ status: 201, description: 'The book has been successfully created.'})
  // @ApiResponse({ status: 403, description: 'Forbidden.' })

  @Post()
  async addBook(@Body() createBook: CreateBook) {
      const newBook = await this.booksService.addBook(createBook);
      return newBook;
    }

  // // @Put()
  // //   async editBook(
  // //     @Query('bookId', new ValidateObjectId()) bookId,
  // //     @Body() createBook: CreateBook,
  // //     ) {
  // //       const editedBook = await this.booksService.editBook(bookId, createBook);
  // //       if (!editedBook) {
  // //       throw new NotFoundException('Book does not exist');
  // //       }
  // //       return editedBook;
  // //   }
  //   // @Delete('')
  //   //   async deleteBook(@Param('id') bookId: string,
  //   //   ) {
  //   //     const deletedBook = await this.booksService.deleteBook(bookId);
  //   //     if (!deletedBook) {
  //   //       throw new NotFoundException('Book does not exist');
  //   //     }
  //   //     return deletedBook;
  //   //   }
}
