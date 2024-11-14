import { IsString, IsInt, Min } from 'class-validator';

export class CreateUserDto {
    @IsString()
    username: string;
    email: string;
    password: string;

    @IsInt()
    @Min(18)
    age: number;
}
