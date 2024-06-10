const IOC = { //dependency injection types(inversion of control)
    DeliveryRepository: Symbol.for("DeliveryRepository"),
    DeliveryService: Symbol.for("DeliveryService"),
    DeliveryController: Symbol.for("DeliveryController"),
    AppConfigProperties: Symbol.for("AppConfigProperties")
};

export {IOC};