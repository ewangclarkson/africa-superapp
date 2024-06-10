import {IsEmail, IsPhoneNumber, IsString, IsStrongPassword} from "class-validator";

export default class LoginRequestDto {
    @IsEmail()
    email!: string;

    @IsStrongPassword()
    password!: string;
}
