import { Controller, Get, Post, Param, Body, Res, HttpStatus, NotFoundException, Put, Query, Delete} from '@nestjs/common';
import { BooksService } from 'src/services/books.service';
import { CreateBook } from '../models/createBook.model';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { BookModel, UpdateBookModel } from 'src/models';
import { Book } from 'src/documents';

@ApiUseTags('books')
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @ApiOperation({ title: 'Get all books' })
  @ApiResponse({ status: 200, description: 'Return all books.'})
  @Get()
  public async getAll(): Promise<Book[]> {
    const booksArr = await this.booksService.getAll();

    return booksArr;
  }

  @Get(':id')
  async getById(@Param('bookId') id: Book): Promise<BookModel> {
    const book: BookModel = await this.booksService.getById(id);

    return book;
  }

  @Get(':offset/:limit')
   public async getPagination(@Param('offset') offset: string, @Param('limit') limit: string): Promise<BookModel[]> {
    const books = await this.booksService.getPagination(+offset, +limit);

    return books;
  }

  @ApiOperation({ title: 'Create book' })
  @ApiResponse({ status: 201, description: 'The book has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async addBook(@Body() createBookModel: CreateBook): Promise<BookModel> {
    const addedBook: BookModel = await this.booksService.addBook(createBookModel);

    return addedBook;
  }

  @Put()
  @ApiOperation({ title: 'Update book by id'})
    async update(@Body() updateBookModel: UpdateBookModel): Promise<Book> {
      const editedBook: Book = await this.booksService.update(updateBookModel);

      return editedBook;
    }

  @Delete(':id')
    async delete(@Param('id') id: string): Promise<Book> {
      const deletedBook: BookModel = await this.booksService.delete(id);

      return deletedBook;
   }

}
