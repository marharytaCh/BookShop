import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Put, Delete} from '@nestjs/common';
import { AuthorService } from 'src/services';
import { Author } from 'src/documents';
import { CreateAuthorModel, UpdateAuthorModel, AuthorModel } from 'src/models';
import { Roles } from 'src/common';

@ApiUseTags('Author created on mongo')
@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  @ApiOperation({title: 'Getting all authors'})
  public async getAll(): Promise<AuthorModel[]> {
    const authors: AuthorModel[] = await this.authorService.getAll();

    return authors;
  }

  @Get(':id')
  @ApiOperation({title: 'Getting all authors by id'})
  public async getById(@Param('id') id: Author): Promise<AuthorModel> {
    const author: AuthorModel = await this.authorService.getById(id);

    return author;
  }

  @Get(':offset/:limit')
  public async getPagination(@Param('offset') offset: string, @Param('limit') limit: string): Promise<AuthorModel[]> {
    const authors: AuthorModel[] = await this.authorService.getPagination(+offset, +limit);

    return authors;
  }

  @Post()
  @Roles('admin')
  @ApiOperation({title: 'Creating author'})
  public async addAuthor(@Body() addAuthorModel: CreateAuthorModel): Promise<Author> {
    const newAuthor: Author = await this.authorService.addAuthor(addAuthorModel);

    return newAuthor;
  }

  @Put()
  @ApiOperation({title: 'Edit information about author'})
  public async update(@Body() updateAuthorModel: UpdateAuthorModel): Promise<Author> {
    const newAuthor: Author = await this.authorService.update(updateAuthorModel);

    return newAuthor;
  }

  @Delete(':id')
  @ApiOperation({title: 'Delete author by id'})
  public async delete(@Param('id') id: Author): Promise<Author> {
    const deletedAuthor: Author = await this.authorService.delete(id);

    return deletedAuthor;
  }

}
