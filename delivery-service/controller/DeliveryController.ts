import {NextFunction, Request, Response} from "express";
import DeliveryResponseDto from "../domain/dto/DeliveryResponseDto";
import DeliveryRequestDto from "../domain/dto/DeliveryRequestDto";
import HttpStatus from "http-status";
import {inject, injectable} from "inversify";
import DeliveryService from "../service/DeliveryService";
import {IOC} from "../config/inversify/inversify.ioc.types";
import {RequestValidator} from "compliance-library/utils/RequestValidator";
import {KafkaTopics} from "../config/constants/kafkaTopics";
import {plainToClass} from "class-transformer";
import KafkaPayload from "compliance-library/kafka/dto/KafkaPayload";
import {DI} from "compliance-library/config/inversify/inversify.ioc.types";
import KafkaCompliance from "compliance-library/kafka/abstraction/KafkaCompliance";


@injectable()
export default class DeliveryController {

    private deliveryService: DeliveryService;
    private kafkaCompliance: KafkaCompliance;

    constructor(
        @inject(IOC.DeliveryService) deliveryService: DeliveryService,
        @inject(DI.KafkaCompliance) kafkaCompliance: KafkaCompliance) {
        this.deliveryService = deliveryService;
        this.kafkaCompliance = kafkaCompliance;
    }

    async createDelivery(request: Request, response: Response, next: NextFunction) {
        const {errors, input} = await RequestValidator(DeliveryRequestDto, request.body);

        if (errors) return response.status(HttpStatus.BAD_REQUEST).send(errors);

        const delivery: DeliveryResponseDto = await this.deliveryService.createDelivery(input);

        await this.kafkaCompliance.kafkaRequest(KafkaTopics.PACKAGE_TOPIC, plainToClass(KafkaPayload, {
            payload: {
                activeDeliveryId: delivery.deliveryId,
                packageId: delivery.packageId
            },
            correlationId: null,
            replyTo: null,
            incoming: KafkaTopics.DELIVERY_TOPIC
        }));
        return response.status(HttpStatus.CREATED).send(delivery);
    }


    async getDelivery(request: Request, response: Response, next: NextFunction) {
        const delivery = await this.deliveryService.getDelivery(request.params.id);
        if (!delivery) return response.status(HttpStatus.NOT_FOUND).send(HttpStatus[`${HttpStatus.NOT_FOUND}_MESSAGE`]);

        return response.status(HttpStatus.OK).send(delivery);
    }

    async getDeliveries(request: Request, response: Response, next: NextFunction) {

        const deliveries: DeliveryResponseDto[] = await this.deliveryService.getDeliveries();
        return response.status(HttpStatus.OK).send(deliveries);
    }

    async deleteDelivery(request: Request, response: Response, next: NextFunction) {
        const delivery = await this.deliveryService.getDelivery(request.params.id);
        if (!delivery) return response.status(HttpStatus.NOT_FOUND).send(HttpStatus[`${HttpStatus.NOT_FOUND}_MESSAGE`]);

        await this.deliveryService.deleteDelivery(request.params.id);

        return response.status(HttpStatus.OK).send(delivery);
    }

    async updateDelivery(request: Request, response: Response, next: NextFunction) {
        const deliveryObject = await this.deliveryService.getDelivery(request.params.id);
        if (!deliveryObject) return response.status(HttpStatus.NOT_FOUND).send(HttpStatus[`${HttpStatus.NOT_FOUND}_MESSAGE`]);

        const {errors, input} = await RequestValidator(DeliveryRequestDto, request.body);

        if (errors) return response.status(HttpStatus.BAD_REQUEST).send(errors);

        const resource: DeliveryResponseDto = await this.deliveryService.updateDelivery(request.params.id, input);

        return response.status(HttpStatus.OK).send(resource);
    }
}