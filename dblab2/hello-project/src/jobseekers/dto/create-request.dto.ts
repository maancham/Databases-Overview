import { ApiProperty } from '@nestjs/swagger';

export default class CreateRequestDto {
    @ApiProperty()
    readonly header: string;
    @ApiProperty()
    readonly description: string;
    @ApiProperty()
    readonly new_price: number;
    @ApiProperty()
    readonly date_created: string;
    @ApiProperty()
    readonly new_deadline: string;

    @ApiProperty()
    readonly freelancerID: number;

    @ApiProperty()
    readonly projectID: number;
}