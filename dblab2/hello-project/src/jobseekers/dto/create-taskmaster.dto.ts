export default class CreateTaskmasterDto {
    readonly name: string;
    readonly mail: string;
    readonly password: string;
    readonly phone: string;
    readonly picture: string;

    readonly chargeIDs: number[];
    readonly projectIDs: number[];
}