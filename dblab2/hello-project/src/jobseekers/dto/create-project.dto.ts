import { ApiProperty } from '@nestjs/swagger';

export default class CreateProjectDto {
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly priority: string;
    @ApiProperty()
    readonly type: string;
    @ApiProperty()
    readonly information: string;
    @ApiProperty()
    readonly initial_price: number;
    @ApiProperty()
    readonly initial_deadline: string;
    @ApiProperty()
    readonly min_experience: string;

    @ApiProperty()
    readonly taskmasterID: number;

    @ApiProperty()
    readonly requestIDs: number[];
}