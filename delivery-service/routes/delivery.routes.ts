import express from "express";
import DeliveryController from "../controller/DeliveryController";
import {IOC} from "../config/inversify/inversify.ioc.types";
import 'express-async-errors';
import DependencyInjectionManager from "compliance-library/config/inversify/DependencyInjectionManager";
import SecurityCompliance from "compliance-library/security/SecurityCompliance";
import {DI} from "compliance-library/config/inversify/inversify.ioc.types";



const router = express.Router();

const dependencyManager = DependencyInjectionManager
    .getInstance().getContainer();

const apiSecurity = dependencyManager.get<SecurityCompliance>(DI.SecurityCompliance);
const controller = dependencyManager.get<DeliveryController>(IOC.DeliveryController);

router.post("/", [apiSecurity.authCompliance.bind(apiSecurity), apiSecurity.adminCompliance.bind(apiSecurity)], controller.createDelivery.bind(controller));
router.put("/:id", [apiSecurity.uuidStandardCompliance.bind(apiSecurity), apiSecurity.authCompliance.bind(apiSecurity), apiSecurity.adminCompliance.bind(apiSecurity)], controller.updateDelivery.bind(controller));
router.get("/", [apiSecurity.authCompliance.bind(apiSecurity), apiSecurity.adminCompliance.bind(apiSecurity)], controller.getDeliveries.bind(controller));
router.get("/:id", [apiSecurity.uuidStandardCompliance.bind(apiSecurity), apiSecurity.authCompliance.bind(apiSecurity)], controller.getDelivery.bind(controller));
router.delete("/:id", [apiSecurity.uuidStandardCompliance.bind(apiSecurity), apiSecurity.authCompliance.bind(apiSecurity), apiSecurity.adminCompliance.bind(apiSecurity)], controller.deleteDelivery.bind(controller));

export default router;