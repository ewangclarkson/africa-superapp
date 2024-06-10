import DeliveryRepository from "../DeliveryRepository";
import {Delivery} from "../../domain/model/Delivery";
import {inject, injectable} from "inversify";
import {PersistenceKey} from "../../config/constants/PersistenceKey";
import {v4 as uuidv4} from 'uuid';
import PersistenceFactory from "compliance-library/persistence/abstraction/PersistenceFactory";
import {PersistingPayloadBuilder} from "compliance-library/persistence/builder/PersistingPayloadBuilder";
import {PersistingPayload} from "compliance-library/persistence/dto/PersistingPayload";
import {ElasticIndex} from "compliance-library/config/constants/ElasticIndex";
import {PersistenceOperation} from "compliance-library/persistence/PersistenceOperation";
import {RetrievingPayload} from "compliance-library/persistence/dto/RetrievingPayload";
import {RetrievingPayloadBuilder} from "compliance-library/persistence/builder/RetrievingPayloadBuilder";
import {DI} from "compliance-library/config/inversify/inversify.ioc.types";
import {plainToClass} from "class-transformer";

//clean architecture
@injectable()
export default class DeliveryRepositoryImpl implements DeliveryRepository {

    private readonly persistenceFactory: PersistenceFactory;

    constructor(
        @inject(DI.PersistenceFactory) persistenceApi: PersistenceFactory) {
        this.persistenceFactory = persistenceApi;
    }

    async create(delivery: Delivery): Promise<Delivery> {
        delivery.deliveryId = uuidv4();
        const payload: PersistingPayload = PersistingPayloadBuilder.builder()
            .model(Delivery)
            .payload(delivery)
            .elasticIndex(ElasticIndex.DELIVERY)
            .method(PersistenceOperation.CREATE)
            .primaryKey(PersistenceKey.DELIVERYID)
            .build();

        const {resource} = await this.persistenceFactory.persist(payload);

        return Promise.resolve(resource);
    }

    async delete(delivery: Delivery): Promise<void> {

        const payload: PersistingPayload = PersistingPayloadBuilder.builder()
            .model(Delivery)
            .payload(delivery)
            .elasticIndex(ElasticIndex.DELIVERY)
            .method(PersistenceOperation.DELETE)
            .primaryKey(PersistenceKey.DELIVERYID)
            .build();

        const {resource} = await this.persistenceFactory.persist(payload);

        return Promise.resolve();
    }

    async findOne(id: string): Promise<Delivery | null> {
        try {
            const payload: RetrievingPayload = RetrievingPayloadBuilder.builder()
                .model(Delivery).elasticIndex(ElasticIndex.DELIVERY)
                .keyValue(id).build();

            const {resource} = await this.persistenceFactory.retrieve(payload);

            return Promise.resolve(plainToClass(Delivery,resource[0]));
        } catch (e) {
            return Promise.resolve(null);
        }
    }

    async find(): Promise<Delivery[]> {

        try {
            const payload: RetrievingPayload = RetrievingPayloadBuilder.builder()
                .model(Delivery).elasticIndex(ElasticIndex.DELIVERY)
                .build();

            const {resource} = await this.persistenceFactory.retrieve(payload);

            return Promise.resolve(plainToClass(Delivery,resource));
        } catch (e) {
            return Promise.resolve([]);
        }
    }

    async update(id: string, delivery: Delivery): Promise<Delivery> {

        const payload: PersistingPayload = PersistingPayloadBuilder.builder()
            .model(Delivery)
            .payload(delivery)
            .elasticIndex(ElasticIndex.DELIVERY)
            .method(PersistenceOperation.UPDATE)
            .primaryKey(PersistenceKey.DELIVERYID)
            .build();
        const {resource} = await this.persistenceFactory.persist(payload);

        return Promise.resolve(resource);
    }

}