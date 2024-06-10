import {NextFunction, Request, Response} from "express";
import PackageResponseDto from "../domain/dto/PackageResponseDto";
import PackageRequestDto from "../domain/dto/PackageRequestDto";
import HttpStatus from "http-status";
import {inject, injectable} from "inversify";
import PackageService from "../service/PackageService";
import {IOC} from "../config/inversify/inversify.ioc.types";
import UpdatePackageRequestDto from "../domain/dto/UpdatePackageRequestDto";
import {RequestValidator} from "compliance-library/utils/RequestValidator";




@injectable()
export default class PackageController {

    private packageService: PackageService;

    constructor(
        @inject(IOC.PackageService) packageService: PackageService) {
        this.packageService = packageService;
    }

    async createPackage(request: Request, response: Response, next: NextFunction) {
        const {errors, input} = await RequestValidator(PackageRequestDto, request.body);

        if (errors) return response.status(HttpStatus.BAD_REQUEST).send(errors);

        const packageObject: PackageResponseDto = await this.packageService.createPackage(input);

        return response.status(HttpStatus.CREATED).send(packageObject);
    }


    async getPackage(request: Request, response: Response, next: NextFunction) {
        const packageObject = await this.packageService.getPackage(request.params.id);
        if (!packageObject) return response.status(HttpStatus.NOT_FOUND).send(HttpStatus[`${HttpStatus.NOT_FOUND}_MESSAGE`]);

        return response.status(HttpStatus.OK).send(packageObject);
    }

    async getPackages(request: Request, response: Response, next: NextFunction) {

        const packages: PackageResponseDto[] = await this.packageService.getPackages();
        return response.status(HttpStatus.OK).send(packages);
    }

    async deletePackage(request: Request, response: Response, next: NextFunction) {
        const packageObject = await this.packageService.getPackage(request.params.id);
        if (!packageObject) return response.status(HttpStatus.NOT_FOUND).send(HttpStatus[`${HttpStatus.NOT_FOUND}_MESSAGE`]);

        await this.packageService.deletePackage(request.params.id);

        return response.status(HttpStatus.OK).send(packageObject);
    }

    async updatePackage(request: Request, response: Response, next: NextFunction) {
        const packageObject = await this.packageService.getPackage(request.params.id);
        if (!packageObject) return response.status(HttpStatus.NOT_FOUND).send(HttpStatus[`${HttpStatus.NOT_FOUND}_MESSAGE`]);

        const {errors, input} = await RequestValidator(UpdatePackageRequestDto, request.body);

        if (errors) return response.status(HttpStatus.BAD_REQUEST).send(errors);

       const resource: PackageResponseDto=  await this.packageService.updatePackage(request.params.id,input);

        return response.status(HttpStatus.OK).send(resource);
    }
}