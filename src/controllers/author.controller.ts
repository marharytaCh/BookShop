import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Put, Delete} from '@nestjs/common';
import { AuthorService } from 'src/services';
import { Author } from 'src/documents';
import { CreateAuthorModel, EditAuthorModel } from 'src/models';
import { AuthorModel } from 'src/models/author.model';

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
  public async get(@Param('id') id: Author): Promise<Author> {
    const author: AuthorModel = await this.authorService.getById(id);
    return author;
  }

  @Post()
  @ApiOperation({title: 'Creating author'})
  public async addAuthor(@Body() addAuthorModel: CreateAuthorModel): Promise<Author> {
    const newAuthor = await this.authorService.addAuthor(addAuthorModel);

    return newAuthor;
  }

  @Put()
  @ApiOperation({title: 'Edit information about author'})
  public async edit(@Body() editAuthorModel: EditAuthorModel): Promise<Author> {
    const editedAuthor: Author = await this.authorService.edit(editAuthorModel);
    return editedAuthor;
  }

  @Delete(':id')
  @ApiOperation({title: 'Delete author by id'})
  public async delete(@Param('id') id: Author): Promise<Author> {
    const deletedAuthor = await this.authorService.delete(id);
    return deletedAuthor;
  }
}
