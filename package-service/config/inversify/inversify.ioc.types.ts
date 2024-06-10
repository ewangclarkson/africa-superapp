const IOC = { //dependency injection types(inversion of control)
    PackageRepository: Symbol.for("PackageRepository"),
    PackageService: Symbol.for("PackageService"),
    KafkaService: Symbol.for("KafkaService"),
    PackageController: Symbol.for("PackageController"),
    AppConfigProperties: Symbol.for("AppConfigProperties")
};

export {IOC};