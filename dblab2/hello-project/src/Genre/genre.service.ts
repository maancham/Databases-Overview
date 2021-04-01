import { Injectable } from '@nestjs/common';
import GenreEntity from '../db/genre.entity';
import CreateGenreDto from '../User/dto/create-genre.dto';

@Injectable()
export default class GenreServices {
    async insert(genreDetails: CreateGenreDto): Promise<GenreEntity> {

    const genreEntity: GenreEntity = GenreEntity.create();
    const {type} = genreDetails;

    genreEntity.type = type;
    await GenreEntity.save(genreEntity);
    return genreEntity;
  }
  async getAllGenre(): Promise<GenreEntity[]> {
        return await GenreEntity.find();
  }

  // change method, called from user.controller.
  async change(id: number, genreDetails: CreateGenreDto): Promise<any> {
    return await GenreEntity.update({id}, genreDetails);
  }

  // delete method, called from user.controller.
  async delete(id: number): Promise<any> {
    return await GenreEntity.delete({id});
  }

}