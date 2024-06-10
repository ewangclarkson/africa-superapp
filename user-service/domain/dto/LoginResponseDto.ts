import UserResponseDto from "./UserResponseDto";
import {Expose} from "class-transformer";

export default class LoginRequestDto {
    @Expose()
    accessToken!: string;
    @Expose()
    userDetails!: UserResponseDto;
    @Expose()
    expiresIn!: Date;
}
