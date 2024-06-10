import PackageService from "../../service/PackageService";
import {inject, injectable} from "inversify";
import PackageRequestDto from "../dto/PackageRequestDto";
import PackageResponseDto from "../dto/PackageResponseDto";
import PackageRepository from "../../repository/PackageRepository";
import {plainToClass} from "class-transformer"
import {Package} from "../model/Package";
import {IOC} from "../../config/inversify/inversify.ioc.types";
import UpdatePackageRequestDto from "../dto/UpdatePackageRequestDto";

@injectable()
export default class PackageServiceImpl implements PackageService {

    private packageRepository: PackageRepository;

    constructor(
        @inject(IOC.PackageRepository) packageRepository: PackageRepository) {
        this.packageRepository = packageRepository;
    }

    async createPackage(packageRequestDto: PackageRequestDto): Promise<PackageResponseDto> {
        const packageObject = await this.packageRepository.create(plainToClass(Package, packageRequestDto));
        return Promise.resolve(plainToClass(PackageResponseDto, packageObject));
    }

    async deletePackage(id: string): Promise<PackageResponseDto> {
        const packageObject = await this.packageRepository.findOne(id);
        if (packageObject) {
            await this.packageRepository.delete(packageObject);
            return Promise.resolve(plainToClass(PackageResponseDto, packageObject));
        }
        throw Error("An unexpected error occurred while deleting the package")
    }

    async getPackage(id: string): Promise<PackageResponseDto | null> {
        const packageObject = await this.packageRepository.findOne(id);
        if (!packageObject) return Promise.resolve(null);
        return Promise.resolve(plainToClass(PackageResponseDto, packageObject,));
    }

    async getPackages(): Promise<PackageResponseDto[] | []> {
        const packages = await this.packageRepository.find();
        return Promise.resolve(plainToClass(PackageResponseDto, packages));
    }

    async updatePackage(id: string, packageRequestDto: UpdatePackageRequestDto): Promise<PackageResponseDto> {
        const packageObject = await this.packageRepository.findOne(id);
        if (packageObject) {
            packageObject.description = packageRequestDto.description;
            packageObject.depth = packageRequestDto.depth;
            packageObject.fromAddress = packageRequestDto.fromAddress;
            packageObject.fromLocation = packageRequestDto.fromLocation;
            packageObject.fromName = packageRequestDto.fromName;
            packageObject.toAddress = packageRequestDto.toAddress;
            packageObject.toLocation = packageRequestDto.toLocation;
            packageObject.toName = packageRequestDto.toName;
            packageObject.height = packageRequestDto.height;
            packageObject.weight = packageRequestDto.weight;
            packageObject.width = packageRequestDto.width;
            packageObject.activeDeliveryId = packageRequestDto.activeDeliveryId ? packageRequestDto.activeDeliveryId: packageObject.activeDeliveryId;
            const resource = await this.packageRepository.update(packageObject.packageId, packageObject);

            return Promise.resolve(plainToClass(PackageResponseDto, resource));
        }
        throw Error("Failed to update package")
    }


}