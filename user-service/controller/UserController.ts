import {NextFunction, Request, Response} from "express";
import UserResponseDto from "../domain/dto/UserResponseDto";
import UserRegistrationRequestDto from "../domain/dto/UserRegistrationRequestDto";
import HttpStatus from "http-status";
import {inject, injectable} from "inversify";
import UserService from "../service/UserService";
import {IOC} from "../config/inversify/inversify.ioc.types";
import UpdateUserRequestDto from "../domain/dto/UpdateUserRequestDto";
import LoginRequestDto from "../domain/dto/LoginRequestDto";
import {RequestValidator} from "compliance-library/utils/RequestValidator";

declare module 'express' {
    interface Request {
        user?: any
    }
}

@injectable()
export default class UserController {

    private userService: UserService;

    constructor(
        @inject(IOC.UserService) userService: UserService) {
        this.userService = userService;
    }

    async getAuthenticatedUser(request: Request, response: Response, next: NextFunction) {
        return response.status(HttpStatus.OK).send(request.user);
    }

    async registerUser(request: Request, response: Response, next: NextFunction) {
        const {errors, input} = await RequestValidator(UserRegistrationRequestDto, request.body);
        if (errors) return response.status(HttpStatus.BAD_REQUEST).send(errors);

        const user = await this.userService.getUserByEmail(input.email);
        if (user) return response.status(HttpStatus.ALREADY_REPORTED).send("User already exist");

        const resource =  await this.userService.registerUser(input);

        return response.status(HttpStatus.CREATED).send(resource);
    }


    async updateUser(request: Request, response: Response, next: NextFunction) {
        const user = await this.userService.getUserByEmail(request.params.email);
        if (!user) return response.status(HttpStatus.NOT_FOUND).send(HttpStatus[`${HttpStatus.NOT_FOUND}_MESSAGE`]);

        const {errors, input} = await RequestValidator(UpdateUserRequestDto, request.body);

        if (errors) return response.status(HttpStatus.BAD_REQUEST).send(errors);

        const resource: UserResponseDto = await this.userService.updateUser(request.params.email,input);

        return response.status(HttpStatus.OK).send(resource);
    }


    async login(request: Request, response: Response, next: NextFunction) {
        const loggedInUser = await this.userService.getUserByEmail(request.body.email);
        if (!loggedInUser) return response.status(HttpStatus.UNAUTHORIZED).send(HttpStatus[`${HttpStatus.UNAUTHORIZED}_MESSAGE`]);

        const {errors, input} = await RequestValidator(LoginRequestDto, request.body);

        if (errors) return response.status(HttpStatus.BAD_REQUEST).send(errors);

        const isPasswordValid: boolean = await this.userService.verifyPasswordAuthenticity(input.email, input.password);
        if (!isPasswordValid) return response.status(HttpStatus.UNAUTHORIZED).send('invalid user email or password');


        const loginResponse =  await this.userService.generateUserToken(loggedInUser);

        return response.status(HttpStatus.OK).send(loginResponse);
    }

}