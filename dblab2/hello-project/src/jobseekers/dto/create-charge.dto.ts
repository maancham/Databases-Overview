export default class CreateChargeDto {
    readonly security_code: string;
    readonly bank_name: string;
    readonly amount: number;
    readonly date_issued: string;

    readonly taskmasterID: number;
}