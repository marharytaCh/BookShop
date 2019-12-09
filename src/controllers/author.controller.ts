import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards} from '@nestjs/common';
import { AuthorService } from 'src/services';
import { CreateAuthorModel, UpdateAuthorModel } from 'src/models';
import { Roles } from 'src/common';
import { Author } from 'src/entity';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('Authors')
@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @Get()
  @ApiOperation({title: 'Getting all authors'})
  public async getAll(): Promise<Author[]> {
    const authors: Author[] = await this.authorService.getAll();

    return authors;
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @Get('/deleted')
  @ApiOperation({title: 'Getting all authors by id'})
  public async getByIsRemoved(): Promise<Author[]> {
    const author: Author[] = await this.authorService.getByIsRemoved();

    return author;
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @Get(':id')
  @ApiOperation({title: 'Getting all authors by id'})
  public async getById(@Param('id') id: string): Promise<Author> {
    const author: Author = await this.authorService.getById(id);

    return author;
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @Post()
  @ApiOperation({title: 'Creating author'})
  public async addAuthor(@Body() addAuthorModel: CreateAuthorModel): Promise<Author> {
    const newAuthor: Author = await this.authorService.addAuthor(addAuthorModel);

    return newAuthor;
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @Put()
  @ApiOperation({title: 'Edit information about author'})
  public async update(@Body() updateAuthorModel: UpdateAuthorModel): Promise<Author> {
    const newAuthor: Author = await this.authorService.update(updateAuthorModel);

    return newAuthor;
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @Put(':id')
  @ApiOperation({title: 'Remove'})
  public async remove(@Param() author) {
    const removed: Author = await this.authorService.removeAuthor(author.id);

    return removed;
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @Delete(':id')
  @ApiOperation({title: 'Delete author by id'})
  public async delete(@Param('id') id: string): Promise<number> {
    const deletedAuthor: number = await this.authorService.delete(id);

    return deletedAuthor;
  }

}
