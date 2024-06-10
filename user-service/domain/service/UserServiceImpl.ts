import UserService from "../../service/UserService";
import {inject, injectable} from "inversify";
import UserRegistrationRequestDto from "../dto/UserRegistrationRequestDto";
import UserResponseDto from "../dto/UserResponseDto";
import UserRepository from "../../repository/UserRepository";
import {IOC} from "../../config/inversify/inversify.ioc.types";
import {classToPlain, plainToClass} from "class-transformer";
import AppConfigProperties from "../../config/AppConfigProperties";
import {compare, genSalt, hash} from "bcrypt";
import {User} from "../model/User";
import UpdateUserRequestDto from "../dto/UpdateUserRequestDto";
import LoginResponseDto from "../dto/LoginResponseDto";
import AppConfigurationProperties from "compliance-library/config/AppConfigurationProperties";
import SecurityCompliance from "compliance-library/security/SecurityCompliance";
import {DI} from "compliance-library/config/inversify/inversify.ioc.types";
import {UserRoles} from "compliance-library/config/constants/UserRoles";


@injectable()
export default class UserServiceImpl implements UserService {

    private readonly userRepository: UserRepository;
    private readonly appConfiguration: AppConfigProperties;
    private readonly libAppConfigurations: AppConfigurationProperties;
    private readonly apiSecurity: SecurityCompliance;

    constructor(
        @inject(IOC.UserRepository) userRepository: UserRepository,
        @inject(DI.SecurityCompliance) security: SecurityCompliance,
        @inject(IOC.AppConfigProperties) appConfigProperties: AppConfigProperties,
        @inject(DI.AppConfigurationProperties) libAppConfiguration: AppConfigurationProperties) {

        this.userRepository = userRepository;
        this.apiSecurity = security;
        this.appConfiguration = appConfigProperties;
        this.libAppConfigurations = libAppConfiguration;
    }

    async getUserByEmail(email: string): Promise<UserResponseDto | null> {
        const user = await this.userRepository.findOne(email);
        return Promise.resolve(plainToClass(UserResponseDto, user,{excludeExtraneousValues:true}));
    }

    async registerUser(userRegistrationRequestDto: UserRegistrationRequestDto): Promise<UserResponseDto> {

        userRegistrationRequestDto.password = await this.encryptPassword(userRegistrationRequestDto.password);

        const userRequest =plainToClass(User, userRegistrationRequestDto);
        userRequest.roles =[UserRoles.USER];
        const user = await this.userRepository.create(userRequest);

        return Promise.resolve(plainToClass(UserResponseDto, user,{excludeExtraneousValues:true}));
    }

    async updateUser(email: string,userRequestDto: UpdateUserRequestDto): Promise<UserResponseDto> {

        const user: User | null = await this.userRepository.findOne(email);
        if (user) {
            user.name = userRequestDto.name;
            user.phoneNumber = userRequestDto.phoneNumber;
            user.password = await this.encryptPassword(userRequestDto.password);

            const userResponse: User = await this.userRepository.update(user.email, user);

            return Promise.resolve(plainToClass(UserResponseDto, userResponse,{excludeExtraneousValues:true}));
        }
        throw Error("An unexpected error occurred updating the user info");
    }

    async verifyPasswordAuthenticity(email: string, incomingPassword: string): Promise<boolean> {
        const user: User | null = await this.userRepository.findOne(email);
        if (user) {
            return compare(incomingPassword, user.password);
        }

        throw Error("An unexpected error occurred while verify your password");
    }

    async encryptPassword(password: string): Promise<string> {
        const saltRounds = parseInt(this.appConfiguration.bcryptSalt);
        const salt = await genSalt(saltRounds);
        return hash(password, salt);
    }

   async generateUserToken(user: UserResponseDto): Promise<LoginResponseDto> {
        const token = await this.apiSecurity.generateToken(classToPlain(user));
        const expiresIn = new Date(new Date().getTime() + (parseInt(this.libAppConfigurations.tokenExpiryTimeInHours.charAt(0)) * 60 * 60 * 1000));


        return Promise.resolve(plainToClass(LoginResponseDto, {
            accessToken: token,
            userDetails: user,
            expiresIn: expiresIn
        },{excludeExtraneousValues:true}));
    }
}