import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Put, Delete} from '@nestjs/common';
import { AuthorService } from 'src/services';
import { Author } from 'src/documents';
import { CreateAuthorModel, EditAuthorModel } from 'src/models';

@ApiUseTags('Author created on mongo')
@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  @ApiOperation({title: 'Getting all authors'})
  public async getAll() {
    const authors = await this.authorService.getAuthors();
    return authors;
  }

  @Get(':id')
  @ApiOperation({title: 'Getting all authors by id'})
  public async get(@Param('id') authorId: string): Promise<Author> {
    const author: Author = await this.authorService.getAuthorById(authorId);
    return author;
  }

  @Post()
  @ApiOperation({title: 'Creating author'})
  public async adding(@Body() addAuthor: CreateAuthorModel): Promise<Author> {
    const newAuthor = await this.authorService.addAuthor(addAuthor);
    return newAuthor;
  }

  @Delete(':id')
  @ApiOperation({title: 'Delete author by id'})
  public async delete(@Param('id') authorId: string): Promise<boolean> {
    await this.authorService.deleteAuthor(authorId);
    return true;
  }

  @Put()
  @ApiOperation({title: 'Edit information about author'})
  public async edit(@Body() editAuthor: EditAuthorModel): Promise<Author> {
    const author  = await this.authorService.editAuthor(editAuthor);
    return author;
  }
}
