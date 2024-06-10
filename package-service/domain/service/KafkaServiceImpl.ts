import KafkaService from "compliance-library/kafka/abstraction/KafkaService";
import {inject, injectable} from "inversify";
import KafkaPayload from "compliance-library/kafka/dto/KafkaPayload";
import {KafkaTopics} from "../../config/constants/kafka.topics";
import PackageRepository from "../../repository/PackageRepository";
import {Package} from "../model/Package";
import {IOC} from "../../config/inversify/inversify.ioc.types";
import KafkaResponse from "compliance-library/kafka/dto/KafkaResponse";


@injectable()
export default class KafkaServiceImpl implements KafkaService {

    private packageRepository: PackageRepository;

    constructor(
        @inject(IOC.PackageRepository) packageRepository: PackageRepository) {
        this.packageRepository = packageRepository;
    }

    request(payload: KafkaPayload): Promise<KafkaResponse> {
        return Promise.resolve({payload: "", correlationId: payload.correlationId});
    }

    async response(payload: KafkaPayload): Promise<void> {

        if (payload.incoming == KafkaTopics.DELIVERY_TOPIC) {
            const data:any = payload.payload;
            const packageObject: Package | null = await this.packageRepository.findOne(data.packageId);
            if (packageObject) {
                packageObject.activeDeliveryId = data.activeDeliveryId;

                await this.packageRepository.update(packageObject.packageId, packageObject);
            }
        }
    }


}
