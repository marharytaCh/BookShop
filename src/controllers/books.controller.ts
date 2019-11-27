import { Controller, Get, Post, Param, Body, Put, Query, Delete, UseInterceptors, UploadedFile} from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { BooksService } from 'src/services';
import { BookModel, UpdateBookModel, CreateBookModel } from 'src/models';
import { Book } from 'src/documents';
import { FileInterceptor } from '@nestjs/platform-express';

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

  // @ApiOperation({ title: 'Create book' })
  @ApiResponse({ status: 201, description: 'The book has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post('file')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: 'src/image',
      filename: editFileName,
    }),
  }),
  )
  async addBook(@UploadedFile() file, @Body() createBookModel: CreateBookModel): Promise<BookModel> {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    console.log(response)
    const addedBook: BookModel = await this.booksService.addBook(createBookModel, file);

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
