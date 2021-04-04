import { ApiProperty } from '@nestjs/swagger';

export default class CreateTaskmasterDto {
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly mail: string;
    @ApiProperty()
    readonly password: string;
    @ApiProperty()
    readonly phone: string;
    @ApiProperty()
    readonly picture: string;

    @ApiProperty()
    readonly chargeIDs: number[];
    @ApiProperty()
    readonly projectIDs: number[];
}