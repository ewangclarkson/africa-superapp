import PackageRequestDto from "./PackageRequestDto";
import {Expose} from "class-transformer";

export default class PackageResponseDto extends PackageRequestDto {
    @Expose()
    packageId!: string;

    @Expose()
    activeDeliveryId!: string;
}