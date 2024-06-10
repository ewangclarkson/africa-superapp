import PackageRepository from "../PackageRepository";
import {Package} from "../../domain/model/Package";
import {inject, injectable} from "inversify";
import {v4 as uuidv4} from 'uuid';
import {PersistenceKey} from "../../config/constants/PersistenceKey";
import PersistenceFactory from "compliance-library/persistence/abstraction/PersistenceFactory";
import {DI} from "compliance-library/config/inversify/inversify.ioc.types";
import {ElasticIndex} from "compliance-library/config/constants/ElasticIndex";
import {PersistenceOperation} from "compliance-library/persistence/PersistenceOperation";
import {PersistingPayload} from "compliance-library/persistence/dto/PersistingPayload";
import {PersistingPayloadBuilder} from "compliance-library/persistence/builder/PersistingPayloadBuilder";
import {RetrievingPayload} from "compliance-library/persistence/dto/RetrievingPayload";
import {RetrievingPayloadBuilder} from "compliance-library/persistence/builder/RetrievingPayloadBuilder";
import {plainToClass} from "class-transformer";


//clean architecture
@injectable()
export default class PackageRepositoryImpl implements PackageRepository {

    private readonly persistenceFactory: PersistenceFactory;

    constructor(
        @inject(DI.PersistenceFactory) persistenceApi: PersistenceFactory) {
        this.persistenceFactory = persistenceApi;
    }

    async create(packageObject: Package): Promise<Package> {

        packageObject.packageId = uuidv4();
        const payload: PersistingPayload = PersistingPayloadBuilder.builder()
            .model(Package)
            .payload(packageObject)
            .elasticIndex(ElasticIndex.PACKAGE)
            .method(PersistenceOperation.CREATE)
            .primaryKey(PersistenceKey.PACKAGEID)
            .build();

        const {resource} = await this.persistenceFactory.persist(payload);

        return Promise.resolve(resource);
    }

    async delete(packageObject: Package): Promise<void> {
        const payload: PersistingPayload = PersistingPayloadBuilder.builder()
            .model(Package)
            .payload(packageObject)
            .elasticIndex(ElasticIndex.PACKAGE)
            .method(PersistenceOperation.DELETE)
            .primaryKey(PersistenceKey.PACKAGEID)
            .build();

        const {resource} = await this.persistenceFactory.persist(payload);

        return Promise.resolve();
    }

    async findOne(id: string): Promise<Package | null> {
        try {
            const payload: RetrievingPayload = RetrievingPayloadBuilder.builder()
                .model(Package).elasticIndex(ElasticIndex.PACKAGE)
                .keyValue(id).build();
            const {resource} = await this.persistenceFactory.retrieve(payload);

            return Promise.resolve(plainToClass(Package,resource[0]));
        } catch (e) {
            return Promise.resolve(null);
        }
    }

    async find(): Promise<Package[]> {

        try {
            const payload: RetrievingPayload = RetrievingPayloadBuilder.builder()
                .model(Package).elasticIndex(ElasticIndex.PACKAGE)
                .build();
            const {resource} = await this.persistenceFactory.retrieve(payload);

            return Promise.resolve(plainToClass(Package,resource));
        } catch (e) {
            return Promise.resolve([]);
        }
    }

    async update(id: string, packageObject: Package): Promise<Package> {

        const payload: PersistingPayload = PersistingPayloadBuilder.builder()
            .model(Package)
            .payload(packageObject)
            .elasticIndex(ElasticIndex.PACKAGE)
            .method(PersistenceOperation.UPDATE)
            .primaryKey(PersistenceKey.PACKAGEID)
            .build();

        const {resource} = await this.persistenceFactory.persist(payload);

        return Promise.resolve(resource);
    }

}