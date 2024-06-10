import DeliveryService from "../../service/DeliveryService";
import {inject, injectable} from "inversify";
import DeliveryRequestDto from "../dto/DeliveryRequestDto";
import DeliveryResponseDto from "../dto/DeliveryResponseDto";
import DeliveryRepository from "../../repository/DeliveryRepository";
import {plainToClass} from "class-transformer"
import {Delivery} from "../model/Delivery";
import {IOC} from "../../config/inversify/inversify.ioc.types";
import Location from "compliance-library/domain/dto/Location";
import {DeliveryStatus} from "../../config/constants/DeliveryStatus";

@injectable()
export default class DeliveryServiceImpl implements DeliveryService {

    private deliveryRepository: DeliveryRepository;

    constructor(
        @inject(IOC.DeliveryRepository) deliveryRepository: DeliveryRepository) {
        this.deliveryRepository = deliveryRepository;
    }

    async createDelivery(deliveryRequestDto: DeliveryRequestDto): Promise<DeliveryResponseDto> {
        const delivery = await this.deliveryRepository.create(plainToClass(Delivery, deliveryRequestDto));
        return Promise.resolve(plainToClass(DeliveryResponseDto, delivery));
    }

    async deleteDelivery(id: string): Promise<DeliveryResponseDto> {

        const delivery = await this.deliveryRepository.findOne(id);
        if (delivery) {
            await this.deliveryRepository.delete(delivery);
            return Promise.resolve(plainToClass(DeliveryResponseDto, delivery));
        }
        throw Error("An unexpected error occurred while deleting the delivery");
    }

    async getDelivery(id: string): Promise<DeliveryResponseDto | null> {
        const delivery = await this.deliveryRepository.findOne(id);
        if (!delivery) return Promise.resolve(null);
        return Promise.resolve(plainToClass(DeliveryResponseDto, delivery));
    }

    async getDeliveries(): Promise<DeliveryResponseDto[] | []> {
        const deliveries = await this.deliveryRepository.find();
        return Promise.resolve(plainToClass(DeliveryResponseDto, deliveries));
    }

    async updateDelivery(id: string, deliveryRequestDto: DeliveryRequestDto): Promise<DeliveryResponseDto> {
        const delivery = await this.deliveryRepository.findOne(id);
        if (delivery) {
            delivery.packageId = deliveryRequestDto.packageId;
            delivery.pickupTime = deliveryRequestDto.pickupTime;
            delivery.startTime = deliveryRequestDto.startTime;
            delivery.endTime = deliveryRequestDto.endTime;
            delivery.location = deliveryRequestDto.location;
            delivery.status = deliveryRequestDto.status;

            const resource = await this.deliveryRepository.update(delivery.deliveryId, delivery);
            return Promise.resolve(plainToClass(DeliveryResponseDto, resource));
        }
        throw Error("Failed to update delivery")
    }

    async updateDeliveryById(deliveryId: string, location: Location): Promise<DeliveryResponseDto | null> {
        const delivery = await this.deliveryRepository.findOne(deliveryId);
        if (!delivery) return Promise.resolve(null);
        delivery.location = location;

        await this.deliveryRepository.update(deliveryId, delivery);

        return Promise.resolve(plainToClass(DeliveryResponseDto, delivery));
    }

    async updateDeliveryStatus(deliveryId: string, status: DeliveryStatus) : Promise<DeliveryResponseDto | null>{
        const delivery = await this.deliveryRepository.findOne(deliveryId);
        if (!delivery) return Promise.resolve(null);

        const setTimeDeterminer = true;
        switch (setTimeDeterminer) {
            case delivery.status === DeliveryStatus.OPEN && status === DeliveryStatus.PICKED_UP:
                delivery.pickupTime = new Date();
                break;
            case delivery.status === DeliveryStatus.PICKED_UP && status === DeliveryStatus.IN_TRANSIT:
                delivery.startTime = new Date();
                break;
            case (delivery.status === DeliveryStatus.IN_TRANSIT && status === DeliveryStatus.DELIVERED) ||
            (delivery.status === DeliveryStatus.IN_TRANSIT && status === DeliveryStatus.FAILED):
                delivery.endTime = new Date();
                break;
        }

        delivery.status = status;

        await this.deliveryRepository.update(deliveryId, delivery);

        return Promise.resolve(plainToClass(DeliveryResponseDto, delivery));
    }
}