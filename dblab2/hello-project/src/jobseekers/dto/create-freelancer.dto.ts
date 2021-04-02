export default class CreateFreelancerDto {
    readonly name: string;
    readonly mail: string;
    readonly password: string;
    readonly phone: string;
    readonly picture: string;

    readonly past_roles: string;
    readonly education: string;

    readonly requestIDs: number[];
}