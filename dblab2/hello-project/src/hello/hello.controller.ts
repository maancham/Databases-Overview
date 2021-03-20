import { Controller, Post, Body, Get, Header, Query } from '@nestjs/common';
import { HelloService } from './hello.service';
import { PersonDto } from './dto/person.dto';
import { INSTANCE_METADATA_SYMBOL } from '@nestjs/core/injector/instance-wrapper';

@Controller('hello')
export class HelloController {

    constructor(
        private readonly helloService: HelloService,
    ) {}
    @Post('welcome')
    @Header('Content-Type', 'application/json')
    async sayWelcome(@Body() PersonDto: PersonDto): Promise<{data : String}> {
        let msg = await this.helloService.welcome(PersonDto);
        return {data : msg};
    }

    @Get('welcome')
    async sayWelcome2(@Query('name') iName, @Query('year') iYear): Promise<{data : String}> {
        let msg = await this.helloService.welcome({name : iName, year : iYear});
        return {data : msg};
    }
}
