import { Controller, Get, Post, Param, Body, Put, Query, Delete, UseInterceptors, UploadedFile, UseGuards} from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { extname } from 'path';

import { BooksService } from 'src/services';
import { UpdateBookModel, BookInfoModel, BookFiltrationModel } from 'src/models';
import { PrintingEdition } from 'src/entity';
import { CreateBookAuthorModel } from 'src/models/books/book-author.model';
import { Roles } from 'src/common';
import { AuthGuard } from '@nestjs/passport';

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

@ApiUseTags('books')
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @ApiOperation({ title: 'Get all books' })
  @ApiResponse({ status: 200, description: 'Return all books.'})
  @Get()
  public async getAll(): Promise<PrintingEdition[]> {
    const booksArr: PrintingEdition[] = await this.booksService.getAll();

    return booksArr;
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @Get('/deleted')
  @ApiOperation({title: 'Getting all books by isDeleted'})
  public async getByIsRemoved(): Promise<PrintingEdition[]> {
    const author: PrintingEdition[] = await this.booksService.getByIsRemoved();

    return author;
  }

  @Get('author/:id')
  @ApiOperation({title: 'Getting book with authors by book id'})
  public async getByAuthorId(@Param('id') id: string) {
    const bookWithAuthor = await this.booksService.getBookWithAuthor(id);

    return bookWithAuthor;
  }

  @ApiOperation({title: 'Getting book by id'})
  @Get('book/:id')
  public async getById(@Param('id') id: string): Promise<PrintingEdition> {
    const book: PrintingEdition = await this.booksService.getById(id);

    return book;
  }

  @Get('pagination/:offset/:limit')
   public async getPagination(@Param('offset') offset: string, @Param('limit') limit: string): Promise<BookInfoModel> {
    const books = await this.booksService.getPagination(+offset, +limit);

    return books;
  }

  @Get('/filtration')
   public async getFiltration(@Query() query: BookFiltrationModel){
    const books = await this.booksService.getFiltration(query);

    return books;
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @ApiOperation({ title: 'Create book' })
  @ApiResponse({ status: 201, description: 'The book has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async addBook(@Body() createBook: CreateBookAuthorModel): Promise<PrintingEdition> {
    const book: PrintingEdition = await this.booksService.addBook(createBook);

    return book;
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @Put(':id')
  @ApiOperation({title: 'Remove'})
  public async remove(@Param() author) {
    const removed: PrintingEdition = await this.booksService.removeAuthor(author.id);

    return removed;
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @Put()
  @ApiOperation({ title: 'Update book by id'})
  async update(@Body() updateBookModel: UpdateBookModel): Promise<PrintingEdition> {
    const editedBook: PrintingEdition = await this.booksService.update(updateBookModel);

    return editedBook;
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @Roles('admin')
  public async delete(@Param('id') id: string): Promise<number> {
    const deletedBook: number = await this.booksService.delete(id);

    return deletedBook;
  }

}
