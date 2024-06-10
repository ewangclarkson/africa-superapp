import {IsNotEmpty, IsNumber, IsObject, IsString} from "class-validator";
import Location from "compliance-library/domain/dto/Location";
import {Type} from "class-transformer";

export default class PackageRequestDto {

    activeDeliveryId!: string;

    @IsNotEmpty()
    @IsString()
    description!: string;

    @IsNotEmpty()
    @IsNumber()
    weight!: number;

    @IsNotEmpty()
    @IsNumber()
    width!: number;

    @IsNotEmpty()
    @IsNumber()
    height!: number;

    @IsNotEmpty()
    @IsNumber()
    depth!: number;

    @IsNotEmpty()
    @IsString()
    fromName!: string;

    @IsNotEmpty()
    @IsString()
    fromAddress!: string;

    @IsNotEmpty()
    @IsObject()
    @Type(() => Location)
    fromLocation!: Location;

    @IsNotEmpty()
    @IsString()
    toName!: string;

    @IsNotEmpty()
    @IsString()
    toAddress!: string;

    @IsNotEmpty()
    @IsObject()
    @Type(() => Location)
    toLocation!: Location;
}
