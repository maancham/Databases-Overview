import { ApiProperty } from '@nestjs/swagger';

export default class CreateChargeDto {
    @ApiProperty()
    readonly security_code: string;
    @ApiProperty()
    readonly bank_name: string;
    @ApiProperty()
    readonly amount: number;
    @ApiProperty()
    readonly date_issued: string;

    @ApiProperty()
    readonly taskmasterID: number;
}