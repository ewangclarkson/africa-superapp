const IOC = { //dependency injection types(inversion of control)
    UserRepository: Symbol.for("UserRepository"),
    UserService: Symbol.for("UserService"),
    UserController: Symbol.for("UserController"),
    AppConfigProperties: Symbol.for("AppConfigProperties")
};

export {IOC};