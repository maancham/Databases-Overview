export default class CreateRequestDto {
    readonly header: string;
    readonly description: string;
    readonly new_price: number;
    readonly date_created: string;
    readonly new_deadline: string;

    readonly freelancerID: number;
}