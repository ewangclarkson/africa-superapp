import express from "express";
import UserController from "../controller/UserController";
import {IOC} from "../config/inversify/inversify.ioc.types";
import 'express-async-errors';
import DependencyInjectionManager from "compliance-library/config/inversify/DependencyInjectionManager";
import SecurityCompliance from "compliance-library/security/SecurityCompliance";
import {DI} from "compliance-library/config/inversify/inversify.ioc.types";

const router = express.Router();

const dependencyManager = DependencyInjectionManager
    .getInstance().getContainer();

const apiSecurity = dependencyManager.get<SecurityCompliance>(DI.SecurityCompliance);
const controller = dependencyManager.get<UserController>(IOC.UserController);

router.post("/register", controller.registerUser.bind(controller));
router.put("/:email",[apiSecurity.authCompliance.bind(apiSecurity),apiSecurity.adminCompliance.bind(apiSecurity)], controller.updateUser.bind(controller));
router.get("/me",apiSecurity.authCompliance.bind(apiSecurity), controller.getAuthenticatedUser.bind(controller));
router.post("/login", controller.login.bind(controller));

export default router;