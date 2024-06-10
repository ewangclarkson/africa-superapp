import express, {Application} from "express";
import "reflect-metadata";
import "./config/inversify/inversify.ioc.config";
import "./startup/database";
import {startApplication} from "./startup/boot";
import {KafkaTopics} from "./config/constants/kafka.topics";
import AppConfigProperties from "./config/AppConfigProperties";
import {IOC} from "./config/inversify/inversify.ioc.types";
import DependencyInjectionManager from "compliance-library/config/inversify/DependencyInjectionManager";
import {Logger} from "compliance-library/config/logging/Logger";
import KafkaCompliance from "compliance-library/kafka/abstraction/KafkaCompliance";
import {DI} from "compliance-library/config/inversify/inversify.ioc.types";
import KafkaService from "compliance-library/kafka/abstraction/KafkaService";


const app: Application = express();
const dependencyManager = DependencyInjectionManager.getInstance().getContainer();
const kafkaCompliance: KafkaCompliance = dependencyManager.get<KafkaCompliance>(DI.KafkaCompliance);
const kafkaService: KafkaService = dependencyManager.get<KafkaService>(IOC.KafkaService);
const appConfig: AppConfigProperties = dependencyManager.get(IOC.AppConfigProperties);


const startServer = function () {

    startApplication(app, appConfig);

    kafkaCompliance.kafkaObserver(KafkaTopics.PACKAGE_TOPIC,kafkaService)
        .then(() => Logger.error("consume success"))
        .catch((err) => Logger.error(err));

    process.on("uncaughtException",
        (exp) => Logger.error(exp.message, exp));

    const port: number = Number(process.env.PORT) || parseInt(appConfig.appPort);

    return app.listen(port, () => Logger.info(`The application ${appConfig.appName} started on port ${port}`));
};

export const server = startServer();


