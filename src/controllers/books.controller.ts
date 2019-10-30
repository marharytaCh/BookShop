import { Controller, Get, Post, Param, Body, Res, HttpStatus, NotFoundException, Put, Query, Delete} from '@nestjs/common';
import { BooksService } from 'src/services/books.service';
import { CreateBook } from '../models/createBook.model';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ValidateObjectId } from 'src/common';
import { BookModel, EditAuthorModel, EditBookModel } from 'src/models';
import { Book } from 'src/documents';

@ApiUseTags('books')
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @ApiOperation({ title: 'Get all books' })
  @ApiResponse({ status: 200, description: 'Return all books.'})
  @Get()
  public async getAll() {
    const booksArr = await this.booksService.getBooks();
    return booksArr;
  }

  @Get(':id')
  async getBookById(@Param('bookId') id: Book): Promise<BookModel> {
    const book: BookModel = await this.booksService.getById(id);
    return book;
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
    async editBook(@Body() updateBookModel: EditBookModel) {
      const editedBook: Book = await this.booksService.edit(updateBookModel);
      return editedBook;
    }

  @Delete(':id')
    async deleteBook(@Param('id') id: string): Promise<Book> {
    const deletedBook: BookModel = await this.booksService.deleteBook(id);
    return deletedBook;
   }

   @Get(':offset/:limit')
   public async getPaginatedBooks(@Param('offset') offset: string, @Param('limit') limit: string): Promise<any>{
     // const bookModels: BookModel[] = await this.booksService.getPagination()
   }
}
