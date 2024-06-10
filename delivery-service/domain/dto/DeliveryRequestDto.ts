import {IsDateString, IsEnum, IsNotEmpty, IsObject, IsUUID} from "class-validator";
import Location from "compliance-library/domain/dto/Location";
import {DeliveryStatus} from "../../config/constants/DeliveryStatus";
import {Expose, Type} from "class-transformer";

export default class DeliveryRequestDto {
    @IsNotEmpty()
    @IsUUID('4')
    @Expose()
    packageId!: string;

    @IsNotEmpty()
    @IsDateString()
    @Expose()
    pickupTime!: Date;

    @IsNotEmpty()
    @IsDateString()
    @Expose()
    startTime!: Date;

    @IsNotEmpty()
    @IsDateString()
    @Expose()
    endTime!: Date;

    @IsNotEmpty()
    @IsEnum(DeliveryStatus)
    @Expose()
    status!: DeliveryStatus;

    @IsNotEmpty()
    @IsObject()
    @Type(() => Location)
    @Expose()
    location!: Location;
}
