import UserRepository from "../UserRepository";
import {User} from "../../domain/model/User";
import {inject, injectable} from "inversify";
import {PersistenceKey} from "../../config/constants/PersistenceKey";
import {v4 as uuidv4} from 'uuid';
import PersistenceFactory from "compliance-library/persistence/abstraction/PersistenceFactory";
import {DI} from "compliance-library/config/inversify/inversify.ioc.types";
import {PersistingPayloadBuilder} from "compliance-library/persistence/builder/PersistingPayloadBuilder";
import {PersistingPayload} from "compliance-library/persistence/dto/PersistingPayload";
import {PersistenceOperation} from "compliance-library/persistence/PersistenceOperation";
import {ElasticIndex} from "compliance-library/config/constants/ElasticIndex";
import {RetrievingPayload} from "compliance-library/persistence/dto/RetrievingPayload";
import {RetrievingPayloadBuilder} from "compliance-library/persistence/builder/RetrievingPayloadBuilder";


//clean architecture
@injectable()
export default class UserRepositoryImpl implements UserRepository {

    private readonly persistenceFactory: PersistenceFactory;

    constructor(
        @inject(DI.PersistenceFactory) persistenceApi: PersistenceFactory) {
        this.persistenceFactory = persistenceApi;
    }

    async create(user: User): Promise<User> {
        user.userId = uuidv4();

        const payload: PersistingPayload = PersistingPayloadBuilder.builder()
            .model(User)
            .payload(user)
            .elasticIndex(ElasticIndex.USER)
            .method(PersistenceOperation.CREATE)
            .primaryKey(PersistenceKey.EMAIL)
            .build();

        const {resource} = await this.persistenceFactory.persist(payload);

        return Promise.resolve(resource);
    }

    async delete(user: User): Promise<void> {
        const payload: PersistingPayload = PersistingPayloadBuilder.builder()
            .model(User)
            .payload(user)
            .elasticIndex(ElasticIndex.USER)
            .method(PersistenceOperation.DELETE)
            .primaryKey(PersistenceKey.EMAIL)
            .build();

        const {resource} = await this.persistenceFactory.persist(payload);


        return Promise.resolve();
    }

    async findOne(id: string): Promise<User | null> {
        try {
            const payload: RetrievingPayload = RetrievingPayloadBuilder.builder()
                .model(User).elasticIndex(ElasticIndex.USER)
                .keyValue(id).build();
            const {resource} = await this.persistenceFactory.retrieve(payload);

            return Promise.resolve(resource[0]);
        } catch (e) {
            return Promise.resolve(null);
        }
    }

    async find(): Promise<User[]> {
        try {
            const payload: RetrievingPayload = RetrievingPayloadBuilder.builder()
                .model(User).elasticIndex(ElasticIndex.USER)
                .build();
            const {resource} = await this.persistenceFactory.retrieve(payload);

            return Promise.resolve(resource);
        } catch (e) {
            return Promise.resolve([]);
        }
    }

    async update(id: string, user: User): Promise<User> {

        const payload: PersistingPayload = PersistingPayloadBuilder.builder()
            .model(User)
            .payload(user)
            .elasticIndex(ElasticIndex.USER)
            .method(PersistenceOperation.UPDATE)
            .primaryKey(PersistenceKey.EMAIL)
            .build();

        const {resource} = await this.persistenceFactory.persist(payload);

        return Promise.resolve(resource);
    }

}