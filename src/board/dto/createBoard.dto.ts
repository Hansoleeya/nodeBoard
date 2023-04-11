import { IsNotEmpty } from "class-validator";

export class CreateBoardDto{
    @IsNotEmpty()
    bTitle: string;

    @IsNotEmpty()
    description: string;
}