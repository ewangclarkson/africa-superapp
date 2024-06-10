import PackageRequestDto from "../domain/dto/PackageRequestDto";
import PackageResponseDto from "../domain/dto/PackageResponseDto";
import UpdatePackageRequestDto from "../domain/dto/UpdatePackageRequestDto";

export default interface PackageService {
    createPackage(packageRequestDto: PackageRequestDto): Promise<PackageResponseDto>;

    getPackage(id: string): Promise<PackageResponseDto | null>;

    deletePackage(id: string): Promise<PackageResponseDto>;

    getPackages(): Promise<PackageResponseDto[]>;

    updatePackage(id:string,packageRequestDto: UpdatePackageRequestDto): Promise<PackageResponseDto>

}