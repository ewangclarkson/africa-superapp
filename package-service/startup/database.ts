import {Package} from "../domain/model/Package";
import AppConfigurationProperties from "compliance-library/config/AppConfigurationProperties";
import DependencyInjectionManager from "compliance-library/config/inversify/DependencyInjectionManager";
import {DI} from "compliance-library/config/inversify/inversify.ioc.types";
import DatabaseConfigurationManager from "compliance-library/config/database/DatabaseConfigurationManager";
import {Logger} from "compliance-library/config/logging/Logger";


async function initializeDatabase() {

    const appConfigurations: AppConfigurationProperties = DependencyInjectionManager.getInstance().getContainer().get<AppConfigurationProperties>(DI.AppConfigurationProperties);


    DatabaseConfigurationManager
        .setDatabaseConfigurationOnce({
            type: appConfigurations.databaseDriver,
            url: appConfigurations.databaseConnectionUrl,
            synchronize: true,
            logging: false,
            entities: [Package],
            migrations: [],
            subscribers: [],
        })
        .getDataSource()
        .initialize()
        .then(() => Logger.info("Database initialization successful"))
        .catch(() => Logger.info("Database initialization failure"));
}

initializeDatabase()
    .then(() => "done");