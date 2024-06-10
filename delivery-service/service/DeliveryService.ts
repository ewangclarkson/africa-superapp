import DeliveryRequestDto from "../domain/dto/DeliveryRequestDto";
import DeliveryResponseDto from "../domain/dto/DeliveryResponseDto";
import {DeliveryStatus} from "../config/constants/DeliveryStatus";
import Location from "compliance-library/domain/dto/Location";

export default interface DeliveryService {
    createDelivery(deliveryRequestDto: DeliveryRequestDto): Promise<DeliveryResponseDto>;

    getDelivery(id: string): Promise<DeliveryResponseDto | null>;

    deleteDelivery(id: string): Promise<DeliveryResponseDto>;

    getDeliveries(): Promise<DeliveryResponseDto[]>;

    updateDelivery(id: string, deliveryRequestDto: DeliveryRequestDto): Promise<DeliveryResponseDto>

    updateDeliveryStatus(deliveryId: string, status: DeliveryStatus): Promise<DeliveryResponseDto | null>;

    updateDeliveryById(deliveryId: string, location: Location): Promise<DeliveryResponseDto | null>

}