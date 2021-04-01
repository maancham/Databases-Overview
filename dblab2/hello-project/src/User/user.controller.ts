import { Body, Controller, Get, ParseIntPipe, Post, Put, Delete, Param } from '@nestjs/common';
import CreateUserDto from './dto/create-user.dto';
import { UserServices } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersServices: UserServices) {}

  //'postUser()' will handle the creating of new User
  @Post('post')
  postUser(@Body() user: CreateUserDto) {
    return this.usersServices.insert(user);
  }
  // 'getAll()' returns the list of all the existing users in the database
  @Get()
  getAll() {
    return this.usersServices.getAllUsers();
  }

  //'getBooks()' return all the books which are associated with the user
  // provided through 'userID' by the request
  @Get('books')
  getBooks(@Body('userID', ParseIntPipe) userID: number) {
    return this.usersServices.getBooksOfUser(userID);
  }

  // changeUser() will handle updating of user properties.
  @Put(':id')
  async change(@Param('id') id: number, @Body() genre: CreateUserDto) {
    return this.usersServices.change(id, genre)
  }

  // deleteUser() will handle deletion of user entity.
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.usersServices.delete(id)
  }


}