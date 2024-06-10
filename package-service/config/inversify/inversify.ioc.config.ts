import PackageRepository from "../../repository/PackageRepository";
import {IOC} from "./inversify.ioc.types";
import PackageRepositoryImpl from "../../repository/implementation/PackageRepositoryImpl";
import PackageService from "../../service/PackageService";
import PackageServiceImpl from "../../domain/service/PackageServiceImpl";
import PackageController from "../../controller/PackageController";
import KafkaService from "compliance-library/kafka/abstraction/KafkaService";
import KafkaServiceImpl from "../../domain/service/KafkaServiceImpl";
import AppConfigProperties from "../AppConfigProperties";
import DependencyInjectionManager from "compliance-library/config/inversify/DependencyInjectionManager";


const dependencyInjectionManagerInstance = DependencyInjectionManager.getInstance();
dependencyInjectionManagerInstance.initializeBindings();

const container = dependencyInjectionManagerInstance.getContainer();

container.bind<PackageRepository>(IOC.PackageRepository).to(PackageRepositoryImpl);
container.bind<PackageService>(IOC.PackageService).to(PackageServiceImpl);
container.bind<KafkaService>(IOC.KafkaService).to(KafkaServiceImpl);
container.bind(IOC.AppConfigProperties).to(AppConfigProperties);
container.bind(IOC.PackageController).to(PackageController);
