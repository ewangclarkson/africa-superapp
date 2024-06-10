import express, {Application} from "express";
import cors from "cors";
import compression from "compression";
//import helmet from "helmet";
import deliveryApis from "../routes/delivery.routes";
import {handleException} from "compliance-library/exceptions/ExceptionHandler";
import AppConfigProperties from "../config/AppConfigProperties";


export const startApplication = function (app: Application, appConfig: AppConfigProperties) {
    app.use(express.json());
    // app.use(helmet());
    app.use(cors({
        origin: appConfig.allowedOrigin.split(","),
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Host', 'X-REAL-IP', 'Connection', 'Upgrade']
    }));
    app.use(compression());
    app.use("/api/delivery", deliveryApis);
    app.use(handleException);
};