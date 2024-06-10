import UserRegistrationRequestDto from "../domain/dto/UserRegistrationRequestDto";
import UserResponseDto from "../domain/dto/UserResponseDto";
import UpdateUserRequestDto from "../domain/dto/UpdateUserRequestDto";
import LoginResponseDto from "../domain/dto/LoginResponseDto";

export default interface UserService {

    registerUser(userRegistrationRequestDto: UserRegistrationRequestDto): Promise<UserResponseDto>;

    updateUser(email:string,userRequestDto: UpdateUserRequestDto): Promise<UserResponseDto>

    getUserByEmail(email: string): Promise<UserResponseDto | null>;

    encryptPassword(password: string): Promise<string>;

    verifyPasswordAuthenticity(email: string, incomingPassword: string): Promise<boolean>;

    generateUserToken(user: UserResponseDto): Promise<LoginResponseDto>

}