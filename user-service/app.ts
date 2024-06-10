import express, {Application} from "express";
import "reflect-metadata";
import "./config/inversify/inversify.ioc.config";
import "./startup/database";
import {startApplication} from "./startup/boot";
import AppConfigProperties from "./config/AppConfigProperties";
import {IOC} from "./config/inversify/inversify.ioc.types";
import DependencyInjectionManager from "compliance-library/config/inversify/DependencyInjectionManager";
import {Logger} from 'compliance-library/config/logging/Logger';


const app: Application = express();
const dependencyManager = DependencyInjectionManager.getInstance().getContainer();
const appConfig: AppConfigProperties = dependencyManager.get(IOC.AppConfigProperties);

const startServer = function () {

    startApplication(app,appConfig);

    process.on("uncaughtException",
        (exp) => Logger.error(exp.message, exp));


    const port: number = Number(process.env.PORT) || parseInt(appConfig.appPort);

    return app.listen(port, () => Logger.info(`The application ${appConfig.appName} started on port ${port}`));
};

export const server = startServer();


