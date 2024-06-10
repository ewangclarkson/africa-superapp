import config from "config";
import {injectable} from "inversify";

@injectable()
export default class AppConfigProperties {
    public readonly appPort: string = config.get("app.port");
    public readonly appName: string = config.get("app.name");
    public readonly allowedOrigin: string = config.get("allowedOrigin");
}