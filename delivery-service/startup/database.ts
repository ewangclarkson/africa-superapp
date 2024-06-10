import {Delivery} from "../domain/model/Delivery";
import AppConfigurationProperties from "compliance-library/config/AppConfigurationProperties";
import DependencyInjectionManager from "compliance-library/config/inversify/DependencyInjectionManager";
import DatabaseConfigurationManager from "compliance-library/config/database/DatabaseConfigurationManager";
import {DI} from "compliance-library/config/inversify/inversify.ioc.types";
import {Logger} from "compliance-library/config/logging/Logger";

async function initializeDatabase() {

    const appConfigurations: AppConfigurationProperties = DependencyInjectionManager.getInstance().getContainer().get(DI.AppConfigurationProperties);

    DatabaseConfigurationManager
        .setDatabaseConfigurationOnce({
            type: appConfigurations.databaseDriver,
            url: appConfigurations.databaseConnectionUrl,
            synchronize: true,
            logging: false,
            entities: [Delivery],
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