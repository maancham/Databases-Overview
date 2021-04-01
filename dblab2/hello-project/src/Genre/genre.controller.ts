import { Body, Controller, Get, ParseIntPipe, Post, Put, Delete, Param } from '@nestjs/common';
import GenreServices from './genre.service';
import CreateGenreDto from '../User/dto/create-genre.dto';

@Controller('genre')
export default class GenreController {
  constructor(private readonly genreServices: GenreServices) {}
  @Post('post')
  postGenre( @Body() genre: CreateGenreDto) {
    return this.genreServices.insert(genre);
  }
  @Get()
  getAll() {
    return this.genreServices.getAllGenre();
  }

  @Put(':id')
  async change(@Param('id') id: number, @Body() genre: CreateGenreDto) {
    return this.genreServices.change(id, genre)
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.genreServices.delete(id)
  }

}