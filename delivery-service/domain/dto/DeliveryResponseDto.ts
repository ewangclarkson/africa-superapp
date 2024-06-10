import DeliveryRequestDto from "./DeliveryRequestDto";
import {Expose} from "class-transformer";

export default class DeliveryResponseDto extends DeliveryRequestDto {
    @Expose()
    deliveryId!: string;
}