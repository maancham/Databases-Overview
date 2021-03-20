import { Controller, Post, Body, Get, Header, Query } from '@nestjs/common';
import { HelloService } from './hello.service';
import { PersonDto } from './dto/person.dto';
import { INSTANCE_METADATA_SYMBOL } from '@nestjs/core/injector/instance-wrapper';
import { ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@Controller('hello')
export class HelloController {

    constructor(
        private readonly helloService: HelloService,
    ) {}

    @Header('Content-Type', 'application/json')
    @ApiResponse({ status: 200, description: 'Say Hello!!!' })

    @Post('welcome')
    @Header('Content-Type', 'application/json')
    async sayWelcome(@Body() PersonDto: PersonDto): Promise<{data : String}> {
        let msg = await this.helloService.welcome(PersonDto);
        return {data : msg};
    }

    @ApiResponse({ status: 200 })
    @ApiQuery({
        name: 'name',
        required: true,
        type: String,
    })
    @ApiQuery({
        name: 'year',
        required: false,
        type: Number,
        description: `you can igonre this`
    })

    @Get('welcome')
    async sayWelcome2(@Query('name') iName, @Query('year') iYear): Promise<{data : String}> {
        let msg = await this.helloService.welcome({name : iName, year : iYear});
        return {data : msg};
    }
}
