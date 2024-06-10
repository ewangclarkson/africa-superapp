import {IsPhoneNumber, IsString, IsStrongPassword} from "class-validator";

export default class UpdateUserRequestDto {

    @IsString()
    name!: string;

    @IsPhoneNumber("CM")
    phoneNumber!: string;

    @IsStrongPassword()
    password!: string;

}
