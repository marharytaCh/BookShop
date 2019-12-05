import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { Controller, Get, Param, Delete } from '@nestjs/common';
import { AuthorInBookService } from 'src/services';
import { Author, AuthorInBooks } from 'src/entity';

@ApiUseTags('Author in book')
@Controller('authorBook')
export class AuthorInBookController {
  constructor(private readonly authorInBookService: AuthorInBookService) {}

  @Get()
  @ApiOperation({ title: 'Get all author in books' })
  public async getAll() {
    const authotInBook = await this.authorInBookService.getAll();

    return authotInBook;
  }

  @Get(':id')
  @ApiOperation({title: 'Getting author in book by id'})
  public async getById(@Param('id') id: string): Promise<AuthorInBooks> {
    const author: AuthorInBooks = await this.authorInBookService.getById(id);

    return author;
  }

  @Delete(':id')
  @ApiOperation({title: 'Delete author in book'})
  public async delete(@Param('id') id: string): Promise<number> {
    const deletedAuthorInBook: number = await this.authorInBookService.delete(id);

    return deletedAuthorInBook;
  }
}
