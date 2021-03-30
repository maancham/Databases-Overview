import { Module } from '@nestjs/common';
import GenreServices from './genre.service';
import GenreController from './genre.controller';
@Module({
  imports: [],
  controllers: [GenreController],
  providers: [GenreServices],
})
export default class GenreModule {}