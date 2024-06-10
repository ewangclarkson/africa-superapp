import DeliveryRepository from "../../repository/DeliveryRepository";
import {IOC} from "./inversify.ioc.types";
import DeliveryRepositoryImpl from "../../repository/implementation/DeliveryRepositoryImpl";
import DeliveryService from "../../service/DeliveryService";
import DeliveryServiceImpl from "../../domain/service/DeliveryServiceImpl";
import DeliveryController from "../../controller/DeliveryController";
import AppConfigProperties from "../AppConfigProperties";
import DependencyInjectionManager from "compliance-library/config/inversify/DependencyInjectionManager";

const dependencyInjectionManagerInstance = DependencyInjectionManager.getInstance();
dependencyInjectionManagerInstance.initializeBindings();

const container = dependencyInjectionManagerInstance.getContainer();


container.bind<DeliveryRepository>(IOC.DeliveryRepository).to(DeliveryRepositoryImpl);
container.bind<DeliveryService>(IOC.DeliveryService).to(DeliveryServiceImpl);
container.bind(IOC.AppConfigProperties).to(AppConfigProperties);
container.bind(IOC.DeliveryController).to(DeliveryController);
