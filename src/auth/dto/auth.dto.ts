import { IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthDto{
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    userId: string;

    @IsOptional()
    @MinLength(2)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: '비밀번호는 영어와 숫자로 입력해야합니다.'
    })
    password: string;
}