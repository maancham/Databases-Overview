import {Length, IsOptional, Min, IsNumber} from 'class-validator';

export class PersonDto {
    @Length(3,10)
    name: string;

    @IsNumber()
    @IsOptional()
    @Min(1960)
    year: number;
}