import { Body, Controller, Get, ParseIntPipe, Post, Put, Delete, Param } from '@nestjs/common';
import BookEntity from '../db/book.entity';
import UserEntity from '../db/user.entity';
import { createQueryBuilder, getConnection } from 'typeorm';
import GenreEntity from '../db/genre.entity';
import CreateBookDto from '../User/dto/create-book.dto';


@Controller('books')
export default class BooksService {

  @Post('post')
  async insert(@Body() bookDetails: CreateBookDto): Promise<BookEntity> {
    const { name , userID , genreIDs } = bookDetails;
    const book = new BookEntity();
    book.name = name;
    book.user = await UserEntity.findOne(userID) ;
    book.genres=[];
    for ( let i = 0; i < genreIDs.length ; i++)
    {
             const genre = await GenreEntity.findOne(genreIDs[i]);
             book.genres.push(genre);
    }
    await book.save();
    return book;
  }

  @Get()
  async getAllBooks(): Promise<BookEntity[] > {
    // const user: UserEntity = await UserEntity.findOne({where: {id: 2}, relations: ['books']});
    return BookEntity.find();
  }


  // change method
  @Put(':id')
  async change(id: number, bookDetails: CreateBookDto): Promise<any> {
    let newBook: any = {};
    const { name, userID } = bookDetails;
    newBook.user = await UserEntity.findOne(userID);
    newBook.name = name;
    return BookEntity.update({id},newBook);
  }

  // delete method
  @Delete(':id')
  async delete(id: number): Promise<any> {
    return await BookEntity.delete({ id });
  }
}

