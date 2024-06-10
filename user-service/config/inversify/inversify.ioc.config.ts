import UserRepository from "../../repository/UserRepository";
import {IOC} from "./inversify.ioc.types";
import UserRepositoryImpl from "../../repository/implementation/UserRepositoryImpl";
import UserService from "../../service/UserService";
import UserServiceImpl from "../../domain/service/UserServiceImpl";
import UserController from "../../controller/UserController";
import AppConfigProperties from "../AppConfigProperties";
import DependencyInjectionManager from "compliance-library/config/inversify/DependencyInjectionManager";


const dependencyInjectionManagerInstance = DependencyInjectionManager.getInstance();
dependencyInjectionManagerInstance.initializeBindings();

const container = dependencyInjectionManagerInstance.getContainer();


container.bind<UserRepository>(IOC.UserRepository).to(UserRepositoryImpl);
container.bind<UserService>(IOC.UserService).to(UserServiceImpl);
container.bind(IOC.AppConfigProperties).to(AppConfigProperties);
container.bind(IOC.UserController).to(UserController);
