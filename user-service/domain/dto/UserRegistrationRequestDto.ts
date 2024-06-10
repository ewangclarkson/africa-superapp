import {IsEmail, IsPhoneNumber, IsString, IsStrongPassword} from "class-validator";

export default class UserRegistrationRequestDto {
    @IsEmail()
    email!: string;

    @IsStrongPassword()
    password!: string;

    @IsString()
    name!: string;

    @IsPhoneNumber("CM")
    phoneNumber!: string;
}
