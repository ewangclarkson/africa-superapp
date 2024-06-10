import {IsNotEmpty, IsNumber, IsObject, IsString} from "class-validator";
import {Expose, Type} from "class-transformer";
import Location from "compliance-library/domain/dto/Location";

export default class PackageRequestDto {
    @IsNotEmpty()
    @IsString()
    @Expose()
    description!: string;

    @IsNotEmpty()
    @IsNumber()
    @Expose()
    weight!: number;

    @IsNotEmpty()
    @IsNumber()
    @Expose()
    width!: number;

    @IsNotEmpty()
    @IsNumber()
    @Expose()
    height!: number;

    @IsNotEmpty()
    @IsNumber()
    @Expose()
    depth!: number;

    @IsNotEmpty()
    @IsString()
    @Expose()
    fromName!: string;

    @IsNotEmpty()
    @IsString()
    @Expose()
    fromAddress!: string;

    @IsNotEmpty()
    @IsObject()
    @Type(() => Location)
    @Expose()
    fromLocation!: Location;

    @IsNotEmpty()
    @IsString()
    @Expose()
    toName!: string;

    @IsNotEmpty()
    @IsString()
    @Expose()
    toAddress!: string;

    @IsNotEmpty()
    @IsObject()
    @Type(() => Location)
    @Expose()
    toLocation!: Location;
}
