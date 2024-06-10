import express from "express";
import PackageController from "../controller/PackageController";
import {IOC} from "../config/inversify/inversify.ioc.types";
import 'express-async-errors';
import DependencyInjectionManager from "compliance-library/config/inversify/DependencyInjectionManager";
import SecurityCompliance from "compliance-library/security/SecurityCompliance";
import {DI} from "compliance-library/config/inversify/inversify.ioc.types";




const router = express.Router();

const dependencyManager = DependencyInjectionManager
    .getInstance().getContainer();

const apiSecurity = dependencyManager.get<SecurityCompliance>(DI.SecurityCompliance);
const controller = dependencyManager.get<PackageController>(IOC.PackageController);

router.post("/",[apiSecurity.authCompliance.bind(apiSecurity), apiSecurity.adminCompliance.bind(apiSecurity)], controller.createPackage.bind(controller));
router.put("/:id", [apiSecurity.uuidStandardCompliance.bind(apiSecurity), apiSecurity.authCompliance.bind(apiSecurity), apiSecurity.adminCompliance.bind(apiSecurity)], controller.updatePackage.bind(controller));
router.get("/",[apiSecurity.authCompliance.bind(apiSecurity), apiSecurity.adminCompliance.bind(apiSecurity)],  controller.getPackages.bind(controller));
router.get("/:id", [apiSecurity.uuidStandardCompliance.bind(apiSecurity), apiSecurity.authCompliance.bind(apiSecurity)], controller.getPackage.bind(controller));
router.delete("/:id",[apiSecurity.uuidStandardCompliance.bind(apiSecurity), apiSecurity.authCompliance.bind(apiSecurity), apiSecurity.adminCompliance.bind(apiSecurity)],  controller.deletePackage.bind(controller));

export default router;