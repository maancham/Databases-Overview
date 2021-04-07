import { ApiProperty } from '@nestjs/swagger';

export default class CreateFreelancerDto {
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
    readonly past_roles: string;
    @ApiProperty()
    readonly education: string;

    @ApiProperty()
    readonly requestIDs: number[];
}