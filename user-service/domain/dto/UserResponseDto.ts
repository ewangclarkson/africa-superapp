import {UserRoles} from "compliance-library/config/constants/UserRoles";
import {Expose} from "class-transformer";

export default class UserResponseDto {
    @Expose()
    userId!: string;
    @Expose()
    email!: string;
    @Expose()
    name!: string;
    @Expose()
    phoneNumber!: string;
    @Expose()
    roles!: UserRoles[]
}