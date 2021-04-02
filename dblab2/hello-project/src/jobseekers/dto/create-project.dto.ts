export default class CreateProjectDto {
    readonly name: string;
    readonly priority: string;
    readonly type: string;
    readonly information: string;
    readonly initial_price: number;
    readonly initial_deadline: string;
    readonly min_experience: string;

    readonly taskmasterID: number;
}